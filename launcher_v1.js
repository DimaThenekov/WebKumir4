const fs = require('fs');
const TMP_DIRECTORY =  __dirname + '/tmp';
let settings = {};

try {
	if (!fs.existsSync(__dirname+'/settings.json')) { console.log("settings.json not exists"); process.exit(1); }
	settings = JSON.parse(fs.readFileSync(__dirname+'/settings.json'));
	// TODO validate json
	// TODO add log file
} catch (e) { console.log('Parse settings.json error: '+e.message); process.exit(1); }

let projects = {};

let continue_closing;

function close_all_projects(n, callback) {
	n--;
	if (n<0) return callback();
	continue_closing = ()=>{close_all_projects(n, callback)};
	try{
		projects[Object.keys(projects)[n]].worker.postMessage('close');
		projects[Object.keys(projects)[n]].worker=undefined;
	} catch{
		continue_closing();
	}
}
function save_all_and_close() {
	close_all_projects(Object.keys(projects).length, ()=>{console.log('all stopped'); process.exit(1); });
}

process.on('exit', function () { });

// catching signals and do something before exit
['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
    'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
].forEach(function (sig) {
    process.on(sig, function () {
		save_all_and_close();
    });
});

function parse_ini_string(data){
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/[\r\n]+/);
    var section = null;
    lines.forEach(function(line){
        if(regex.comment.test(line)){
            return;
        }else if(regex.param.test(line)){
            var match = line.match(regex.param);
            if(section){
                value[section][match[1]] = match[2];
            }else{
                value[match[1]] = match[2];
            }
        }else if(regex.section.test(line)){
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        }else if(line.length == 0 && section){
            section = null;
        };
    });
    return value;
}
function range(n) { return (new Array(n).fill(0).map((x,i)=>i)); }
const crypto = require('crypto');
const md5 = data => crypto.createHash('md5').update(data).digest("hex");

function ini_to_json(text, maps, projs) {
	const ini = parse_ini_string(text);
	//fs.writeFileSync('tmp.json', JSON.stringify(ini, null, 2));
	let exit = { players: {}, turnirs: {} };
	return exit;
	range(+ini.RunProjects.count).map(x=>{
		let p_obj = ini['RunProjects:'+x];
		if (!Object.keys(projs)[+p_obj.parentInd]) return
		
		exit.turnirs[p_obj.uniID] = {};
		exit.turnirs[p_obj.uniID].project = Object.keys(projs)[+p_obj.parentInd];
		exit.turnirs[p_obj.uniID].owner = ini['Player:0'].login||'admin';
		exit.turnirs[p_obj.uniID].display_name = p_obj.visib_name;
		exit.turnirs[p_obj.uniID].string_freeze = p_obj.string_freeze;
		exit.turnirs[p_obj.uniID].time_start = p_obj.time_start;
		exit.turnirs[p_obj.uniID].time_start = p_obj.time_start;
		exit.turnirs[p_obj.uniID].time_freeze = p_obj.time_freeze;
		exit.turnirs[p_obj.uniID].time_end = p_obj.time_end;
		exit.turnirs[p_obj.uniID].group = p_obj.group;
	});
	
	let try_coordinate_to_task = (id, t) => { //TODO
		if(!exit.turnirs[id])return;
		if(!projs[exit.turnirs[id].project])return;
		if(!maps[projs[exit.turnirs[id].project].map.split('.')[0]])return;
		let s = maps[projs[exit.turnirs[id].project].map.split('.')[0]];
		let hd = [...s.matchAll(/(?<=#)[0-9A-F](?=#)/g)].map(x=>x[0]);
		let vd = [...s.matchAll(/(?<!#)[0-9A-F](?!#)/g)].map(x=>x[0]);
		//console.log(hd.length,vd.length);
		if (t%2==0) {
			if (!hd[t>>1])return;
			if (!projs[exit.turnirs[id].project].colors[hd[t>>1]])return;
			return projs[exit.turnirs[id].project].colors[hd[t>>1]];
		} else {
			if (!vd[t>>1])return;
			if (!projs[exit.turnirs[id].project].colors[vd[t>>1]])return;
			return projs[exit.turnirs[id].project].colors[vd[t>>1]];
		}
	}
	
	let try_num_to_coordinate = (id, t) => { //TODO
		if(!exit.turnirs[id])return;
		if(!projs[exit.turnirs[id].project])return;
		if(!maps[projs[exit.turnirs[id].project].map.split('.')[0]])return;
		let s = maps[projs[exit.turnirs[id].project].map.split('.')[0]];
		let center = [0,0];
		let dollars = [];
		s.split('\n').map((line,y)=>{
			line.split('').map((chr,x)=>{
				if (chr=='@') center = [x,y];
				else if (chr=='$') dollars.push([x,y]);
			});
		});
		
		return dollars.map(x=>[x[0]-center[0],x[1]-center[1]]).map(x=>x[0]+';'+x[1])[t];
	}
	
	let try_num_to_task = (id, t) => { //TODO
		if(!exit.turnirs[id])return;
		if(!projs[exit.turnirs[id].project])return;
		let cl = projs[exit.turnirs[id].project].colors;
		return cl[Object.keys(cl)[t]];
	}
	
	range(+ini.Players.count).map(x=>{
		let p_obj = ini['Player:'+x];
		exit.players[p_obj.login] = {};
		exit.players[p_obj.login].name = p_obj.name;
		exit.players[p_obj.login].password = md5(p_obj.password);
		exit.players[p_obj.login].is_admin = !!+p_obj.isAdmin;
		exit.players[p_obj.login].personage = {};
		exit.players[p_obj.login].personage.skin = +p_obj.personage_skin;
		exit.players[p_obj.login].personage.hairstyle = +p_obj.personage_hairstyle;
		exit.players[p_obj.login].personage.eye = +p_obj.personage_eye;
		exit.players[p_obj.login].personage.shirt = +p_obj.personage_shirt;
		exit.players[p_obj.login].personage.pants = +p_obj.personage_pants;
		exit.players[p_obj.login].personage.footwear = +p_obj.personage_footwear;
		
		exit.players[p_obj.login].map_data = {};
		range(+p_obj.isaccess_count).map(x=>{
			let id = p_obj['isaccess:'+x+':uniID'];
			if (!exit.players[p_obj.login].map_data[id]) exit.players[p_obj.login].map_data[id]={"pos_x": 0, "pos_y": 0, "accesses": [], "dors": [], "dollars": [], "programms": []};
			
			let w = try_coordinate_to_task(id,+p_obj['isaccess:'+x+':pos']);
			if (w)exit.players[p_obj.login].map_data[id].accesses.push(w);
		});
		
		range(+p_obj.dor_count).map(x=>{
			let id = p_obj['dors:'+x+':uniID'];
			if (!exit.players[p_obj.login].map_data[id]) exit.players[p_obj.login].map_data[id]={"pos_x": 0, "pos_y": 0, "accesses": [], "dors": [], "dollars": [], "programms": []};
			
			let w = try_coordinate_to_task(id,+p_obj['dors:'+x+':pos']);
			if (w)exit.players[p_obj.login].map_data[id].dors.push(w);
		});
		
		range(+p_obj.dollars).map(x=>{
			let id = p_obj['dollar:'+x+':uniID'];
			if (!exit.players[p_obj.login].map_data[id]) exit.players[p_obj.login].map_data[id]={"pos_x": 0, "pos_y": 0, "accesses": [], "dors": [], "dollars": [], "programms": []};
			
			let w = try_num_to_coordinate(id,+p_obj['dors:'+x+':pos']);
			if (w)exit.players[p_obj.login].map_data[id].dollars.push(w);
		});
		
		range(+p_obj.programm_num).map(x=>{
			let id = p_obj['programm_'+x+'_uniID'];
			if (!exit.players[p_obj.login].map_data[id]) exit.players[p_obj.login].map_data[id]={"pos_x": 0, "pos_y": 0, "accesses": [], "dors": [], "dollars": [], "programms": []};
			
			let w = try_num_to_task(id,+p_obj['programm_'+x+'_task']);
			if (w) exit.players[p_obj.login].map_data[id].programms.push({
				"task": w,
				"text": p_obj['programm_'+x+'_programm'],
				"exit_data": p_obj['programm_'+x+'_exit_data'],
				"result": p_obj['programm_'+x+'_res'],
				"date": +p_obj['programm_'+x+'_date']
			});
		});
	});

}


function map_v3_to_v4(map, callback) {
	
	function parseMap(mapText) {
		const lines = mapText.split('\n').filter(line => line.trim() !== '');
		const height = lines.length;
		const width = Math.max(...lines.map(line => line.length));
		
		// Заполнение матрицы карты
		const map = Array(height).fill().map((_, y) => {
			const line = lines[y].padEnd(width, ' ');
			return Array.from(line);
		});
		
		// Нахождение центра (@)
		let centerX = -1, centerY = -1;
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (map[y][x] === '@') {
					centerX = x;
					centerY = y;
				}
			}
		}
		if (centerX === -1) throw new Error('Center (@) not found');
		
		// Инициализация вспомогательных структур
		const typeMap = Array(height).fill().map(() => Array(width).fill(null));
		const reachable = Array(height).fill().map(() => Array(width).fill(false));
		const Ds = [];
		const RHs = [];
		const RVs = [];
		const ROOMs = [];
		
		// Определение типов клеток
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const cell = map[y][x];
				typeMap[y][x] = (cell === '#') ? 'wall' : 'free';
			}
		}
		
		// BFS для определения достижимых областей
		const queue = [[centerX, centerY]];
		reachable[centerY][centerX] = true;
		const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]]; // Вверх, вниз, влево, вправо
		
		while (queue.length > 0) {
			const [x, y] = queue.shift();
			for (const [dx, dy] of directions) {
				const nx = x + dx;
				const ny = y + dy;
				if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
					if (!reachable[ny][nx] && typeMap[ny][nx] === 'free') {
						reachable[ny][nx] = true;
						queue.push([nx, ny]);
					}
				}
			}
		}
		
		// Сбор долларов только в достижимых областях
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (map[y][x] === '$' && reachable[y][x]) {
					Ds.push({ x: x - centerX, y: y - centerY });
				}
			}
		}
		
		// Классификация проходимых клеток только в достижимых областях
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (!reachable[y][x] || typeMap[y][x] === 'wall') continue;
				
				let summ = 0;
				if (x > 0 && reachable[y][x-1] && typeMap[y][x-1] !== 'wall') summ += 1000;
				if (y > 0 && reachable[y-1][x] && typeMap[y-1][x] !== 'wall') summ += 100;
				if (x < width-1 && reachable[y][x+1] && typeMap[y][x+1] !== 'wall') summ += 10;
				if (y < height-1 && reachable[y+1][x] && typeMap[y+1][x] !== 'wall') summ += 1;
				
				if (summ === 1010) typeMap[y][x] = 'H';
				else if (summ === 101) typeMap[y][x] = 'V';
				else typeMap[y][x] = 'R';
			}
		}
		
		// Обработка горизонтальных дорог
		const hProcessed = Array(height).fill().map(() => Array(width).fill(false));
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (hProcessed[y][x] || typeMap[y][x] !== 'H') continue;
				
				let x2 = x;
				let doorChar = null;
				while (x2 < width && typeMap[y][x2] === 'H' && !hProcessed[y][x2]) {
					const cell = map[y][x2];
					if (cell !== ' ' && cell !== '@' && cell !== '$' && cell !== '#' && !doorChar) {
						doorChar = cell;
					}
					x2++;
				}
				x2--;
				
				if (x2 >= x) {
					let dor = null;
					if (doorChar) {
						if (/[0-9]/.test(doorChar)) dor = parseInt(doorChar);
						else if (/[A-Z]/.test(doorChar)) dor = doorChar.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
					}
					
					const road = { x1: x - centerX, x2: x2 - centerX, y: y - centerY };
					if (dor !== null) road.dor = dor+'';
					RHs.push(road);
					
					for (let i = x; i <= x2; i++) hProcessed[y][i] = true;
				}
			}
		}
		
		// Обработка вертикальных дорог
		const vProcessed = Array(height).fill().map(() => Array(width).fill(false));
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				if (vProcessed[y][x] || typeMap[y][x] !== 'V') continue;
				
				let y2 = y;
				let doorChar = null;
				while (y2 < height && typeMap[y2][x] === 'V' && !vProcessed[y2][x]) {
					const cell = map[y2][x];
					if (cell !== ' ' && cell !== '@' && cell !== '$' && cell !== '#' && !doorChar) {
						doorChar = cell;
					}
					y2++;
				}
				y2--;
				
				if (y2 >= y) {
					let dor = null;
					if (doorChar) {
						if (/[0-9]/.test(doorChar)) dor = parseInt(doorChar);
						else if (/[A-Z]/.test(doorChar)) dor = doorChar.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
					}
					
					const road = { x: x - centerX, y1: y - centerY, y2: y2 - centerY };
					if (dor !== null) road.dor = dor+'';
					RVs.push(road);
					
					for (let i = y; i <= y2; i++) vProcessed[i][x] = true;
				}
			}
		}
		
		// Обработка комнат
		const rProcessed = Array(height).fill().map(() => Array(width).fill(false));
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (rProcessed[y][x] || typeMap[y][x] !== 'R') continue;
				
				let x2 = x;
				while (x2 < width && !rProcessed[y][x2] && typeMap[y][x2] === 'R') {
					x2++;
				}
				x2--;
				
				let y2 = y;
				let valid = true;
				while (y2 < height - 1 && valid) {
					y2++;
					for (let i = x; i <= x2; i++) {
						if (rProcessed[y2][i] || typeMap[y2][i] !== 'R') {
							valid = false;
							break;
						}
					}
					if (!valid) y2--;
				}
				
				const room = {
					x1: x  - centerX,
					y1: y - centerY,
					x2: x2 - centerX,
					y2: y2 - centerY
				};
				ROOMs.push(room);
				
				for (let j = y; j <= y2; j++) {
					for (let i = x; i <= x2; i++) {
						rProcessed[j][i] = true;
					}
				}
			}
		}
		
		return { Ds, RHs, RVs, ROOMs };
	}
	
	const PNG = require(TMP_DIRECTORY+'/png-node.js');
	PNG.decode(map, function(pixels,w,h) {
		let data = Array.from(pixels);
		let exit = new Array(h).fill(0).map(x=>new Array(w).fill(' '));
		for (let i=0; i<data.length;i+=4){
			let [r,g,b,a,x,y] = [data[i],data[i+1],data[i+2],data[i+3],(i/4)%w,Math.floor(i/w/4)];
			if (r>127 && g>127 && b>127) exit[y][x]=' ';
			else if (r<=127 && g>127 && b<=127) exit[y][x]='.';
			else if (r<=127 && g<=127 && b<=127) exit[y][x]='$';
			else if (r<=127 && g<=127 && b>127) exit[y][x]=(255-b).toString(36).toUpperCase();
			else if (r>127 && g<=127 && b<=127) exit[y][x]='@';
		}
		let minx=w;
		for (let y=0; y<h;y++)
			for (let x=0; x<w;x++)
				if (exit[y][x]==' '){
					let getP=(y,x)=>(x<0?' ':(y<0?' ':(x>=w?' ':(y>=h?' ':(exit[y][x]=='#'?' ':exit[y][x])))));
					if (
						getP(y-1,x-1)!==' '||getP(y-1,x)!==' '||getP(y-1,x+1)!==' '||
						getP(y  ,x-1)!==' '||                   getP(y  ,x+1)!==' '||
						getP(y+1,x-1)!==' '||getP(y+1,x)!==' '||getP(y+1,x+1)!==' '
					){
						exit[y][x]='#';
						minx = Math.min(minx,x);
					}
				}
		for (let y=0; y<h;y++)
			for (let x=0; x<w;x++)
				if (exit[y][x]=='.')
					exit[y][x]=' ';
		let s=exit.map(x=>x.join('')).join('\n').replace(/\s+$/gm, '').replace(/^\s*\n/gm, '');
		range(Math.max(minx-2,0)).map(x=>s=s.replace(/^ /gm,''));
		callback(JSON.stringify(parseMap('\n\n'+s+'\n\n')));
	});
}

function txt_to_json(text){
	//<!----name---->
	let r_obj = {};
	let name = '';
	text.split('\n').map(line=>{
		if (/^\s*<!----.+---->\s*$/.test(line)) name = line.replace(/^\s*<!----(.+)---->\s*$/, '$1');
		else if(name) r_obj[name]=r_obj[name]?r_obj[name]+line+'\n':line+'\n';
	});
	return r_obj;
}


function parseMissionFile(content) {
    // Определяем теги для поиска в файле
    const tags = [
        "<!----name---->",
        "<!----condition---->",
        "<!----default program---->",
        "<!----solution---->"
    ];

    // Инициализируем результат пустыми строками
    const result = {
        name: "",
        condition: "",
        default_program: "",
        solution: ""
    };

    // Проходим по каждому тегу
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const startIdx = content.indexOf(tag);
        
        if (startIdx !== -1) {
            // Вычисляем начало данных (после тега)
            const dataStart = startIdx + tag.length;
            // Ищем конец данных (начало следующего тега)
            let dataEnd = content.length;
            
            for (let j = i + 1; j < tags.length; j++) {
                const nextTagIdx = content.indexOf(tags[j], dataStart);
                if (nextTagIdx !== -1) {
                    dataEnd = nextTagIdx;
                    break;
                }
            }
            
            // Извлекаем и очищаем данные
            const data = content.substring(dataStart, dataEnd).trim();
            
            // Сохраняем в соответствующее поле результата
            if (i === 0) result.name = data;
            else if (i === 1) result.condition = data;
            else if (i === 2) result.default_program = data;
            else if (i === 3) result.solution = data;
        }
    }
    
    return result;
}

const path = require('path');

function processMissionFolderSync(folderPath) {
    const files = fs.readdirSync(folderPath);
    const result = {
        name: "",
        condition: "",
        default_program: "",
        solution: "",
        tests: []
    };

    // Обрабатываем TXT файл (миссия)
    const txtFile = files.find(f => path.extname(f).toLowerCase() === '.txt');
    if (!txtFile) throw new Error("TXT file not found in directory");
    
    const txtContent = fs.readFileSync(
        path.join(folderPath, txtFile), 
        'utf-8'
    );
    const parsed = parseMissionFile(txtContent);
    Object.assign(result, parsed);

    // Обрабатываем FIL файлы (тесты)
    const filFiles = files.filter(f => 
        path.extname(f).toLowerCase() === '.fil'
    );

    for (const file of filFiles) {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        result.tests.push({
            fil: content,
            is_secret: file.includes('__secret_information__')
        });
    }

    return result;
}

function projs_to_json(maps, projs, to) {
	/*
	
			tasks: [
				{
					name: "Фантастическая дорога",
					condition: "print hello",
					default_program: `Использовать Робот
алг
нач
	вправо
	вниз
	влево
	вверх
	вправо
	вниз
	влево
	вверх
	вправо
	вниз
	влево
	вверх
	вправо
	вниз
	влево
	вверх
	
кон`,
					solution: "{print('hello')}",
					tests: [
						{
							fil: `; Field Size: x, y
5 5
; Robot position: x, y
0 0
; A set of special Fields: x, y, Wall, Color, Radiation, Temperature, Symbol, Symbol1, Point
; End Of File`,
							input: '',
							expected_output: 'hello',
							is_secret: false
						},
						{
							fil: `; Field Size: x, y
5 5
; Robot position: x, y
0 0
; A set of special Fields: x, y, Wall, Color, Radiation, Temperature, Symbol, Symbol1, Point
; End Of File`,
							input: '',
							expected_output: 'hello',
							is_secret: true
						},
					]
				}
			],
			
			map: 
	*/
	let ex = {};
	Object.keys(projs).map(x=>{
		const w=txt_to_json(projs[x]);
		let colors={};
		w.colors.split('\n').map(line=>{
			if (/^[\S\s]*?=[\S\s]*$/.test(line))
				colors[(255-parseInt(line.split('=')[0],16))] = processMissionFolderSync(to + '/tasks/'+x+'/'+line.replace(/^[\S\s]*?=([\S\s]*)$/, '$1').trim());
		});
		var map = JSON.parse(maps[x]);
		
		map.RHs = map.RHs.map(x=>(x.dor?{...x, dor: 'task:'+colors[x.dor].name}:x));
		map.RVs = map.RVs.map(x=>(x.dor?{...x, dor: 'task:'+colors[x.dor].name}:x));	
		
		var tasks = [];
		
		for (let j=0; j<36;j++){
			if (colors[j])
				tasks.push({
					name: colors[j].name,
					condition: colors[j].condition.replace(/\n/g, '<br/>'),
					default_program: colors[j].default_program,
					solution: colors[j].solution,
					tests: colors[j].tests.map(x=>({
						fil: x.fil,
						input: x.fil.match(/;input_data_start\n(.*?)\n?;input_data_end/) ? x.fil.match(/;input_data_start\n(.*?)\n?;input_data_end/)[1] : '',
						expected_output: x.fil.match(/;out_data_start\n(.*?)\n?;out_data_end/) ? x.fil.match(/;out_data_start\n(.*?)\n?;out_data_end/)[1] : '',
						is_secret: x.is_secret
					}))
				});
		}
		
		ex[w.name.trim()] = {map, tasks};
	});
	//console.log(maps);
	return ex;
}

function copy_end_transform_files(from, to, callback) {
	console.log('['+to+'] - start copy file from '+from+' to '+to);
	var cnt_dir=0;

	let files  = [];

	function through_directory(dir) {
		fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
			const absolute = dir+'/'+dirent.name;
			if (dirent.isDirectory()) through_directory(absolute);
			else files.push(absolute);
		});
	}
	through_directory(from+'/projects');
	let maps = {}; 
	let projs = {}; 
	files.map(x=>{
		/*
	  '_TMP_65ADE00E3D945F74A487/projects/05_Olimpiada_ekvator/map.png',
	  '_TMP_65ADE00E3D945F74A487/projects/05_Olimpiada_ekvator/name.txt',
	  '_TMP_65ADE00E3D945F74A487/projects/05_Olimpiada_ekvator/task/01_zvezdochka/manifest__secret_information__.txt',
	  '_TMP_65ADE00E3D945F74A487/projects/05_Olimpiada_ekvator/task/01_zvezdochka/test_1.fil',
	  '_TMP_65ADE00E3D945F74A487/projects/05_Olimpiada_ekvator/task/02_sobachka/manifest__secret_information__.txt',
*/
		if (/^.*?[\/\\]projects[\/\\].*?[\/\\]task[\/\\].*$/.test(x)){
			let exit_dir = to+'/'+x.replace(/^.*?[\/\\]projects([\/\\].*?[\/\\])task[\/\\](.*)/, 'tasks$1$2');
			fs.mkdirSync(exit_dir.replace(/[^\/\\]+?$/,''), { recursive: true });
			fs.copyFileSync(x, exit_dir);
		} else
		if (/^.*?[\/\\]projects[\/\\].*?[\/\\]map\.png$/.test(x)){
			cnt_dir++;
			setTimeout(()=>{
				map_v3_to_v4(x, (s)=>{
					if (!fs.existsSync(to+'/maps')) fs.mkdirSync(to+'/maps');
					let proj_name = x.replace(/^.*?[\/\\]projects[\/\\](.*?)[\/\\]map\.png$/, '$1');
					maps[proj_name] = s;
					fs.writeFileSync(to+'/maps/'+proj_name+'.txt', s);
					projs[proj_name] = fs.readFileSync(from+'/projects/'+proj_name+'/name.txt').toString();
					if (--cnt_dir==0) {
						let map_sort = (m)=>Object.keys(m).sort().reduce((r,k)=>(r[k]=m[k],r),{});
						projs = projs_to_json(map_sort(maps), map_sort(projs), to);
						fs.writeFileSync(to+'/projects.json', JSON.stringify(projs, null, 2));
						
						
						const json = ini_to_json(decode(new Uint16Array(fs.readFileSync(from+'/projects/defaut.ini'))), maps, projs);
						fs.writeFileSync(to+'/init.json', JSON.stringify(json, null, 2));
						console.log('['+to+'] - done');
					}
				});
			});
		}
	});
	/*
	readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name).map(dir => {
		
	});
		*/
	
}

function v3_to_v4(name, callback) {
	console.log('['+name+'] Start transform v3.0 project to v4.0');
	const new_projet_name = ('_TMP_'+[...Array(20)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')).toUpperCase();
	
	console.log('['+name+'] - rename "'+name+'" to '+new_projet_name);
	fs.renameSync(name, new_projet_name);
	console.log('['+name+'] - create new "'+name+'" project');
	
	fs.readFile(TMP_DIRECTORY+'/WebKumirFiles.zip', function(err, data){
		if (err) return console.log(err); 
		
		var JSZip = require(TMP_DIRECTORY+'/jszip.min.js');
		let cnt_file = 0;
		JSZip.loadAsync(data).then(function(zip){
			if (!fs.existsSync(name)) fs.mkdirSync(name);
			Object.keys(zip.files).forEach(function(filename) {
				if (filename.replace(/^WebKumirFiles/,'') == filename) return;
				let full_name = name+filename.replace(/^WebKumirFiles/,'');
				if (full_name.replace(/^.+?[\\\/]projects[\\\/]/,'') != full_name) return;
				if (full_name.slice(-1)=='/') {				  
					if (!fs.existsSync(full_name)) fs.mkdirSync(full_name);
					return;
				}
				if (!fs.existsSync(full_name)) {
					cnt_file++;
					zip.files[filename].async('nodebuffer').then(function(content) {
						fs.appendFile(full_name, content, (e)=>{
							if (e) console.log(e);
							setTimeout(()=>{
								cnt_file--;
								if (cnt_file==0) {
									copy_end_transform_files(new_projet_name, name, callback);
								}
							});
						});
					});
				}
			});
		});
	});
	
	
}


//[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => { process.on(eventType, ()=>{save_and_close_all(); }); })

const {Worker} = require('worker_threads');

function run_proj(name, callback) {
	console.log('['+name+'] Runing');
	if (!fs.existsSync('./'+name+'/index.js')) {
		console.log('['+name+'] ERROR: '+name+'/index.js not found!');
		callback();
		return v3_to_v4(name, ()=>{});//()=>{run_proj(name, callback)});
	}		//
	
	const proj_worker = new Worker('./'+name+'/index.js', { workerData: JSON.stringify(settings[name]) });
	proj_worker.on('message', (s)=>{
		if (s=='$run') { console.log('['+name+'] OK!'); callback(); return; }
		if (s=='$end_close') { console.log('['+name+'] closed!'); continue_closing(); return; }
		console.log('['+name+'] >'+s);
	});
	proj_worker.on('error', (err) => { console.log('['+name+'] ERROR: '+err+': '+err.stack.replace(/\r?\n/g, '\\n')); save_all_and_close(); });
	proj_worker.on('exit', (code) => { console.log('['+name+'] Stopped with exit code '+code); save_all_and_close(); });
	projects[name].worker = proj_worker;
	//setTimeout(()=>{console.log('['+name+'] OK!'); callback();},1000);
}

function dowload_tmp(callback) {
	console.log('[LAUNCHER] Creating proj-folder');
	if (!fs.existsSync(TMP_DIRECTORY)) {
		fs.mkdirSync(TMP_DIRECTORY);
		console.log('[LAUNCHER] Creating tmp-folder');
	}
	// TODO
	callback();
}

function try_run_projects() {
	let f = 0;
	let settings_keys = Object.keys(settings);
	for (let i = 0; i<settings_keys.length; i++){
		let x = settings_keys[i];
		if (x[0]=='$') continue;
		if (!projects[x] || projects[x].step == 'create_or_run') {
			if (!projects[x]) projects[x] = {'step': 'create_or_run'};
			
			if (fs.existsSync(__dirname+'/'+x)) {
				projects[x].step = 'ranning';
				run_proj(x, try_run_projects);
				return;
			}
			
			f = 1
		}
	}
	if (f==1)
		dowload_tmp(()=>{
			let cnt_file = 0;
			fs.readFile(TMP_DIRECTORY+'/WebKumirFiles.zip', function(err, data){
				if (err) return console.log(err); 
				
				var JSZip = require(TMP_DIRECTORY+'/jszip.min.js');
				JSZip.loadAsync(data).then(function(zip){
					Object.keys(projects).map((proj_name)=>{
						if (projects[proj_name].step != 'create_or_run') return;
						if (!fs.existsSync(proj_name)) fs.mkdirSync(proj_name);
						console.log('[LAUNCHER] unzip '+proj_name);
						Object.keys(zip.files).forEach(function(filename) {
							if (filename.replace(/^WebKumirFiles/,'') == filename) return;
							let full_name = proj_name+filename.replace(/^WebKumirFiles/,'');
							if (full_name.slice(-1)=='/') {
								if (!fs.existsSync(full_name)) fs.mkdirSync(full_name);
								return;
							}
							if (!fs.existsSync(full_name)) {
								cnt_file++;
								zip.files[filename].async('nodebuffer').then(function(content) {
									fs.appendFile(full_name, content, (e)=>{
											if(e)console.log(e);
											setTimeout(()=>{
												cnt_file--;
												if (cnt_file==0) {
													console.log('[LAUNCHER] done!');
													try_run_projects();
												}
											});
										});
								});
							}
								
						});
					});
				});
			});
		});
	else {
		
		// ALL IS RUNED
		
	}
}

try_run_projects();
/*
if (!fs.existsSync(PROJECT_DIRECTORY)) {
	console.log('   Creating proj-folder...  |         Создание проекта         ');
	console.log('         Please wait        |       Подождите, пожалуйста      ');
	console.log('');
	
	console.log('321');
	var JSZip = require('./jszip.min.js');
	fs.readFile('WebKumirFiles.zip', function(err, data){
		if (err) throw err; 
		JSZip.loadAsync(data).then(function(zip){
			Object.keys(zip.files).forEach(function(filename){
				if (filename.slice(-1)=='/') {				  
					if (!fs.existsSync(filename)) fs.mkdirSync(filename);
					return;
				}
				if (!fs.existsSync(filename)) 
					zip.files[filename].async('nodebuffer').then(function(content) {
						fs.appendFile(filename, content, (e)=>{e&&console.log(e)});
					});
					
			});
		});
	});
}





//console.log(PROJECT_DIRECTORY);

const {Worker} = require('worker_threads');
console.log('RUN TESTER');
const tester = new Worker('./tester.js', { workerData: 0 });
tester.on('message', console.log);
tester.on('error', (err) => { console.log('[Tester] '+err); process.exit(1); });
tester.on('exit', (code) => { console.log('[Tester] Stopped with exit code '+code); process.exit(1); } );

const http = require('http');
const server = http.createServer((req, res) => {
	//tester.postMessage('321');
	//console.log(`Request received: ${req.method} ${req.url}`);
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello, World!');
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        SERVER_PORT = SERVER_PORT - 1
		console.log(`port ${SERVER_PORT} already in use`);
        console.log(`trying to restart the service on port ${SERVER_PORT}... `);
        if (SERVER_PORT !== 0) {
            setTimeout(() => server.listen(SERVER_PORT), 1000)
        } else {
            console.log(`Server is shutting down`);
        }
    }
})

server.listen(SERVER_PORT, () => { console.log(`Server running at http://localhost:${SERVER_PORT}`); });
*/

const INDEX_BY_POINTER=new Map([[0,"Ђ"],[1,"Ѓ"],[2,"‚"],[3,"ѓ"],[4,"„"],[5,"…"],[6,"†"],[7,"‡"],[8,"€"],[9,"‰"],[10,"Љ"],[11,"‹"],[12,"Њ"],[13,"Ќ"],[14,"Ћ"],[15,"Џ"],[16,"ђ"],[17,"‘"],[18,"’"],[19,"“"],[20,"”"],[21,"•"],[22,"–"],[23,"—"],[24,"\x98"],[25,"™"],[26,"љ"],[27,"›"],[28,"њ"],[29,"ќ"],[30,"ћ"],[31,"џ"],[32,"\xa0"],[33,"Ў"],[34,"ў"],[35,"Ј"],[36,"\xa4"],[37,"Ґ"],[38,"\xa6"],[39,"\xa7"],[40,"Ё"],[41,"\xa9"],[42,"Є"],[43,"\xab"],[44,"\xac"],[45,"\xad"],[46,"\xae"],[47,"Ї"],[48,"\xb0"],[49,"\xb1"],[50,"І"],[51,"і"],[52,"ґ"],[53,"\xb5"],[54,"\xb6"],[55,"\xb7"],[56,"ё"],[57,"№"],[58,"є"],[59,"\xbb"],[60,"ј"],[61,"Ѕ"],[62,"ѕ"],[63,"ї"],[64,"А"],[65,"Б"],[66,"В"],[67,"Г"],[68,"Д"],[69,"Е"],[70,"Ж"],[71,"З"],[72,"И"],[73,"Й"],[74,"К"],[75,"Л"],[76,"М"],[77,"Н"],[78,"О"],[79,"П"],[80,"Р"],[81,"С"],[82,"Т"],[83,"У"],[84,"Ф"],[85,"Х"],[86,"Ц"],[87,"Ч"],[88,"Ш"],[89,"Щ"],[90,"Ъ"],[91,"Ы"],[92,"Ь"],[93,"Э"],[94,"Ю"],[95,"Я"],[96,"а"],[97,"б"],[98,"в"],[99,"г"],[100,"д"],[101,"е"],[102,"ж"],[103,"з"],[104,"и"],[105,"й"],[106,"к"],[107,"л"],[108,"м"],[109,"н"],[110,"о"],[111,"п"],[112,"р"],[113,"с"],[114,"т"],[115,"у"],[116,"ф"],[117,"х"],[118,"ц"],[119,"ч"],[120,"ш"],[121,"щ"],[122,"ъ"],[123,"ы"],[124,"ь"],[125,"э"],[126,"ю"],[127,"я"]]);
const decodingError=r=>{if("replacement"===r)return"�";throw Error()};
const stringFromCharCode = String.fromCharCode;
function decode(input, options) {
	let mode;
	if (options && options.mode) {
		mode = options.mode.toLowerCase();
	}
	// “An error mode […] is either `replacement` (default) or `fatal` for a
	// decoder.”
	if (mode !== 'replacement' && mode !== 'fatal') {
		mode = 'replacement';
	}

	const length = input.length;

	// Support byte strings as input.
	if (typeof input === 'string') {
		const bytes = new Uint16Array(length);
		for (let index = 0; index < length; index++) {
			bytes[index] = input.charCodeAt(index);
		}
		input = bytes;
	}

	const buffer = [];
	for (let index = 0; index < length; index++) {
		const byteValue = input[index];
		// “If `byte` is an ASCII byte, return a code point whose value is
		// `byte`.”
		if (0x00 <= byteValue && byteValue <= 0x7F) {
			buffer.push(stringFromCharCode(byteValue));
			continue;
		}
		// “Let `code point` be the index code point for `byte − 0x80` in index
		// single-byte.”
		const pointer = byteValue - 0x80;
		if (INDEX_BY_POINTER.has(pointer)) {
			// “Return a code point whose value is `code point`.”
			buffer.push(INDEX_BY_POINTER.get(pointer));
		} else {
			// “If `code point` is `null`, return `error`.”
			buffer.push(decodingError(mode));
		}
	}
	const result = buffer.join('');
	return result;
};