var cluster = require('cluster'),
	path = require('path');

if (!cluster.isMaster) {
	console.error('Terminated. Attempt to run Master in Worker mode.');
	process.exit(1);
}

var CPU_CORES = require('os').cpus().length;

var workerConfig = require('./config').worker;
var workerEnv = {};

function showWorkers() {
	console.log('workers:', workerEnv);
//	for (var id in cluster.workers) {
//		console.log('worker '+id, cluster.workers[id]);
//	}
}


var extargs = process.argv.slice(2);
// purely cosmetic for now; this replaces fork(ENV) once issue is fixed
// https://github.com/joyent/node/issues/4149
extargs.push('--slave');

var exec = path.dirname(process.argv[1]) + '/worker';

// change default fork() behaviour
cluster.setupMaster({
	exec : exec,
	args : extargs
});

// fork worker processes
for (var role in workerConfig) {
	var prop = workerConfig[role];
	var instance = (prop.instance === 'cpu')? CPU_CORES : prop.instance;
	for (var i = 0; i < instance; i++) {
		var env = {
			NODE_WORKER_ROLE: role,
			NODE_WORKER_ROLE_INSTANCE: instance,
			NODE_WORKER_ROLE_RESPAWN: prop.respawn
		};
		var worker = cluster.fork(env);
		workerEnv[worker.id] = env;
	}
}

cluster.on('online', function(worker) {
	console.info('Worker %d %s (PID %d) online', worker.id, workerEnv[worker.id].NODE_WORKER_ROLE, worker.process.pid);
});

cluster.on('listening', function(worker, address) {
	console.info('Worker %d %s (PID %d) listening on %s:%d', worker.id, workerEnv[worker.id].NODE_WORKER_ROLE, worker.process.pid, address.address, address.port);
});

cluster.on('disconnect', function(worker) {
	console.warn('Worker %d %s (PID %d) disconnected', worker.id, workerEnv[worker.id].NODE_WORKER_ROLE, worker.process.pid);
});

cluster.on('exit', function(worker, code, signal) {
	var env = workerEnv[worker.id],
		respawn = env && env.NODE_WORKER_ROLE_RESPAWN;
	
	console.warn('Worker %d %s (PID %d) died (%s).%s', worker.id, env.NODE_WORKER_ROLE, worker.process.pid, signal||code, respawn?' Respawning...':'');
	
	delete workerEnv[worker.id];
	if (respawn) {
		var spawn = cluster.fork(env);
		workerEnv[spawn.id] = env;
	}
	//showWorkers();
});

//showWorkers();

