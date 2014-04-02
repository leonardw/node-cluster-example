var cluster = require('cluster'),
	path = require('path'),
	cpuCores = require('os').cpus().length;

var workers = require('./config').workers;
var respawnWorkers = {};

function showWorkers() {
	console.log('workers:', respawnWorkers);
//	for (var id in cluster.workers) {
//		console.log('worker '+id, cluster.workers[id]);
//	}
}

if (cluster.isMaster) {
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
	
	// Fork workers.
	for (var exec in workers) {
		var prop = workers[exec];
		var instance = (prop.instance === 'cpu')? cpuCores : prop.instance;
		for (var i = 0; i < instance; i++) {
			var env = {
				NODE_WORKER_ROLE: exec,
				NODE_WORKER_ROLE_INSTANCE: instance,
				NODE_WORKER_ROLE_RESPAWN: prop.respawn
			};
			var worker = cluster.fork(env);
			if (prop.respawn) {
				respawnWorkers[worker.id] = env;
			}
		}
	}
	
	cluster.on('online', function(worker) {
		console.info('Worker '+worker.id+' online');
	});
	
	cluster.on('listening', function(worker, address) {
		console.info('Worker '+worker.id+' listening on ' + address.address + ':' + address.port);
	});
	
	cluster.on('disconnect', function(worker) {
		console.info('Worker ' + worker.id + ' disconnected');
	});

	cluster.on('exit', function(worker, code, signal) {
		console.warn('Worker '+ worker.id +' PID ' + worker.process.pid + (code?' exit with code '+code : (signal?' killed due to '+signal:' exit')));
		var env = respawnWorkers[worker.id];
		if (env && env.NODE_WORKER_ROLE_RESPAWN) {
			delete respawnWorkers[worker.id];
			var spawn = cluster.fork(env);
			respawnWorkers[spawn.id] = env;
		}
//		showWorkers();
	});
	
//	showWorkers();
	
} else {
	console.warn('Trying to run Master in worker mode; this should not happen!');
}
