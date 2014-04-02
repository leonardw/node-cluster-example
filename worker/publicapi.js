var http = require('http');

console.log('publicapi');

//Workers can share any TCP connection
//In this case its a HTTP server
http.createServer(function(req, res) {
res.writeHead(200);
res.end("publicapi\n"+JSON.stringify(process.env));
}).listen(8000);
//con.
//console.log('env:', process.env);