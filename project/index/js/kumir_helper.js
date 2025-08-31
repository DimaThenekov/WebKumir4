//console.log('');
function f_цел_в_лит(x) {
	x=v([x])[0];
	return x.toString();
}
function f_вещ_в_лит(x) {
	x=v([x])[0];
	return x.toString();
}
function f_лит_в_цел(x) {
	x=v([x])[0];
	return parseInt(x);
}
function f_лит_в_вещ(x) {
	x=v([x])[0];
	return parseInt(x);
}
function f_Е73Е71Е72Е74(x) {
	x=v([x])[0];
	return Math.sqrt(x);
}
function f_Е61Е62Е73(x) {
	x=v([x])[0];
	return Math.abs(x);
}
function f_Е69Е61Е62Е73(x) {
	x=v([x])[0];
	return Math.abs(x);
}
function f_Е73Е69Е67Е6Е(x) {
	x=v([x])[0];
	if (x < 0)
		return -1;
	if (x == 0)
		return 0;
	if (x > 0)
		return 1;
}
function f_Е73Е69Е6Е(x) {
	x=v([x])[0];
	return Math.sin(x);
}
function f_Е63Е6ФЕ73(x) {
	x=v([x])[0];
	return Math.cos(x);
}
function f_Е74Е67(x) {
	x=v([x])[0];
	return Math.tg(x);
}
function f_Е63Е74Е67(x) {
	x=v([x])[0];
	return 1 / Math.tan(x); ;
}
function f_Е61Е72Е63Е73Е69Е6Е(x) {
	x=v([x])[0];
	return Math.asin(x);
}
function f_Е61Е72Е63Е63Е6ФЕ73(x) {
	x=v([x])[0];
	return Math.acos(x);
}
function f_Е61Е72Е63Е74Е67(x) {
	x=v([x])[0];
	return Math.atan(x);
}
function f_Е61Е72Е63Е63Е74Е67(x) {
	x=v([x])[0];
	return Math.PI / 2 - Math.atan(x);
}
function f_Е6СЕ6Е(x) {
	x=v([x])[0];
	return Math.ln(x);
}
function f_Е6СЕ67(x) {
	x=v([x])[0];
	return Math.log(x);
}
function f_Е65Е78Е70(x) {
	x=v([x])[0];
	return Math.exp(x);
}
function f_Е6ДЕ69Е6Е(x, y) {
	x=v([x])[0];
	y=v([y])[0];
	return Math.min(x, y);
}
function f_Е6ДЕ61Е78(x, y) {
	x=v([x])[0];
	y=v([y])[0];
	return Math.max(x, y);
}
function f_Е6ДЕ6ФЕ64(x, y) {
	x=v([x])[0];
	y=v([y])[0];
	return x % y;
}
function f_Е64Е69Е76(x, y) {
	x=v([x])[0];
	y=v([y])[0];
	return (x - x % y) / y;
}
function f_Е69Е6ЕЕ74(x) {
	x=v([x])[0];
	return Math.floor(x);
}
function f_Е72Е6ЕЕ64(x) {
	x=v([x])[0];
	return Math.floor(Math.random() * x);
}
function f_длин(x) {
	x=v([x])[0];
	return x.length;
}
function f_код(x) {
	x=v([x])[0];
	return x.charCodeAt();
}
function f_символ(x) {
	x=v([x])[0];
	return String.fromCharCode(x);
}
function f_юникод(x) {
	x=v([x])[0];
	return x.charCodeAt();
}
function f_символ2(x) {
	x=v([x])[0];
	return String.fromCharCode(x);
}

function f_слева_свободно() {
	return getmap(1, 1)
}
function f_справа_свободно() {
	return getmap(1, 2)
}
function f_сверху_свободно() {
	return getmap(1, 3)
}
function f_снизу_свободно() {
	return getmap(1, 4)
}
function f_слева_стена() {
	return getmap(2, 1)
}
function f_справа_стена() {
	return getmap(2, 2)
}
function f_сверху_стена() {
	return getmap(2, 3)
}
function f_снизу_стена() {
	return getmap(2, 4)
}
function f_клетка_закрашена() {
	return getmap(3, 1)
}
function f_клетка_чистая() {
	return getmap(3, 2)
}
function f_радиация() {
	return getmap(4, 1)
}
function f_температура() {
	return getmap(4, 2)
}


var str_timer = 0;
var start = new Date;
var out_array = [];
var on_error = false;
var str = 0;
var map = undefined;
var playerX = 0;
var playerY = 0;
var input_dat='';
var outp_dat='';
function parsemap(inp_text) {
	var split_text = inp_text.split('\n');
	mapsizeX = parseInt(split_text[1].split(' ')[0]);
	mapsizeY = parseInt(split_text[1].split(' ')[1]);
	if (map.length != mapsizeX + 2)
		map = new Array(mapsizeX + 2);
	for (var i = 0; i < map.length; i++)
		if (map[i] == undefined || map[i].length != mapsizeY + 2)
			map[i] = new Array(mapsizeY + 2);
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			if (map[i][j] == undefined || map[i][j].length != 7)
				map[i][j] = new Array(7);
			map[i][j][0] = 0; //Wall
			map[i][j][1] = 0; //Color
			map[i][j][2] = 0; //Radiation
			map[i][j][3] = 0; //Temperature
			map[i][j][4] = "$"; //Symbol
			map[i][j][5] = "$"; //Symbol1
			map[i][j][6] = ""; //Point
		}
	}
	playerX = parseInt(split_text[3].split(' ')[0]);
	playerY = parseInt(split_text[3].split(' ')[1]);
	for (var i = 0; i < mapsizeX + 1; i++) {
		for (var j = 0; j < mapsizeY + 1; j++) {
			map[i][j][0] = 0; //Wall
			map[i][j][1] = 0; //Color
			map[i][j][2] = 0; //Radiation
			map[i][j][3] = 0; //Temperature
			map[i][j][4] = "$"; //Symbol
			map[i][j][5] = "$"; //Symbol1
			map[i][j][6] = ""; //Point
			//}
		}
	}
	var j = 5;
	while (j < split_text.length) {
		//document.getElementById('area').value
		smapline = split_text[j].split(' ');
		if (split_text[j]=='')
			break;
		if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(split_text[j][0]) == -1)
			break;
		if (smapline.length > 2) {
			map[smapline[0]][smapline[1]][0] = parseInt(smapline[2]); //Wall
			map[smapline[0]][smapline[1]][1] = parseFloat(smapline[3]); //Color
			map[smapline[0]][smapline[1]][2] = parseFloat(smapline[4]); //Radiation
			map[smapline[0]][smapline[1]][3] = parseFloat(smapline[5]); //Temperature
			map[smapline[0]][smapline[1]][4] = smapline[6].trim(); //Symbol
			map[smapline[0]][smapline[1]][5] = smapline[7].trim(); //Symbol1
			map[smapline[0]][smapline[1]][6] = smapline[8].trim(); //Point
		}
		j++;
	}
	/*
;input_data_start
120 321 123
;input_data_end
;out_data_start
321 123
;out_data_end
	*/
	var flag=0;
	while (j<split_text.length)
	{
		if (split_text[j]==";input_data_end")
		{
			if (flag==1)
				flag=0;
			else
			{
				out_array.push([0, 11]);
				console.log('Ошибка чтения файла');
				out_array.push([-100, 'Ошибка чтения файла', 0]);
				on_error = true;
				return;
			}
		}
		if (split_text[j]==";out_data_end")
		{
			if (flag==2)
				flag=0;
			else
			{
				out_array.push([0, 11]);
				console.log('Ошибка чтения файла');
				out_array.push([-100, 'Ошибка чтения файла', 0]);
				on_error = true;
				return;
			}
		}
		if (flag==1)
			input_dat+=split_text[j]+'\n';
		if (flag==2)
			outp_dat+=split_text[j]+'\n';
		if (split_text[j]==";input_data_start")
		{
			if (flag==0)
				flag=1;
			else
			{
				out_array.push([0, 11]);
				console.log('Ошибка чтения файла');
				out_array.push([-100, 'Ошибка чтения файла', 0]);
				on_error = true;
				return;
			}
		}
		if (split_text[j]==";out_data_start")
		{
			if (flag==0)
				flag=2;
			else
			{
				out_array.push([0, 11]);
				console.log('Ошибка чтения файла');
				out_array.push([4, 'Ошибка чтения файла', 0]);
				on_error = true;
				return;
			}
		}
		j++;
	}
}

if (map_text != undefined && map_text != '') {
	map = new Array(4);
	parsemap(map_text.replace(/[\r]/g, ''));
}
function p_вправо() {
	if (RQuWall(playerX, playerY, 1))
		out_array.push([0, 1]);
	else {
		out_array.push([0, 11]);
		console.log('Робот разбился');
		out_array.push([11, 'Робот разбился', GetStr()]);
		on_error = true;
		return [];
	}
	playerX++;
	return;
}
function p_вниз() {
	if (RQuWall(playerX, playerY, 3))
		out_array.push([0, 2]);
	else {
		out_array.push([0, 12]);
		console.log('Робот разбился');
		out_array.push([11, 'Робот разбился', GetStr()]);
		on_error = true;
		return [];
	}
	playerY++;
	return;
}
function p_влево() {
	if (RQuWall(playerX, playerY, 0))
		out_array.push([0, 0]);
	else {
		out_array.push([0, 10]);
		console.log('Робот разбился');
		out_array.push([11, 'Робот разбился', GetStr()]);
		on_error = true;
		return [];
	}
	playerX--;
	return;
}
function p_вверх() {
	if (RQuWall(playerX, playerY, 2))
		out_array.push([0, 3]);
	else {
		out_array.push([0, 13]);
		console.log('Робот разбился');
		out_array.push([11, 'Робот разбился', GetStr()]);
		on_error = true;
		return [];
	}
	playerY--;
	return;
}
function p_закрасить() {
	if (RQuWall(playerX, playerY, -1) == 0) {
		out_array.push([0, 4]);
		map[playerX][playerY][1] = 1;
	} else {
		//out_array.push([0, 14]);
		//console.log('Робот не может закрасить закрашенное');
		//out_array.push([11, 'Робот не может закрасить закрашенное', GetStr()]);
		//on_error = true;
		//return [];
	}
	return;
}

//,'getmap(1,1)','getmap(1,2)','getmap(1,3)','getmap(1,4)','getmap(2,1)','getmap(2,2)','getmap(2,3)','getmap(2,4)','getmap(3,1)','getmap(3,2)','getmap(4,1)','getmap(4,2)
//,'слева свободно','справа свободно','сверху свободно','снизу свободно','слева стена','справа стена','сверху стена','снизу стена','клетка закрашена','клетка чистая','радиация','температура'
function getmap(x, y) {
	if (x == 1) {
		switch (y) {
		case 1:
			return RQuWall(playerX, playerY, 0);
			break;
		case 2:
			return RQuWall(playerX, playerY, 1);
			break;
		case 3:
			return RQuWall(playerX, playerY, 2);
			break;
		case 4:
			return RQuWall(playerX, playerY, 3);
			break;
		}
	}
	if (x == 2) {
		switch (y) {
		case 1:
			return !RQuWall(playerX, playerY, 0);
			break;
		case 2:
			return !RQuWall(playerX, playerY, 1);
			break;
		case 3:
			return !RQuWall(playerX, playerY, 2);
			break;
		case 4:
			return !RQuWall(playerX, playerY, 3);
			break;
		}
	}
	if (x == 3) {
		switch (y) {
		case 1:
			return RQuWall(playerX, playerY, -1) != 0;
			break;
		case 2:
			return RQuWall(playerX, playerY, -1) == 0;
			break;
		}
	}
	if (x == 4) {
		switch (y) {
		case 1:
			return RQuWall(playerX, playerY, -2);
			break;
		case 2:
			return RQuWall(playerX, playerY, -3);
			break;
		}
	}
}
//debugger;
function RQuWall(pos1, pos2, a) {
	if (!((pos1 >= 0) && (pos2 >= 0) && (pos1 < mapsizeX) && (pos2 < mapsizeY)))
		return false;
	if (a == -1) {
		return (map[pos1][pos2][1]); //Color
	}
	if (a == -2) {
		return (map[pos1][pos2][2]); //Radiation
	}
	if (a == -3) {
		return (map[pos1][pos2][3]); //Temperature
	}
	if (a == 0) {//left
		if (pos1 > 0)
			return ((((map[pos1][pos2][0] >> 0) & 1) != 1) && (((map[pos1 - 1][pos2][0] >> 1) & 1) != 1));
		if (pos1 == 0)
			return false;
	}
	if (a == 1) {//right
		if (pos1 < mapsizeX - 1)
			return ((((map[pos1][pos2][0] >> 1) & 1) != 1) && (((map[pos1 + 1][pos2][0] >> 0) & 1) != 1));
		if (pos1 == (mapsizeX - 1))
			return false;
	}
	if (a == 2) {//up
		if (pos2 > 0)
			return ((((map[pos1][pos2][0] >> 3) & 1) != 1) && (((map[pos1][pos2 - 1][0] >> 2) & 1) != 1));
		if (pos2 == 0)
			return false;
	}
	if (a == 3) {//down
		if (pos2 < mapsizeY - 1)
			return ((((map[pos1][pos2][0] >> 2) & 1) != 1) && (((map[pos1][pos2 + 1][0] >> 3) & 1) != 1));
		if (pos2 == mapsizeY - 1)
			return false;
	}
}

function GetStr() {
	str_timer++;
	return str;
}

function SetStr(x) {
	if (out_array.length > 30000) //big data
		return true;
	if (str_timer > 10000 && (end - start > 100))
		return true;
	//if (end - start > 1000)
	//	return true;
	if (on_error)
		return true;
	str_timer++;
	str = x;
	var end = new Date;
	out_array.push([-2, str]);
	return false;
}
function prog_write(s,__str)
{
	if (__str==undefined)
	{
		out_array.push([-3, str, s]);
	}else
	{
		out_array.push([-3, __str, s]);
	}
	return true;
}

function GetType(x) {
	if (typeof x == 'number') {
		if (x == 1)
			return [2, 1];
		if (x == 0)
			return [2, 0];
		if (Math.floor(x) == x)
			return [0, x];
		else
			return [1, x];
	} else
		if (typeof x == 'string') {
			if (x.length == 1)
				return [3, x];
			else
				return [4, x];
		} else
			if (x == true || x == false) {
				if (x == true)
					return [2, 1];
				else
					return [2, 0];
			} else
				if (typeof x == 'symbol') {
					return [3, x];
				} else
					if (x['type'] != undefined) {
						return [x['type'], x['value']];
					} else {
						console.log('Неизвестный тип: ' + x); //надеюсь этого не будет
						out_array.push([10, 'Неизвестный тип: ' + x, GetStr()]);
						on_error = true;
						return [];
					}
}

function Not(x) {
	return Calc(x, '!', 0);
}
function Power(x, y) {
	return Calc(x, '**', y);
}
function Mul(x, y) {
	return Calc(x, '*', y);
}
function Del(x, y) {
	return Calc(x, '/', y);
}
function Del(x, y) {
	return Calc(x, '/', y);
}
function Sum(x, y) {
	return Calc(x, '+', y);
}
function Min(x, y) {
	return Calc(x, '-', y);
}
function Srav(o, x, y) {
	return Calc(x, o, y);
}
function v(a) {
	var b = [];
	for (i = 0; i < a.length; i++) {
		var type1 = GetType(a[i]);
		b.push(type1[1]);
	}
	return b;
}
function Val(x, y) {
	//debugger;
	var type1 = GetType(x);
	var type2 = GetType(y);
	var canit = [[1, 0, 1, 0, 0], [1, 1, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 1]];
	if (canit[type1[0]][type2[0]] == 1) {
		x["value"] = type2[1];
	} else {
		console.log('Путаница с типами. Нельзя присваивать разные типы');
		out_array.push([10, 'Путаница с типами. Нельзя присваивать разные типы', GetStr()]);
		on_error = true;
		return 'kek';
	}
}
function ParseArgument(obj) {
	for (var i = 0; i < obj["a1"].length; i++) {
		switch (obj["a2"][i]) {
		case 'арг':
			obj["a1"][i] = NewType(obj["a3"][i]);
			obj["a1"][i]["const"] = true;
			break;
		case 'рез':
			obj["a1"][i] = NewType(obj["a3"][i]);
			break;
		case 'аргрез':
			break;
		}
	}
}
String.prototype.trimLeft = String.prototype.trimLeft || function () {
    var start = -1;

    while( this.charCodeAt(++start) < 33 );

    return this.slice( start, this.length);
};
function Get_Inp(obj) {
	for (var i=0;i<obj["inp"].length;i++)
	{
		var type1 = GetType(obj["inp"][i]);
		if (type1.length != 2 || (type1.length == 2 && type1[0] > 9)) {
			console.log('Бред какойто1: ' + type1 + ';' + x1 + ';' + s + ';' + x2);
			out_array.push([10, 'Бред какойто1: ' + type1 + ';' + x1 + ';' + s + ';' + x2, GetStr()]);
			on_error = true;
			return 'kek';
		}
		if (input_dat==""&&type1[0]!=4)
		{
			console.log('Не удалось прочитать число (Закончились входные данные)');
			out_array.push([10, 'Не удалось прочитать число (Закончились входные данные)', GetStr()]);
			on_error = true;
			return 'kek';
		}
		if (type1[0]<3)//int(0),bool(2),float(1)
		{
			if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(input_dat[0]) != -1) {
				var out = '';
				var j = 0;
				while (j < input_dat.length && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(input_dat[j]) != -1) {
					out += input_dat[j];
					j++;
				}
				input_dat = input_dat.substring(input_dat.indexOf(out) + out.length, input_dat.length).trimLeft();
				Val(obj["inp"][i],parseFloat(out));
			}
			else
			{
				console.log('Не удалось прочитать число');
				out_array.push([10, 'Не удалось прочитать число', GetStr()]);
				on_error = true;
				return 'kek';
			}
		}else{//string(4),char(3)
			if (type1[0]==3)
			{
				Val(obj["inp"][i],input_dat[0]);
				input_dat=input_dat.slice(1);
			}
			else
			{
				Val(obj["inp"][i],input_dat.split('\n')[0]);
				input_dat = input_dat.substring(input_dat.indexOf(input_dat.split('\n')[0]) + input_dat.split('\n')[0].length, input_dat.length);
			}
			
		}
	}
}
function Calc(x1, s, x2) {
	var type1 = GetType(x1);
	var type2 = GetType(x2);
	if (type1.length != 2 || (type1.length == 2 && type1[0] > 9)) {
		console.log('Бред какойто1: ' + type1 + ';' + x1 + ';' + s + ';' + x2);
		out_array.push([10, 'Бред какойто1: ' + type1 + ';' + x1 + ';' + s + ';' + x2, GetStr()]);
		on_error = true;
		return 'kek';
	}
	if (type2.length != 2 || (type2.length == 2 && type1[0] > 9)) {
		console.log('Бред какойто2: ' + type2 + ';' + x1 + ';' + s + ';' + x2);
		out_array.push([10, 'Бред какойто2: ' + type2 + ';' + x1 + ';' + s + ';' + x2, GetStr()]);
		on_error = true;
		return 'kek';
	}
	//var for_case = type1[0] * 100 + ['**', '*', '/', '+', '-'].indexOf(s) * 10 + type2[0];
	switch (s) {
	case '**':
		if ((type1[0] > 2) || (type2[0] > 2)) {
			console.log('Оператор ** Не может работать со строками');
			out_array.push([10, 'Оператор ** Не может работать со строками', GetStr()]);
			on_error = true;
			return 'kek';
		} else {
			return Math.pow(type1[1],type2[1]);
		}
		break;
	case '*':
		if ((type1[0] > 2) && (type2[0] > 2)) {
			console.log('Оператор * не может работать с двумя строками');
			out_array.push([10, 'Оператор * не может работать с двумя строками', GetStr()]);
			on_error = true;
			return 'kek';
		} else {
			if (type1[0] > 2) {
				if (type2[0] != 1 || type2[1] < 0) {
					console.log('Оператор * не может работать со строкой и не натуральным(включая ноль) числом');
					out_array.push([10, 'Оператор * не может работать со строкой и не натуральным(включая ноль) числом', GetStr()]);
					on_error = true;
					return 'kek';
				}
				return type1[1].repeat(type2[1]);
			}
			if (type2[0] > 2) {
				if (type1[0] != 1 || type1[1] < 0) {
					console.log('Оператор * не может работать со строкой и не натуральным(включая ноль) числом');
					out_array.push([10, 'Оператор * не может работать со строкой и не натуральным(включая ноль) числом', GetStr()]);
					on_error = true;
					return 'kek';
				}
				return type2[1].repeat(type1[1]);
			}
			return type1[1] * type2[1];
		}
		break;
	case '/':
		if ((type1[0] > 2) || (type2[0] > 2)) {
			console.log('Оператор / не может работать со стороками');
			out_array.push([10, 'Оператор / не может работать со стороками', GetStr()]);
			on_error = true;
			return 'kek';
		} else {
			if (type2[1] == 0) {
				console.log('Деление на 0!!! Бесконечности не будет)))');
				out_array.push([10, 'Деление на 0!!! Бесконечности не будет)))', GetStr()]);
				on_error = true;
				return 'kek';
			}
			return type1[1] / type2[1];
		}
		break;
	case '-':
		if ((type1[0] > 2) || (type2[0] > 2)) {
			console.log('оператор - не может работать со стороками');
			out_array.push([10, 'оператор - не может работать со стороками', GetStr()]);
			on_error = true;
			return 'kek';
		} else {
			return type1[1] - type2[1];
		}
		break;
	case '+':
		if ((type1[0] == 4 && type1[1].length == 0) || (type2[0] == 4 && type2[1].length == 0)) {
			if (type1[0] == 4 && type1[1].length == 0) {
				return type2[1];
			}
			if (type2[0] == 4 && type2[1].length == 0) {
				return type1[1];
			}
		}
		if ((type1[0] > 2) && (type2[0] > 2)) {
			return type1[1] + type2[1];
		} else {
			if (type1[0] > 2 || type2[0] > 2) {
				console.log('Оператор + не может работать со строкой и числом');
				out_array.push([10, 'Оператор + не может работать со строкой и числом', GetStr()]);
				on_error = true;
				return 'kek';
			}
			return type1[1] + type2[1];
		}
		break;
	case '!':
		if (type1[0] > 2) {
			console.log('Оператор "не" не может работать со стороками');
			out_array.push([10, 'Оператор "не" не может работать со стороками', GetStr()]);
			on_error = true;
			return 'kek';
		} else {
			if (type1[0] == 2)
				return 1 - type1[1];
			else {
				console.log('Оператор "не" не может работать с числами');
				out_array.push([10, 'Оператор "не" не может работать с числами', GetStr()]);
				on_error = true;
				return 'kek';
			}
		}
		break;
	case '<':
		if ((type1[0] == 4 && type1[1].length == 0) || (type2[0] == 4 && type2[1].length == 0)) {
			return type1[1]<type2[1];
		}
		if ((type1[0] > 2) && (type2[0] > 2)) {
			return type1[1] < type2[1];
		} else {
			if (type1[0] > 2 || type2[0] > 2) {
				console.log('Оператор < не может работать со строкой и числом');
				out_array.push([10, 'Оператор < не может работать со строкой и числом', GetStr()]);
				on_error = true;
				return 'kek';
			}
			return type1[1] < type2[1];
		}
		break;
	case '>':
		if ((type1[0] == 4 && type1[1].length == 0) || (type2[0] == 4 && type2[1].length == 0)) {
			return type1[1]>type2[1];
		}
		if ((type1[0] > 2) && (type2[0] > 2)) {
			return type1[1] > type2[1];
		} else {
			if (type1[0] > 2 || type2[0] > 2) {
				console.log('Оператор > не может работать со строкой и числом');
				out_array.push([10, 'Оператор > не может работать со строкой и числом', GetStr()]);
				on_error = true;
				return 'kek';
			}
			return type1[1] > type2[1];
		}
		break;
	case '<=':
		if ((type1[0] == 4 && type1[1].length == 0) || (type2[0] == 4 && type2[1].length == 0)) {
			return type1[1]<=type2[1];
		}
		if ((type1[0] > 2) && (type2[0] > 2)) {
			return type1[1] <= type2[1];
		} else {
			if (type1[0] > 2 || type2[0] > 2) {
				console.log('Оператор <= не может работать со строкой и числом');
				out_array.push([10, 'Оператор <= не может работать со строкой и числом', GetStr()]);
				on_error = true;
				return 'kek';
			}
			return type1[1] <= type2[1];
		}
		break;
	case '>=':
		if ((type1[0] == 4 && type1[1].length == 0) || (type2[0] == 4 && type2[1].length == 0)) {
			return type1[1]>=type2[1];
		}
		if ((type1[0] > 2) && (type2[0] > 2)) {
			return type1[1] >= type2[1];
		} else {
			if (type1[0] > 2 || type2[0] > 2) {
				console.log('Оператор >= не может работать со строкой и числом');
				out_array.push([10, 'Оператор >= не может работать со строкой и числом', GetStr()]);
				on_error = true;
				return 'kek';
			}
			return type1[1] >= type2[1];
		}
		break;
	case '=':
		if ((type1[0] == 4 && type1[1].length == 0) || (type2[0] == 4 && type2[1].length == 0)) {
			return type1[1]==type2[1];
		}
		if ((type1[0] > 2) && (type2[0] > 2)) {
			return type1[1] == type2[1];
		} else {
			if (type1[0] > 2 || type2[0] > 2) {
				console.log('Оператор = не может работать со строкой и числом');
				out_array.push([10, 'Оператор = не может работать со строкой и числом', GetStr()]);
				on_error = true;
				return 'kek';
			}
			return type1[1] == type2[1];
		}
		break;
	case '<>':
		if ((type1[0] == 4 && type1[1].length == 0) || (type2[0] == 4 && type2[1].length == 0)) {
			return type1[1]!=type2[1];
		}
		if ((type1[0] > 2) && (type2[0] > 2)) {
			return type1[1] != type2[1];
		} else {
			if (type1[0] > 2 || type2[0] > 2) {
				console.log('Оператор <> не может работать со строкой и числом');
				out_array.push([10, 'Оператор <> не может работать со строкой и числом', GetStr()]);
				on_error = true;
				return 'kek';
			}
			return type1[1] != type2[1];
		}
		break;
	case '&&':
		if ((type1[0] = 2) && (type2[0] = 2)) {
			return type1[1] && type2[1];
		} else {
				console.log('Оператор "и" не может работать не с бинарными типами данных');
				out_array.push([10, 'Оператор "и" не может работать не с бинарными типами данных', GetStr()]);
				on_error = true;
				return 'kek';
		}
		break;
	case '||':
		if ((type1[0] = 2) && (type2[0] = 2)) {
			return type1[1] || type2[1];
		} else {
				console.log('Оператор "или" не может работать не с бинарными типами данных');
				out_array.push([10, 'Оператор "или" не может работать не с бинарными типами данных', GetStr()]);
				on_error = true;
				return 'kek';
		}
		break;
	default:
		console.log('Неизвестный оператор: ' + s);
		out_array.push([10, 'Неизвестный оператор: ' + s, GetStr()]);
		on_error = true;
		return 'kek';
	}
}
function NewType(s, x1, x2, y1, y2, z1, z2) {
	if (x1 == undefined)
		x1 = 0;
	if (x2 == undefined)
		x2 = 0;
	if (y1 == undefined)
		y1 = 0;
	if (y2 == undefined)
		y2 = 0;
	if (z1 == undefined)
		z1 = 0;
	if (z1 == undefined)
		z1 = 0;
	switch (s) {
	case 'цел':
		return {
			'value': 0,
			'type': 0,
			'd': 0,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'вещ':
		return {
			'value': 0.0,
			'type': 1,
			'd': 0,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'лог':
		return {
			'value': 0,
			'type': 2,
			'd': 0,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'сим':
		return {
			'value': ' ',
			'type': 3,
			'd': 0,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'лит':
		return {
			'value': '',
			'type': 4,
			'd': 1,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'целтаб':
		return {
			'value': {},
			'type': 10,
			'd': 3,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'вещтаб':
		return {
			'value': {},
			'type': 20,
			'd': 3,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'логтаб':
		return {
			'value': {},
			'type': 30,
			'd': 3,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'симтаб':
		return {
			'value': {},
			'type': 50,
			'd': 3,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	case 'литтаб':
		return {
			'value': {},
			'type': 40,
			'd': 4,
			'x1': x1,
			'x2': x2,
			'y1': y1,
			'y2': y2,
			'z1': z1,
			'z2': z2,
			'const': false
		};
		break;
	default:
		console.log('Неизвестный оператор: ' + s);
		out_array.push([10, 'Неизвестный оператор: ' + s, GetStr()]);
		on_error = true;
		return 'kek';
	}
}

var v_МЦЕЛ;
v_МЦЕЛ = 2147483647;
var v_МВЕЩ;
v_МВЕЩ = 1.7976931348623157e+308;
var v_да;
v_да = 1;
var v_нет = 0;
v_нет = 0;
var v_нс;
v_нс = '\r\n';
var program_output='';
function isall() {
	var v=0;
	var real_program_output='';
	for (var i=0;i<program_output.split('\n').length;i++)
		if (program_output.split('\n')[i]!="")
			real_program_output+=program_output.split('\n')[i].trim()+'\n';
	var real_outp_dat='';
	for (var i=0;i<outp_dat.split('\n').length;i++)
		if (outp_dat.split('\n')[i]!="")
			real_outp_dat+=outp_dat.split('\n')[i].trim()+'\n';
	if (real_program_output!=real_outp_dat)
	{
		console.log('Вывод программы неверный');
		out_array.push([11, 'Вывод программы неверный', GetStr()]);
		on_error = true;
	}
	for (var i9 = 0; i < map.length; i++)
		for (var j = 0; j < map[i].length; j++)
			if (((map[i][j][6]=='')!=(map[i][j][1]==0)))
			{
				if (v<1)
				{
					v++;
					console.log('Закрашеность не соотвествует метке (X:'+(i)+',Y:'+(j)+')');
					out_array.push([11, 'Закрашеность не соотвествует метке (X:'+(i)+',Y:'+(j)+')', GetStr()]);
					on_error = true;
				}else
				if (v==1)
				{
					v++;
					console.log('Закрашеность не соотвествует меткам');
					out_array.push([11, 'Закрашеность не соотвествует меткам', GetStr()]);
					on_error = true;
				}
			}
	for (var i = 0; i < map.length; i++)
		for (var j = 0; j < map[i].length; j++)
		{
			if (map[i][j][5]=='B' || map[i][j][4]=='B'||map[i][j][5]=='В' || map[i][j][4]=='В')
				if (((i!=playerX)||(j!=playerY))&&(v<5))
				{
					v++;
					console.log('Робот не вернулся в необходимую(точка B) позицию');
					out_array.push([11, 'Робот не вернулся в необходимую(точка B) позицию', GetStr()]);
					on_error = true;
				}
			if (map[i][j][5]=='Б' || map[i][j][4]=='Б')
				if (((i!=playerX)||(j!=playerY))&&(v<5))
				{
					v++;
					console.log('Робот не вернулся в необходимую(точка Б) позицию');
					out_array.push([11, 'Робот не вернулся в необходимую(точка Б) позицию', GetStr()]);
					on_error = true;
				}
		}
	v_МЦЕЛ = null;
	v_МВЕЩ = null;
	v_да = null;
	v_нет = null;
	v_нс = null;
	program_output='';
	str_timer = 0;
	start =  null;
	//out_array = null;
	on_error = null;
	str = null;
	map = null;
	playerX = null;
	playerY = null;
	input_dat = null;
	outp_dat=null;
}


/*использовать Робот
алг
нач
цел к
к
кек(кек2(2,3),2)
кон
алг кек(цел а,б)
нач
вывод а*б
кон
алг цел кек2(цел а,б)
нач
знач:= а+б
кон

использовать Робот
алг Миссия 
дано | Богатыри стоят у передней стенки прямоугольной 
     | пирамиды.
надо | Провести богатырей к черному ходу, расположенному 
     | в задней стенке пирамиды на таком же 
     | расстояниии от левой стенки этой пирамиды
     | относительно начальной позиции Богатырей.
     | Используйте переменные.
нач
цел n
n := 0

если слева свободно то
вывод "слева свободно", нс
все
если сверху свободно то
вывод "сверху свободно", нс
все
если справа свободно то
вывод "справа свободно", нс
все
если снизу свободно то
вывод "снизу свободно", нс
все
если слева стена то
вывод "слева стена", нс
все
если сверху стена то
вывод "сверху стена", нс
все
если справа стена то
вывод "справа стена", нс
все
если снизу стена то
вывод "снизу стена", нс
все
если клетка закрашена то
вывод "клетка закрашена", нс
все
если клетка чистая то
вывод "клетка чистая", нс
все
вывод "радиация:", радиация , нс
вывод "температура:", температура , нс
вправо
вниз
влево
вверх
 
нц пока справа свободно
вправо
n := n + 1
кц
вверх

нц пока слева стена 
вверх

кц

нц n раз
влево

кц
кон








использовать Робот
алг
нач
	закрасить
	вправо
	вправо
	закрасить
	вправо
	вправо
	закрасить
	вправо
	вправо
	закрасить
	вправо
	вправо
	закрасить
	вправо
	вправо
	закрасить
	вниз
	вниз
	закрасить
	вниз
	вниз
	закрасить
	вниз
	вниз
	закрасить
	влево
	влево
	закрасить
	влево
	влево
	закрасить
	влево
	влево
	закрасить
	влево
	влево
	закрасить
	влево
	влево
	закрасить
	вверх
	вверх
	закрасить
	вверх
	вверх
	закрасить
	вверх
	вверх
кон

использовать Робот
алг
нач
	нц пока справа свободно
		вправо
		вправо
		закрасить
	кц
	нц пока снизу свободно
		вниз
		вниз
		закрасить
	кц
	нц пока слева свободно
		влево
		влево
		закрасить
	кц
	нц пока сверху свободно
		вверх
		вверх
		закрасить
	кц
кон 
*/
