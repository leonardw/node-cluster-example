var cluster = require('cluster-role');

var workerConfig = require('./config').worker;

if (cluster.isMaster) {
	cluster.start(workerConfig);
}
