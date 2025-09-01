const fs = require('fs');
const path = require('path');

function range(n) { 
    return (new Array(n).fill(0).map((x,i)=>i)); 
}

const crypto = require('crypto');
const md5 = data => crypto.createHash('md5').update(data).digest("hex");

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

function parseMissionFile(content) {
    const tags = [
        "<!----name---->",
        "<!----condition---->",
        "<!----default program---->",
        "<!----solution---->"
    ];

    const result = {
        name: "",
        condition: "",
        default_program: "",
        solution: ""
    };

    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const startIdx = content.indexOf(tag);
        
        if (startIdx !== -1) {
            const dataStart = startIdx + tag.length;
            let dataEnd = content.length;
            
            for (let j = i + 1; j < tags.length; j++) {
                const nextTagIdx = content.indexOf(tags[j], dataStart);
                if (nextTagIdx !== -1) {
                    dataEnd = nextTagIdx;
                    break;
                }
            }
            
            const data = content.substring(dataStart, dataEnd).trim();
            
            if (i === 0) result.name = data;
            else if (i === 1) result.condition = data;
            else if (i === 2) result.default_program = data;
            else if (i === 3) result.solution = data;
        }
    }
    
    return result;
}

function processMissionFolderSync(folderPath) {
    const files = fs.readdirSync(folderPath);
    const result = {
        name: "",
        condition: "",
        default_program: "",
        solution: "",
        tests: []
    };

    const txtFile = files.find(f => path.extname(f).toLowerCase() === '.txt');
    if (!txtFile) throw new Error("TXT file not found in directory");
    
    const txtContent = fs.readFileSync(
        path.join(folderPath, txtFile), 
        'utf-8'
    );
    const parsed = parseMissionFile(txtContent);
    Object.assign(result, parsed);

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

function parseMap(mapText, tasks) {
    const lines = mapText.split('\n').filter(line => line.trim() !== '');
    const height = lines.length;
    const width = Math.max(...lines.map(line => line.length));
    
    const map = Array(height).fill().map((_, y) => {
        const line = lines[y].padEnd(width, ' ');
        return Array.from(line);
    });
    
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
    
    const typeMap = Array(height).fill().map(() => Array(width).fill(null));
    const reachable = Array(height).fill().map(() => Array(width).fill(false));
    const Ds = [];
    const RHs = [];
    const RVs = [];
    const ROOMs = [];
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = map[y][x];
            typeMap[y][x] = (cell === '#') ? 'wall' : 'free';
        }
    }
    
    const queue = [[centerX, centerY]];
    reachable[centerY][centerX] = true;
    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    
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
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (map[y][x] === '$' && reachable[y][x]) {
                Ds.push({ x: x - centerX, y: y - centerY });
            }
        }
    }
    
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
                    if (/[0-9]/.test(doorChar)) dor = 'task:'+tasks[parseInt(doorChar)].name;
                    else if (/[A-Z]/.test(doorChar)) dor = 'task:'+tasks[doorChar.charCodeAt(0) - 'A'.charCodeAt(0) + 10].name;
                }
                
                const road = { x1: x - centerX, x2: x2 - centerX, y: y - centerY };
                if (dor !== null) road.dor = dor+'';
                RHs.push(road);
                
                for (let i = x; i <= x2; i++) hProcessed[y][i] = true;
            }
        }
    }
    
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
                    if (/[0-9]/.test(doorChar)) dor = 'task:'+tasks[parseInt(doorChar)].name;
                    else if (/[A-Z]/.test(doorChar)) dor = 'task:'+tasks[doorChar.charCodeAt(0) - 'A'.charCodeAt(0) + 10].name;
                }
                
                const road = { x: x - centerX, y1: y - centerY, y2: y2 - centerY };
                if (dor !== null) road.dor = dor+'';
                RVs.push(road);
                
                for (let i = y; i <= y2; i++) vProcessed[i][x] = true;
            }
        }
    }
    
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

function map_v3_to_v4(filename, tasks, callback) {
    const PNG = require('./png-node.js');
    PNG.decode(filename, function(pixels, w, h) {
        let data = Array.from(pixels);
        let exit = new Array(h).fill(0).map(x => new Array(w).fill(' '));
        for (let i = 0; i < data.length; i += 4) {
            let [r, g, b, a, x, y] = [
                data[i], data[i+1], data[i+2], data[i+3],
                (i/4) % w, Math.floor(i/w/4)
            ];
            if (r > 127 && g > 127 && b > 127) exit[y][x] = ' ';
            else if (r <= 127 && g > 127 && b <= 127) exit[y][x] = '.';
            else if (r <= 127 && g <= 127 && b <= 127) exit[y][x] = '$';
            else if (r <= 127 && g <= 127 && b > 127) exit[y][x] = (255 - b).toString(36).toUpperCase();
            else if (r > 127 && g <= 127 && b <= 127) exit[y][x] = '@';
        }
        
        let minx = w;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (exit[y][x] == ' ') {
                    let getP = (y, x) => (
                        x < 0 ? ' ' : (y < 0 ? ' ' : (
                            x >= w ? ' ' : (y >= h ? ' ' : (
                                exit[y][x] == '#' ? ' ' : exit[y][x]
                            )
                        )
                    )));
                    if (
                        getP(y-1, x-1) !== ' ' || getP(y-1, x) !== ' ' || getP(y-1, x+1) !== ' ' ||
                        getP(y, x-1) !== ' ' || getP(y, x+1) !== ' ' ||
                        getP(y+1, x-1) !== ' ' || getP(y+1, x) !== ' ' || getP(y+1, x+1) !== ' '
                    ) {
                        exit[y][x] = '#';
                        minx = Math.min(minx, x);
                    }
                }
            }
        }
        
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (exit[y][x] == '.') exit[y][x] = ' ';
            }
        }
        
        let s = exit.map(x => x.join('')).join('\n')
            .replace(/\s+$/gm, '')
            .replace(/^\s*\n/gm, '');
            
        range(Math.max(minx-2, 0)).forEach(x => {
            s = s.replace(/^ /gm, '');
        });
        
        callback(JSON.stringify(parseMap('\n\n' + s + '\n\n', tasks)));
    });
}

function processDirectory(dirPath) {
    const projects = {};
    
    fs.readdirSync(dirPath, { withFileTypes: true }).forEach(dirent => {
        if (dirent.isDirectory()) {
            const projectPath = path.join(dirPath, dirent.name);
            const mapPath = path.join(projectPath, 'map.png');
            const namePath = path.join(projectPath, 'name.txt');
            const taskDir = path.join(projectPath, 'task');
            
            if (fs.existsSync(mapPath) && fs.existsSync(namePath)) {
                console.log(`Processing project: ${dirent.name}`);
                
                const projectName = fs.readFileSync(namePath, 'utf8').split('<!----name---->')[1].split('<!----colors---->')[0].trim();
                
				const tasks = [];
				
				if (fs.existsSync(taskDir)) {
					fs.readdirSync(taskDir, { withFileTypes: true }).forEach(taskDirent => {
						if (taskDirent.isDirectory()) {
							const taskPath = path.join(taskDir, taskDirent.name);
							try {
								const taskData = processMissionFolderSync(taskPath);
								tasks.push({
									name: taskData.name,
									condition: taskData.condition.replace(/\n/g, '<br/>'),
									default_program: taskData.default_program,
									solution: taskData.solution,
									tests: taskData.tests.map(test => ({
										fil: test.fil,
										input: test.fil.match(/;input_data_start\n(.*?)\n?;input_data_end/) ? 
											test.fil.match(/;input_data_start\n(.*?)\n?;input_data_end/)[1] : '',
										expected_output: test.fil.match(/;out_data_start\n(.*?)\n?;out_data_end/) ? 
											test.fil.match(/;out_data_start\n(.*?)\n?;out_data_end/)[1] : '',
										is_secret: test.is_secret
									}))
								});
							} catch (e) {
								console.error(`Error processing task ${taskDirent.name}:`, e);
							}
						}
					});
				}
                    
                map_v3_to_v4(mapPath, tasks, (mapJson) => {
                    const projectData = {
                        name: projectName,
                        map: JSON.parse(mapJson),
                        tasks: tasks
                    };
                    
                    const outputPath = path.join(dirPath, `${projectName.replace(/\s+/g, '_')}.json`);
                    fs.writeFileSync(outputPath, JSON.stringify(projectData, null, 2));
                    console.log(`Created project file: ${outputPath}`);
                });
            }
        }
    });
}

// Main execution
const currentDir = process.cwd();
processDirectory(currentDir);