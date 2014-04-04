var cluster = require('cluster');

if (cluster.isMaster) {
	console.warn('Running worker in Master mode');
}

var workerRole = process.env['NODE_WORKER_ROLE'];
if (workerRole) {
	require('./'+workerRole);
}
