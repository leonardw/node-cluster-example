var http = require('http');

//Workers for public Web HTTP server
http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('webhttp PID ' + process.pid + '\n<pre>' + JSON.stringify(process.env) +'</pre>');
}).listen(8000);