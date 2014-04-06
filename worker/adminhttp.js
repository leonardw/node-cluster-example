var http = require('http');

//Workers for private Admin HTTP server
http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('<html><head><title>Admin HTTP</title></head><body><h1>Admin HTTP (adminhttp)</h1><p>PID ' + process.pid + '</p><pre>' + JSON.stringify(process.env,null,'  ') +'</pre></body></html>');
}).listen(8001);