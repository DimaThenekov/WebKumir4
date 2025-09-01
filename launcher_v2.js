const fs = require('fs');
const https = require('https');
const path = require('path');
const TMP_DIRECTORY = __dirname + '/tmp';
let settings = {};

// =========== INIT ===========
// =========== INIT ===========
// =========== INIT ===========
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

['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'].forEach(
	function (sig) {
		process.on(sig, function () {
			save_all_and_close();
		});
	}
);

// =========== INIT ===========
// =========== INIT ===========
// =========== INIT ===========











// =========== UPDATE ===========
// =========== UPDATE ===========
// =========== UPDATE ===========


function checkAndUpdateProjects(callback) {
    console.log('[LAUNCHER] Checking for updates...');
    
    // Скачиваем jszip если нужно
    if (!fs.existsSync(TMP_DIRECTORY + '/jszip.min.js')) {
        downloadFile('https://dimathenekov.github.io/WebKumir4/jszip.min.js', TMP_DIRECTORY + '/jszip.min.js', function(err) {
            if (err) {
                console.log('[LAUNCHER] Failed to download JSZip:', err.message);
                return callback();
            }
            checkGitHubReleases(callback);
        });
    } else {
        checkGitHubReleases(callback);
    }
}

function checkGitHubReleases(callback) {
    const options = {
        hostname: 'api.github.com',
        path: '/repos/DimaThenekov/WebKumir4/releases/latest',
        headers: {'User-Agent': 'Node.js'}
    };

    const req = https.get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const releaseInfo = JSON.parse(data);
                processReleaseInfo(releaseInfo, callback);
            } catch (e) {
                console.log('[LAUNCHER] Failed to parse release info:', e.message);
                callback();
            }
        });
    }).on('error', (err) => {
        console.log('[LAUNCHER] GitHub API error:', err.message);
        callback();
    });

    req.setTimeout(1000, () => {
        req.abort();
        console.log('[LAUNCHER] GitHub API timeout');
        callback();
    });
}

function processReleaseInfo(releaseInfo, callback) {
    const zipUrl = releaseInfo.zipball_url;
    const latestVersion = releaseInfo.tag_name;

    // Проверяем каждый проект на необходимость обновления
    let projectsToUpdate = [];
    
    for (let projectName in settings) {
        if (projectName[0] === '$') continue;
        
        const projectDir = __dirname + '/' + projectName;
        if (!fs.existsSync(projectDir)) continue;

        const versionFile = projectDir + '/version.json';
        let currentVersion = 'unknown';
        
        if (fs.existsSync(versionFile)) {
            try {
                const versionData = JSON.parse(fs.readFileSync(versionFile));
                currentVersion = versionData.version || 'unknown';
            } catch (e) {
                console.log(`[${projectName}] Error reading version file:`, e.message);
            }
        }

        if (currentVersion !== latestVersion) {
            console.log(`[${projectName}] Needs update (${currentVersion} -> ${latestVersion})`);
            projectsToUpdate.push(projectName);
        }
    }

    if (projectsToUpdate.length === 0) {
        console.log('[LAUNCHER] All projects are up to date');
        return callback();
    }

    downloadAndUpdateProjects(zipUrl, projectsToUpdate, latestVersion, callback);
}

function downloadAndUpdateProjects(zipUrl, projectsToUpdate, latestVersion, callback) {
    const zipPath = TMP_DIRECTORY + '/latest_release.zip';
    
    downloadFile(zipUrl, zipPath, (err) => {
        if (err) {
            console.log('[LAUNCHER] Failed to download update:', err.message);
            return callback();
        }

        console.log('[LAUNCHER] Update downloaded, extracting...');
        extractAndUpdateProjects(zipPath, projectsToUpdate, latestVersion, callback);
    });
}

function extractAndUpdateProjects(zipPath, projectsToUpdate, latestVersion, callback) {
    const JSZip = require(TMP_DIRECTORY + '/jszip.min.js');
    
    fs.readFile(zipPath, (err, data) => {
        if (err) {
            console.log('[LAUNCHER] Error reading zip file:', err.message);
            return callback();
        }

        JSZip.loadAsync(data).then((zip) => {
            projectsToUpdate.forEach(projectName => {
                updateProject(projectName, zip, latestVersion);
            });
            callback();
        }).catch((err) => {
            console.log('[LAUNCHER] Error extracting zip:', err.message);
            callback();
        });
    });
}

function updateProject(projectName, zip, latestVersion) {
    const projectDir = __dirname + '/' + projectName;
    
    // Сохраняем существующие JSON файлы
    const savedFiles = {};
    fs.readdirSync(projectDir).forEach(file => {
        if (path.extname(file) === '.json') {
            savedFiles[file] = fs.readFileSync(projectDir + '/' + file);
        }
    });

    // Удаляем старые файлы (кроме сохраненных JSON)
    fs.readdirSync(projectDir).forEach(file => {
        if (path.extname(file) !== '.json') {
            const filePath = projectDir + '/' + file;
            if (fs.lstatSync(filePath).isDirectory()) {
                deleteFolderRecursive(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        }
    });

    // Извлекаем новые файлы
    zip.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir) {
            const contentPath = relativePath.replace(/^[^/]+\//, ''); // Убираем префикс релиза
            if (contentPath.startsWith('projects/')) {
                const targetPath = contentPath.replace('projects/', projectName + '/');
                const fullPath = __dirname + '/' + targetPath;
                
                // Пропускаем JSON файлы которые уже есть
                if (path.extname(targetPath) === '.json' && savedFiles[path.basename(targetPath)]) {
                    return;
                }

                zipEntry.async('nodebuffer').then(content => {
                    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
                    fs.writeFileSync(fullPath, content);
                });
            }
        }
    });

    // Восстанавливаем сохраненные JSON файлы
    for (const fileName in savedFiles) {
        fs.writeFileSync(projectDir + '/' + fileName, savedFiles[fileName]);
    }

    // Обновляем версию
    fs.writeFileSync(projectDir + '/version.json', JSON.stringify({ version: latestVersion }));
    
    console.log(`[${projectName}] Updated to version ${latestVersion}`);
}

function downloadFile(url, dest, callback) {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(callback);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        callback(err);
    });
}

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            const curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

// =========== UPDATE ===========
// =========== UPDATE ===========
// =========== UPDATE ===========

// =========== RUN ===========
// =========== RUN ===========
// =========== RUN ===========


const {Worker} = require('worker_threads');

function run_proj(name, callback) {
	console.log('['+name+'] Runing');
	if (!fs.existsSync('./'+name+'/index.js')) {
		console.log('['+name+'] ERROR: '+name+'/index.js not found!');
		process.exit(1);
	}
	
	const proj_worker = new Worker('./'+name+'/index.js', { workerData: JSON.stringify(settings[name]) });
	proj_worker.on('message', (s)=>{
		if (s=='$run') { console.log('['+name+'] OK!'); callback(); return; }
		if (s=='$end_close') { console.log('['+name+'] closed!'); continue_closing(); return; }
		console.log('['+name+'] >'+s);
	});
	proj_worker.on('error', (err) => { console.log('['+name+'] ERROR: '+err+': '+err.stack.replace(/\r?\n/g, '\\n')); save_all_and_close(); });
	proj_worker.on('exit', (code) => { console.log('['+name+'] Stopped with exit code '+code); save_all_and_close(); });
	projects[name].worker = proj_worker;
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
			
			console.log('['+x+'] ERROR: '+x+' not found!');
			process.exit(1);
		}
	}
}

// =========== RUN ===========
// =========== RUN ===========
// =========== RUN ===========

checkAndUpdateProjects(() => {
	try_run_projects();
});

