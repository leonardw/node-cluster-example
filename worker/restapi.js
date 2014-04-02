var http = require('http');

console.log('restapi');

//Workers can share any TCP connection
//In this case its a HTTP server
http.createServer(function(req, res) {
res.writeHead(200);
res.end("restapi\n"+JSON.stringify(process.env));
}).listen(8001);
//con.
//console.log('env:', process.env);
