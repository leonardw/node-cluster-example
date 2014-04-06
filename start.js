var cluster = require('cluster-role');

if (cluster.isMaster) {
	// Start a group of workers running ./worker/webhttp.js,
	// of as many instances as there are CPU cores, and respawn
	// new ones if any dies.
	// Also start another group of 2 workers running
	// ./worker/adminhttp.js, and respawn if any dies.
	cluster.spawn([
		{
			"role": "webhttp",
			"instance": "cpu",
			"respawn": true
		},
		{
			"role": "adminhttp",
			"instance": 2,
			"respawn": true
		}
	]);
	
	// Now start a single worker running ./extra/extrahttp.js,
	// do not respawn if it dies.
	cluster.spawn({
		"role": "extrahttp"
	}, './extra');
}
