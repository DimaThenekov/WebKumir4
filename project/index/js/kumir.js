//old school from dim0n4eg
var debug = false;

//var kumir_helper = '';
var steps = []; //str0 // влево // вправо // вниз // вверх
/*var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var xhr = new XHR();
xhr.open('GET', 'js/kumir_helper.js', true);
xhr.onload = function () {
	if (xhr.status == 200) {
		if (this.status == 200) {
			kumir_helper = (this.responseText);
		}
	} else
		xhr.onerror();
}
xhr.onerror = function () {
	if (debug)
		console.log('Сервер не ответил(5.1).');
}
xhr.send();*/
function dellSlashes(s) {
	return s.replace(/\\\\/g, '\\').replace(/\\\//g, '\/').replace(/\\b/g, '\b').replace(/\\f/g, '\f').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t').replace(/\\"/g, '\"');
}
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) {
		var k;
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = +fromIndex || 0;
		if (Math.abs(n) === Infinity) {
			n = 0;
		}
		if (n >= len) {
			return -1;
		}
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		while (k < len) {
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}
String.prototype.trimLeft = String.prototype.trimLeft || function () {
	var start = -1;
	while (this.charCodeAt(++start) < 33);

	return this.slice(start, this.length);
};
var system_prefix='EX2q1LaWd9CaICnc3LrQ_';
var Asm_map = '';
var Asm_programm = [];
var Asm_steck = [];
var Asm_procedures = {};
var output_arr=[];
function Asm_error(s,souse_i,asm_i) {
	console.error([s,souse_i,asm_i]);
}
function MakeAsmSteps(i_max) {
	//debugger;
	var start2 = new Date;
	var i_step=1;
	var sourse_ind=0;
	var map = undefined;
	var playerX = 0;
	var playerY = 0;
	var input_dat='';
	var outp_dat='';
	var program_output='';
	var out_p=0;
	function parsemap(inp_text) {
		var inp_map = JSON.parse(inp_text);
		var split_text = inp_map.fil.split('\n');
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
	;use_tsicl
	;use_vl_tsicl
		*/
		
		input_dat=inp_map.input||'';//split_text[j]+'\n';
		outp_dat=inp_map.expected_output||'';
		/*
		var flag=0;
		while (j<split_text.length)
		{
			if (split_text[j].trim()==";use_tsicl")
				out_p=1;
			if (split_text[j].trim()==";use_vl_tsicl")
				out_p=2;
			if (split_text[j]==";input_data_end")
			{
				if (flag==1)
					flag=0;
				else
				{
					output_arr.push([11,'Ошибка чтения файла1',0]);
					return;
				}
			}
			if (split_text[j]==";out_data_end")
			{
				if (flag==2)
					flag=0;
				else
				{
					output_arr.push([11,'Ошибка чтения файла2',0]);
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
					output_arr.push([11,'Ошибка чтения файла3',0]);
					return;
				}
			}
			if (split_text[j]==";out_data_start")
			{
				if (flag==0)
					flag=2;
				else
				{
					output_arr.push([11,'Ошибка чтения файла4',0]);
					return;
				}
			}
			j++;
		}
		*/
	}
	if (Asm_map != undefined && Asm_map != '') {
		map = new Array(4);
		parsemap(Asm_map.replace(/[\r]/g, ''));
	}
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
	
	for (var i=Asm_steck.length-1;i>=0;i--)
		if (Asm_steck[i][0]=='F')
		{
			i_step=Asm_steck[i][2];
			break;
		}
	function MyTypeOf(x)
	{
		if (typeof x == 'number') {
			if (x == 1)
				return 'b';
			if (x == 0)
				return 'b';
			if (Math.floor(x) == x)
				return 'i';
			else
				return 'f';
		} else
			if (typeof x == 'string') {
				if (x.length == 1)
					return 'c';
				else
					return 's';
			} else
				if (x == true || x == false) {
					if (x == true)
						return 'b';
					else
						return 'b';
				} else
					if (typeof x == 'symbol') {
						return 'c';
					} else
						{
							return '_not_type_';
						}
	}
	function limitStr(str, n, symb) {
		if (!n && !symb) return str;
		symb = symb || '...';
		return str.substr(0, n - symb.length) + symb;
	}
	function v(_t,_v)
	{
		if (_t.indexOf(_v[0])>=0)
		{
			return _v[1];
		}
		else
		{
			if (_v[0]=='v')
			{
				return _v[2];
			}else
			{
				output_arr.push([11,'Несовместимость типов',sourse_ind]);
				return undefined;
			}
		}
	}
	var _commadnd_cound_i=0;
	var _commadnd_cound_line=0;
	var tsicl=0;
	var Asm_steck_robot=[];
	var vl_tsikl=false;
	for (var i=0;i<i_max;i++)
	{
		_commadnd_cound_i++;
		switch (Asm_programm[i_step].split(' ')[0]) {
			case "BEGIN":
				Asm_steck.push(['L','BEGIN']);
				i_step++;
				break;
			case "$RUN":
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (Asm_steck[j][0]=='F')
					{
						Asm_steck[j][2]=i_step;
						break;
					}
				if (Asm_procedures[GetIn(Asm_programm[i_step],' ','')]!=undefined)
				{
					Asm_steck.push(['F',GetIn(Asm_programm[i_step],' ',''),Asm_procedures[GetIn(Asm_programm[i_step],' ','')]]);
					i_step=Asm_procedures[GetIn(Asm_programm[i_step],' ','')];
				}
				else
				{
					switch (GetIn(Asm_programm[i_step],' ','').trim().toLowerCase())
					{
						
						
						
						case 'вправо':
							if (RQuWall(playerX, playerY, 1))
							{
								output_arr.push([0, 1]);
								playerX++;
							}
							else {
								output_arr.push([0, 11]);
								output_arr.push([11,'Робот разбился',sourse_ind]);
								i=i_max+1;
							}
							break;
						case 'вниз':
							if (RQuWall(playerX, playerY, 3))
							{
								output_arr.push([0, 2]);
								playerY++;
							}
							else {
								output_arr.push([0, 12]);
								output_arr.push([11,'Робот разбился',sourse_ind]);
								i=i_max+1;
							}
							break;
						case 'влево':
							if (RQuWall(playerX, playerY, 0))
							{
								output_arr.push([0, 0]);
								playerX--;
							}
							else {
								output_arr.push([0, 10]);
								output_arr.push([11,'Робот разбился',sourse_ind]);
								i=i_max+1;
							}
							break;
						case 'вверх':
							if (RQuWall(playerX, playerY, 2))
							{
								output_arr.push([0, 3]);
								playerY--;
							}
							else {
								output_arr.push([0, 13]);
								output_arr.push([11,'Робот разбился',sourse_ind]);
								i=i_max+1;
							}
							break;
						case 'закрасить':
							if (RQuWall(playerX, playerY, -1) == 0) 
							{
								output_arr.push([0, 4]);
								map[playerX][playerY][1] = 1;
							}
							else {
							}
							break;
						case 'слева_свободно':
							if (getmap(1, 1))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'справа_свободно':
							if (getmap(1, 2))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'сверху_свободно':
							if (getmap(1, 3))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'снизу_свободно':
							if (getmap(1, 4))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'слева_стена':
							if (getmap(2, 1))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'справа_стена':
							if (getmap(2, 2))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'сверху_стена':
							if (getmap(2, 3))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'снизу_стена':
							if (getmap(2, 4))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'клетка_закрашена':
							if (getmap(3, 1))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'клетка_чистая':
							if (getmap(3, 2))
								Asm_steck.push(['b',true,'да']);
							else
								Asm_steck.push(['b',false,'нет']);
							break;
						case 'радиация':
							Asm_steck.push(['f',getmap(4, 1),getmap(4, 1)+'']);
							break;
						case 'температура':
							Asm_steck.push(['f',getmap(4, 2),getmap(4, 2)+'']);
							break;

case 'цел_в_лит':
	var x=v(['b','i'],Asm_steck.pop());
	Asm_steck.push(['c', x.toString(),'цел_в_лит('+x+')']);
	break;

case 'вещ_в_лит':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['c',x.toString(),'вещ_в_лит('+x+')']);
	break;

case 'лит_в_цел':
	var x=v(['c','s'],Asm_steck.pop());
	Asm_steck.push(['i',parseInt(x),'лит_в_цел('+x+')']);
	break;

case 'лит_в_вещ':
	var x=v(['c','s'],Asm_steck.pop());
	Asm_steck.push(['f',parseFloat(x),'лит_в_вещ('+x+')']);
	break;

case 'sqrt':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.sqrt(x),'sqrt('+x+')']);
	break;

case 'abs':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.abs(x),'abs('+x+')']);
	break;

case 'iabs':
	var x=v(['b','i'],Asm_steck.pop());
	Asm_steck.push(['i',Math.abs(x),'iabs('+x+')']);
	break;

case 'sign':
	var x=v(['b','i','f'],Asm_steck.pop());
	var tmp;
	if (x < 0)
		tmp=-1
	else
	if (x == 0)
		tmp=0;
	else
		tmp=1;
	Asm_steck.push(['i',tmp,'sign('+x+')']);
	break;

case 'sin':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.sin(x),'sin('+x+')']);
	break;

case 'cos':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.cos(x),'cos('+x+')']);
	break;

case 'tg':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.tan(x),'tg('+x+')']);
	break;

case 'ctg':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',1 / Math.tan(x),'ctg('+x+')']);
	break;

case 'arcsin':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.asin(x),'arcsin('+x+')']);
	break;

case 'arccos':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.acos(x),'arccos('+x+')']);
	break;

case 'arctg':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.atan(x),'arctg('+x+')']);
	break;

case 'arcctg':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.PI / 2 - Math.atan(x),'arcctg('+x+')']);
	break;

case 'ln':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.log(x)/Math.log(Math.E),'ln('+x+')']);
	break;

case 'lg':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.log(x)/Math.log(10),'lg('+x+')']);
	break;

case 'log':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.log(x),'log('+x+')']);
	break;

case 'exp':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.exp(x),'exp('+x+')']);
	break;

case 'int':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['i',Math.floor(x),'int('+x+')']);
	break;

case 'rnd':
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.random() * x,'rnd('+x+')']);
	break;

case 'длин':
	var x=v(['c','s'],Asm_steck.pop());
	Asm_steck.push(['i',x.length,'длин('+x+')']);
	break;

case 'код':
	var x=v(['c'],Asm_steck.pop());
	Asm_steck.push(['i',KOI8.indexOf(x),'код('+x+')']);
	break;

case 'символ':
	var x=v(['b','i'],Asm_steck.pop());
	Asm_steck.push(['c',String.fromCharCode(x),'символ('+x+')']);
	break;

case 'юникод':
	var x=v(['c'],Asm_steck.pop());
	Asm_steck.push(['i',x.charCodeAt(),'юникод('+x+')']);
	break;

case 'символ2':
	var x=v(['b','i'],Asm_steck.pop());
	Asm_steck.push(['c',String.fromCharCode(x),'символ2('+x+')']);
	break;

case 'min':
	var y=v(['b','i','f'],Asm_steck.pop());
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.min(x, y),'min('+x+','+y+')']);
	break;

case 'max':
	var y=v(['b','i','f'],Asm_steck.pop());
	var x=v(['b','i','f'],Asm_steck.pop());
	Asm_steck.push(['f',Math.max(x, y),'max('+x+','+y+')']);
	break;

case 'mod':
	var y=v(['b','i'],Asm_steck.pop());
	var x=v(['b','i'],Asm_steck.pop());
	Asm_steck.push(['i',x % y,'mod('+x+','+y+')']);
	break;

case 'div':
	var y=v(['b','i'],Asm_steck.pop());
	var x=v(['b','i'],Asm_steck.pop());
	Asm_steck.push(['i',(x - x % y) / y,'div('+x+','+y+')']);
	break;


						default:
							output_arr.push([11,'Run '+GetIn(Asm_programm[i_step],' ','').trim().toLowerCase(),sourse_ind]);
							i_step++;
							break;
							//console.log('Run '+GetIn(Asm_programm[i_step],' ','').trim().toLowerCase());
					}
					i_step++;
				}
				break;
			case "$INT":
				if (true)
				{
					switch (GetIn(Asm_programm[i_step],' ','')) {
						case "SetStr":
							var _i=Asm_steck.pop();
							if (_i[0]!='i')
							{
								Asm_error('$INT SetStr type',sourse_ind,i_step);
								return 'error';
							}
							sourse_ind=_i[1];
							i_step++;
							if (sourse_ind==undefined)
								debugger;
							output_arr.push([-2, sourse_ind]);
							_commadnd_cound_line++;
							break;
						case "error":
							var _i=Asm_steck.pop();
							if (_i[0]!='s')
							{
								Asm_error('$INT error type',sourse_ind,i_step);
								return 'error';
							}
							output_arr.push([11,_i[1],sourse_ind]);
							i=i_max+1;
							i_step++;
							break;
						case "+":
							var _st2=Asm_steck.pop();
							var _st1=Asm_steck.pop();
							var _i2=v(['b','i','f','c','s'],_st2);
							var _i1=v(['b','i','f','c','s'],_st1);
							var _out_s='('+_i1+')+(';
							if (_st1[0]!='v')
								_out_s='('+_st1[2]+')+(';
							if (_st2[0]!='v')
								_out_s+=_st2[2]+')';
							else
								_out_s+=_i2+')';
							if (_out_s.length>=4999)
							{
								output_arr.push([11,'Слишком длинные вычисления',sourse_ind]);
								i=i_max+1;
							}
							else
								Asm_steck.push([MyTypeOf(_i1+_i2),_i1+_i2,_out_s]);
							i_step++;
							break;
						case "-":
							var _st2=Asm_steck.pop();
							var _st1=Asm_steck.pop();
							var _i2=v(['b','i','f'],_st2);
							var _i1=v(['b','i','f'],_st1);
							var _out_s='('+_i1+')-(';
							if (_st1[0]!='v')
								_out_s='('+_st1[2]+')-(';
							if (_st2[0]!='v')
								_out_s+=_st2[2]+')';
							else
								_out_s+=_i2+')';
							Asm_steck.push([MyTypeOf(_i1-_i2),_i1-_i2,_out_s]);
							i_step++;
							break;
						case "*":
							var _st2=Asm_steck.pop();
							var _st1=Asm_steck.pop();
							var _i2=v(['b','i','f'],_st2);
							var _i1=v(['b','i','f'],_st1);
							var _out_s='('+_i1+')*(';
							if (_st1[0]!='v')
								_out_s='('+_st1[2]+')*(';
							if (_st2[0]!='v')
								_out_s+=_st2[2]+')';
							else
								_out_s+=_i2+')';
							Asm_steck.push([MyTypeOf(_i1*_i2),_i1*_i2,_out_s]);
							i_step++;
							break;
						case "**":
							var _st2=Asm_steck.pop();
							var _st1=Asm_steck.pop();
							var _i2=v(['b','i','f'],_st2);
							var _i1=v(['b','i','f'],_st1);
							var _out_s='('+_i1+')**(';
							if (_st1[0]!='v')
								_out_s='('+_st1[2]+')**(';
							if (_st2[0]!='v')
								_out_s+=_st2[2]+')';
							else
								_out_s+=_i2+')';
							Asm_steck.push([MyTypeOf(Math.pow(_i1,_i2)),Math.pow(_i1,_i2),_out_s]);
							i_step++;
							break;
						case "/":
							var _st2=Asm_steck.pop();
							var _st1=Asm_steck.pop();
							var _i2=v(['b','i','f'],_st2);
							var _i1=v(['b','i','f'],_st1);
							var _out_s='('+_i1+')/(';
							if (_st1[0]!='v')
								_out_s='('+_st1[2]+')/(';
							if (_st2[0]!='v')
								_out_s+=_st2[2]+')';
							else
								_out_s+=_i2+')';
							if (_i2==0)
							{
								output_arr.push([11,'Деление на 0!!!',sourse_ind]);
								i=i_max+1;
							}else
							{
								Asm_steck.push([MyTypeOf(_i1/_i2),_i1/_i2,_out_s]);
							}
							i_step++;
							break;
						case "!":
							var _st1=Asm_steck.pop();
							var _i1=v(['b'],_st1);
							var _out_s='не ('+_i1+')';
							if (_st1[0]!='v')
								_out_s='не ('+_st1[2]+')';
							Asm_steck.push([MyTypeOf(_i1!=0),_i1==0,_out_s]);
							i_step++;
							break;
						//'!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>', '&&', '||'
						case "&&":
						case "||":
							var _st2=Asm_steck.pop();
							var _st1=Asm_steck.pop();
							var _i2=v(['b'],_st2);
							var _i1=v(['b'],_st1);
							var _out_s='('+_i1+')'+GetIn(Asm_programm[i_step],' ','')+'(';
							if (_st1[0]!='v')
								_out_s='('+_st1[2]+')'+GetIn(Asm_programm[i_step],' ','')+'(';
							if (_st2[0]!='v')
								_out_s+=_st2[2]+')';
							else
								_out_s+=_i2+')';
							if (GetIn(Asm_programm[i_step],' ','')=='&&')
								Asm_steck.push([MyTypeOf(_i1 && _i2),_i1 && _i2,_out_s]);
							else
								Asm_steck.push([MyTypeOf(_i1 || _i2),_i1 || _i2,_out_s]);
							i_step++;
							break;
						case "<=":
						case ">=":
						case "<>":
						case "<":
						case ">":
						case "=":
							var _st2=Asm_steck.pop();
							var _st1=Asm_steck.pop();
							var _i2=v(['b','i','f','c','s'],_st2);
							var _i1=v(['b','i','f','c','s'],_st1);
							var _out_s='('+_i1+')'+GetIn(Asm_programm[i_step],' ','')+'(';
							if (_st1[0]!='v')
								_out_s='('+_st1[2]+')'+GetIn(Asm_programm[i_step],' ','')+'(';
							if (_st2[0]!='v')
								_out_s+=_st2[2]+')';
							else
								_out_s+=_i2+')';
							var _otv=0;
							if (GetIn(Asm_programm[i_step],' ','')=='<=')
								_otv=(_i1<=_i2);
							if (GetIn(Asm_programm[i_step],' ','')=='>=')
								_otv=(_i1>=_i2);
							if (GetIn(Asm_programm[i_step],' ','')=='<>')
								_otv=(_i1!=_i2);
							if (GetIn(Asm_programm[i_step],' ','')=='<')
								_otv=(_i1<_i2);
							if (GetIn(Asm_programm[i_step],' ','')=='>')
								_otv=(_i1>_i2);
							if (GetIn(Asm_programm[i_step],' ','')=='=')
								_otv=(_i1==_i2);
							Asm_steck.push([MyTypeOf(_otv),_otv,_out_s]);
							i_step++;
							break;
						case "WRITE":
							var _i1=v(['i'],Asm_steck.pop());
							var _arr=[];
							for (var _i2=0;_i2<_i1;_i2++)
							{
								var _i3=v(['b','i','f','c','s'],Asm_steck.pop());
								if (typeof _i3 != 'number')
									_arr.push(''+_i3);
								else
									_arr.push(''+Math.round(_i3*100000000)/100000000);
							}
							_arr.reverse();
							for (var _i2=0;_i2<_i1;_i2++)
							{
								output_arr.push([-1,''+_arr[_i2]]);
								program_output+=''+_arr[_i2];
							}
							output_arr.push([-3,sourse_ind, 'Вывод "'+_arr.join('", "')+'"']);
							i_step++;
							break;
						case "READ_b":
						case "READ_i":
						case "READ_f":
						case "READ_c":
						case "READ_s":
							//input_dat
							var get_val=undefined;
							if (input_dat==""&&GetIn(Asm_programm[i_step],' ','')!="READ_s")
							{
								output_arr.push([11,'Не удалось прочитать (Закончились входные данные)',sourse_ind]);
								i=i_max+1;
							}else
								if (['READ_b','READ_i','READ_f'].indexOf(GetIn(Asm_programm[i_step],' ',''))>=0)//int(0),bool(2),float(1)
								{
									if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(input_dat[0]) != -1) {
									var out = '';
									var j = 0;
									while (j < input_dat.length && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(input_dat[j]) != -1) {
										out += input_dat[j];
										j++;
									}
									input_dat = input_dat.substring(input_dat.indexOf(out) + out.length, input_dat.length).trimLeft();
									get_val=parseFloat(out);
									}else
									{
										output_arr.push([11,'Не удалось прочитать (Ожидалось число)',sourse_ind]);
										i=i_max+1;
									}
								}else//string(4),char(3)
									if (GetIn(Asm_programm[i_step],' ','')=="READ_c")
									{
										get_val=input_dat[0];
										input_dat=input_dat.slice(1);
									}
									else
									{
										get_val=input_dat.split('\n')[0];
										input_dat = input_dat.substring(input_dat.indexOf(input_dat.split('\n')[0]) + input_dat.split('\n')[0].length, input_dat.length);
									}
							if (get_val!=undefined) 
							{
								output_arr.push([-3,sourse_ind, 'Считанно "'+get_val+'"']);
								Asm_steck.push([GetIn(Asm_programm[i_step],' ','').split('_')[1],get_val,'"'+get_val+'"']);
							}
							i_step++;
							break;
						default:
							Asm_error('Неизвестная команда при индепритации(прервания) ' + Asm_programm[i_step], sourse_ind,i_step); //Такое не может произойти правда........
							return;
					}
				}
				break;
			case "END":
				var _s=undefined;
				if (!(Asm_steck[Asm_steck.length-1][0]=='F' || Asm_steck[Asm_steck.length-1][0]=='L' || Asm_steck[Asm_steck.length-1][0]=='v'))
				{
					_s=Asm_steck[Asm_steck.length-1];
				}
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (Asm_steck[j][0]!='L')
					{
						Asm_steck.pop();
					}
					else
						break;
				if (Asm_steck[Asm_steck.length-1][1]!='BEGIN')
				{
					Asm_error('END begin_type',sourse_ind,i_step);
					return;
				}
				Asm_steck.pop();
				if (Asm_steck[Asm_steck.length-1][0]!='F')
				{
					Asm_error('END f_type',sourse_ind,i_step);
					return 'error';
				}
				Asm_steck.pop();
				if (Asm_steck.length==0)
				{
					i=i_max+1;
				}
				else
				{
					for (var j=Asm_steck.length-1;j>=0;j--)
						if (Asm_steck[j][0]=='F')
						{
							i_step=Asm_steck[j][2];
							break;
						}
					if (_s!=undefined)
						Asm_steck.push(_s);
					i_step++;
				}
				break;
			case "$IF":
				var _s=Asm_steck.pop();
				var _zn=v(['b','i'],_s);
				Asm_steck.push(['L','IF']);
				if (_zn)
				{
					i_step++;
				}else
				{
					var leng_steck=1;
					while (leng_steck)
					{
						i_step++;
						if (leng_steck==1 && Asm_programm[i_step].split(' ')[0]=='$ELSE')
						{
							i_step++;
							break;
						}
						else
						{
							switch (Asm_programm[i_step].split(' ')[0]) {
								case "$IF":
								case "$WHILE_HEAD_START":
								case "$FOR":
									leng_steck++;
									break;
								case "END":
								case "$END":
									leng_steck--;
									break;
							}
						}
					}
				}
				break;
			case "$END":
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (Asm_steck[j][0]!='L')
					{
						Asm_steck.pop();
					}else
						break;
				if (Asm_steck[Asm_steck.length-1][1]=='IF')
				{
					Asm_steck.pop();
					i_step++;
				}else
					if (Asm_steck[Asm_steck.length-1][1]=='WHILE')
					{
						//up
						i_step=Asm_steck[Asm_steck.length-1][2];
					}else
					{
						//Asm_steck.push(['L','FOR',_name,_s1,_s1,_s2,_s3,i_step+1]);
						var tmp=Asm_steck_robot[Asm_steck_robot.length-1];
						if (tmp[0]==playerX && tmp[1]==playerY)
						{
							tsicl-=300;
						}
						if (Asm_steck[Asm_steck.length-1][3]+Asm_steck[Asm_steck.length-1][6]>Asm_steck[Asm_steck.length-1][5])
						{
							output_arr.push([-2, Asm_steck[Asm_steck.length-1][8]]);
							var _name=Asm_steck[Asm_steck.length-1][2];
							for (var j=Asm_steck.length-1;j>=0;j--)
								if (j==0)
								{
									output_arr.push([11,'Переменная('+_name+') не найдена',Asm_steck[Asm_steck.length-1][8]]);
									i=i_max+1;
								}
								else
								if (Asm_steck[j][0]=='v' && Asm_steck[j][1]=='i' && Asm_steck[j][2]==_name)
								{
									Asm_steck[j][3]=Asm_steck[Asm_steck.length-1][3];
									if(_name.indexOf(system_prefix)<0)
										output_arr.push([-3, Asm_steck[Asm_steck.length-1][8],_name+' := '+Asm_steck[Asm_steck.length-1][3]]);
									break;
								}
							i_step++;
							Asm_steck.pop();
							if (Asm_steck_robot.length==2)
								vl_tsikl=true;
							Asm_steck_robot.pop();
						}else
						{
							Asm_steck[Asm_steck.length-1][3]+=Asm_steck[Asm_steck.length-1][6];
							output_arr.push([-2, Asm_steck[Asm_steck.length-1][8]]);
							var _name=Asm_steck[Asm_steck.length-1][2];
							for (var j=Asm_steck.length-1;j>=0;j--)
								if (j==0)
								{
									output_arr.push([11,'Переменная('+_name+') не найдена',Asm_steck[Asm_steck.length-1][8]]);
									i=i_max+1;
								}
								else
								if (Asm_steck[j][0]=='v' && Asm_steck[j][1]=='i' && Asm_steck[j][2]==_name)
								{
									Asm_steck[j][3]=Asm_steck[Asm_steck.length-1][3];
									if(_name.indexOf(system_prefix)<0)
										output_arr.push([-3, Asm_steck[Asm_steck.length-1][8],_name+' := '+Asm_steck[Asm_steck.length-1][3]]);
									break;
								}
							tsicl+=Math.abs( Asm_steck[Asm_steck.length-1][7]-i_step);
							i_step=Asm_steck[Asm_steck.length-1][7];
						}
						//for
					}
				break;
			case "$BREAK":
				var leng_steck=1;
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (Asm_steck[j][0]!='L' || (Asm_steck[j][0]=='L' && Asm_steck[j][1]=='IF'))
					{
						if (Asm_steck[j][0]=='L' && Asm_steck[j][1]=='IF')
							leng_steck++;
						Asm_steck.pop();
					}else
						break;
				var f123=Asm_steck[Asm_steck.length-1][1]=='BEGIN';
				if (!f123)
				{
					Asm_steck.pop();
				}
				while (leng_steck)
				{
					i_step++;
					switch (Asm_programm[i_step].split(' ')[0]) {
						case "$IF":
						case "$WHILE_HEAD_START":
						case "$FOR":
							leng_steck++;
							break;
						case "END":
						case "$END":
							leng_steck--;
							break;
					}
				}
				if (!f123)
				{
					i_step++;
				}
				
				break;
			case "$ELSE":
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (Asm_steck[j][0]!='L')
					{
						Asm_steck.pop();
					}else
						break;
				Asm_steck.pop();
				var leng_steck=1;
				while (leng_steck)
				{
					i_step++;
					switch (Asm_programm[i_step].split(' ')[0]) {
						case "$IF":
						case "$WHILE_HEAD_START":
						case "$FOR":
							leng_steck++;
							break;
						case "END":
						case "$END":
							leng_steck--;
							break;
					}
				}
				i_step++;
				break;
			case "$VAR_b":
			case "$VAR_i":
			case "$VAR_f":
			case "$VAR_c":
			case "$VAR_s":
				Asm_steck.push(['v',Asm_programm[i_step].split(' ')[0].slice(-1),GetIn(Asm_programm[i_step],' ','')]);
				if(GetIn(Asm_programm[i_step],' ','').indexOf(system_prefix)<0)
					output_arr.push([-3, sourse_ind,'Объявлена '+GetIn(Asm_programm[i_step],' ','')]);
				i_step++;
				break;

			case "$PUSH":
				var _name=GetIn(Asm_programm[i_step],' ','');
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (j==0)
					{
						output_arr.push([11,'Переменная('+_name+') не найдена',sourse_ind]);
						i=i_max+1;
					}
					else
					if (Asm_steck[j][0]=='v' && Asm_steck[j][2]==_name)
					{
						if (Asm_steck[j][3]==undefined)
						{
							output_arr.push([11,_name+' не определена',sourse_ind]);
							i=i_max+1;
						}
						else
						{
							if (Asm_steck[j][1]=='s'||Asm_steck[j][1]=='c')
								Asm_steck.push([Asm_steck[j][1],Asm_steck[j][3],'"'+Asm_steck[j][3]+'"']);
							else
								Asm_steck.push([Asm_steck[j][1],Asm_steck[j][3],Math.round(Asm_steck[j][3]*100000000)/100000000]);
						}
						break;
					}
				i_step++;
				break;
			case "$PUSH_b":
			case "$PUSH_i":
			case "$PUSH_f":
				Asm_steck.push([Asm_programm[i_step].split(' ')[0].slice(-1),parseFloat(GetIn(Asm_programm[i_step],' ','')),Math.round(parseFloat(GetIn(Asm_programm[i_step],' ',''))*100000000)/100000000]);
				i_step++;
				break;
			case "$PUSH_c":
			case "$PUSH_s":
				Asm_steck.push([Asm_programm[i_step].split(' ')[0].slice(-1),dellSlashes(GetIn(Asm_programm[i_step],' ','')),'"'+GetIn(Asm_programm[i_step],' ','')+'"']);
				i_step++;
				break;
			case "$fPOP_b":
			case "$fPOP_i":
			case "$fPOP_f":
			case "$fPOP_c":
			case "$fPOP_s":
				var _s;
				var _name=GetIn(Asm_programm[i_step],' ','');
				var _i=0;
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (Asm_steck[j][0]=='F')
					{
						_i=j-1;
						break;
					}
				for (var j=_i;j>=0;j--)
					if (!(Asm_steck[j][0]=='F' || Asm_steck[j][0]=='L'))
					{
						_s=Asm_steck[j];
						Asm_steck.splice(j, 1);
						break;
					}
				if (Asm_programm[i_step].split(' ')[0]=='$fPOP_b')
					_zn=v(['b'],_s);
				if (Asm_programm[i_step].split(' ')[0]=='$fPOP_i')
					_zn=v(['b','i'],_s);
				if (Asm_programm[i_step].split(' ')[0]=='$fPOP_f')
					_zn=v(['b','i','f'],_s);
				if (Asm_programm[i_step].split(' ')[0]=='$fPOP_c')
					_zn=v(['c'],_s);
				if (Asm_programm[i_step].split(' ')[0]=='$fPOP_s')
					_zn=v(['c','s'],_s);
				if (Asm_programm[i_step].split(' ')[0]=='$fPOP_c' && _zn.length!=1)
				{
					output_arr.push([11,'Ожидался символ, а не строка',sourse_ind]);
					i=i_max+1;
				}
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (j==0)
					{
						output_arr.push([11,'Переменная('+_name+') не найдена',sourse_ind]);
						i=i_max+1;
					}
					else
					if (Asm_steck[j][0]=='v' && ((Asm_steck[j][1]=='b'&&Asm_programm[i_step].split(' ')[0]=='$fPOP_b')||(Asm_steck[j][1]=='i'&&Asm_programm[i_step].split(' ')[0]=='$fPOP_i')||(Asm_steck[j][1]=='f'&&Asm_programm[i_step].split(' ')[0]=='$fPOP_f')||(Asm_steck[j][1]=='s'&&Asm_programm[i_step].split(' ')[0]=='$fPOP_s')||(Asm_steck[j][1]=='c'&&Asm_programm[i_step].split(' ')[0]=='$fPOP_c')) && Asm_steck[j][2]==_name)
					{
						Asm_steck[j][3]=_zn;
						if(_name.indexOf(system_prefix)<0)
							if ((_s[0]=='i' || _s[0]=='b' || _s[0]=='f')&& _zn != _s[2])
								output_arr.push([-3, sourse_ind,_name+' := '+_zn+' <=> '+_name+' := '+_s[2]]);
							else
							if ((_s[0]=='c' || _s[0]=='s')&& '"'+_zn+'"' != _s[2])
								output_arr.push([-3, sourse_ind,_name+' := "'+_zn+'" <=> '+_name+' := '+_s[2]]);
							else
								output_arr.push([-3, sourse_ind,_name+' := '+_zn+'']);
						break;
					}
				i_step++;
				break;
			case "$POP_b":
			case "$POP_i":
			case "$POP_f":
				var _s=Asm_steck.pop();
				var _zn;
				if (Asm_programm[i_step].split(' ')[0]=='$POP_b')
					_zn=v(['b'],_s);
				if (Asm_programm[i_step].split(' ')[0]=='$POP_i')
					_zn=v(['b','i'],_s);
				if (Asm_programm[i_step].split(' ')[0]=='$POP_f')
					_zn=v(['b','i','f'],_s);
				var _name=GetIn(Asm_programm[i_step],' ','');
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (j==0)
					{
						output_arr.push([11,'Переменная('+_name+') не найдена',sourse_ind]);
						i=i_max+1;
					}
					else
					if (Asm_steck[j][0]=='v' && ((Asm_steck[j][1]=='b'&&Asm_programm[i_step].split(' ')[0]=='$POP_b')||(Asm_steck[j][1]=='i'&&Asm_programm[i_step].split(' ')[0]=='$POP_i')||(Asm_steck[j][1]=='f'&&Asm_programm[i_step].split(' ')[0]=='$POP_f')) && Asm_steck[j][2]==_name)
					{
						Asm_steck[j][3]=_zn;
						if(_name.indexOf(system_prefix)<0)
						{
							_zn=Math.round(_zn*100000000)/100000000;
							if ((_s[0]=='i' || _s[0]=='b' || _s[0]=='f')&& _zn != _s[2])
								output_arr.push([-3, sourse_ind,_name+' := '+_zn+' <=> '+_name+' := '+_s[2]]);
							else
								output_arr.push([-3, sourse_ind,_name+' := '+_zn]);
						}
						break;
					}
				i_step++;
				break;
			case "$POP_c":
			case "$POP_s":
				var _s=Asm_steck.pop();
				var _zn=v(['c','s'],_s);
				var _name=GetIn(Asm_programm[i_step],' ','');
				if (_s[1].length!=1 && Asm_programm[i_step].split(' ')[0]=='$POP_c')
				{
					output_arr.push([11,'Ожидался символ, а не строка',sourse_ind]);
					i=i_max+1;
				}
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (j==0)
					{
						output_arr.push([11,'Переменная('+_name+') не найдена',sourse_ind]);
						i=i_max+1;
					}
					else
					if (Asm_steck[j][0]=='v' && ((Asm_steck[j][1]=='s'&&Asm_programm[i_step].split(' ')[0]=='$POP_s')||(Asm_steck[j][1]=='c'&&Asm_programm[i_step].split(' ')[0]=='$POP_c')) && Asm_steck[j][2]==_name)
					{
						Asm_steck[j][3]=_zn;
						if(_name.indexOf(system_prefix)<0)
							if ((_s[0]=='c' || _s[0]=='s')&& '"'+_zn+'"' != _s[2])
								output_arr.push([-3, sourse_ind,_name+' := "'+_zn+'" <=> '+_name+' := '+_s[2]]);
							else
								output_arr.push([-3, sourse_ind,_name+' := "'+_zn+'"']);
						break;
					}
				i_step++;
				break;
			case "$WHILE_HEAD_START":
				Asm_steck_robot.push([playerX,playerY]);
				Asm_steck.push(['L','WHILE',i_step+1]);
				i_step++;
				break;
			case "$WHILE_HEAD_END":
				var _s=Asm_steck.pop();
				var _zn=v(['b','i'],_s);
				if (_zn)
				{
					i_step++;
				}else
				{
					var tmp=Asm_steck_robot[Asm_steck_robot.length-1];
					if (tmp[0]==playerX && tmp[1]==playerY)
					{
						tsicl-=50;
					}
					var leng_steck=1;
					while (leng_steck)
					{
						i_step++;
						switch (Asm_programm[i_step].split(' ')[0]) {
							case "$IF":
							case "$WHILE_HEAD_START":
							case "$FOR":
								leng_steck++;
								break;
						case "END":
							case "$END":
								leng_steck--;
								break;
						}
					}
					i_step++;
					Asm_steck.pop();
					if (Asm_steck_robot.length==2)
						vl_tsikl=true;
					Asm_steck_robot.pop();
				}
				break;
			case "$FOR":
				var _s3=Asm_steck.pop();
				var _s2=Asm_steck.pop();
				var _s1=Asm_steck.pop();
				var _zn1=v(['b','i'],_s1);
				var _zn2=v(['b','i'],_s2);
				var _zn3=v(['b','i'],_s3);
				var _name=GetIn(Asm_programm[i_step],' ','');
				for (var j=Asm_steck.length-1;j>=0;j--)
					if (j==0)
					{
						output_arr.push([11,'Переменная('+_name+') не найдена',sourse_ind]);
						i=i_max+1;
					}
					else
					if (Asm_steck[j][0]=='v' && Asm_steck[j][1]=='i' && Asm_steck[j][2]==_name)
					{
						Asm_steck[j][3]=_zn1;
						if(_name.indexOf(system_prefix)<0)
							output_arr.push([-3, sourse_ind,_name+' := '+_zn1]);
						break;
					}
				Asm_steck_robot.push([playerX,playerY]);
				Asm_steck.push(['L','FOR',_name,_zn1,_zn1,_zn2,_zn3,i_step+1,sourse_ind]);
				if (_zn1>_zn2)
				{
					var leng_steck=1;
					while (leng_steck)
					{
						i_step++;
						switch (Asm_programm[i_step].split(' ')[0]) {
							case "$IF":
							case "$WHILE_HEAD_START":
							case "$FOR":
								leng_steck++;
								break;
							case "END":
							case "$END":
								leng_steck--;
								break;
						}
					}
					i_step++;
					Asm_steck.pop();
				}else
					i_step++;
				break;
			default:
				Asm_error('Неизвестная команда при индепритации ' + Asm_programm[i_step], sourse_ind,i_step); //Такое не может произойти правда........
				return;
		}
		
	}
	var end2 = new Date;
	var __i=0;
	while (__i<output_arr.length)
		if (output_arr[__i][0]==-3 && output_arr[__i][1]==0)
			output_arr.splice(__i, 1);
		else
			__i++;
	output_arr.unshift([-3, 0,'Время работы: '+(end2 - start2)+' мс; '+_commadnd_cound_line+' строчек или '+_commadnd_cound_i+' команд']);

	if (_commadnd_cound_i+3>=i_max)
		output_arr.push([11,'Программа не завершена',sourse_ind]);
	
	if (tsicl<30 && out_p==1)
	{
		output_arr.push([11,'Программа не содержит циклов',sourse_ind]);
	}
	if ((tsicl<30  || !vl_tsikl) && out_p==2)
	{
		output_arr.push([11,'Программа не содержит вложенных циклов',sourse_ind]);
	}
	
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
		output_arr.push([11, 'Вывод программы неверный', sourse_ind]);
	}
	for (var i = 0; i < map.length; i++)
		for (var j = 0; j < map[i].length; j++)
			if (((map[i][j][6]==''||map[i][j][6]=='0')!=(map[i][j][1]==0)))
			{
				if (v<1)
				{
					v++;
					output_arr.push([11, 'Закрашеность не соотвествует метке (X:'+(i)+',Y:'+(j)+')', sourse_ind]);
				}else
				if (v==1)
				{
					v++;
					output_arr.push([11, 'Закрашеность не соотвествует меткам', sourse_ind]);
				}
			}
	for (var i = 0; i < map.length; i++)
		for (var j = 0; j < map[i].length; j++)
		{
			if (map[i][j][5]=='B' || map[i][j][4]=='B'||map[i][j][5]=='В' || map[i][j][4]=='В')
				if (((i!=playerX)||(j!=playerY))&&(v<5))
				{
					v++;
					output_arr.push([11, 'Робот не вернулся в необходимую(точка B) позицию', sourse_ind]);
				}
			if (map[i][j][5]=='Б' || map[i][j][4]=='Б')
				if (((i!=playerX)||(j!=playerY))&&(v<5))
				{
					v++;
					output_arr.push([11, 'Робот не вернулся в необходимую(точка Б) позицию', sourse_ind]);
				}
		}
}
function RunAsmCode(s, map_text) {
	Asm_steck=[['F',system_prefix+'main',1]];
	Asm_programm=s.split('\n');
	Asm_map=map_text;
	output_arr=[];
	for (var i=0;i<Asm_programm.length;i++)
		if (Asm_programm[i][0]=='@') 
		{
			Asm_procedures[Asm_programm[i].slice(1)]=i+1;
		}
	MakeAsmSteps(99999);
	if (debug)console.log('all');
	return output_arr;
}

var ErrorKumir = []; //[step,'text',number of sring]
var TabInProgramm = {};
function formating(s, map) {
	RunKumir(s,'');//map);
	if (!(TabInProgramm["work"] != undefined && TabInProgramm["work"] == true))
		return;
	var out_s = '';
	var noreturn = 0;
	for (var i = 0; i < s.split('\n').length; i++) {
		if (TabInProgramm[i] != undefined)
			out_s += '\t'.repeat(TabInProgramm[i]);
		else {
			out_s += '\t'.repeat();

			var line = s.split('\n')[i];
			var t = 0;
			var v = 0;
			while (t < line.length)
				if (line[t] == ' ') {
					t += 1;
					v += 1;
				} else
					if (line[t] == '\t') {
						t += 1;
						v += 2;
					} else
						break;

			if (line.trim()=='')
			out_s += '\t'.repeat(Math.floor(v/2));
			else
			out_s += ' '.repeat(Math.floor(v));
		}
		if (s.split('\n')[i].trimLeft() == '')
			noreturn++;
		else
			noreturn = 0;
		if (noreturn < 3)
			out_s += s.split('\n')[i].trimLeft() + '\n';
	}
	return out_s.trim();
}
function GetIn(a, b, c) {
	if (a.indexOf(b) == -1)
		return "";
	if (c == '')
		return a.substring(a.indexOf(b) + b.length, a.length);
	if (a.substring(a.indexOf(b) + b.length, a.length).indexOf(c) == -1)
		return "";
	return a.substring(a.indexOf(b) + b.length, a.substring(a.indexOf(b) + b.length, a.length).indexOf(c) + a.indexOf(b) + b.length);
}
var KOI8 = ["\0", "", "", "", "", "", "", "\a", "\b", "\t", "\n", "\v", "\f", "\r", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ' ','!','"','#','$','%','&','\'','(',')','*','+',',','-','.','/','0','1','2','3','4','5','6','7','8','9',':',';','<','=','>','?','@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','\\',']','^','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','{','|','}','~','','Ђ','Ѓ','‚','ѓ','„','…','†','‡','€','‰','Љ','‹','Њ','Ќ','Ћ','Џ','ђ','‘','’','“','”','•','–','—',' ','™','љ','›','њ','ќ','ћ','џ',' ','Ў','ў','Ј','¤','Ґ','¦','§','Ё','©','Є','«','¬','­','®','Ї','°','±','І','і','ґ','µ','¶','·','ё','№','є','»','ј','Ѕ','ѕ','ї','А','Б','В','Г','Д','Е','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я','а','б','в','г','д','е','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];

var ru = {
	a: 'Е61',
	b: 'Е62',
	c: 'Е63',
	d: 'Е64',
	e: 'Е65',
	f: 'Е66',
	g: 'Е67',
	h: 'Е68',
	i: 'Е69',
	j: 'Е6А',
	k: 'Е6Б',
	l: 'Е6С',
	m: 'Е6Д',
	n: 'Е6Е',
	o: 'Е6Ф',
	p: 'Е70',
	q: 'Е71',
	r: 'Е72',
	s: 'Е73',
	t: 'Е74',
	u: 'Е75',
	v: 'Е76',
	w: 'Е77',
	x: 'Е78',
	y: 'Е79',
	z: 'Е8А'
};

function LatinToRus(str) {
	var acc = '';
	for (var i = 0; i < str.length; i++) {
		var lowLetter = str[i].toLowerCase();
		var en;
		if (ru[lowLetter] == undefined) {
			en = str[i];
		} else {
			en = ru[lowLetter];
		}
		var enNormalized;
		if (lowLetter === str[i]) {
			enNormalized = en;
		} else {
			enNormalized = en.toUpperCase();
		}
		acc += enNormalized;
	}
	return acc;
}
var persing_log = "";
function NameToNameVal(str) {
	var str2 = str.trim().replace(new RegExp('  ', 'gi'), ' ');
	while (str2 != str2.replace(new RegExp('  ', 'gi'), ' '))
		str2 = str2.replace(new RegExp('  ', 'gi'), ' ');
	str2 = str2.replace(new RegExp(' ', 'gi'), '_');
	return str2;
}

function parseFormula(a, num_output, use_f, use_v, need_type) {
	//console.log(a);
	a = '(' + a + ')';
	var slu = ['не', 'или', 'и'];
	var slu2 = ['!', '||', '&&'];
	var simvols = [' ', '\\(', '\\)'];
	var simvols2 = [' ', '(', ')'];
	function KumReplace3(s) {
		var Result = s;
		for (var i = 0; i < simvols.length; i++)
			for (var j = 0; j < simvols.length; j++)
				for (var k = 0; k < slu.length; k++) {
					Result = Result.replace(new RegExp(simvols[i] + slu[k] + simvols[j], 'gi'), simvols2[i] + slu2[k] + simvols2[j]);
					//console.log([new RegExp(simvols[i] + slu[k] + simvols[j],'gi') , simvols2[i] + 'kumiralg_' + slu[k] + '_kumiralg' + simvols2[j]]);
				}
		return Result;
	}
	a = KumReplace3(' ' + a + ' ').trim();
	var token,
	outFormula,
	stack,
	operators;
	operators = ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>', '&&', '||'];
	ParseOperators = [['!'], ['!', '**'], ['!', '**', '*', '/'], ['!', '**', '*', '/'], ['!', '**', '*', '/', '+', '-'], ['!', '**', '*', '/', '+', '-'], ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>'], ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>'], ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>'], ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>'], ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>'], ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>'], ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>', '&&', '||'], ['!', '**', '*', '/', '+', '-', '<=', '>=', '<>', '=', '<', '>', '&&', '||']];
	outFormula = [];
	stack = [];
	function ItisName(s) {

		var dop = false,
		i = 0;
		s = s.trim();
		for (i = 0; i < s.length; i++) {
			dop = true;
			if ((s[i] >= 'а') && (s[i] <= 'я'))
				dop = false;
			if ((s[i] >= 'А') && (s[i] <= 'Я'))
				dop = false;
			if ((s[i] >= 'a') && (s[i] <= 'z'))
				dop = false;
			if ((s[i] >= 'A') && (s[i] <= 'Z'))
				dop = false;
			if ((i > 0) && (s[i] >= '0') && (s[i] <= '9'))
				dop = false;
			if (s[i] == ' ')
				dop = false;
			if (s[i] == '_')
				dop = false;
			if (dop == true)
				return false;
		}
		if (s.length == 0)
			return false;
		return true;
	}
	//operators.indexOf(token[0]) != -1
	function readtoken(b) {
		b = b.trim();
		if (b == '')
			return [-1, -1];
		if (b.length > 1 && operators.indexOf(b[0] + b[1]) != -1)
			return [b[0] + b[1], 'O'];
		if (operators.indexOf(b[0]) != -1)
			return [b[0], 'O'];
		if ([','].indexOf(b[0]) != -1)
			return [',', 'Z'];
		if (['('].indexOf(b[0]) != -1)
			return ['(', '('];
		if ([')'].indexOf(b[0]) != -1)
			return [')', ')'];
		if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(b[0]) != -1) {
			var out = '';
			var i = 0;
			while (i < b.length && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(b[i]) != -1) {
				out += b[i];
				i++;
			}
			return [out, 'N'];
		}
		var i = 0;
		while (i < b.length && ItisName('a'+b[i]))
			i++;
		i++;
		if (b.substring(0, i - 1).trim() == "")
			return [-1, -1];
		if (b.substring(i - 1, b.length - 1).trim()[0] == '(')
			return [b.substring(0, i - 1).trim(), 'F'];
		return [b.substring(0, i - 1).trim(), 'V'];
	}
	var iii = 0;
	persing_log = "";
	while (a.length > 0) {
		iii++;
		if (iii > 1000) {
			persing_log += 'Превышено время анализа этого выражения.\r\n'
			persing_log += 'Анализ завершён на "' + a + '". \r\n';
			return;
		}
		if (token != undefined && token[1] == '(' && readtoken(a)[1] == ')') {
			persing_log += 'Выражение либо пустое, либо после "(" идёт ")".\r\n'
			persing_log += 'Анализ завершён на "' + a + '". \r\n';
			return;
		}
		token = readtoken(a);

		if (token[0] == -1) {
			persing_log += 'Не удалось прочитать токен\r\n'
			persing_log += 'Анализ завершён на "' + a + '". \r\n';
			return;
		}
		a = a.substring(a.indexOf(token[0]) + token[0].length, a.length);
		if (token[1] == 'V') //value
		{
			if ((use_f == undefined) || (use_v == undefined))
				outFormula.push(NameToNameVal(token[0]));
			else {
				var trans_v = NameToNameVal(token[0]);
				if (use_v[trans_v] != undefined) {
					outFormula.push(trans_v);
				} else
					if (use_f[trans_v] != undefined) {
						stack.push([NameToNameVal(trans_v) + '(', 'F']);
					} else {
						persing_log += 'Это(' + trans_v + ') имя не обявленно \r\n'
						persing_log += 'Анализ завершён на "' + a + '". \r\n';
						return;
					}
			}
		} else
			if (token[1] == 'N') //number
			{
				outFormula.push(token[0]);
			} else
				if (token[1] == 'F') //function
				{
					if (use_f[NameToNameVal(token[0])] == undefined) {
						persing_log += 'Это(' + token[0] + ') имя не обявленно \r\n'
						persing_log += 'Анализ завершён на "' + a + '". \r\n';
						return;
					}
					stack.push([NameToNameVal(token[0]) + '$', token[1]]);
				} else
					if (token[1] == 'Z') //,
					{
						while (stack[stack.length - 1][1] != '(') {
							outFormula.push(stack.pop()[0]);
							if (stack.length == 0) {
								persing_log += 'В выражении пропущена запятая или(и) открывающая скобка.\r\n'
								persing_log += 'Анализ завершён на "' + a + '". \r\n';
								return;
							}
						}
						if (stack.length > 1 && stack[stack.length - 2][1] == 'F')
							stack[stack.length - 2][0] += '$'; //для последующего использования || кол во аргументов
					} else
						if (token[1] == 'O') //operators 'и','или','<=','>=','<>','**','*','/','+','-']
						{
							while (stack.length > 0 && ((stack[stack.length - 1][1] == 'O' && ParseOperators[operators.indexOf(token[0])].indexOf(stack[stack.length - 1][0]) != -1) || (stack[stack.length - 1][1] == 'F'))) {
								outFormula.push(stack.pop()[0]);
								if (stack.length == 0) {
									break;
								}
							}
							stack.push(token);
						} else
							if (token[1] == '(') //(
							{
								stack.push(token);
							} else
								if (token[1] == ')') //)
								{
									if (stack.length == 0) {
										persing_log += 'В выражении пропущена открывающая скобка.\r\n'
										persing_log += 'Анализ завершён на "' + a + '". \r\n';
										return;
									}
									while (stack[stack.length - 1][1] != '(') {
										outFormula.push(stack.pop()[0]);
										if (stack.length == 0) {
											persing_log += 'В выражении пропущена запятая или(и) открывающая скобка.\r\n'
											persing_log += 'Анализ завершён на "' + a + '". \r\n';
											return;
										}
									}
									stack.pop();
									if (stack.length > 0 && stack[stack.length - 1][1] == 'F')
										outFormula.push(stack.pop()[0] + '(');
								}

	}
	while ((stack.length != 0)) {
		outFormula.push(stack.pop()[0]);
	}
	for (var i = 0; i < outFormula.length; i++) 
	if (outFormula[i]=='('||outFormula[i]==')'){
		persing_log += 'В выражении пропущена скобка.\r\n'
		persing_log += 'Анализ завершён на "' + a + '". \r\n';
		return;
	}
	//перевод в функциональную запись
	stack = [];
	var stack2 = [];
	var return_s='';
	for (var i = 0; i < outFormula.length; i++) {
		if (!isNaN(parseFloat(outFormula[i]))) {
			stack.push(outFormula[i]);
			if (Math.abs(parseFloat(outFormula[i])-Math.round(parseFloat(outFormula[i])))<0.00001)
			{
				return_s+='$PUSH_i '+Math.floor(parseFloat(outFormula[i]))+'\n';
				stack2.push('цел');
			}
			else
			{
				return_s+='$PUSH_f '+parseFloat(outFormula[i])+'\n';
				stack2.push('вещ');
			}
		} else
			if (outFormula[i] == '!') {
				if (stack.length < 1) {
					persing_log += 'Неправильное использование оператора "не". \r\n'
					return;
				}
				var v1 = stack.pop();
				var v1_2 = stack2.pop();
				if (v1_2=='лог')
				{}else
				{
					persing_log += 'Ооператора "не" работает только с "лог" типом. \r\n'
					return;
				}
				stack2.push('лог');
				return_s+='$INT !\n';
				stack.push('не (' + v1 + ')');
			} else
				if (outFormula[i] == '**') {
					if (stack.length < 2) {
						persing_log += 'Неправильное использование оператора "**". \r\n'
						return;
					}
					var v1 = stack.pop();
					var v2 = stack.pop();
					var v1_2 = stack2.pop();
					var v2_2 = stack2.pop();
					if ((v1_2=='вещ'||v1_2=='цел')&&(v2_2=='вещ'||v2_2=='цел'))
					{}else
					{
						persing_log += 'Ооператора "**" работает только с "вещ" и "цел" типами. \r\n'
						return;
					}
					stack2.push('вещ');
					return_s+='$INT **\n';
					stack.push('(' + v2 + ')**(' + v1 + ')');
				} else
					if (outFormula[i] == '*') {
						if (stack.length < 2) {
							persing_log += 'Неправильное использование оператора "*". \r\n'
							return;
						}
						var v1 = stack.pop();
						var v2 = stack.pop();
						var v1_2 = stack2.pop();
						var v2_2 = stack2.pop();
						if ((v1_2=='вещ'||v1_2=='цел')&&(v2_2=='вещ'||v2_2=='цел'))
						{}else
						{
							persing_log += 'Ооператора "*" работает только с "вещ" и "цел" типами. \r\n'
							return;
						}
						if (v1_2=='цел' && v2_2=='цел')
							stack2.push('цел');
						else
							stack2.push('вещ');
						return_s+='$INT *\n';
						stack.push('(' + v2 + ')*(' + v1 + ')');
					} else
						if (outFormula[i] == '/') {
							if (stack.length < 2) {
								persing_log += 'Неправильное использование оператора "/". \r\n'
								return;
							}
							var v1 = stack.pop();
							var v2 = stack.pop();
							var v1_2 = stack2.pop();
							var v2_2 = stack2.pop();
							if ((v1_2=='вещ'||v1_2=='цел')&&(v2_2=='вещ'||v2_2=='цел'))
							{}else
							{
								persing_log += 'Ооператора "/" работает только с "вещ" и "цел" типами. \r\n'
								return;
							}
							stack2.push('вещ');
							return_s+='$INT /\n';
							stack.push('(' + v2 + ')/(' + v1 + ')');
						} else
							if (outFormula[i] == '+') {
								if (stack.length < 2) {
									persing_log += 'Неправильное использование оператора "+". \r\n'
									return;
								}
								var v1 = stack.pop();
								var v2 = stack.pop();
								var v1_2 = stack2.pop();
								var v2_2 = stack2.pop();
								if (((v1_2=='вещ'||v1_2=='цел')&&(v2_2=='вещ'||v2_2=='цел'))||((v1_2=='лит'||v1_2=='сим')&&(v2_2=='лит'||v2_2=='сим')))
								{}else
								{
									persing_log += 'Ооператора "+" работает только с "вещ" и "цел" или "лит" и "сим" типами. \r\n'
									return;
								}
								if ((v1_2=='вещ'||v1_2=='цел')&&(v2_2=='вещ'||v2_2=='цел'))
								{
									if (v1_2=='цел' && v2_2=='цел')
										stack2.push('цел');
									else
										stack2.push('вещ');
								}
								else
								{
									stack2.push('лит');
								}
								return_s+='$INT +\n';
								stack.push('(' + v2 + ')+(' + v1 + ')');
							} else
								if (outFormula[i] == '-') {
									if (stack.length < 2) {
										persing_log += 'Неправильное использование оператора "-". \r\n'
										return;
									}
									var v1 = stack.pop();
									var v2 = stack.pop();
									var v1_2 = stack2.pop();
									var v2_2 = stack2.pop();
									if ((v1_2=='вещ'||v1_2=='цел')&&(v2_2=='вещ'||v2_2=='цел'))
									{}else
									{
										persing_log += 'Ооператора "-" работает только с "вещ" и "цел" типами. \r\n'
										return;
									}
									if (v1_2=='цел' && v2_2=='цел')
										stack2.push('цел');
									else
										stack2.push('вещ');
									return_s+='$INT -\n';
									stack.push('(' + v2 + ')-(' + v1 + ')');
								} else
									if (['<=', '>=', '<>', '=', '<', '>', '&&', '||'].indexOf(outFormula[i]) != -1) {
										if (stack.length < 2) {
											persing_log += 'Неправильное использование оператора "' + outFormula[i] + '". \r\n'
											return;
										}
										var v1 = stack.pop();
										var v2 = stack.pop();
										var v1_2 = stack2.pop();
										var v2_2 = stack2.pop();
										if (v1_2=='лог' && v1_2=='лог' && ['&&', '||'].indexOf(outFormula[i]) != -1)
										{stack2.push('лог');}else
										if (((v1_2=='вещ'||v1_2=='цел')&&(v2_2=='вещ'||v2_2=='цел')) && ['<=', '>=', '<>', '=', '<', '>'].indexOf(outFormula[i]) != -1)
										{stack2.push('лог');}else
										{
											persing_log += 'Ооператора "'+outFormula[i]+'" работает только с "вещ" и "цел" типами. \r\n'
											return;
										}
										
										return_s+='$INT '+outFormula[i]+'\n';
										stack.push('(' + v2 + ')' + outFormula[i] + '(' + v1 + ')');
									} else
										if (ItisName(outFormula[i])) {
											if (use_v[outFormula[i]]==undefined)
											{
												persing_log += 'Неизвестная переменная('+outFormula[i]+')\r\n'
												return;
											}
											switch (use_v[outFormula[i]]) {
												case "i":
													stack2.push('цел');
													break;
												case "f":
													stack2.push('вещ');
													break;
												case "b":
													stack2.push('лог');
													break;
												case "c":
													stack2.push('сим');
													break;
												case "s":
													stack2.push('лит');
													break;
													
												case "ia":
													stack2.push('целтаб');
													break;
												case "fa":
													stack2.push('вещтаб');
													break;
												case "ba":
													stack2.push('логтаб');
													break;
												case "ca":
													stack2.push('симтаб');
													break;
												case "sa":
													stack2.push('литтаб');
													break;
											}
											
											return_s+='$PUSH '+outFormula[i].trim().replace(new RegExp(" ", 'gi'), "_")+'\n';
											stack.push(outFormula[i].trim().replace(new RegExp(" ", 'gi'), "_"));
										} else
											if (outFormula[i].indexOf('(') == outFormula[i].length - 1) {
												if (stack.length < outFormula[i].split('$').length - 1) {
													persing_log += 'Очень странная ошибка...\r\n'
													return;
												}
												var s = "";
												for (var k = outFormula[i].split('$').length - 1; k > 1; k--)
													s += stack[stack.length - k] + ',';
												if (outFormula[i].split('$').length - 1 > 0)
													s += stack[stack.length - 1];
												for (var k = outFormula[i].split('$').length - 1; k > 0; k--)
												{
													stack.pop();
													var tmp_1=stack2.pop();
													if (!(tmp_1==use_f[outFormula[i].split('(')[0].split('$')[0]][1][outFormula[i].split('$').length-k-1]||(tmp_1=='цел'&&use_f[outFormula[i].split('(')[0].split('$')[0]][1][outFormula[i].split('$').length-k-1]=='вещ')))
													{
														persing_log += 'У функции "'+outFormula[i].split('(')[0].split('$')[0]+'" тип ' + use_f[outFormula[i].split('(')[0].split('$')[0]][1][outFormula[i].split('$').length-k-1] + ' не совпадает с полученным('+tmp_1+'). \r\n'
														return;
													}
												}
												return_s+='$RUN '+outFormula[i].split('(')[0].split('$')[0]+'\n';
												stack.push(outFormula[i].split('(')[0].split('$')[0] + '(' + s + ")");
												
												stack2.push(use_f[outFormula[i].split('(')[0].split('$')[0]][0]);
											} else {
												persing_log += 'Неизвестная команда "' + outFormula[i] + '". \r\n'
												return;
											}
		//return [b[0], 'O'];)
	}
	if (stack.length != num_output && num_output!=Infinity) {
		persing_log += 'Что то не то в данной формуле.\r\nCтек:\r\n' + stack.join();
		return;
	}
	if (need_type!=undefined && stack.length == 1 && !(stack2[0]==need_type || (stack2[0]=='цел' && need_type=='вещ'))) {
		persing_log += 'Присваеваемый тип('+stack2[0]+') не соответсвует необходимому('+need_type+').';
		return;
	}
	if (num_output==Infinity)
	{
		return_s+='$PUSH_i '+stack.length+'\n';
	}
	//console.log(stack[0]);
	return return_s;
}
function RunKumir(s, map) {
	try {
		RunKumir_try(s, map);
	}	catch (e) {
		function Damp(e2, p) {
			var XHR2 = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
			var xhr2 = new XHR2();
			xhr2.open('POST', 'errordamp', true);
			xhr2.onreadystatechange = function () {}
			xhr2.onerror = function () {
				if (debug)
					console.log('Сервер не ответил(3.2).');
			}
			xhr2.send('errordamp+' + encodeURIComponent(e2).replace(/%20/g, "+")+'++++'+encodeURIComponent(p).replace(/%20/g, "+"));
		}
		Damp(''+e, s);
		ErrorKumir.push([12, 'Неизвестная ошибка. Err: ' + e, 0]);
		return;
	}
}

function RunKumir_try(s, map) {
	if (debug)console.log('');

	s = s.replace(new RegExp('\r', 'gi'), '');
	var damp_program = s;
	var start = new Date;
	TabInProgramm = {};
	var k_split = [];
	var k_split2 = [];
	steps = [];
	ErrorKumir = [];
	//step 1 step 1 step 1 step 1 step 1 step 1 step 1 step 1 step 1 step 1 step 1 step 1 step 1
	/*
	все
	кц
	кц_при

	нач
	выбор
	раз

	то
	иначе
	при

	имя:= выражение                                     ["_val",имя,[выражение]]

	вывод выражение - 1,                                ["_out",[[выражение - 1],....,[выражение - N]]]
	...,
	выражение - N

	ввод имя - 1,                                       ["_inp",[[выражение - 1],....,[выражение - N]]]
	...,
	имя - N

	имя_алгоритма - процедуры                           ["__pr","имя_алгоритма - процедуры",[]]

	имя_алгоритма - процедуры(список_параметров_вызова) ["__pr","имя_алгоритма - процедуры",[список_параметров_вызова]]

	выход                                               ["_bre"]

	если условие                                        ["__if",[условие]]
	то серия1                                           серия1
	иначе серия2                                        ["_els"]
	все                                                 ["_end"]

	если условие                                        ["__if",[условие]]
	то серия1                                           серия1
	все                                                 ["_els"]["_end"]

	выбор
	при условие 1: серия 1                              ["__if",[условие 1]]серия 1["_els"]
	при условие 2: серия 2                              ["__if",[условие 2]]серия 2["_els"]
	...
	при условие n: серия n                              ["__if",[условие n]]серия n["_els"]
	иначе серия n + 1                                   серия n + 1
	все                                                 ["_end"]*кол во при

	выбор
	при условие_1: серия_1                              ["__if",[условие 1]]серия 1["_els"]
	при условие_2: серия_2                              ["__if",[условие 2]]серия 2["_els"]
	...
	при условие_n: серия_n                              ["__if",[условие n]]серия n["_els"]
	все                                                 ["_end"]*кол во при


	нц
	|
	|-->для
	|   |
	|   |-->i от i1 до i2
	|   |
	|   |-->i от i1 до i2 шаг i3
	|
	|-->пока условие
	|
	|-->формула раз
	|
	|-->тело_цикла


	i-переменная
	i1, i2, i3 - формула

	нц для i от i1 до i2 ----------------------- for (i=i1;i<=i2;i+=1)                                               ["_for","i",[i1],[i2],[1]]
	тело_цикла                                                                                                       [тело_цикла]
	кц или кц_при условие ---------------------- if (условие){break}                                                 ["_end"]

	нц для i от i1 до i2 шаг i3 ---------------- for (i=i1;i<=i2;i+=i3)                                              ["_for","i",[i1],[i2],[i3],[тело_цикла],[false] или [условие]]
	тело_цикла
	кц или кц_при условие ---------------------- if (false){break} или if (условие){break}                           ["_end"]

	нц пока условие ---------------------------- while (условие)                                                     ["_whi",[условие],[тело_цикла],[false] или [условие]]
	тело_цикла
	кц или кц_при условие ---------------------- if (условие){break}

	нц формула раз ----------------------------- var raz=формула; for (var n(Math.randon(10000))=1;i<=raz;i+=1)      ["_for",[формула],[тело_цикла],[false] или [условие]]
	тело_цикла
	кц или кц_при условие ---------------------- if (условие){break}

	нц ---------------------------------------- while (true) {                                                       ["_whi",[true],[тело_цикла],[false] или [условие]]
	тело_цикла
	кц или кц_при условие ---------------------- if (условие){break}
	 */
	function FormatingStr(v) {
		v = v.replace(new RegExp('  ', 'gi'), ' ').replace(new RegExp('ё', 'gi'), 'е').toLowerCase();
		return v
	}
	function kumir_isType(s_in) {
		var s = s_in.trim();
		if (s == 'цел')
			return true;
		if (s == 'вещ')
			return true;
		if (s == 'лог')
			return true;
		if (s == 'сим')
			return true;
		if (s == 'лит')
			return true;

		if (s == 'целтаб')
			return true;
		if (s == 'вещтаб')
			return true;
		if (s == 'логтаб')
			return true;
		if (s == 'симтаб')
			return true;
		if (s == 'литтаб')
			return true;
		return false;
	}
	function ItisType(s) {
		s = s.trim();
		if (s == 'цел')
			return true;
		if (s == 'вещ')
			return true;
		if (s == 'лог')
			return true;
		if (s == 'сим')
			return true;
		if (s == 'лит')
			return true;

		if (s == 'целтаб')
			return true;
		if (s == 'вещтаб')
			return true;
		if (s == 'логтаб')
			return true;
		if (s == 'симтаб')
			return true;
		if (s == 'литтаб')
			return true;
		return false;
	}
	function ItisName(s) {
		var dop = false,
		i = 0;
		s = s.trim();
		for (i = 0; i < s.length; i++) {
			dop = true;
			if ((s[i] >= 'а') && (s[i] <= 'я'))
				dop = false;
			if ((s[i] >= 'А') && (s[i] <= 'Я'))
				dop = false;
			if ((s[i] >= 'a') && (s[i] <= 'z'))
				dop = false;
			if ((s[i] >= 'A') && (s[i] <= 'Z'))
				dop = false;
			if ((i > 0) && (s[i] >= '0') && (s[i] <= '9'))
				dop = false;
			if (s[i] == ' ')
				dop = false;
			if (s[i] == '_')
				dop = false;
			if (dop == true)
				return false;
		}
		if (s.length == 0)
			return false;
		return true;
	}
	function TranslName(s) {
		var i = 0;
		s = s.trim();
		var res = '';
		if (!ItisName(s))
			return '_NO_NAME_';
		for (i = 0; i < s.length; i++) {
			if ((s[i] >= 'а') && (s[i] <= 'я'))
				res += s[i];
			if ((s[i] >= 'А') && (s[i] <= 'Я'))
				res += s[i];
			if ((s[i] >= 'a') && (s[i] <= 'z'))
				res += s[i];
			if ((s[i] >= 'A') && (s[i] <= 'Z'))
				res += s[i];
			if ((s[i] >= '0') && (s[i] <= '9'))
				res += s[i];
			if (s[i] == ' ')
				res += '_';
			if (s[i] == '_')
				res += s[i];
		}
		if (!ItisName(res))
			return '_ERROR_TRANSL_';
		return res;
	}
	function ParsArguments(s) {
		var type_arg = 'арг';
		var type_inp = '';
		s = (' ' + s + ' ').replace(new RegExp(' арг рез ', 'gi'), ' аргрез ');
		var out = []; //type_arg type_inp name
		for (var k = 0; k < s.split(',').length; k++) {
			var s2 = s.split(',')[k].trim();
			if (ItisType(s2.split(' ')[0])) {
				type_inp = s2.split(' ')[0];
				if (!ItisName(GetIn(s2, s2.split(' ')[0], '').trim()))
					return;
				out.push([type_arg, type_inp, TranslName(GetIn(s2, s2.split(' ')[0], '').trim())]);
			} else
				if (['арг', 'рез', 'аргрез'].indexOf(s2.split(' ')[0]) != -1) {
					type_arg = s2.split(' ')[0];
					if (s2.split(' ')[1] == undefined)
						return;
					if (ItisType(s2.split(' ')[1])) {
						type_inp = s2.split(' ')[1];
						if (!ItisName(GetIn(s2, s2.split(' ')[1], '').trim()))
							return;
						out.push([type_arg, type_inp, TranslName(GetIn(s2, s2.split(' ')[1], '').trim())]);
					} else
						if (type_inp != '') {
							if (!ItisName(GetIn(s2, s2.split(' ')[0], '').trim()))
								return;
							out.push([type_arg, type_inp, TranslName(GetIn(s2, s2.split(' ')[0], '').trim())]);
						} else {
							return;
						}
				} else {
					if (type_inp != "") {
						if (!ItisName(s2.trim()))
							return;
						out.push([type_arg, type_inp, TranslName(s2.trim())]);
					} else {
						return;
					}
				}
		}
		return out;
	}
	var use_robot = false;
	var in_algo = false;
	var in_formul = false;
	var string_const = [];
	var on_error = false;
	var prog_pars = [[]]; //[[kommand befo alg] [procedure or function,"name",[parametr1,.....],дано,надо, [........]] , [""] ]
	var algo_flag_num = 0;
	var my_stack = [];
	var random_name=0;
	var exe_stack_length=0;
	function add_err(s, i) {
		if (ErrorKumir.length < 100)
			ErrorKumir.push([1, s, i]);
		on_error = true;
	}
	var split_s=s.split('\n');
	for (var i = 0; i < split_s.length; i++) {
		var s2 = split_s[i];
		if (s2.trim() == '')
			continue;
		if (s2.indexOf(system_prefix)>=0)
		{
			add_err('hacker found', i);
			continue;
		}
		if (s2.indexOf("'") >= 0 || s2.indexOf('"') >= 0) {
			var str_f = '';
			var out_str = '';
			var fl = 0;
			var kodingstr = '';
			for (var j = 0; j < s2.length; j++) {
				if (s2[j] == '|' && fl == 0)
					break;
				if (s2[j] != '"' && fl == 1)
					str_f += s2[j];
				if (s2[j] != "'" && fl == 2)
					str_f += s2[j];

				if (s2[j] == '"' && fl == 0) {
					kodingstr = system_prefix+'s_' + (random_name++) + '_s';
					str_f = '';
					out_str += kodingstr;
					fl = 1;
				} else
					if (s2[j] == "'" && fl == 0) {
						kodingstr = system_prefix+'s_' + (random_name++) + '_s';
						str_f = '';
						out_str += kodingstr;
						fl = 2;
					} else
						if ((s2[j] == '"' && fl == 1) || (s2[j] == "'" && fl == 2)) {
							fl = 0;
							string_const.push([kodingstr, str_f]);
							//names[2].push(kodingstr);
						} else
							if (fl == 0)
								out_str += s2[j];
			}
			s2 = out_str;
			if (fl == 1) {
				add_err('Не найден закрывающий символ строки(")', i);
				continue;
			}
			if (fl == 2) {
				add_err("Не найден закрывающий символ строки(')", i);
				continue;
			}
		}
		s2 = s2.split('|')[0].replace(/ {1,}/g, ' ').replace(new RegExp('ё', 'gi'), 'е').replace(/\(/g,' (').replace(/\)/g,') ').trim();
		if (s2.trim() == '')
			continue;
		if (in_algo == false && FormatingStr(s2) == 'использовать робот') {
			use_robot = true;
		} else
			if (in_algo == false && s2.trim().indexOf('алг') == 0) {
				var result = []; //[procedure or function,'type',"name",[parametr1,.....],str,дано,надо, [........]]
				var alg_s = s2.split(' ');
				algo_flag_num++;
				if ((alg_s.length > 1) && kumir_isType(alg_s[1])) {
					result.push('function');
					if (algo_flag_num == 1) {
						add_err('Основным алгоритмом не может являться алгоритм-функция', i);
						continue;
					}
					if (s2.indexOf('(') == -1) { //нет параметров
						if (GetIn(s2, alg_s[1], '').trim() == '') {
							add_err('Мне кажеться у название алгоритма-функции должно быть название', i);
							continue;
						} else
							if (!ItisName(GetIn(s2, alg_s[1], ''))) {
								add_err('Какое-то ненормальное название алгоритма-функции', i);
								continue;
							} else {
								result.push(alg_s[1]);
								result.push(GetIn(s2, alg_s[1], ''));
								result.push([]);
							}
					} else {
						if (s2.trim().indexOf(')') == -1) {
							add_err('Не найдена закрывающейся скобка', i);
							continue;
						}
						if (GetIn(s2.trim(), alg_s[1], '(').trim() == '') {
							add_err('Мне кажеться у название алгоритма-функции должно быть название', i);
							continue;
						} else
							if (!ItisName(GetIn(s2.trim(), alg_s[1], '(').trim())) {
								add_err('Какое-то ненормальное название алгоритма-функции', i);
								continue;
							} else {
								result.push(alg_s[1]);
								result.push(GetIn(s2.trim(), alg_s[1], '(').trim());
								if (ParsArguments(GetIn(s2, GetIn(s2.trim(), alg_s[1], '(') + '(', ')'))==undefined)
								{
									add_err('Не удалось распознать аргументы', i);
									continue;
								}
								result.push(ParsArguments(GetIn(s2, GetIn(s2.trim(), alg_s[1], '(') + '(', ')')));
							}
					}
				} else {
					result.push('procedure');
					result.push('');
					if (algo_flag_num == 1) {
						if (s2.trim().indexOf('(') != -1) {
							add_err('У основного алгоритма не должно быть паратметров (неожиданый символ "(")', i);
							continue;
						}
						if (s2.trim().indexOf(')') != -1) {
							add_err('У основного алгоритма не должно быть паратметров (неожиданый символ ")")', i);
							continue;
						}
						result.push('main');
						result.push([]);
					} else
						if (s2.trim().indexOf('(') == -1) { //нет параметров
							if (GetIn(s2, 'алг', '').trim() == '') {
								add_err('Мне кажеться у алгоритма-процедуры должно быть название', i);
								continue;
							} else
								if (!ItisName(GetIn(s2, 'алг', '').trim())) {
									add_err('Какое-то ненормальное название алгоритма-процедуры', i);
									continue;
								} else {
									result.push(GetIn(s2, 'алг', '').trim());
									result.push([]);
								}
						} else {
							if (s2.trim().indexOf(')') == -1) {
								add_err('Не найдена закрывающейся скобка', i);
								continue;
							}
							if (GetIn(s2.trim(), 'алг', '(').trim() == '') {
								add_err('Мне кажеться у алгоритма-процедуры должно быть название', i);
								continue;
							} else
								if (!ItisName(GetIn(s2.trim(), 'алг', '(').trim())) {
									add_err('Какое-то ненормальное название алгоритма-процедуры', i);
									continue;
								} else {
									result.push(GetIn(s2.trim(), 'алг', '(').trim());
									if (ParsArguments(GetIn(s2.trim(), GetIn(s2.trim(), 'алг', '(') + '(', ')'))==undefined)
									{
										add_err('Не удалось распознать аргументы', i);
										continue;
									}
									result.push(ParsArguments(GetIn(s2.trim(), GetIn(s2.trim(), 'алг', '(') + '(', ')')));
								}
						}
				}
				result[2] = TranslName(result[2]);
				result.push(i);
				result.push('');
				result.push('');
				result.push([]);
				prog_pars.push(result);
				in_algo = true;
			} else
				if (in_algo == false) {
					//comand not in algo
					var j = 0;
					if (s2.trim().slice(-1) == ';')
						s2 = s2.trim().slice(0, -1);
					var mybreak = false;
					while (s2.split(';').length > j) {
						if (mybreak == true)
							break;
						var no_alg_str = '';
						if (s2.split(';')[j].trim() == '') {
							add_err('Лишняя точка с запятой', i);
							mybreak = true;
							continue;
						}
						no_alg_str = s2.split(';')[j].trim() + '    ';
						prog_pars[0].push(["@s", i]);
						if (ItisType(no_alg_str.split(' ')[0].trim())) {
							var my_type = no_alg_str.split(' ')[0].trim();
							no_alg_str = GetIn(no_alg_str, no_alg_str.split(' ')[0].trim(), '');

							for (var k = 0; k < no_alg_str.split(",").length; k++) {
								if (ItisType(no_alg_str.split(",")[k].split(" ")[0])) {
									my_type = no_alg_str.split(",")[k].split(" ")[0];
									if (!ItisName(GetIn(no_alg_str.split(",")[k].trim(), ' ', '').trim())) {
										add_err(GetIn(no_alg_str.split(",")[k].trim(), ' ', '').trim() + ' не имя!', i);
										mybreak = true;
										continue;
									}
									prog_pars[0].push(["@var", my_type, TranslName(GetIn(no_alg_str.split(",")[k].trim(), ' ', ''))]);
								} else {
									if (!ItisName(no_alg_str.split(",")[k])) {
										add_err(no_alg_str.split(",")[k].trim() + ' не имя!', i);
										mybreak = true;
										continue;
									}
									//names[2].push(no_alg_str.split(",")[k].trim());
									prog_pars[0].push(["@var", my_type, TranslName(no_alg_str.split(",")[k].trim())]);
								}
							}
						} else
							if (GetIn(" " + no_alg_str, " ", "=") != "") //имя:=выражение
							{
								if (GetIn(" " + no_alg_str, " ", ":=") == "") {
									add_err(':=)', i);
									mybreak = true;
									continue;
								}
								if (!ItisName(GetIn(" " + no_alg_str, " ", ":="))) {
									add_err(GetIn(" " + no_alg_str, " ", ":=").trim() + ' не имя!', i);
									mybreak = true;
									continue;
								}
								prog_pars[0].push(["@:=", TranslName(GetIn(" " + no_alg_str, " ", ":=").trim()), GetIn(no_alg_str, ":=", '').trim()]);
							} else {
								add_err('Неизвестная команда вне алгоритма (' + no_alg_str.trim() + ')', i);
								mybreak = true;
								continue;
							}
						j++;
					}
					if (mybreak == true)
						continue;
				} else
					if (in_algo == true) {

						var j = 0;
						if (s2.trim().slice(-1) == ';')
							s2 = s2.trim().slice(0, -1);
						var mybreak = false;
						var comand=s2.split(';');
						while (comand.length > 0) {
							if (mybreak == true)
								break;
							var no_alg_str = '';
							//if (comand[0].trim() == '') {
							//	add_err('Лишняя точка с запятой', i);
							//	mybreak = true;
							//	continue;
							//}
							if (in_algo == false) {
								add_err('После "кон" должн быть перевод строки', i);
								mybreak = true;
								continue;
							}
							no_alg_str = comand.shift().replace(/ {1,}/g, ' ').replace(/\(/g,' (').replace(/\)/g,') ').trim() + '    ';
							prog_pars[prog_pars.length-1][7].push(["@s", i]);

							if (no_alg_str.trim() == "") {}
							else
								if (no_alg_str.indexOf("нач ") == 0) {
									if (my_stack.length != 0) {
										add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
										mybreak = true;
										continue;
									}
									my_stack.push('нач');
									if (GetIn(no_alg_str,'нач ','').trim()!='')
										comand.unshift(GetIn(no_alg_str,'нач ','').trim());
								} else
								if (no_alg_str.indexOf("кон ") == 0) {
									in_algo = false;
									if (my_stack.length != 1) {
										add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
										mybreak = true;
										my_stack=[];
										continue;
									}
									if (my_stack[0] != "нач") {
										add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
										mybreak = true;
										my_stack=[];
										continue;
									}
									my_stack.pop();
									if (GetIn(no_alg_str,'кон ','').trim()!='')
										comand.unshift(GetIn(no_alg_str,'кон ','').trim());
								} else
								if (no_alg_str.indexOf("дано ") == 0) {
									if (my_stack.length != 0) {
										add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
										mybreak = true;
										continue;
									}
									if (prog_pars[prog_pars.length-1][5] != '') {
										add_err('Эта команда уже была использована', i);
										mybreak = true;
										continue;
									}
									prog_pars[prog_pars.length-1][5]='('+GetIn(no_alg_str,'дано ','').trim()+')';
								} else
								if (no_alg_str.indexOf("надо ") == 0) {
									if (my_stack.length != 0) {
										add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
										mybreak = true;
										continue;
									}
									if (prog_pars[prog_pars.length-1][6] != '') {
										add_err('Эта команда уже была использована', i);
										mybreak = true;
										continue;
									}
									prog_pars[prog_pars.length-1][6]='('+GetIn(no_alg_str,'дано ','').trim()+')';
								}
									else
										if (no_alg_str.indexOf("нц ") == 0) {
											var end = '';
											if (no_alg_str.indexOf("нц для ") == 0) {
												if (GetIn(no_alg_str, "нц для ", " от").trim() == '') {
													add_err('Мне кажеться между "нц для" и "от" должно быть имя', i);
													mybreak = true;
													continue;
												}
												if (!ItisName(GetIn(no_alg_str, "нц для ", " от").trim())) {
													add_err('Это не имя... (между "нц для" и "от")', i);
													mybreak = true;
													continue;
												}
												if (GetIn(GetIn(GetIn(no_alg_str, "нц для ", ""), " от", ""), "до", "").indexOf("шаг") == -1) {
													prog_pars[prog_pars.length-1][7].push(["@for", TranslName(GetIn(no_alg_str, "нц для ", " от").trim()), GetIn(GetIn(no_alg_str, "нц для ", ""), " от", "до").trim(), GetIn(GetIn(GetIn(no_alg_str, "нц для ", ""), " от", ""), "до", "").trim() , '1']);
												} else {
													prog_pars[prog_pars.length-1][7].push(["@for", TranslName(GetIn(no_alg_str, "нц для ", " от ").trim()), GetIn(GetIn(no_alg_str, "нц для ", ""), " от ", " до ").trim(),  GetIn(GetIn(GetIn(no_alg_str, "нц для ", ""), " от", ""), "до", "шаг").trim(), GetIn(GetIn(GetIn(GetIn(no_alg_str, "нц для ", ""), " от", ""), "до", ""), "шаг", "").trim()]);
												}
											} else
												if (no_alg_str.indexOf("нц пока ") == 0) {
													prog_pars[prog_pars.length-1][7].push(["@while", GetIn(no_alg_str, "нц пока", "").trim()]);
												} else
													if ((no_alg_str.indexOf(" раз") != -1)) {
														prog_pars[prog_pars.length-1][7].push(["@for", undefined, 1, GetIn(no_alg_str, "нц", " раз").trim(), 1]);
														end = GetIn(no_alg_str, " раз", "");
													} else {
														prog_pars[prog_pars.length-1][7].push(["@while", 'да']);
														end = GetIn(no_alg_str, "нц", "");
													}
											my_stack.push("нц");
											if (end.trim() != '')
												comand.unshift(end.trim());
										}
										else
											if (no_alg_str.indexOf("кц ") == 0) {
												if (my_stack.length == 0) {
													add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
													mybreak = true;
													continue;
												}
												if (my_stack[my_stack.length - 1] != "нц") {
													add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
													mybreak = true;
													continue;
												}
												prog_pars[prog_pars.length-1][7].push(["@end"]);
												my_stack.pop();
												if (GetIn(no_alg_str, 'кц', '').trim() != '')
													comand.unshift(GetIn(no_alg_str, 'кц', '').trim());
											} else
											//if (true) {add_err('Неизвестная команда. Cтек: [' + my_stack.join(', ')+']', i);} else
												if (no_alg_str.indexOf("кц_при ") == 0) {
													if (my_stack.length == 0) {
														add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
														mybreak = true;
														continue;
													}
													if (my_stack[my_stack.length - 1] != "нц") {
														add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
														mybreak = true;
														continue;
													}
													prog_pars[prog_pars.length-1][7].push(["@if",GetIn(no_alg_str, "кц_при", "")]);
													prog_pars[prog_pars.length-1][7].push(["@break"]);
													prog_pars[prog_pars.length-1][7].push(["@else"]);
													prog_pars[prog_pars.length-1][7].push(["@end"]);
													prog_pars[prog_pars.length-1][7].push(["@end"]);
													my_stack.pop();
												} else
													if (ItisType(no_alg_str.split(" ")[0])) {
														var my_type = "";
														for (var k = 0; k < no_alg_str.split(",").length; k++) {
															if (ItisType(no_alg_str.split(",")[k].trim().split(" ")[0].trim())) {
																my_type = no_alg_str.split(",")[k].trim().split(" ")[0];
																if (!ItisName(GetIn(no_alg_str.split(",")[k].split("=")[0].trim(), ' ', ''))) {
																	add_err(GetIn(no_alg_str.split(",")[k].split("=")[0], ' ', '').trim() + ' не имя! ', i);
																	mybreak = true;
																	continue;
																}
																prog_pars[prog_pars.length-1][7].push(["@var", my_type, TranslName(GetIn(no_alg_str.split(",")[k].split("=")[0].trim(), ' ', ''))]);
																if (no_alg_str.split(",")[k].split("=").length >= 2) {
																	//prog_pars[0].push(["@var", my_type, TranslName(GetIn(no_alg_str.split(",")[k].trim(), ' ', ''))]);
																	prog_pars[prog_pars.length-1][7].push(["@:=", TranslName(GetIn(no_alg_str.split(",")[k].split("=")[0].trim(), ' ', '')), GetIn(no_alg_str.split(",")[k], "=", "")]);
																}
															} else {
																if (!ItisName(no_alg_str.split(",")[k].split("=")[0])) {
																	add_err(no_alg_str.split(",")[k].split("=")[0].trim() + ' не имя! ', i);
																	mybreak = true;
																	continue;
																}
																prog_pars[prog_pars.length-1][7].push(["@var", my_type, TranslName(no_alg_str.split(",")[k].split("=")[0].trim())]);
																if (no_alg_str.split(",")[k].split("=").length >= 2) {
																	prog_pars[prog_pars.length-1][7].push(["@:=", TranslName(no_alg_str.split(",")[k].split("=")[0].trim()), GetIn(no_alg_str.split(",")[k], "=", "")]);
																}

															}
														}
													} else
														if (GetIn(" " + no_alg_str, " ", ":=") != "") //имя:=выражение
														{
															if (!ItisName(GetIn(" " + no_alg_str, " ", ":=")))
															{
																add_err(GetIn(" " + no_alg_str, " ", ":=") + ' не имя! ', i);
																mybreak = true;
																continue;
															}
															prog_pars[prog_pars.length-1][7].push(["@:=", TranslName(GetIn(" " + no_alg_str, " ", ":=").trim()), GetIn(no_alg_str, ":=", "")]);
														} else
															if (no_alg_str.indexOf("вывод ") == 0) {
																prog_pars[prog_pars.length-1][7].push(["@output", GetIn(no_alg_str, "вывод ", "").trim()]);
															} else
																if (no_alg_str.indexOf("ввод ") == 0) {
																	var param_split = GetIn(no_alg_str, " ", "").split(',');
																	var param_split_transl = GetIn(no_alg_str, " ", "").split(',');
																	for (var k = 0; k < param_split.length; k++)
																		if (!ItisName(param_split[k])) {
																			add_err('Найден параметр ввода который не может является названием переменной ('+param_split[k].trim()+')', i);
																			mybreak = true;
																			continue;
																		}else
																		{
																			param_split_transl[k]=TranslName(param_split[k].trim());
																			
																		}
																	for (var k = 0; k < param_split.length; k++)
																		prog_pars[prog_pars.length-1][7].push(["@input", param_split_transl[k]]);
																} else
																	if (no_alg_str.indexOf("при ") == 0) {
																		if (GetIn(no_alg_str, "при", ":").trim() == '') {
																			add_err('Не найдено условие или двоеточие', i);
																			mybreak = true;
																			continue;
																		}
																		if (my_stack.length == 0) {
																			add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
																			mybreak = true;
																			continue;
																		}
																		if (my_stack[my_stack.length - 1].indexOf("выбор") != 0) {
																			add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
																			mybreak = true;
																			continue;
																		}
																		if (parseInt(GetIn(my_stack[my_stack.length - 1], "выбор", "").trim()) > 1) {
																			prog_pars[prog_pars.length-1][7].push(["@else"]);
																		}
																		my_stack[my_stack.length - 1] = "выбор" + (parseInt(GetIn(my_stack[my_stack.length - 1], "выбор", "").trim()) + 1);
																		prog_pars[prog_pars.length-1][7].push(["@if", GetIn(no_alg_str, "при", ":")]);
																		var end = GetIn(GetIn(no_alg_str, "при", ""), ":", "").trim();
																		if (end != "")
																			comand.unshift(end.trim());
																	} else
																		if (no_alg_str.indexOf("выбор ") == 0) {
																			my_stack.push("выбор1");
																			var end = GetIn(no_alg_str, "выбор ", "").trim();
																			if (end != "")
																				comand.unshift(end.trim());
																		} else
																			if (no_alg_str.indexOf("все ") == 0) {
																				if (my_stack.length == 0) {
																					add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
																					mybreak = true;
																					continue;
																				}
																				if (!(my_stack[my_stack.length - 1] == "если иначе" || my_stack[my_stack.length - 1] == "если" || my_stack[my_stack.length - 1].indexOf("иначе_выбор") == 0 || my_stack[my_stack.length - 1].indexOf("выбор") == 0)) {
																					add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
																					mybreak = true;
																					continue;
																				}
																				if (my_stack[my_stack.length - 1] == "если") {
																					prog_pars[prog_pars.length-1][7].push(["@else"]);
																					prog_pars[prog_pars.length-1][7].push(["@end"]);
																				}
																				if (my_stack[my_stack.length - 1] == "если иначе")
																					prog_pars[prog_pars.length-1][7].push(["@end"]);
																				if (my_stack[my_stack.length - 1].indexOf("выбор") == 0)
																					for (var k = 1; k < parseInt(GetIn(my_stack[my_stack.length - 1], "выбор", "").trim()); k++)
																						prog_pars[prog_pars.length-1][7].push(["@end"]);
																				if (my_stack[my_stack.length - 1].indexOf("иначе_выбор") == 0)
																					for (var k = 1; k < parseInt(GetIn(my_stack[my_stack.length - 1], "иначе_выбор", "").trim()); k++)
																						prog_pars[prog_pars.length-1][7].push(["@end"]);
																				my_stack.pop();
																				var end = GetIn(no_alg_str, "все ", "").trim();
																				if (end != "")
																					comand.unshift(end.trim());
																			} else
																				if (no_alg_str.indexOf("иначе ") == 0) {
																					if (my_stack.length == 0) {
																						add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
																						mybreak = true;
																						continue;
																					}
																					if (!(my_stack[my_stack.length - 1] == "если" || my_stack[my_stack.length - 1].indexOf("выбор") == 0)) {
																						add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
																						mybreak = true;
																						continue;
																					}
																					if (my_stack[my_stack.length - 1] == "если") {
																						prog_pars[prog_pars.length-1][7].push(["@else"]);
																						my_stack[my_stack.length - 1] = "если иначе";
																					}
																					if (my_stack[my_stack.length - 1].indexOf("выбор") == 0) {
																						if (parseInt(GetIn(my_stack[my_stack.length - 1], "выбор", "").trim()) != 1)
																							prog_pars[prog_pars.length-1][7].push(["@else"]);
																						my_stack[my_stack.length - 1] = "иначе_выбор" + parseInt(GetIn(my_stack[my_stack.length - 1], "выбор", "").trim());

																					}
																					var end = GetIn(no_alg_str, "иначе ", "").trim();
																					if (end != "")
																						comand.unshift(end.trim());
																				} else
																					if (no_alg_str.trim().indexOf("утв ") == 0) {
																						prog_pars[prog_pars.length-1][7].push(["@if", GetIn(no_alg_str, "утв", "")]);
																						prog_pars[prog_pars.length-1][7].push(["@else"]);
																						prog_pars[prog_pars.length-1][7].push(["@error", i, "Утверждение ложно"]);
																						prog_pars[prog_pars.length-1][7].push(["@end"]);
																					} else
																						if (no_alg_str.indexOf("если ") == 0) {
																							if (GetIn(no_alg_str, "если", "").indexOf(' то ')>=0)
																							{
																								prog_pars[prog_pars.length-1][7].push(["@if", GetIn(no_alg_str+' ', "если", " то ").trim()]);
																								my_stack.push("если");
																								var end = GetIn(GetIn(no_alg_str, "если", ""), " то ", "").trim();
																								if (end != "")
																									comand.unshift(end.trim());
																							}
																							else
																							{
																								prog_pars[prog_pars.length-1][7].push(["@if", GetIn(no_alg_str, "если", "").trim()]);
																								my_stack.push("если_без_то");
																							}
																						} else
																							if (no_alg_str.indexOf("то ") == 0) {
																								if (my_stack.length == 0) {
																									add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
																									mybreak = true;
																									continue;
																								}
																								if (my_stack[my_stack.length - 1] != "если_без_то") {
																									add_err('Неожиданная команда. Мне кажеться ей тут не место. Cтек: [' + my_stack.join(', ')+']', i);
																									mybreak = true;
																									continue;
																								}
																								my_stack.pop();
																								my_stack.push("если");
																								var end = GetIn(no_alg_str, "то ", "").trim();
																								if (end != "")
																									comand.unshift(end.trim());
																							} else
																								if (no_alg_str.indexOf("выход ") == 0) {
																									prog_pars[prog_pars.length-1][7].push(["@break"]);
																									var end = GetIn(no_alg_str, "выход ", "").trim();
																									if (end != "")
																										comand.unshift(end.trim());
																								} else
																									if (ItisName(no_alg_str)) {
																										prog_pars[prog_pars.length-1][7].push(["@procedure", TranslName(no_alg_str.trim().trim()), '']);
																									} else
																										if (ItisName(no_alg_str.split('(')[0].trim())) {
																											prog_pars[prog_pars.length-1][7].push(["@procedure", TranslName(no_alg_str.split('(')[0].trim()), GetIn(no_alg_str,no_alg_str.split('(')[0],'').trim()]);
																										} else {
																											add_err('Неизвестная команда', i);
																											mybreak = true;
																											continue;
																										}
							j++;
							if (TabInProgramm[i] == undefined)
								TabInProgramm[i] = Math.max(Math.min(my_stack.length+1, exe_stack_length)-1,0);
							exe_stack_length = my_stack.length+1;
						}
						if (mybreak == true)
							continue;
					}

		//in_algo=false;
	}

	//if (s.split('\n')[i].trim().split('|')[0].trim() != '') {
	//k_split.push([i, s.split('\n')[i].trim().split('|')[0].trim()]);
	//}

	if (prog_pars.length  <=1)
		add_err('Нет основного алгоритма', my_stack.join(', ')+']', s.split('\n').length-1);
	if (my_stack.length  != 0)
		add_err('Стек не пуст. Cтек: [' + my_stack.join(', ')+']', s.split('\n').length-1);


	if (use_robot == false)
		add_err('Не найден "использовать Робот"', 0);
	if (on_error == true)
		return;
	
	if (debug)console.log('');
	if (debug)console.log(prog_pars);	
	function KumType2Type(s)
	{
		switch (s) {
			case "цел":
				return 'i'
				break;
			case "вещ":
				return 'f'
				break;
			case "лог":
				return 'b'
				break;
			case "сим":
				return 'c'
				break;
			case "лит":
				return 's'
				break;
				
			case "целтаб":
				return 'ia'
				break;
			case "вещтаб":
				return 'fa'
				break;
			case "логтаб":
				return 'ba'
				break;
			case "симтаб":
				return 'ca'
				break;
			case "литтаб":
				return 'sa'
				break;
		}
		return 'error_type'
	}
	function Type2KumType(s)
	{
		switch (s) {
			case "i":
				return 'цел'
				break;
			case "f":
				return 'вещ'
				break;
			case "b":
				return 'лог'
				break;
			case "c":
				return 'сим'
				break;
			case "s":
				return 'лит'
				break;
				
			case "ia":
				return 'целтаб'
				break;
			case "fa":
				return 'вещтаб'
				break;
			case "ba":
				return 'логтаб'
				break;
			case "ca":
				return 'симтаб'
				break;
			case "sa":
				return 'литтаб'
				break;
		}
		return 'error_type'
	}
	
	//var names = [["вправо", "вниз", "влево", "вверх", "закрасить"], ["цел в лит", "вещ в лит", "лит в цел", "лит в вещ", "sqrt", "abs", "sin", "cos", "tg", "ctg", "arcsin", "arccos", "arctg", "arcctg", "ln", "lg", "exp", "min", "max", "mod", "div", "int", "rnd", "длин", "код", "символ", "юникод", "символ2", 'слева_свободно', 'справа_свободно', 'сверху_свободно', 'снизу_свободно', 'слева_стена', 'справа_стена', 'сверху_стена', 'снизу_стена', 'клетка_закрашена', 'клетка_чистая', 'температура', 'радиация'], ["МЦЕЛ", "МВЕЩ", "да", "нет", "нс"]];
	
	var names_var={
МЦЕЛ:'i',//= 2147483647
МВЕЩ:'f',//= 1.7976931348623157e+308
да:'b',//= 1
нет:'b',//= 0
нс:'s'//= '\n'
};
	var names_procedure={"вправо":[], "вниз":[], "влево":[], "вверх":[], "закрасить":[]};
	var names_function={
		"цел_в_лит": ['лит', ['цел']],
		"вещ_в_лит": ['лит', ['вещ']],
		"лит_в_цел": ['цел', ['лит']],
		"лит_в_вещ": ['вещ', ['лит']],
		"sign":['цел',['вещ']],
		"sqrt": ['вещ', ['вещ']],
		"abs": ['вещ', ['вещ']],
		"iabs": ['цел', ['цел']],
		"sin": ['вещ', ['вещ']],
		"cos": ['вещ', ['вещ']],
		"tg": ['вещ', ['вещ']],
		"ctg": ['вещ', ['вещ']],
		"arcsin": ['вещ', ['вещ']],
		"arccos": ['вещ', ['вещ']],
		"arctg": ['вещ', ['вещ']],
		"arcctg": ['вещ', ['вещ']],
		"ln": ['вещ', ['вещ']],
		"lg": ['вещ', ['вещ']],
		"exp": ['вещ', ['вещ']],
		"min": ['вещ', ['вещ', 'вещ']],
		"max": ['вещ', ['вещ', 'вещ']],
		"mod": ['цел', ['цел', 'цел']],
		"div": ['цел', ['цел', 'цел']],
		"int": ['цел', ['вещ']],
		"rnd": ['вещ', ['вещ']],
		"длин": ['цел', ['лит']],
		"код": ['цел', ['сим']],
		"символ": ['сим', ['цел']],
		"юникод": ['цел', ['сим']],
		"символ2": ['сим', ['цел']],
		'слева_свободно': ['лог', []],
		'справа_свободно': ['лог', []],
		'сверху_свободно': ['лог', []],
		'снизу_свободно': ['лог', []],
		'слева_стена': ['лог', []],
		'справа_стена': ['лог', []],
		'сверху_стена': ['лог', []],
		'снизу_стена': ['лог', []],
		'клетка_закрашена': ['лог', []],
		'клетка_чистая': ['лог', []],
		'температура': ['вещ', []],
		'радиация': ['вещ', []]
	};
	for (var i = 1; i < prog_pars.length; i++) {
		if (prog_pars[i][0]=='function')
		{
			if (Object.keys(names_function).indexOf(prog_pars[i][2])>=0 || Object.keys(names_procedure).indexOf(prog_pars[i][2])>=0)
				add_err('Функция с таким именем уже существует', prog_pars[i][4]);
			var _arr=[];
			for (var j = 0; j < prog_pars[i][3].length; j++) {
				_arr.push(prog_pars[i][3][j][1]);
			}
			names_function[prog_pars[i][2]]=[prog_pars[i][1],_arr];
			
		}
		else
		{
			if (Object.keys(names_function).indexOf(prog_pars[i][2])>=0 || Object.keys(names_procedure).indexOf(prog_pars[i][2])>=0)
				add_err('Процедура с таким именем уже существует', prog_pars[i][4]);
			var _arr=[];
			for (var j = 0; j < prog_pars[i][3].length; j++) {
				_arr.push(prog_pars[i][3][j][1]);
			}
			names_procedure[prog_pars[i][2]]=_arr
			
		}
	}
	if (on_error == true)
		return;
	var programm_out='@'+system_prefix+'main\nBEGIN\n';
	var exe_no=0;
	//string_const
	//system_prefix
	//name_code
	programm_out+='$VAR_i МЦЕЛ\n';
	programm_out+='$PUSH_i 2147483647\n';
	programm_out+='$POP_i МЦЕЛ\n';
	
	programm_out+='$VAR_f МВЕЩ\n';
	programm_out+='$PUSH_f 1.7976931348623157e+308\n';
	programm_out+='$POP_f МВЕЩ\n';
	
	programm_out+='$VAR_b да\n';
	programm_out+='$PUSH_b 1\n';
	programm_out+='$POP_b да\n';
	
	programm_out+='$VAR_b нет\n';
	programm_out+='$PUSH_b 0\n';
	programm_out+='$POP_b нет\n';
	
	programm_out+='$VAR_s нс\n';
	programm_out+='$PUSH_s \\n\n';
	programm_out+='$POP_s нс\n';
	for (var i = 0; i < string_const.length; i++) {
		if (string_const[i][1].length==1)
		{
			names_var[string_const[i][0]]='c';
			programm_out+='$VAR_c '+string_const[i][0]+'\n';
			programm_out+='$PUSH_c '+string_const[i][1]+'\n';
			programm_out+='$POP_c '+string_const[i][0]+'\n';
		}
		else
		{
			names_var[string_const[i][0]]='s';
			programm_out+='$VAR_s '+string_const[i][0]+'\n';
			programm_out+='$PUSH_s '+string_const[i][1]+'\n';
			programm_out+='$POP_s '+string_const[i][0]+'\n';
		}
	}
	if (debug)console.log('[0]');
	for (var i = 0; i < prog_pars[0].length; i++) {
		switch (prog_pars[0][i][0]) {
		case "@:=":
			if (names_var[prog_pars[0][i][1].trim()]!=undefined)
			{
				programm_out+=parseFormula(prog_pars[0][i][2],1,names_function,names_var,Type2KumType(names_var[prog_pars[0][i][1].trim()]));
				if (persing_log!='')
					add_err('Ошибка формулы: ' + persing_log, exe_no);
				programm_out+='$POP_'+names_var[prog_pars[0][i][1].trim()]+' '+prog_pars[0][i][1]+'\n';
			}
			else
			{
				add_err('Нельзя установить значение необъявленной переменной (' + prog_pars[0][i][1]+')', exe_no);
			}
			break;
		case "@var":
			if (names_var[prog_pars[0][i][2].trim()]==undefined)
			{
				names_var[prog_pars[0][i][2].trim()]=KumType2Type(prog_pars[0][i][1].trim());
				programm_out+='$VAR_'+KumType2Type(prog_pars[0][i][1].trim())+' '+prog_pars[0][i][2].trim()+'\n';
			}
			else
			{
				add_err('Нельзя объявить объявленную переменную (' + prog_pars[0][i][2]+')', exe_no);
			}
			break;
		case "@s":
			exe_no = prog_pars[0][i][1];
			programm_out+='$PUSH_i '+prog_pars[0][i][1]+'\n';
			programm_out+='$INT SetStr\n';
			break;
		default:
			add_err('Неизвестная команда при трансляции ' + prog_pars[0][i][0], exe_no); //Такое не может произойти правда........
			return;
		}
	}
	programm_out+='$RUN main\n';
	programm_out+='END\n';
	if (debug)console.log('[0]_end');
	
	//[procedure or function,'type',"name",[parametr1,.....],str,дано,надо, [........]]
	var ___i=0;
	
	for (var i = 1; i < prog_pars.length; i++) {
		programm_out+='@'+prog_pars[i][2]+'\n';
		exe_no = prog_pars[i][4];
		var new_names_var=[];
		programm_out+='BEGIN\n';
		programm_out+='$PUSH_i '+exe_no+'\n';
		programm_out+='$INT SetStr\n';
		for (var k = prog_pars[i][3].length-1; k>=0 ; k--) {
			//арг - const + value
			//рез - var undefined
			//аргрез - save_value
			names_var[prog_pars[i][3][k][2]]=KumType2Type(prog_pars[i][3][k][1]);
			new_names_var.push(prog_pars[i][3][k][2]);
			switch (prog_pars[i][3][k][0]) {
				case "арг":
					programm_out+='$VAR_'+KumType2Type(prog_pars[i][3][k][1])+' '+prog_pars[i][3][k][2]+'\n';
					programm_out+='$fPOP_'+KumType2Type(prog_pars[i][3][k][1])+' '+prog_pars[i][3][k][2]+'\n';
					//programm_out+='$CONST_'+KumType2Type(prog_pars[i][3][k][1])+' '+prog_pars[i][3][k][2]+'\n';
					//+POP
					break;
				case "рез":
					programm_out+='$VAR_'+KumType2Type(prog_pars[i][3][k][1])+' '+prog_pars[i][3][k][2]+'\n';
					programm_out+='$fPOP_'+KumType2Type(prog_pars[i][3][k][1])+' '+prog_pars[i][3][k][2]+'\n';
					break;
				case "аргрез":
					programm_out+='$VAR_'+KumType2Type(prog_pars[i][3][k][1])+' '+prog_pars[i][3][k][2]+'\n';
					programm_out+='$fPOP_v '+prog_pars[i][3][k][2]+'\n';
					break;
			}
		}
		if (prog_pars[i][0]=='function')
		{
			names_var['знач']=KumType2Type(prog_pars[i][1]);
			new_names_var.push('знач');
			programm_out+='$VAR_'+KumType2Type(prog_pars[i][1])+' знач\n';
		}
		for (var k = 0; k < prog_pars[i][7].length; k++) {
			switch (prog_pars[i][7][k][0]) {
			case "@break":
				programm_out += "$BREAK\n";
				break;
			case "@s":
				exe_no = prog_pars[i][7][k][1];
				programm_out+='$PUSH_i '+exe_no+'\n';
				programm_out+='$INT SetStr\n';
				break;
			case "@if":
				programm_out+=parseFormula(prog_pars[i][7][k][1],1,names_function,names_var,'лог');
				if (persing_log!='')
					add_err('Ошибка формулы: ' + persing_log, exe_no);
				programm_out+='$IF\n';
				break;
			case "@else":
				programm_out += "$ELSE\n";
				break;
			case "@end":
				programm_out += "$END\n";
				break;
			case "@procedure":
				if (Object.keys(names_procedure).indexOf(prog_pars[i][7][k][1])<0)
					add_err('Процедура с таким('+prog_pars[i][7][k][1]+') именем не существует', exe_no);
				else
					if (prog_pars[i][7][k][2].replace(/\(/gi,'').replace(/\)/gi,'').trim().length != 0)
					{
						programm_out+=parseFormula(prog_pars[i][7][k][2],names_procedure[prog_pars[i][7][k][1]].length,names_function,names_var);
						if (persing_log!='')
							add_err('Ошибка формулы: ' + persing_log, exe_no);
					}else
						if (names_procedure[prog_pars[i][7][k][1]].length!=0)
							add_err('Ошибка формулы: нет необходимого количество параметров', exe_no);
				programm_out+='$RUN '+prog_pars[i][7][k][1]+'\n';
				//___i++;
				//var random_name_str = "random_name_" +  "_" + ___i + "_";
				//if (k_split_algo[i][5][k][2].length == 0)
				//	exe_s += "var " + random_name_str + "=GetStr(); prog_write('запущено'," + random_name_str + ");p_" + parseFormula(k_split_algo[i][5][k][1].trim()).slice(2) + "();prog_write('выполнено'," + random_name_str + ");\r\n";
				//else
				//	exe_s += "var " + random_name_str + "=GetStr(); prog_write('запущено'," + random_name_str + ");p_" + parseFormula(k_split_algo[i][5][k][1].trim()).slice(2) + "" + k_split_algo[i][5][k][2].slice(3) + ";prog_write('выполнено'," + random_name_str + ");\r\n";
				break;
			case "@error":
				programm_out+='$PUSH_i '+prog_pars[i][7][k][1]+'\n';
				programm_out+='$INT SetStr\n';
				programm_out+='$PUSH_s Ошибка при исполнение: '+prog_pars[i][7][k][2].replace(/\n/gi,'')+'\n';
				programm_out+='$INT error\n';
				//exe_s += "out_array.push([10, 'Ошибка при исполнение: " + k_split_algo[i][5][k][1] + "', GetStr()]);\r\n";
				break;
			case "@for":
				___i++;
				var name_alu=system_prefix+'alu_'+___i;
				if (prog_pars[i][7][k][1] == undefined)
				{
					programm_out+='$VAR_i '+name_alu+'\n';
					programm_out+='$PUSH_i 0\n';
					programm_out+='$POP_i '+name_alu+'\n';
				}
				else
				{
					name_alu=prog_pars[i][7][k][1];
					programm_out+='$PUSH_i 0\n';
					programm_out+='$POP_i '+name_alu+'\n';
				}
				programm_out+=parseFormula(prog_pars[i][7][k][2],1,names_function,names_var,'цел');
				if (persing_log!='')
					add_err('Ошибка формулы: ' + persing_log, exe_no);
				programm_out+=parseFormula(prog_pars[i][7][k][3],1,names_function,names_var,'цел');
				if (persing_log!='')
					add_err('Ошибка формулы: ' + persing_log, exe_no);
				programm_out+=parseFormula(prog_pars[i][7][k][4],1,names_function,names_var,'цел');
				if (persing_log!='')
					add_err('Ошибка формулы: ' + persing_log, exe_no);
				programm_out+='$FOR '+name_alu+'\n';
				/*___i++;
				var random_name_ot = "random_name_" +  "_" + ___i + "_";
				___i++;
				var random_name2_do = "random_name_" +  "_" + ___i + "_";
				___i++;
				var random_name3_for = "random_name_" +  "_" + ___i + "_";
				___i++;
				var random_name3_shag = "random_name_" + "_" + ___i + "_";
				___i++;
				var random_name4_name = "random_name_" + "_" + ___i + "_";
				___i++;
				var random_name_str = "random_name_" +"_" + ___i + "_";
				exe_s += "var " + random_name_str + "=GetStr();";
				if ((k_split_algo[i][5][k][1] == undefined) || (parseFormula(k_split_algo[i][5][k][1], names[1], names[2]) == undefined)) {
					exe_s += "var " + random_name_ot + "=" + k_split_algo[i][5][k][2] + ";var " + random_name2_do + "=" + k_split_algo[i][5][k][3] + ";var " + random_name3_shag + "=" + k_split_algo[i][5][k][4] + "; for (var " + random_name3_for + "=" + random_name_ot + ";Srav('<='," + random_name3_for + "," + random_name2_do + ");" + random_name3_for + "+=" + random_name3_shag + "){\r\n";
					exe_s += "prog_write('= '+" + random_name3_for + "," + random_name_str + ");\r\n";
				} else {
					exe_s += "var " + random_name_ot + "=" + k_split_algo[i][5][k][2] + ";var " + random_name2_do + "=" + k_split_algo[i][5][k][3] + ";var " + random_name3_shag + "=" + k_split_algo[i][5][k][4] + "; for (var " + random_name3_for + "=" + random_name_ot + ";Srav('<='," + random_name3_for + "," + random_name2_do + ");" + random_name3_for + "+=" + random_name3_shag + "){\r\n";
					exe_s += "Val(" + parseFormula(k_split_algo[i][5][k][1], names[1], names[2]) + "," + random_name3_for + ");prog_write('" + k_split_algo[i][5][k][1] + " = '+" + random_name3_for + "," + random_name_str + ");\r\n";
				}*/
				break;
			case "@:=":
				if (names_var[prog_pars[i][7][k][1].trim()]!=undefined)
				{
					programm_out+=parseFormula(prog_pars[i][7][k][2],1,names_function,names_var,Type2KumType(names_var[prog_pars[i][7][k][1].trim()]));
					if (persing_log!='')
						add_err('Ошибка формулы: ' + persing_log, exe_no);
					programm_out+='$POP_'+names_var[prog_pars[i][7][k][1].trim()]+' '+prog_pars[i][7][k][1]+'\n';
				}
				else
				{
					add_err('Нельзя установить значение необъявленной переменной (' + prog_pars[i][7][k][1]+')', exe_no);
				}
				break;
				//if (parseFormula(k_split_algo[i][5][k][1], names[1], names[2]) == undefined) {
				//	ErrorKumir.push([6, "Необъявленное имя(" + k_split_algo[i][5][k][1] + ")", exe_no]);
				//	return;
				//}
				//exe_s += "Val(" + parseFormula(k_split_algo[i][5][k][1], names[1], names[2]) + "," + k_split_algo[i][5][k][2] + ");prog_write('" + k_split_algo[i][5][k][1] + " = '+ GetType(" + parseFormula(k_split_algo[i][5][k][1], names[1], names[2]) + ")[1]);\r\n";
				break;
			case "@var":
				if (names_var[prog_pars[i][7][k][2].trim()]==undefined)
				{
					names_var[prog_pars[i][7][k][2].trim()]=KumType2Type(prog_pars[i][7][k][1].trim());
					new_names_var.push(prog_pars[i][7][k][2].trim());
					programm_out+='$VAR_'+KumType2Type(prog_pars[i][7][k][1].trim())+' '+prog_pars[i][7][k][2].trim()+'\n';
				}
				else
				{
					add_err('Нельзя объявить объявленную переменную (' + prog_pars[i][7][k][2]+')', exe_no);
				}
				break;
				//exe_s += "var " + parseFormula(k_split_algo[i][5][k][2], names[1], names[2]) + "=NewType('" + k_split_algo[i][5][k][1] + "')\r\n";
				break;
			case "@input":
				if (!ItisName(prog_pars[i][7][k][1].trim()))
				{
					add_err('Это('+prog_pars[i][7][k][1].trim()+') не имя!!' + persing_log, exe_no);
				}
				else
				{
					if (names_var[TranslName(prog_pars[i][7][k][1].trim())]==undefined)
					{
						add_err('Нельзя использовать необъявленную переменную (' + prog_pars[i][7][k][1].trim()+')', exe_no);
						
					}
					else
					{
						programm_out+='$INT READ_'+names_var[TranslName(prog_pars[i][7][k][1].trim())]+'\n';
						programm_out+='$POP_'+names_var[TranslName(prog_pars[i][7][k][1].trim())]+' '+TranslName(prog_pars[i][7][k][1].trim())+'\n';
					}
				}
				//exe_s += "Get_Inp({'inp':[" + k_split_algo[i][5][k][1].slice(3).substring(1, k_split_algo[i][5][k][1].slice(3).length - 1) + "]});\r\n";
				break;
			case "@output":
				programm_out+=parseFormula(prog_pars[i][7][k][1],Infinity,names_function,names_var);
				if (persing_log!='')
					add_err('Ошибка формулы: ' + persing_log, exe_no);
				programm_out+='$PUSH_i '+exe_no+'\n';
				programm_out+='$INT SetStr\n';
				programm_out+='$INT WRITE\n';
				//exe_s += "out_array.push([-1,v([" + k_split_algo[i][5][k][1].slice(3).substring(1, k_split_algo[i][5][k][1].slice(3).length - 1) + "])]);program_output+=v([" + k_split_algo[i][5][k][1].slice(3).substring(1, k_split_algo[i][5][k][1].slice(3).length - 1) + "]).join('');\r\n";
				break;
			case "@while":
				programm_out+='$WHILE_HEAD_START\n';
				programm_out+='$PUSH_i '+exe_no+'\n';
				programm_out+='$INT SetStr\n';
				programm_out+=parseFormula(prog_pars[i][7][k][1],1,names_function,names_var,'лог');
				if (persing_log!='')
					add_err('Ошибка формулы: ' + persing_log, exe_no);
				programm_out+='$WHILE_HEAD_END\n';
				//___i++;
				//var random_name_str = "random_name_" + "_" + ___i + "_";
				//exe_s += "var " + random_name_str + "=GetStr(); while (prog_write('нет'," + random_name_str + ")&&(" + k_split_algo[i][5][k][1] + ")){prog_write('да'," + random_name_str + ");\r\n";
				break;
			default:
				ErrorKumir.push([6, "Неизвестная команда при трансляции " + prog_pars[i][7][k][0], exe_no]); //Такое не может произойти правда........
				//exe_s += "out_array.push([10, 'Неизвестная команда при трансляции " + k_split_algo[i][5][k][0] + "', GetStr()]);\r\n";
				return;
			}
		}
		for (var k = 0; k <new_names_var.length; k++) {
			names_var[new_names_var]=undefined;
		}
		if (prog_pars[i][0]=='function')
		{
			programm_out+='$PUSH знач\n';
		}
		programm_out+='END\n';
	}
	if (debug)console.log(programm_out);
	if (on_error == true)
		return;
	if (debug)console.log('RUNING...');
	var end = new Date;
	if (map != '')
	{
		returncode = RunAsmCode(programm_out,map);
	}
	else
	{
		 // конец измерения
		if (debug)
			console.log(steps);
		TabInProgramm["work"] = true;
		return (end - start);
	}
	//if (returncode.length > 100000) {
	//	ErrorKumir.push([6, 'Слишком много команд было выполнено)))', 0]);
	//	return;
	//}
	if (debug)
		console.log(returncode);
	if (returncode.length == 2)
		if (returncode[0] == -1) {
			function Damp(e, p) {
				var XHR2 = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
				var xhr2 = new XHR2();
				xhr2.open('POST', 'errordamp', true);
				xhr2.onreadystatechange = function () {}
				xhr2.onerror = function () {
					if (debug)
						console.log('Сервер не ответил(3.2).');
				}
				xhr2.send('errordamp+' + encodeURIComponent(p).replace(/%20/g, "+"));
			}
			Damp(returncode[1], damp_program);
			ErrorKumir.push([12, 'Неизвестная ошибка. Err: ' + returncode[1], 0]);
			return;
		}
	for (i = 0; i < returncode.length; i++) {
		switch (returncode[i][0]) {
		case 0:
			//шаг
			if (returncode[i][1] == 0)
				steps.push("шагвлево");
			if (returncode[i][1] == 1)
				steps.push("шагвправо");
			if (returncode[i][1] == 2)
				steps.push("шагвниз");
			if (returncode[i][1] == 3)
				steps.push("шагвверх");
			if (returncode[i][1] == 4)
				steps.push("закрасить");
			if (returncode[i][1] == 10)
				steps.push("Errorшагвлево");
			if (returncode[i][1] == 11)
				steps.push("Errorшагвправо");
			if (returncode[i][1] == 12)
				steps.push("Errorшагвниз");
			if (returncode[i][1] == 13)
				steps.push("Errorшагвверх");
			if (returncode[i][1] == 14)
				steps.push("закрасить");
			break;
		case -1:
			//вывод
			for (var k = 0; k < returncode[i][1].length; k++)
				steps.push("вывод" + returncode[i][1][k]);
			break;
		case -2:
			//новая строка
			steps.push("str" + returncode[i].slice(1));
			break;
		case -3:
			//вывод строки
			steps.push("write_prog" + returncode[i][1] + '_' + returncode[i][2]);
			break;
		case 10:
			//ошибка
			ErrorKumir.push([-5, returncode[i][1], returncode[i][2]]); //str0 // влево // вправо // вниз // вверх
			break;
		case 11:
			//предупреждение
			ErrorKumir.push([10, returncode[i][1], returncode[i][2]]); //str0 // влево // вправо // вниз // вверх
			break;
		default:
			ErrorKumir.push([6, "Неизвестная команда при обработке работы программы " + returncode[i][0], 0]);
		}
	}
	var end = new Date; // конец измерения
	if (debug)
		console.log(steps);
	TabInProgramm["work"] = true;
	return (end - start);
}
