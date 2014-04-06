var http = require('http');

//Workers for public Web HTTP server
http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('<html><head><title>Web HTTP</title></head><body><h1>Web HTTP (webhttp)</h1><p>PID ' + process.pid + '</p><pre>' + JSON.stringify(process.env,null,'  ') +'</pre></body></html>');
}).listen(8000);