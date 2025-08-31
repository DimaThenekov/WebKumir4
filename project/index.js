const VERSION = "4_000";

const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const PROJECT_DIRECTORY =  __dirname;

const settings = JSON.parse(workerData);
let SERVER_PORT = settings.port;

const write = (x)=>{ parentPort.postMessage(' ' + x) };

if (!SERVER_PORT && typeof SERVER_PORT != 'number') {
	write('Error with settings.port');
	process.exit(1);
}

/*
	Сборщик мусора
	
	Удаляет данные которые давно не использовались
*/
function GC() {
	// Удаляем токены если они не используются более 7 дней
	Object.keys(all_data.token2uhash).map(x=>{
		if (all_data.token2uhash[x].request_timestamps &&
			all_data.token2uhash[x].request_timestamps[0] &&
			all_data.token2uhash[x].request_timestamps[0]<+new Date()-7*24*60*60*1000)
			delete all_data.token2uhash[x];
	});
	
	// удаляем информацию о решениях в турнире, если турнира больше нет
	Object.keys(all_data.players).map(x=>{
		if (all_data.players[x].map_data)
			Object.keys(all_data.players[x].map_data).filter(y=>!all_data.turnirs[y]).map(y=>{
				delete all_data.players[x].map_data[y];
			});
	});
}

function save_all(callback, is_autosave) {
	
	if (!is_autosave) write('FORCE SAVING');
	else GC();
	
	if (!is_autosave || all_data.updated) {
		all_data.updated = false;
		if (is_autosave) fs.copyFileSync(PROJECT_DIRECTORY+'/all_data.json', PROJECT_DIRECTORY+'/all_data_backup.json');
		fs.writeFileSync(PROJECT_DIRECTORY+'/all_data.json', JSON.stringify(all_data), 'utf8');
		write('all_data.json saved');
	}
	
	if (!is_autosave || static_data.updated) {
		static_data.updated = false;
		if (is_autosave) fs.copyFileSync(PROJECT_DIRECTORY+'/static_data.json', PROJECT_DIRECTORY+'/static_data_backup.json');
		fs.writeFileSync(PROJECT_DIRECTORY+'/static_data.json', JSON.stringify(static_data), 'utf8');
		write('static_data.json saved');
	}
	
	if (callback) setTimeout(callback);
}

function init(callback) {
	write(`Run initialisation`);
	init_files(()=>{
		setInterval(()=>{
			save_all(()=>{}, true);
		},30000);
		setTimeout(callback,10);
	});
}


let all_data = ({});
let static_data = ({});

// ======================= API =======================
// ======================= API =======================
// ======================= API =======================

(global || window).all_data = all_data;
(global || window).static_data = static_data;
(global || window).write = write;
const g_sha256 = (s)=>{return crypto.createHash('sha256').update(s).digest('hex')};
(global || window).g_sha256 = g_sha256;
require('./index/public_server/api.js');
let all_api = (global || window).all_api;

// ======================= API =======================
// ======================= API =======================
// ======================= API =======================



function init_files(callback) {
	function reassignObject(target, source) {
		Object.keys(target).forEach(key => { delete target[key]; });
		Object.assign(target, source);
		return target;
	}

	if (settings.admin_login && typeof settings.admin_login == 'string' && settings.admin_password && typeof settings.admin_password == 'string') {
		try {
			reassignObject(all_data, JSON.parse(fs.readFileSync(PROJECT_DIRECTORY+'/all_data.json')));
			reassignObject(static_data, JSON.parse(fs.readFileSync(PROJECT_DIRECTORY+'/static_data.json')));
		} catch (e) {
			write('Init error: ' + e);
			process.exit(1);
		}
		
		all_api.init(settings);
	} else {
		write('Error with settings.admin_login/settings.admin_password');
		process.exit(1);
	}
	callback();
}

function RAPI(obj, callback) {
	all_api.do_request(obj, callback);
}

parentPort.on('message', (message) => {
	if (message=='close')  return save_all(()=>{parentPort.postMessage('$end_close');process.exit(1);});
});

const http = require('http');
const MAX_CONTENT_LENGTH = 64000000;
const wr = (res, code, message)=>{res.writeHead(code || 500).end(message||undefined);}
const err_json = (message, uid)=>{return JSON.stringify({message, uid})}

const server = http.createServer((req, res) => {
	const startTime = new Date();
	let uid;
	try {
		if (!req.url.startsWith('/'))
			return wr(res,400, err_json('', uid));
		
		if (req.headers['Content-Length'] > MAX_CONTENT_LENGTH)
			return wr(res, 400, err_json('Big content-length', uid));
		
		// POST handling
		if (req.method === 'POST') {
			return getBody(req, res, (body)=>{
			
				const rawBody = body.toString('utf8');
				if (rawBody.length > 32000) {
					return wr(res, 500, err_json('Big data', uid));
				}
				let t;
				try {
					t = JSON.parse(rawBody);
					if (!(typeof t === 'object' && !Array.isArray(t) && t !== null))
						return wr(res, 400, err_json('JSON is not object', uid));
					if (t.uid && typeof t.uid === 'string')
						uid = t.uid;
				} catch (e) { return wr(res, 400, err_json('JSON is not valid', uid)); }
				
				return RAPI(t, (x)=>{
					x.uid = uid;
					wr(res, 200, JSON.stringify(x));
				});
			});
		}
		

		// Redirect root requests
		if (['/', '', '\\'].includes(req.url)) {
		  return res.writeHead(301, {"Location": "/login.html"}).end();
		}
		
		// Static file serving
		// Resolve file path safely
		const filePath = path.join(PROJECT_DIRECTORY, 'index', ...req.url.split('?')[0].split('/'));
		
		// Check if file exists
		if (!fs.lstatSync(filePath).isFile()) {
			return wr(res, 404, '404');
		}
		
		const ext = path.extname(filePath).toLowerCase();
		const mimeTypes = {
			'.pdf': 'application/pdf',
			'.mp4': 'video/mp4',
			'.avi': 'video/x-msvideo',
			'.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'.mp3': 'audio/mpeg',
			'.ico': 'image/x-icon',
			'.gif': 'image/gif',
			'.jpg': 'image/jpeg',
			'.jpeg': 'image/jpeg',
			'.bmp': 'image/bmp',
			'.png': 'image/png',
			'.css': 'text/css',
			'.kum': 'text/plain',
		};

		// Set Content-Type header
		res.setHeader('Content-Type', mimeTypes[ext] || 'text/html');

		// PDF handling
		if (ext === '.pdf') {
			res.setHeader('Content-Disposition', `inline; filename="${path.basename(filePath)}"`);
			const stream = fs.createReadStream(filePath);
			stream.pipe(res);
			return;
		}

		// Video handling (MP4/AVI)
		if (ext === '.mp4' || ext === '.avi') {
			const range = req.headers.range;
			if (!range) {
				const stream = fs.createReadStream(filePath);
				stream.pipe(res);
				return;
			}

			fs.stat(filePath, (err, stats) => {
				if (err) return wr(res, 500, 'Internal Server Error');
				
				const videoSize = stats.size;
				const CHUNK_SIZE = 10 ** 6; // 1MB
				const start = parseInt(range.replace(/\D/g, ''));
				const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
				const contentLength = end - start + 1;

				res.writeHead(206, {
					'Content-Range': `bytes ${start}-${end}/${videoSize}`,
					'Accept-Ranges': 'bytes',
					'Content-Length': contentLength
				});

				const videoStream = fs.createReadStream(filePath, { start, end });
				videoStream.pipe(res);
			});
			return;
		}

		// Text-based files
		if (['.css', '.txt', '.html', '.htm', '.js', '.xml', '.kum'].includes(ext)) {
			const stream = fs.createReadStream(filePath);
			stream.pipe(res);
			return;
		}

		// Default file handling
		const stream = fs.createReadStream(filePath);
		stream.pipe(res);
	} catch (error) {
		write('Request error: ' + error);
		try {
			wr(res,500, err_json('Server error', uid));
		} catch (e){}
	} finally {
		const duration = new Date() - startTime;
		write(`Request to ${req.url} took ${duration}ms`);
	}
});


function getBody(request, res, cb) {
	const bodyParts = [];

	request.on('error', (error) => {
		write(error);
		return wr(res, 400, 'POST error');
	})
	
	request.on('data', (chunk) => {
		bodyParts.push(chunk);
	})
	
	request.on('end', () => {
		const body = Buffer.concat(bodyParts).toString();
		cb(body);
	});
}

server.on('error', (error) => {
	if (error.code === 'EADDRINUSE') {
		write(`Port ${SERVER_PORT} already in use`);
		SERVER_PORT = SERVER_PORT - 1
		write(`Trying to restart the service on port ${SERVER_PORT}... `);
		if (SERVER_PORT !== 0) {
			setTimeout(() => server.listen(SERVER_PORT), 1000)
		} else {
			process.exit(1);
		}
	} else write(error);
});

server.on('upgrade', (req, socket) => {
	// Validate handshake
	if (!req.headers['upgrade'] || req.headers['upgrade'].toLowerCase() !== 'websocket') {
		socket.end('HTTP/1.1 400 Bad Request');
		return;
	}
	
	if (!req.headers['connection'] || req.headers['connection'].toLowerCase() !== 'upgrade') {
		socket.end('HTTP/1.1 400 Bad Request');
		return;
	}

	if (!req.headers['sec-websocket-key']) {
		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
		return;
	}
	
	// Compute accept key
	const acceptKey = crypto
		.createHash('sha1')
		.update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
		.digest('base64');

	// Write upgrade response
	const headers = [
		'HTTP/1.1 101 Switching Protocols',
		'Upgrade: websocket',
		'Connection: Upgrade',
		`Sec-WebSocket-Accept: ${acceptKey}`
	];
	socket.write(headers.join('\r\n') + '\r\n\r\n');

	// Initialize WebSocket state
	socket.buffer = Buffer.alloc(0);
	socket.frameState = {};
	socket.bufferMaxSize = 1e6; // 1MB
	socket.fragmentedBuffer = null;
	socket.fragmentedOpcode = null;

	socket.on('error', (err) => {
		write('Socket error: ' + err);
	});

	socket.on('data', (chunk) => {
		if (socket.buffer.length + chunk.length > socket.bufferMaxSize) {
			socket.destroy();
			return;
		}
		
		socket.buffer = Buffer.concat([socket.buffer, chunk]);
		
		while (socket.buffer.length > 0) {
			const result = parseFrame(socket.buffer, socket.frameState);
			
			if (result === null) break;
			
			const { frame, bytesConsumed } = result;
			socket.buffer = socket.buffer.subarray(bytesConsumed);
			socket.frameState = {}; // Reset state for next frame
			
			// Handle frame types
			if (frame.opcode === 0x8) { // Close
				socket.end();
				break;
			} else if (frame.opcode === 0x9) { // Ping
				sendPong(socket, frame.payload);
				continue;
			} else if (frame.opcode === 0xA) { // Pong
				continue; // Ignore pong frames
			}
			
			// Handle data frames (text/binary/continuation)
			if (frame.opcode === 0x1 || frame.opcode === 0x2) {
				if (frame.fin) {
					handleCompleteFrame(frame);
				} else {
					socket.fragmentedBuffer = frame.payload;
					socket.fragmentedOpcode = frame.opcode;
				}
			} else if (frame.opcode === 0x0) { // Continuation
				if (socket.fragmentedBuffer === null) {
					socket.destroy(); // Unexpected continuation frame
					return;
				}
				socket.fragmentedBuffer = Buffer.concat([socket.fragmentedBuffer, frame.payload]);
				if (frame.fin) {
					handleCompleteFrame({
						opcode: socket.fragmentedOpcode,
						payload: socket.fragmentedBuffer,
						fin: true
					});
					socket.fragmentedBuffer = null;
					socket.fragmentedOpcode = null;
				}
			}
		}
	});

	function handleCompleteFrame(frame) {
		if (frame.opcode === 0x1) {
			try {
				const message = frame.payload.toString('utf8');
				const data = JSON.parse(message);
				
				if (typeof data !== 'object' || data === null) {
					throw new Error('Invalid JSON format');
				}
				
				// Process message (replace with your logic)
				RAPI(data, (response) => {
					response.uid = data.uid;
					sendText(socket, JSON.stringify(response));
				});
			} catch (err) {
				try {
					write(err);
					sendText(socket, JSON.stringify({
						error: 'Invalid message format',
						uid: frame.uid
					}));
				} catch (err) {}
			}
		}
	}
});

// Frame parser function
function parseFrame(buffer, state) {
	let offset = state.offset || 0;
	
	if (buffer.length - offset < 2) return null;

	const byte1 = buffer.readUInt8(offset++);
	const byte2 = buffer.readUInt8(offset++);
	
	const fin = (byte1 & 0x80) !== 0;
	const opcode = byte1 & 0x0F;
	const masked = (byte2 & 0x80) !== 0;
	let payloadLength = byte2 & 0x7F;

	// Validate opcode
	if (opcode > 0x2 && opcode < 0x8) {
		write('Iopcode ' + opcode);
	}

	if (payloadLength === 126) {
		if (buffer.length - offset < 2) return null;
		payloadLength = buffer.readUInt16BE(offset);
		offset += 2;
	} else if (payloadLength === 127) {
		if (buffer.length - offset < 8) return null;
		payloadLength = Number(buffer.readBigUInt64BE(offset));
		offset += 8;
	}

	let maskingKey;
	if (masked) {
		if (buffer.length - offset < 4) return null;
		maskingKey = buffer.subarray(offset, offset + 4);
		offset += 4;
	}

	if (buffer.length - offset < payloadLength) return null;

	const payload = buffer.subarray(offset, offset + payloadLength);
	if (masked) {
		for (let i = 0; i < payload.length; i++) {
			payload[i] ^= maskingKey[i % 4];
		}
	}
	offset += payloadLength;

	return {
		frame: { opcode, payload, fin },
		bytesConsumed: offset,
		state: { offset }
	};
}


// Send Pong frame
function sendPong(socket, payload) {
	const frame = Buffer.alloc(2 + (payload.length || 0));
	frame.writeUInt8(0x8A, 0); // FIN + Pong opcode
	frame.writeUInt8(payload.length || 0, 1);
	if (payload) payload.copy(frame, 2);
	socket.write(frame);
}


// Send text frame
function sendText(socket, message) {
	const payload = Buffer.from(message, 'utf8');
	const payloadLength = payload.length;
	let headerLength = 2;  // Base header size
	let extraLengthBytes = 0;

	// Determine required payload length bytes
	if (payloadLength <= 125) {
		extraLengthBytes = 0;
	} else if (payloadLength <= 65535) {
		extraLengthBytes = 2;
		headerLength += extraLengthBytes;
	} else {
		extraLengthBytes = 8;
		headerLength += extraLengthBytes;
	}

	// Create frame buffer
	const frame = Buffer.alloc(headerLength + payloadLength);
	
	// Set FIN bit (0x80) and text opcode (0x01)
	frame.writeUInt8(0x81, 0);  // 0x81 = FIN + text frame
	
	// Write payload length and extended length
	let offset = 1;
	if (payloadLength <= 125) {
		frame.writeUInt8(payloadLength, offset++);
	} else if (payloadLength <= 65535) {
		frame.writeUInt8(126, offset++);
		frame.writeUInt16BE(payloadLength, offset);
		offset += 2;
	} else {
		frame.writeUInt8(127, offset++);
		frame.writeBigUInt64BE(BigInt(payloadLength), offset);
		offset += 8;
	}

	// Copy payload into frame
	payload.copy(frame, offset);
	
	socket.write(frame);
}

init(()=>{
	server.listen(SERVER_PORT, ()=>{
		write(`WebKumir v${VERSION} running at http://localhost:${SERVER_PORT}`);
		parentPort.postMessage('$run');
	});
});