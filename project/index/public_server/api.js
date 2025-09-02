
var frontend_demo = (typeof global == 'undefined');
var api_request_map={};

var all_data =    (frontend_demo ? window.all_data : global.all_data);
var static_data = (frontend_demo ? window.static_data : global.static_data);
var g_sha256 =    (frontend_demo ? window.MD5 : global.g_sha256); // kek
var write =       (frontend_demo ? console.log : global.write);

var __t = 0;
function uid_gen() {
	return ((+new Date())).toString(16).toUpperCase().padStart(16, '0') +
	(++__t % 16**8).toString(16).toUpperCase().padStart(8, '0') +
	Math.floor(Math.random()*(16**8)).toString(16).toUpperCase().padStart(8, '0');
}

function test_programm(programm, test) {
	let g = frontend_demo ? window : global;
	if (!g.$$RunKumir_try){
		if (!g.RunKumir_try) {
			eval(require('fs').readFileSync(require('path').join(__dirname, '..', 'js', 'kumir.js'), "utf8"));
			g.$$RunKumir_try = RunKumir_try;
			g.$$GetErrorKumir = ()=>ErrorKumir;
		} else {
			g.$$RunKumir_try = g.RunKumir_try;
			g.$$GetErrorKumir = ()=>g.ErrorKumir;
		}
	}
	
	if (!g.$$RunKumir_try){ write('Функция RunKumir_try не определена'); process.exit(1); }
	g.$$RunKumir_try('');
	if (g.$$GetErrorKumir().length<1){ write('Функция RunKumir_try не верно работает'); process.exit(1); }
	
	return test.map((x,i)=>{
			g.$$RunKumir_try(programm, JSON.stringify(x));
			return { test_number: i, errors: g.$$GetErrorKumir() };
		}).filter(x=>x.errors.length);
}


/*
	all_data ~= ({
		players: {
			// uhash = uid_gen()
			"uhash": {
				name: string,
				password: string, // sha256

				group: string,
				personage: [number, number, number, number, number, number],

				map_data: {
					"uid": {
						scores: number,
						dollars: ['0;0'],
						fine: number,
						programs: [],
						pos_x: number,
						pos_y: number,
						dors: {
							'0;0': number // isAccess
						}
					}
				}
			}
		},
		
		
		turnirs: {
			"uid": {
				"project": "Линейные алгоритмы",
				"owner": "admin",
				"display_name": "Линейные алгоритмы",
				"string_freeze": "",
				"time_start": 1640984400,
				"time_freeze": 1956340800,
				"time_end": 1956344400,
				"group": ['']
			},
		},
		
		// token - random string by uid_gen()
		// If user take correct login and password, they take token and this property get record
		token2uhash: {
			// "23123123123": {name: 'username', request_timestamps: [+new Date()]}
		}
	});
	
	static_data ~= ({
		projects: {
			"uid": {
				name: "123",
				map: {},
				tasks: []
			}
		},
		
		
		// group
		group2permissions: {
			'': ['LOGIN', 'REGISTERING'],
			'u': ['LOGIN', 'REGISTERING', 'USER', 'SEND_PROGRAM'],
			'a': static_data.api_info.all_permissions.map(x=>x)
		},
		
		api_info: {
			default_group: 'u',
			all_permissions: ["LOGIN","REGISTERING","USER","SEND_PROGRAM","ADMIN","NOT_DISPLAY_ON_TOP","ACCESSES_ALL_TASKS","RAINBOW_NICKNAME","NOT_GET_COIN"]
		}
		
		// set true if this object was changed
		updated: false
	});
*/

function new_player(name, sha256_password){
	return {
		name: name,
		password: sha256_password,

		group: static_data.api_info.default_group,
		personage: [68, 1, 1, 16, 6, 1],

		map_data: {}
	}
}

const objectCache = new WeakMap();
function findKeyByNameCached(obj, search_name) {
	if (!obj || typeof search_name !== 'string') {
		return undefined;
	}

	let cache = objectCache.get(obj);
	if (!cache) {
		cache = new Map();
		objectCache.set(obj, cache);
	}

	if (cache.has(search_name)) {
		const cachedKey = cache.get(search_name);
		if (cachedKey && obj.hasOwnProperty(cachedKey) && obj[cachedKey] && obj[cachedKey].name === search_name)
			return cachedKey;
		cache.delete(search_name);
	}

	for (const [key, value] of Object.entries(obj)) {
		if (value && value.name === search_name) {
			cache.set(search_name, key);
			return key;
		}
	}

	return undefined;
}


api_request_map['is_registration_enabled_permission'] = 'LOGIN';
api_request_map['is_registration_enabled'] = (_user, _data, resolve, _reject) => {
	resolve(static_data.group2permissions[''].includes("REGISTERING"));
};

api_request_map['login_permission'] = 'LOGIN';
api_request_map['login'] = (_user, data, resolve, reject) => {
	let { name, password } = data;
	name = name.replace(/\s+/g, ' ').trim();
	password = password.replace(/\s+/g, ' ').trim();
	const uhash = findKeyByNameCached(all_data.players, name);
	
	if (uhash && all_data.players[uhash].password == g_sha256(password)) {
		const token = uid_gen();
		all_data.token2uhash[token] = { uhash, request_timestamps: [+new Date()] };
		all_data.updated = true;
		resolve(token);
	} else {
		reject('Name or password is incorrect!');
	}
};

api_request_map['registering_permission'] = 'REGISTERING';
api_request_map['registering'] = (_user, data, resolve, reject) => {
	let {name, password} = data;
	name = name.replace(/\s+/g, ' ').trim();
	password = password.replace(/\s+/g, ' ').trim();
	
	
	for (var i = 0; i < password.length; i++)
		if (!('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@()[]:-'.indexOf(password[i]) + 1))
			return reject('Поле с паролем содержит запрещёную букву (' + password[i] + ')');
	for (var i = 0; i < name.length; i++)
		if (!('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789. '.indexOf(name[i]) + 1))
			return reject('Поле с именим содержит запрещёную букву (' + name[i] + ')');
	
	
	if (password.length < 3)
		return reject('Поле с паролем содержит слишком мало букв');
	if (password.length >= 32)
		return reject('Поле с паролем содержит слишком много букв');
	
	
	if (name.length < 3)
		return reject('Поле с именим содержит слишком мало букв');
	if (name.length >= 256)
		return reject('Поле с именим содержит слишком много букв');

	if (findKeyByNameCached(all_data.players,name)) return reject('Пользователь с таким именем уже есть')
	
	all_data.players[uid_gen()] = new_player(name, g_sha256(password));
	all_data.updated = true;
	
	resolve(1);
}





function user_have_permission_for_turnir(user, turnir, use_time_end) {
	var now = Date.now() / 1000;
	
	var groupOk = turnir.group.length === 0 || 
			turnir.group.indexOf(user.group) !== -1;

	var status = "OK";
	if (!groupOk) return false;
	else if (now < turnir.time_start) return false;
	else if (use_time_end && now > turnir.time_end) return false;
	
	return true;
}

function user_get_turnir_map_data(user, turnir_uid) {
	if (!user.map_data[turnir_uid]) {
		user.map_data[turnir_uid] = {
			scores: 0,
			dollars: {},
			fine: 0,
			programs: [],
			pos_x: 0,
			pos_y: 0,
			dors: {}
		};
		
		
		
		if (user.req.permissions.includes(api_request_map['_is_take_auto_accesses_on_tasks_permission'])) {
			const turnir = all_data.turnirs[turnir_uid];
			if (!turnir) return;
			if (!user_have_permission_for_turnir(user, turnir)) return;
			const project = static_data.projects[turnir.project];
			if (!project) return;
			const map = project.map;
			if (!map) return;
			
			for (const road of [...map.RVs,...map.RHs])
				if (typeof road.dor == 'string' && road.dor.startsWith('task:')) {
					const task = road.dor.slice(5);
					user.map_data[turnir_uid].dors[task] = 1;
				}
		}
		
		all_data.updated = true;
	}
	return user.map_data[turnir_uid];
}




api_request_map['ping_permission'] = 'USER';
api_request_map['ping'] = (user, _data, resolve, _reject) => {
	resolve('pong');
}


api_request_map['server_list_permission'] = 'USER';
api_request_map['server_list'] = (user, _data, resolve, _reject) => {
	var result = [];
	var now = Date.now() / 1000; // Текущее время в секундах
	
	for (var uid in all_data.turnirs) {
		if (all_data.turnirs.hasOwnProperty(uid)) {
			var turnir = all_data.turnirs[uid];
			var groupOk = turnir.group.length === 0 || 
					turnir.group.indexOf(user.group) !== -1;
			
			var status = "OK";
			if (!groupOk) continue; // ?
			else if (now < turnir.time_start) status = "NOT STARTED";
			else if (now > turnir.time_end) status = "END";
			
			result.push({
				uid: uid,
				name: turnir.display_name,
				status: status,
				time_start: turnir.time_start,
				time_start_diff: turnir.time_start*1000-(Date.now()),
				duration: turnir.time_end - turnir.time_start
			});
		}
	}
	resolve(result);
}

function task_solved(map_data, task_name) {
	return map_data.programs.filter(x=>x.task_name == task_name && x.value == 1).length;
}
function isPointOnMap(map_data, map, x, y) {
	
	function isInRoom(room) {
		return x >= room.x1 && x <= room.x2 && y >= room.y1 && y <= room.y2;
	}

	function isOnHorizontalRoad(road) {
		if (typeof road.dor == 'string' && road.dor.startsWith('task:')) {
			const mid = Math.floor((road.x1 + road.x2)/2);
			if (Math.abs(x - mid) <= 1 && y === road.y) {
				const task = road.dor.slice(5);
				if (!map_data.dors[task])
					map_data.dors[task] = 1;
				if (map_data.dors[task]<2) {
					if (task_solved(map_data, task)) map_data.dors[task] = 2;
					else if (x == mid) return false;
				}
			}
		}
		return y === road.y && x >= road.x1 && x <= road.x2;
	}

	function isOnVerticalRoad(road) {
		if (typeof road.dor == 'string' && road.dor.startsWith('task:')) {
			const mid = Math.floor((road.y1 + road.y2)/2);
			if (Math.abs(y - mid) <= 1 && x === road.x) {
				const task = road.dor.slice(5);
				if (!map_data.dors[task])
					map_data.dors[task] = 1;
				if (map_data.dors[task]<2) {
					if (task_solved(map_data, task)) map_data.dors[task] = 2;
					else if (y == mid) return false;
				}
			}
		}
		return x === road.x && y >= road.y1 && y <= road.y2;
	}

	for (const room of map.ROOMs) {
		if (isInRoom(room)) {
			return true;
		}
	}

	for (const road of map.RHs) {
		if (isOnHorizontalRoad(road)) {
			return true;
		}
	}

	for (const road of map.RVs) {
		if (isOnVerticalRoad(road)) {
			return true;
		}
	}
	
	return false;
}




api_request_map['get_map_permission'] = 'USER';
api_request_map['get_map'] = (user, data, resolve, reject) => {
	
	const turnir_uid = user.req.turnir;
	if (!turnir_uid) return reject("turnir_uid == false");
	
	const turnir = all_data.turnirs[turnir_uid];
	if (!turnir) return reject("Turnir not found");
	if (!user_have_permission_for_turnir(user, turnir)) return reject("403");
	const user_map_data = user_get_turnir_map_data(user, turnir_uid);
	
	const project = static_data.projects[turnir.project];
	if (!project) return reject("Project not found");
	
	const map = project.map;
	if (!map) return reject("map not found");
	
	const nRVs = [];
	for (const road of map.RVs) {
		let solved = false;
		if (typeof road.dor == 'string' && road.dor.startsWith('task:')) {
			const task = road.dor.slice(5);
			if (user_map_data.dors[task]) {
				if (user_map_data.dors[task]==2) solved = true; // optimisation
				else if (task_solved(user_map_data, task)) solved = true;
			}
		}
		if (solved)
			nRVs.push({ ...road, dor: road.dor.replace('task:', 'solved_task:') });
		else
			nRVs.push(road);
	}
	
	const nRHs = [];
	for (const road of map.RHs) {
		let solved = false;
		if (typeof road.dor == 'string' && road.dor.startsWith('task:')) {
			const task = road.dor.slice(5);
			if (user_map_data.dors[task]) {
				if (user_map_data.dors[task]==2) solved = true; // optimisation
				else if (task_solved(user_map_data, task)) solved = true;
			}
		}
		
		if (solved)
			nRHs.push({ ...road, dor: road.dor.replace('task:', 'solved_task:') });
		else
			nRHs.push(road);
	}
	
	const nDs = [];
	for (const dollar of map.Ds) {
		const probability = dollar.probability || 0;
		if ( probability == 0 ) {
			if ( !Object.values(all_data.players).map(x=>x.map_data[turnir_uid]).filter(x=>x).some(map_data=>map_data.dollars[dollar.x+';'+dollar.y] === 2) )
				nDs.push(dollar);
		} else if (!user_map_data.dollars[dollar.x+';'+dollar.y]) {
			nDs.push(dollar);
		}
	}
	
	
	resolve({ ...map, RHs: nRHs, RVs: nRVs, Ds: nDs});
};


api_request_map['get_positions_permission'] = 'USER';
api_request_map['get_positions'] = (user, data, resolve, reject) => {
	
	const turnir_uid = user.req.turnir;
	if (!turnir_uid) return reject("turnir_uid == false");
	
	const turnir = all_data.turnirs[turnir_uid];
	if (!turnir) return reject("Turnir not found");
	if (!user_have_permission_for_turnir(user, turnir)) return reject("403");
	const user_map_data = user_get_turnir_map_data(user, turnir_uid);
	
	resolve(Object.values(all_data.players).map(x=>[x,x.map_data[turnir_uid]]).filter(x=>x[1]).map(x=>({
		name: x[0].name,
		is_current_user: user==x[0],
		is_admin: static_data.group2permissions[x[0].group].includes(api_request_map['_is_have_rainbow_nickname_permission']),
		pos_x: x[1].pos_x,
		pos_y: x[1].pos_y,
		personage: x[0].personage
	})));
};


api_request_map['get_coin_permission'] = 'USER';
api_request_map['get_coin'] = (user, data, resolve, reject) => {
	if (static_data.group2permissions[user.group].includes(api_request_map['_is_cant_get_coin_permission'])) {
		return resolve({probability: 1, res: 1});
	}
	
	
	const turnir_uid = user.req.turnir;
	if (!turnir_uid) return reject("turnir_uid == false");
	
	const turnir = all_data.turnirs[turnir_uid];
	if (!turnir) return reject("Turnir not found");
	if (!user_have_permission_for_turnir(user, turnir)) return reject("403");
	const user_map_data = user_get_turnir_map_data(user, turnir_uid);
	
	const project = static_data.projects[turnir.project];
	if (!project) return reject("Project not found");
	
	const map = project.map;
	if (!map) return reject("map not found");
	
	let x = user_map_data.pos_x;
	let y = user_map_data.pos_y;
	
	for (const dollar of map.Ds) {
		if (x==dollar.x && y==dollar.y && !user_map_data.dollars[x+';'+y]) {
			const init_probability = dollar.init_probability || 1;
			const probability = dollar.probability || 0;
			const count = Object.values(all_data.players).map(x=>x.map_data[turnir_uid]).filter(x=>x).reduce((cnt, map_data)=>map_data.dollars[dollar.x+';'+dollar.y] ?cnt+1:cnt,0);
			all_data.updated = true;
			if ( probability == 0 ) {
				if ( ! count ) {
					user_map_data.dollars[x+';'+y] = 2;
					return resolve({probability: 1, res: 2});
				}
			} else {
				if (init_probability*(probability**count)>Math.random()) {
					user_map_data.dollars[x+';'+y] = 2;
					return resolve({probability: init_probability*(probability**count), res: 2});
				} else {
					user_map_data.dollars[x+';'+y] = 1;
					return resolve({probability: init_probability*(probability**count), res: 1});
				}
			}
		}
	}
	return reject("403");
}

api_request_map['move_permission'] = 'USER';
api_request_map['move'] = (user, data, resolve, reject) => {
	
	const turnir_uid = user.req.turnir;
	if (!turnir_uid) return reject("turnir_uid == false");
	
	const turnir = all_data.turnirs[turnir_uid];
	if (!turnir) return reject("Turnir not found");
	if (!user_have_permission_for_turnir(user, turnir)) return reject("403");
	const user_map_data = user_get_turnir_map_data(user, turnir_uid);
	
	const project = static_data.projects[turnir.project];
	if (!project) return reject("Project not found");
	
	const map = project.map;
	if (!map) return reject("map not found");
	
	let x = user_map_data.pos_x;
	let y = user_map_data.pos_y;
	
	x+={left:-1, right:1}[data]||0;
	y+={up:-1, down:1}[data]||0;
	
	if (isPointOnMap(user_map_data, map, x, y)) {
		user_map_data.pos_x = x;
		user_map_data.pos_y = y;
		
		return resolve(true);
	}
	return resolve(false);
	
};

api_request_map['get_programs_permission'] = 'USER';
api_request_map['get_programs'] = (user, data, resolve, reject) => {
	const task_name = data;
	
	const turnir_uid = user.req.turnir;
	if (!turnir_uid) return reject("turnir_uid == false");
	
	const turnir = all_data.turnirs[turnir_uid];
	if (!turnir) return reject("Turnir not found");
	if (!user_have_permission_for_turnir(user, turnir)) return reject("403 - turnir access");
	
	const user_map_data = user_get_turnir_map_data(user, turnir_uid);
	if (!user_map_data.dors[task_name])  return reject("403 - task access");
	
	resolve(user_map_data.programs.filter(x=>x.task_name == task_name).map((x,i)=>({
		N: i+1,
		send_time: x.send_time,
		programm: x.programm,
		value: x.value
	})).sort((x,y)=>y.send_time-x.send_time))
	
}
api_request_map['get_task_permission'] = 'USER';
api_request_map['get_task'] = (user, data, resolve, reject) => {
	const task_name = data;
	
	const turnir_uid = user.req.turnir;
	if (!turnir_uid) return reject("turnir_uid == false");
	
	const turnir = all_data.turnirs[turnir_uid];
	if (!turnir) return reject("Turnir not found");
	if (!user_have_permission_for_turnir(user, turnir)) return reject("403 - turnir access");
	
	const user_map_data = user_get_turnir_map_data(user, turnir_uid);
	if (!user_map_data.dors[task_name])  return reject("403 - task access");
	
	const project = static_data.projects[turnir.project];
	if (!project) return reject("Project not found");
	
	const task = project.tasks.filter(x=>x.name == task_name)[0];
	if (!task) return reject("Task not found");
	
	const tabs = [];
	
	tabs.push({type: "text", name: "Условие", text: task.condition} );
	task.tests.map((x, i)=>{
		if (!x.is_secret)
			tabs.push({type: "fil", name: "Тест "+(i+1), value: JSON.stringify({fil: x.fil, input: x.input, expected_output: x.expected_output})});
		else
			tabs.push({type: "text", name: "Тест "+(i+1), text: '<i>~Засекреченый тест~</i>'});
	});
	tabs.push({type: "load", name: "Отправить"});
	tabs.push({type: "site", url: './top.html', name: "Рейтинг"});
	
	resolve({ default_program: task.default_program, tabs });
}

api_request_map['get_top_permission'] = 'USER';
api_request_map['get_top'] = (user, data, resolve, reject) => {
	const turnir_uid = user.req.turnir;
	if (!turnir_uid) return reject("turnir_uid == false");
	
	const turnir = all_data.turnirs[turnir_uid];
	if (!turnir) return reject("Turnir not found");
	if (!user_have_permission_for_turnir(user, turnir)) return reject("403 - turnir access");
	
	const user_map_data = user_get_turnir_map_data(user, turnir_uid);
	
	const project = static_data.projects[turnir.project];
	if (!project) return reject("Project not found");
	
	const task_names = project.tasks.map(x=>x.name);
	const users = Object.keys(all_data.players).map(x=>all_data.players[x]).filter(x=>
		x.map_data[turnir_uid] &&
		(!static_data.group2permissions[x.group].includes(api_request_map['_is_not_display_on_top_permission']) || 
		user.req.permissions.includes(api_request_map['_is_not_display_on_top_permission'])));
	
	function get_data_by_user(user_map_data_2) {
		let data = {score: 0, fine: 0, tasks: task_names.map(x=>0)}
		user_map_data_2.programs.filter(x=>x.value == 1).map(x=>{
			if (data.tasks[task_names.indexOf(x.task_name)] != 100) {
				data.tasks[task_names.indexOf(x.task_name)] = 100;
				data.fine += Math.floor((x.send_time/1000 - turnir.time_start)/10);
			}
		});
		data.score=data.tasks.reduce((x,y)=>x+y,0)+Object.values(user_map_data_2.dollars).filter(x=>x>1).length;
		return data;
	}
	
	if (turnir.time_freeze<(+new Date())/1000) {
		let data = {};
		
		if (!turnir.freeze_data) {
			turnir.freeze_data = {};
		}
		
		users.map(x=>{
			if (!turnir.freeze_data[x.name])
				turnir.freeze_data[x.name] = get_data_by_user(x.map_data[turnir_uid]);
		});
		data = { ...turnir.freeze_data, [user.name]: get_data_by_user(user_map_data)};
		
		data[user.name].this_user = true;
		
		resolve({
			freeze: true,
			accesses: Object.keys(user_map_data.dors).filter(x=>user_map_data.dors[x]>0),
			task_names,
			data});
	}else {
		let data = {};
		
		users.map(x=>data[x.name] = get_data_by_user(x.map_data[turnir_uid]));
		
		data[user.name].this_user = true;
		
		resolve({freeze: false,
			accesses: Object.keys(user_map_data.dors).filter(x=>user_map_data.dors[x]>0),
			task_names,
			data});
	}
}

api_request_map['edit_personage_permission'] = 'USER';
api_request_map['edit_personage'] = (user, data, resolve, reject) => {
	if (!Array.isArray(data)) reject('edit_personage data not array');
	if (data.length!=6) reject('data.length!=6');
	user.personage = data;
	all_data.updated = true;
	resolve('OK');
}

api_request_map['send_program_permission'] = 'SEND_PROGRAM';
api_request_map['send_program'] = (user, data, resolve, reject) => {
	const task_name = data.task_name;
	const programm = data.programm;
	
	if (!task_name) return reject("task_name null");
	if (!programm) return reject("Программа пустая!");
	
	const turnir_uid = user.req.turnir;
	if (!turnir_uid) return reject("turnir_uid == false");
	
	const turnir = all_data.turnirs[turnir_uid];
	if (!turnir) return reject("Turnir not found");
	if (!user_have_permission_for_turnir(user, turnir, true)) return reject("Турнир завершён");
	
	const user_map_data = user_get_turnir_map_data(user, turnir_uid);
	if (!user_map_data.dors[task_name])  return reject("403 - task access");
	
	const project = static_data.projects[turnir.project];
	if (!project) return reject("Project not found");
	
	const task = project.tasks.filter(x=>x.name == task_name)[0];
	if (!task) return reject("Task not found");
	
	// DDOS
	if (user_map_data.programs.map(x=>x.send_time).some(x=>x>new Date()-5000)) return reject("Попробуйте ещё раз");
	if (task_solved(user_map_data, task_name)) return reject("Эта задача уже решена");
	if (user_map_data.programs.length && programm == user_map_data.programs[user_map_data.programs.length-1].programm) return reject("Вы уже отправляли такое решение");
	
	if (task.length_check && (programm.replace(/[\s]/g, '').length > task.solution.replace(/[\s]/g, '').length * 2.2)) return reject("Решение содержит слишком много команд!");
	
	let res = test_programm(programm, task.tests);
	
	user_map_data.programs.push({
		send_time: +new Date(),
		task_name,
		programm,
		error: res,
		value: 1 - res.length / task.tests.length
	});
	all_data.updated = true;
	resolve('OK');
}


api_request_map['test_projects_permission'] = 'ADMIN';
api_request_map['test_projects'] = (user, data, resolve, reject) => {
	const project = static_data.projects[data];
	if (!project) return reject("Project not found");
	
	return resolve(project.tasks.map(task=>{
		return task.tests.map(x=>{
			return test_programm(task.solution, [x]).length == 0;
		});
	}));
}

api_request_map['retest_permission'] = 'ADMIN';
api_request_map['retest'] = (user, data, resolve, reject) => {
	const task_name = data;
	let count = 0;
	
	function programm_retest(program_data, task) {
		if (!program_data || program_data.task_name != task_name) return;
		const res = test_programm(program_data.programm, task.tests);
		
		program_data.error = res;
		program_data.value = 1 - res.length / task.tests.length;
		count++;
	}
	
	for (var turnir_uid in all_data.turnirs) {
		if (all_data.turnirs.hasOwnProperty(turnir_uid)) {
			
			const turnir = all_data.turnirs[turnir_uid];
			if (!turnir) continue;
			
			const project = static_data.projects[turnir.project];
			if (!project) continue;
			
			const task = project.tasks.filter(x=>x.name == task_name)[0];
			if (!task) continue;
			
			Object.values(all_data.players).map(x=>{
				if (x.map_data[turnir_uid])
					x.map_data[turnir_uid].programs.map((p)=>programm_retest(p,task));
			});
		}
	}
	
	if (count) all_data.updated = true;
	resolve(count);
}

api_request_map['get_user_map_data_permission'] = 'ADMIN';
api_request_map['get_user_map_data'] = (user, data, resolve, reject) => {
	const turnir_uid = data;
	if (!turnir_uid) return resolve([]);
	
	resolve(Object.keys(all_data.players).map(x=>({
		name: all_data.players[x].name,
		group: all_data.players[x].group,
		map_data: all_data.players[x].map_data[turnir_uid]
	})).filter(x=>x.map_data));
}

api_request_map['admin_edit_permission'] = 'ADMIN';
api_request_map['admin_edit'] = (_user, data, resolve, reject) => {
	var path = data.path;
	var method = data.method;
	var obj = (data.obj == 'all_data'? all_data:
				(data.obj == 'static_data'?static_data:null));
	
	if (method=='set' || method=='delete') {
		var value = method=='delete'?undefined:data.value;
		var parts = path.split(';');
		var current = obj;
		for (var i = 0; i < parts.length - 1; i++) {
			var key = parts[i];
			if (current[key] === undefined) {
				return reject('current[key] === undefined');
			} else if (
				current[key] === null || 
				(typeof current[key] !== 'object')
			) {
				return reject('current[key] === null');
			}
			current = current[key];
		}
		
		var lastKey = parts[parts.length - 1];
		if (method=='delete') {
			if (Array.isArray(current)) current.splice(+lastKey,1);
			else delete current[lastKey];
		} else current[lastKey] = value;
		
		obj.updated = true;
		return resolve('OK');
	} else if (method=='get') {
		if (path)
			for (var i=0, path=path.split(';'), len=path.length; i<len; i++){
				obj = obj[path[i]];
			}
		return resolve(obj);
	}
	
}

api_request_map['_is_not_display_on_top_permission'] = 'NOT_DISPLAY_ON_TOP';
api_request_map['_is_take_auto_accesses_on_tasks_permission'] = 'ACCESSES_ALL_TASKS';
api_request_map['_is_have_rainbow_nickname_permission'] = 'RAINBOW_NICKNAME';
api_request_map['_is_cant_get_coin_permission'] = 'NOT_GET_COIN';


(frontend_demo ? window : global).all_api = ({
	init: (settings)=>{
		static_data.api_info = ({
			default_group: 'Пользователи',
			default_admin_group: 'Администраторы',
			all_permissions: Object.keys(api_request_map).map(x=>x.includes('_permission')?api_request_map[x]:'').filter(x=>x).filter((x, i, a)=>a.indexOf(x) == i)
		});
		test_programm('', []);
		
		const uhash_admin = findKeyByNameCached(all_data.players, settings.admin_login);
		
		if (uhash_admin) {
			all_data.players[uhash_admin].password = g_sha256(settings.admin_password);
		} else {
			all_data.players[uid_gen()] = new_player(settings.admin_login, g_sha256(settings.admin_password));
		}
		
		all_data.players[uhash_admin].group = static_data.api_info.default_admin_group;
		
		if (!static_data.group2permissions[static_data.api_info.default_group] ||
			!static_data.group2permissions[static_data.api_info.default_admin_group] ||
			!static_data.group2permissions[static_data.api_info.default_admin_group].includes("ADMIN")) {
			static_data.group2permissions[''] = ['LOGIN', 'REGISTERING'];
			static_data.group2permissions[static_data.api_info.default_group] = ['LOGIN', 'REGISTERING', 'USER', 'SEND_PROGRAM'];
			static_data.group2permissions[static_data.api_info.default_admin_group] = static_data.api_info.all_permissions.map(x=>x);
		}
	},
	do_request: (obj, callback)=>{
		try {
			if (!(obj.command && typeof obj.command == 'string'))
				callback({error:'obj.command is undefined!'});
			
			else if (!api_request_map[obj.command] || !api_request_map[obj.command+'_permission'])
				callback({error:'Command "'+obj.command+'" is undefined!'});
			
			else if (obj.data===undefined)
				callback({error:'obj.data is undefined!'});
			
			else if (typeof obj.token == 'string' && obj.token && !all_data.token2uhash[obj.token] ) {
				callback({error:'Token expired!'});
				
			} else if (typeof obj.token == 'string' && obj.token && all_data.token2uhash[obj.token]) {
				const token_info = all_data.token2uhash[obj.token];
				
				while (token_info.request_timestamps.length && token_info.request_timestamps[0] < +new Date() - 10000)
					token_info.request_timestamps.shift();
				token_info.request_timestamps.push(+new Date());
				
				if (token_info.request_timestamps.length>50) {
					delete all_data.token2uhash[obj.token];
					callback({error:'Request limit exceeded. Token revoked.'});
					return;
				}
				
				const player = all_data.players[token_info.uhash];
				if (!player) return callback({error:'User not found!'});
				const permissions = static_data.group2permissions[player.group];
				
				player.req = {token: obj.token, turnir: obj.turnir, permissions: permissions}
				
				if (permissions.includes(api_request_map[obj.command+'_permission']))
					api_request_map[obj.command](player, obj.data, (v)=>callback({error:'', data:v}), (v)=>typeof v == "string"?callback({error:v, apiError: true}):callback({error:JSON.stringify(v), apiError: true}));
				else
					callback({error:'Access Denied!'});
				
				player.req = null;
			} else {
				if (static_data.group2permissions[''].includes(api_request_map[obj.command+'_permission']))
					api_request_map[obj.command](null, obj.data, (v)=>callback({error:'', data:v}), (v)=>typeof v == "string"?callback({error:v, apiError: true}):callback({error:JSON.stringify(v), apiError: true}));
				else
					callback({error:'Access Denied!'});
			}
		} catch(e) {
			try {
				write('Error: ' + e + ' ' + e.stack);
				callback({error:'Error: '+e});
			}catch(e) {}
		}
	}
});
