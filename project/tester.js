const {Worker, workerData, parentPort} = require('worker_threads');
const script = workerData;

parentPort.on('message', (message) => {
    parentPort.postMessage(message+'123');
});