var cluster = require('cluster'),
	path = require('path');

if (!cluster.isMaster) {
	console.warn('Terminated. Attempt to run Master in Worker mode.');
	process.exit(1);
}

var CPU_CORES = require('os').cpus().length;

var workers = require('./config').workers;
var respawnWorkers = {};

function showWorkers() {
	console.log('workers:', respawnWorkers);
//	for (var id in cluster.workers) {
//		console.log('worker '+id, cluster.workers[id]);
//	}
}


var extargs = process.argv.slice(2);
// purely cosmetic for now; will replace fork(ENV) once issue is fixed
// https://github.com/joyent/node/issues/4149
extargs.push('--slave');

var exec = path.dirname(process.argv[1]) + '/worker';

// change default fork() behaviour
cluster.setupMaster({
	exec : exec,
	args : extargs
});

// Fork worker processes
for (var role in workers) {
	var prop = workers[role];
	var instance = (prop.instance === 'cpu')? CPU_CORES : prop.instance;
	for (var i = 0; i < instance; i++) {
		var env = {
			NODE_WORKER_ROLE: role,
			NODE_WORKER_ROLE_INSTANCE: instance,
			NODE_WORKER_ROLE_RESPAWN: prop.respawn
		};
		var worker = cluster.fork(env);
		respawnWorkers[worker.id] = env;
	}
}

function workerInfo(worker) {
	return 'Worker ' + worker.id + ' ' + respawnWorkers[worker.id]['NODE_WORKER_ROLE'] + ' (PID ' + worker.process.pid + ')';
}

cluster.on('online', function(worker) {
	console.info(workerInfo(worker) + ' online');
});

cluster.on('listening', function(worker, address) {
	console.info(workerInfo(worker) + ' listening on ' + address.address + ':' + address.port);
});

cluster.on('disconnect', function(worker) {
	console.info(workerInfo(worker) + ' disconnected');
});

cluster.on('exit', function(worker, code, signal) {
	console.warn(workerInfo(worker) + (code?' exit with code '+code : (signal?' killed due to '+signal:' exit')));
	var env = respawnWorkers[worker.id];
	if (env && env.NODE_WORKER_ROLE_RESPAWN) {
		delete respawnWorkers[worker.id];
		var spawn = cluster.fork(env);
		respawnWorkers[spawn.id] = env;
	}
	//showWorkers();
});

//showWorkers();

