var workerRole = process.env['NODE_WORKER_ROLE'];
if (workerRole) {
	require('./'+workerRole);
}
