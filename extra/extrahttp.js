var http = require('http');

//Workers for Extra HTTP server
http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('<html><head><title>Extra HTTP</title></head><body><h1>Extra HTTP (extrahttp)</h1><p>PID ' + process.pid + '</p><pre>' + JSON.stringify(process.env,null,'  ') +'</pre></body></html>');
}).listen(8002);