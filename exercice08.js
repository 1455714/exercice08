var http = require('http');
var fs = require('fs');
var url = require('url');

var sTexte="";

// Créer un serveur
http.createServer( function (request, response) {  
   // On extrait de la requête «request» le chemin  qui nous donnera le nom de fichier
   var pathname = url.parse(request.url).pathname;

   console.log("request.url = " + request.url)
   console.log("url.parse(request.url).pathname = " + url.parse(request.url).pathname)
  // affiche le nom du fichier pour laquelle la requête a été généré
   console.log("Request for " + pathname + " received.");
   

   // Lire par le «fs» (file système) le fichier de la requête 
   // le slice(1) permet de retirer le premier caractère
    //on ajoute le .json pour éviter de l'écrire dans le url
   fs.readFile(pathname.slice(1)+".json", function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else { 
         //Page found   
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});  
         
          //convertit le texte en Json
          var parser = JSON.parse(data);
          //sépare les éléments à l'aide d'une boucle et le mets dans un texte
          sTexte="";
          for (propriete in parser){
            sTexte += "<td>"+propriete+ "-" +parser[propriete]+"</td>";
            }
          //affiche dans un tableau
        response.write("<table><tr>"+ sTexte +"</tr></table>");
      }
      // transmet la reponse  
      response.end();
   });   
}).listen(8081);

// message console
console.log('Serveur se trouvant à http://127.0.0.1:8081/');




