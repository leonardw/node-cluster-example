var http = require('http');

//Workers for private Admin HTTP server
http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('adminhttp PID ' + process.pid + '\n<pre>' + JSON.stringify(process.env) +'</pre>');
}).listen(8000);