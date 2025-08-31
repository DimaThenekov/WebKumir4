//old school from dim0n4eg
var debug=false;



if (!('remove' in Element.prototype)) {
	Element.prototype.remove = function () {
		if (this.parentNode) {
			this.parentNode.removeChild(this);
		}
	};
}
String.prototype.trimRight = function(s) { 
    return this.replace(new RegExp(s + "*$"),''); 
};
if (!Date.prototype.toISOString) {
  (function() {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toISOString = function() {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds()) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
    };

  }());
}
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // ПРИМЕЧАНИЕ: Технически, здесь должен быть Object.defineProperty на
        //             следующий индекс, поскольку push может зависеть от
        //             свойств на Object.prototype и Array.prototype.
        //             Но этот метод новый и коллизии должны быть редкими,
        //             так что используем более совместимую альтернативу.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}
/*if (!('requestAnimationFrame' in window)) {
	window.requestAnimationFrame = function (a) {
		setInterval(a, 33);
	};
}*/
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    // Обеспечение того, что count является 31-битным целым числом, позволяет нам значительно
    // соптимизировать главную часть функции. Впрочем, большинство современных (на август
    // 2014 года) браузеров не обрабатывают строки, длиннее 1 << 28 символов, так что:
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (var i = 0; i < count; i++) {
      rpt += str;
    }
    return rpt;
  }
}

 function MyOnLoad() {
	onloadone();
	onloadtwo();
	setInterval(CProg,33);
}
String.prototype.addSlashes = function () {
	//no need to do (str+'') anymore because 'this' can only be a string
	return this.replace(/\\/g, '\\\\')  // Экранируем обратный слэш
				.replace(/'/g, '\\\'')   // Экранируем одинарную кавычку
				.replace(/"/g, '&quot;')    // Экранируем двойную кавычку
				.replace(/\n/g, '\\\n')   // Экранируем новую строку
				.replace(/\r/g, '\\\r');  // Экранируем возврат каретки
				//.replace(/\\/g, '\\\\');  // Экранируем обратный слэш
	//return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
String.prototype.addSlashes2 = function () {
	//no need to do (str+'') anymore because 'this' can only be a string
	return this.replace(/[\b]/g, '\\b').replace(/[\f]/g, '\\f').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r').replace(/[\t]/g, '\\t');
	//return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
/*function getPosition(e) {
var rect = e.target.getBoundingClientRect();
var x = -1;
var y = -1;
if ((e.clientX != undefined) && (e.clientX != undefined)) {
x = e.clientX - rect.left;
y = e.clientY - rect.top;
} else
if (e.touches != undefined)
if (e.touches.length > 0) {
x = e.touches[0].clientX - rect.left;
y = e.touches[0].clientY - rect.top;
}
return (x + ':' + y);
}*/

function getPosition(e) {
	var rect = e.target.getBoundingClientRect();
	var x = -1;
	var y = -1;
	if ((e.clientX != undefined) && (e.clientX != undefined)) {
		x = e.clientX - rect.left;
		y = e.clientY - rect.top;
	} else
		if (e.touches != undefined)
			if (e.touches.length > 0) {
				x = e.touches[0].clientX - rect.left;
				y = e.touches[0].clientY - rect.top;
			} else if (e.changedTouches.length > 0) {
				x = e.changedTouches[0].clientX - rect.left;
				y = e.changedTouches[0].clientY - rect.top;
			}
	return (x + ':' + y);
}

var Keys = {};
for (var i = 0; i < 256; i++) {
	Keys[i] = false;
}
function L_keydown(e) {
	if (!e.repeat)
		if (Keys[e.keyCode] == false)
			Keys[e.keyCode] = true;
}
function L_keyup(e) {
	Keys[e.keyCode] = false;
}
addEventListener("keyup", L_keyup);
addEventListener("keydown", L_keydown);

function Lfloor(a) {
	if (a < 0) {
		return Math.floor(a);
	} else {
		return Math.floor(a) + 1;
	}
}
function drob(a) {
	return Math.round((a - Lfloor(a)) * 16) / 16;
}

function hex2a(hexx) {
	var hex = hexx;
	var str = '';
	for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
}
function round16(x) {
	return (Math.round(x * 16) / 16);
}
var MyMD5 = function (r) {
	return MD5(r)
};

var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

// Takes any integer
function seed(i) {
	if (typeof i === 'number') {
		m_w = (341873128 + (i ^ 25219039)) & mask;
		m_z = (132897987 - (i ^ 78038570)) & mask;
	} else if (typeof i === 'string') {
		var a = [0.024, 0.658, 0.886, 0.798, 0.824, 0.687, 0.722, 0.819, 0.425, 0.483, 0.809, 0.283, 0.998, 0.029, 0.097, 0.049, 0.721, 0.954, 0.643, 0.607, 0.395, 0.693, 0.475, 0.8, 0.654, 0.655, 0.825, 0.774, 0.446, 0.176, 0.251, 0.199];
		var k = 0;
		i = MyMD5(i);
		for (var j = 0; j < i.length; j++) {
			k = k + i.charCodeAt(j) * a[j];
		}
		//console.log(i);
		//console.log(k);
		seed(Math.round(k * 10000));
	} else {
		if (debug)
		{
			console.log("error 2-3984");
			console.log(typeof i);
			console.log(i);
		}
	}
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random() {
	m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
	m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
	var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
	result /= 4294967296;
	return result;
}

function MyCode(code, key) {
	function shiftStr(shift, str) {
		var shiftedAlphabet = '';
		for (var i = 0; i < str.length; i++) {
			currentLetter = (str[i + shift] === undefined) ? (str[i + shift - str.length]) : (str[i + shift]);
			shiftedAlphabet = shiftedAlphabet.concat(currentLetter);
		}
		return shiftedAlphabet;
	}
	function encrypt(message, shift) {
		var shiftedAlphabet = shiftStr(shift, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
		var encryptedMessage = '';
		for (var i = 0; i < message.length; i++) {
			var indexOfLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(message[i]);
			encryptedMessage = encryptedMessage.concat(shiftedAlphabet[indexOfLetter]);
		}
		return encryptedMessage;
	}

	function decrypt(message, shift) {
		var shiftedAlphabet = shiftStr(shift, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
		var encryptedMessage = '';
		for (var i = 0; i < message.length; i++) {
			if (message[i] == ' ') {
				encryptedMessage = encryptedMessage.concat(' ');
				continue
			};
			var indexOfLetter = shiftedAlphabet.indexOf(message[i]);
			encryptedMessage = encryptedMessage.concat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='[indexOfLetter]);
		}
		return encryptedMessage;
	}
	function reverseString(str) {
		return str.split("").reverse().join("");
	}
	function reverseStringABC(str, abc) {
		var s = '';
		for (var i = 0; i < str.length; i++)
			s = s + abc[abc.length - 1 - abc.indexOf(str.split("")[i])]
				return s;
	}
	var s = code;
	var k = key;
	var s2 = btoa(s);
	
	if (debug)
		console.log(s2);
	while (k > 0) {
		//btoa("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
		if (k % 2 == 0) {
			s2 = reverseString(s2);
			if (debug)
				console.log([0.1, s2]);
		} else {
			s2 = reverseStringABC(s2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
			if (debug)
				console.log([0.2, s2]);
		}
		k = Math.floor(k / 2);
		s2 = encrypt(s2, k % 10);
		if (debug)
			console.log([1, s2]);
		k = Math.floor(k / 10);
		shiftStr(k % 10, s2);
		if (debug)
			console.log([2, s2]);
		k = Math.floor(k / 10);
	}
	return s2;
}

//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
//library---library---library---library---library---library---library
document.getElementById('area').value=document.getElementById('area').innerHTML;
var game_fps=[1,1,1];
setInterval(function (){
	var sum=0;
	game_fps.forEach(function (e){sum=sum+e});
	var real_fps=sum/game_fps.length;
	if (document.getElementById('AllMap').style.height != "0%")
	{
		document.getElementById('fps_data_map').style.display='';
		if (document.getElementById('fps_data_map').innerHTML!='fps: '+Math.round(real_fps/5)*5+'<br>ping: '+ping)
			document.getElementById('fps_data_map').innerHTML='fps: '+Math.round(real_fps/5)*5+'<br>ping: '+ping;
	}else
		document.getElementById('fps_data_map').style.display='none';
},500);


 
   
/*
var new_time_arr=[];
setTimeout(new_time_damp,1000+40000*Math.random());
function new_time_damp()
{
  var t=new Date();
  Serv_Command('get_time',function f(s){
    new_time_arr.push(Math.floor(parseInt(s.split(' ')[2])-(new Date()-t)*0.3/1000)+(new Date()-0));
    if (debug)console.log(Math.floor(parseInt(s.split(' ')[2])-(new Date()-t)*0.3/1000)/1000/60+'min');
    if (new_time_arr.length<10)
      setTimeout(new_time_damp,2000);
    else
    {
      new_time_arr.sort();
	  if (debug) console.log(Math.round(new_time_arr[Math.floor(new_time_arr.length/2)]/200)*200);
	  if (Math.round(new_time_arr[Math.floor(new_time_arr.length/2)]/200)*200-(new Date())>0)
      setTimeout(new_time_openvid,Math.round(new_time_arr[Math.floor(new_time_arr.length/2)]/200)*200-(new Date())-10000);
    }
  });
}

var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn");
var fon = document.getElementById("load_vid_id");

function new_time_openvid()
{
  window.location = '/images/5_k_o/link.html';
}*/

var translatorprog = '';
var mapsizeX = 2;
var mapsizeY = 2;
var playerX = 0;
var playerY = 0;
var playerS = 4;
var PlayerSpeed = 200;
var Editor_tabs = '' //JSON.parse('');//JSON.parse(s);
var Editor_opentask = '';
var Editor_dark_mode=GetVal('Editor_dark_mode','false')=='true'; 
var Editor_defaut_fil=document.getElementById('area').value; 

var map = new Array(4);
for (var i = 0; i < map.length; map[i++] = new Array(4));
for (var i = 0; i < map.length; i++) {
	for (var j = 0; j < map.length; j++) {
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

var canvas = document.getElementById("canvas"); //copy canvas2
var canvas2 = document.getElementById("canvas2"); //copy rendering
var canvas3 = document.getElementById("canvas3"); //rendering
var ctx = canvas.getContext("2d", { alpha: false,antialias: false, depth: false,desynchronized:true});
var ctx2 = canvas2.getContext("2d", { alpha: false,antialias: false, depth: false,desynchronized:true});
var ctx3 = canvas3.getContext("2d", { alpha: false,antialias: false, depth: false,desynchronized:true});
var mapX = 0;
var mapY = 0;
var mapZ = 1;
var flagCase = false;
var Animflag = false;
var AnimTime = 0;
var StartTextProg = '';
var ExeTextProg = '';
var isRun = 0;
var needUpdate = false;
var TextProgLine = [];
var ArrOfWidget = [];
var Arr2OfWidget = [];
var MedianOfProg = 0;
var ExeString = -1;
//var RobotPositions = [];//steps
var IsUpdateStrings=true;
setTimeout(Editor_style_update,10);
function Editor_style_update()
{
	if (Editor_dark_mode)
		Editor_to_dark();
	else
		Editor_to_white();
	SaveVal('Editor_dark_mode',Editor_dark_mode);
	if (Editor_dark_mode)
	{
		document.getElementById("load_div_id2").style.background="#000";
		document.getElementById("load_div_id2").children[0].style.color="#FFF";
	}else{
		document.getElementById("load_div_id2").style.background="#FFF";
		document.getElementById("load_div_id2").children[0].style.color="#000";
	}
}

function Editor_to_dark()
{
	 Editor_dark_mode=true;
	myCodeMirror.setOption('theme','tomorrow-night-bright');
	
	document.getElementsByClassName('CodeMirror-gutters')[0].style.transition='color 0.6s ease 0s, background-color 0.6s ease 0s';
	document.getElementsByClassName('CodeMirror')[0].style.transition='color 0.6s ease 0s, background-color 0.6s ease 0s';
	document.getElementById('topmenu').children[0].style.transition='color 0.6s ease 0s, background-color 0.6s ease 0s';
	document.getElementById('programmoutput').style.transition='color 0.6s ease 0s, background-color 0.6s ease 0s';
	document.getElementById('panes-separator').style.transition='color 0.6s ease 0s, background-color 0.6s ease 0s';
	document.getElementById('right-pane').style.transition='color 0.6s ease 0s, background-color 0.6s ease 0s';
	document.getElementById('id_tab').style.transition='color 0.3s ease 0s, background-color 0.3s ease 0s';
	document.getElementById('id_push_data').style.transition='color 0.6s ease 0s, background-color 0.6s ease 0s'
	
	
	document.getElementById('topmenu').children[0].style.background='#3a3a3a';
	document.getElementById('programmoutput').style.background='#555';
	document.getElementById('programmoutput').style.color='white';
	document.getElementById('panes-separator').style.background='#484848';
	document.getElementById('right-pane').style.background='#333';
	document.getElementById('right-pane').style.color='white';
	document.getElementById('id_tab').style.background='#3a3a3a';
	document.getElementById('id_tab').style.border='1px solid #2b2b2b';
	document.getElementById('id_push_data').style.color   ='black'
	
	
	for (var i=0;i<document.getElementById('id_tab').children.length;i++)
		if (document.getElementById('id_tab').children[i]!=undefined)
			if (document.getElementById('id_tab').children[i].style!=undefined)
				if (document.getElementById('id_tab').children[i].style.color!=undefined)
				{
					document.getElementById('id_tab').children[i].style.color='white';
					if (document.getElementById('id_tab').children[i].style.background!='rgb(204, 204, 204)')
						document.getElementById('id_tab').children[i].style.background='#3a3a3a';
				}
}

function Editor_to_white()
{
	Editor_dark_mode=false;
	myCodeMirror.setOption('theme','default');
	document.getElementById('topmenu').children[0].style.background='#FFF';
	document.getElementById('programmoutput').style.background='white';
	document.getElementById('programmoutput').style.color='black';
	document.getElementById('panes-separator').style.background='';
	document.getElementById('right-pane').style.background='white';
	document.getElementById('right-pane').style.color='black';
	document.getElementById('id_tab').style.background='white';
	document.getElementById('id_tab').style.border='1px solid #ccc';
	document.getElementById('id_push_data').style.color   ='black'
	for (var i=0;i<document.getElementById('id_tab').children.length;i++)
		if (document.getElementById('id_tab').children[i]!=undefined)
			if (document.getElementById('id_tab').children[i].style!=undefined)
				if (document.getElementById('id_tab').children[i].style.color!=undefined)
				{
					document.getElementById('id_tab').children[i].style.color='black';
					if (document.getElementById('id_tab').children[i].style.background!='rgb(204, 204, 204)')
						document.getElementById('id_tab').children[i].style.background='white';
				}
}
function UpdateStrings()
{
	var startDate
	if (debug)
		startDate = performance.now();
	var Scr=myCodeMirror.getScrollInfo();
	var flagn=0;
	
	var colors=['DE3163','FF7F50','FFBF00','DFFF00','9FE2BF','40E0D0','6495ED','CCCCFF'];
	var word_in=['если','нц','выбор'];
	var word_out=['кц','все','кц_при'];
	//var str='';
	var programm=myCodeMirror.getValue().split('\n');
	var vl=0;
	var steck_len=[];
	var outp_lengs=[];
	for (var i=0;i<programm.length;i++)
	{
		var word=programm[i].trim().split(' ')[0].split('\t')[0].split('(')[0].replace('ё','е');
		var len=0;
		var j=0;
		
		while (j < programm[i].length)
			if (programm[i][j] == ' ') {
				j += 1;
				len += 1;
			} else
				if (programm[i][j] == '\t') {
					j += 1;
					len += 2;
				} else
					break;
		if (programm[i].trim()=='')
			len = 100000;
		for (var j=0;j<steck_len.length;j++)
			steck_len[j][0]=Math.min(steck_len[j][0],len);
		
		if (word_in.indexOf(word)+1)
		{
			vl++;
			steck_len.push([len,i]);
		}else
		if (word_out.indexOf(word)+1)
		{
			vl--;
			var tmp=steck_len.pop();
			if (tmp==undefined)
				continue;
			outp_lengs.push([tmp[0],tmp[1],i,colors[(steck_len.length)%colors.length]]);
		}
		
	}
	
	for(var i=0;i<Arr2OfWidget.length;i++)
		if (Arr2OfWidget[i].parentNode!=null)
			Arr2OfWidget[i].parentNode.removeChild(Arr2OfWidget[i]);
	Arr2OfWidget=[];
	if (vl==0)
	{
		for(var i=0;i<outp_lengs.length && i<100;i++)
		{
			Arr2OfWidget[i] =document.createElement("div");
			Arr2OfWidget[i].innerHTML='&nbsp'.repeat(outp_lengs[i][0]);
			var lines=document.createElement("div");
			//lines.style.background='#'+outp_lengs[i][3]+'10';
			lines.style.width='3px';
			lines.style.borderLeft='1px solid #'+outp_lengs[i][3]+'50';
			lines.style.borderTop='1px solid #'+outp_lengs[i][3]+'50';
			lines.style.borderBottom='1px solid #'+outp_lengs[i][3]+'50';
			lines.style.height=(15*(outp_lengs[i][2]-outp_lengs[i][1]+1)-4)+ 'px';
			lines.style.display='inline-block';
			Arr2OfWidget[i].appendChild(lines);
			//ArrOfWidget[i].style.marginTop="0px";
			//ArrOfWidget[i].style.color="rgba(0,0,0,.8)";
			Arr2OfWidget[i].style.marginTop=(-12+outp_lengs[i][1]*15)+"px";
			Arr2OfWidget[i].style.marginLeft='-2px';
			Arr2OfWidget[i].style.fontWeight="bolder";
			Arr2OfWidget[i].style.color="rgba(115, 115, 115, 0.8)";
			Arr2OfWidget[i].style.letterSpacing='-0.15px';
			myCodeMirror.addWidget({ch:(0) , line: 0},Arr2OfWidget[i], false)
		}
	}
	for (var i=0;i<TextProgLine.length;i++)
		if (TextProgLine[i]=='')
		{
			if (ArrOfWidget[i]!=undefined)
			{
				ArrOfWidget[i].innerText='';
				//if (ArrOfWidget[i].parentNode)
				//	ArrOfWidget[i].parentNode.removeChild(ArrOfWidget[i]);
				//ArrOfWidget[i]=undefined;
			}
			/*if (myCodeMirror.getLine(i).indexOf('|отладка:')>=0)
			{
				var ii=myCodeMirror.getLine(i).indexOf('|отладка:')-1;
				while (ii>0 && myCodeMirror.getLine(i)[ii]==' '){ii--};
				myCodeMirror.replaceRange('',{
										line: i,
										ch: ii+1
									}, {
										line: i,
										ch: (myCodeMirror.getLine(i).length)
									}, "+move");
				flagn++;
				//if (flagn>10)
				//{
				//	break;
				//}
			}*/
		}else
		{
			if (ArrOfWidget[i]!=undefined)
			{
				ArrOfWidget[i].innerText=' '.repeat(myCodeMirror.getLine(i).trimRight().length+myCodeMirror.getLine(i).trimRight().split('\t').length)+' '.repeat(Math.max(0,MedianOfProg-myCodeMirror.getLine(i).trimRight().length-myCodeMirror.getLine(i).trimRight().split('\t').length))+ ' '+TextProgLine[i].addSlashes2()+'      ';
			}else
			{
				ArrOfWidget[i] =document.createElement("pre");
				var text =  document.createTextNode(' '.repeat(myCodeMirror.getLine(i).trimRight().length+myCodeMirror.getLine(i).trimRight().split('\t').length)+' '.repeat(Math.max(0,MedianOfProg-myCodeMirror.getLine(i).trimRight().length-myCodeMirror.getLine(i).trimRight().split('\t').length))+ ' '+TextProgLine[i].addSlashes2()+'      ');
				ArrOfWidget[i].appendChild(text);
				//ArrOfWidget[i].style.marginTop="0px";
				//ArrOfWidget[i].style.color="rgba(0,0,0,.8)";
				ArrOfWidget[i].style.marginTop="-15px";
				ArrOfWidget[i].style.fontWeight="bolder";
				ArrOfWidget[i].style.color="rgba(115, 115, 115, 0.8)";
				myCodeMirror.addWidget({ch:(0) , line: i},ArrOfWidget[i], false)
			}
			/*if (myCodeMirror.getLine(i).indexOf('|отладка:')>=0)
			{
				if (myCodeMirror.getLine(i).split('|отладка:')[1]!=' '+TextProgLine[i])
				{
					myCodeMirror.replaceRange(myCodeMirror.getLine(i).split('|отладка:')[0].trimRight()+' '.repeat(Math.max(0,MedianOfProg-myCodeMirror.getLine(i).split('|отладка:')[0].trimRight().length-myCodeMirror.getLine(i).split('|отладка:')[0].trimRight().split('\t').length))+' |отладка: '+TextProgLine[i],{
											line: i,
											ch: 0
										}, {
											line: i,
											ch: (myCodeMirror.getLine(i).length)
										}, "+move");
					flagn++;
					//if (flagn>10)
					//{
					//	break;
					//}
				}
			}
			else
			{
				myCodeMirror.replaceRange(' '.repeat(Math.max(0,MedianOfProg-myCodeMirror.getLine(i).trimRight().length-myCodeMirror.getLine(i).trimRight().split('\t').length))+ ' |отладка: '+TextProgLine[i],{
										line: i,
										ch: myCodeMirror.getLine(i).trimRight().length
									}, {
										line: i,
										ch: (myCodeMirror.getLine(i).length)
									}, "+move");
				flagn++;
				//if (flagn>10)
				//{
				//	break;
				//}
			}*/
		}
	//myCodeMirror.setValue(str);
	//myCodeMirror.setCursor(cur);
	myCodeMirror.scrollTo(Scr.left,Scr.top);
	if (debug)
	{
		var endDate = performance.now();
		var time = (endDate - startDate);
		if (time>1)
		if (debug)console.log([time,flagn]);
	}
}
function InitProg(f)
{
	if (f)
	{
		StartTextProg=myCodeMirror.getValue();
		var strings=StartTextProg.split('\n');
		strings.forEach(function(item, i) { if (strings[i].indexOf('|отладка:')>=0) strings[i] = strings[i].split('|отладка:')[0].trimRight(); else strings[i] = strings[i].trimRight();});
		strings = strings.filter(function (el) {
		  return el.trim() != '';
		});
		strings.sort(function(a, b) {
		  return a.length - b.length;
		});
		if (strings.length==0)
			MedianOfProg=3;
		else
			MedianOfProg=strings[Math.floor(strings.length*0.9)].length+3;
		strings=StartTextProg.split('\n');
		TextProgLine = [];
		for (var i=0;i<strings.length;i++)
			TextProgLine[i]='';
		UpdateStrings();
		ExeTextProg=myCodeMirror.getValue();
	}else
	{
		TextProgLine = [];
		for (var i=0;i<strings.length;i++)
			TextProgLine[i]='';
		UpdateStrings();
		ExeTextProg=myCodeMirror.getValue();
		myCodeMirror.SetValue(StartTextProg);
		isRun=0;
		
	}
}
var lastExeString=-2;
function CProg(n)
{
	if (isRun>0)
	{
		if ((n==123)||(isRun>0 && ExeTextProg!='' && StartTextProg!='' && ExeTextProg!=myCodeMirror.getValue()))
		{
			isRun=0;
			TextProgLine = [];
			var strings=myCodeMirror.getValue().split('\n');
			for (var i=0;i<strings.length;i++)
				TextProgLine[i]='';
			UpdateStrings();
			StartTextProg=myCodeMirror.getValue();
			ExeTextProg=myCodeMirror.getValue();
			if (is_fast_display)
				return;
			//AnimTime=1000000000+AnimTime; Init(true);
			AnimTime=1000000000+AnimTime; Init(true);CProg(123);isRun = 0;document.getElementById('programmoutput').value='';
			
			
		}else
		{
			if (ExeTextProg!=myCodeMirror.getValue()||needUpdate==true)
			{
				UpdateStrings();
				needUpdate=false;
				ExeTextProg=myCodeMirror.getValue();
			}
			if (typeof steps != undefined&& steps!=undefined&&(lastExeString!=ExeString ||(steps[AnimTime]==undefined && ExeString>=0)))
			{
				lastExeString=ExeString;
				for (i=0;i<myCodeMirror.getAllMarks().length;i++)
					if (myCodeMirror.getAllMarks()[i].__annotation==undefined)
					{
						myCodeMirror.getAllMarks()[i].clear();
						break;
					}
				if (steps[AnimTime]!=undefined && ExeString!=-1)
				{
					myCodeMirror.markText({line:ExeString, ch:0}, {line:ExeString,  ch:100},{css:"background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAPCAYAAAAlH6X5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABRSURBVBhXDcyhDYMAAEXBN0tH6gD1DbYC159KHMETFAZDkFgqSVAIDKs8uAGOh8jpEXa3sPoPi3OYHcNkHwbb0FmHxl+oLMPXInx8hbfP3AteJukn5v+DQuUAAAAASUVORK5CYII=\")"});
				}else
					ExeString=-1;
			}
		}
	}
}


var last_MyFastRun_click = new Date;
var is_fast_display = false;
function off_fast_display()
{
	if ((new Date)-last_MyFastRun_click>100 && is_fast_display==true)
	{
		if (confirm("Выключить режим быстрого отображения?"))
		{
			is_fast_display = false;
		}
	}
}
function MyFastRun() {
	if ((new Date)-last_MyFastRun_click<500 && is_fast_display==false)
	{
		if (confirm("Включить режим быстрого отображения?"))
		{
			is_fast_display=true;
			myCodeMirror.setValue(myCodeMirror.getValue());
			return;
		}
		
	}
	last_MyFastRun_click=new Date;
	MyRun();
	AnimTime=-1;
	Init(true);
	PlayerSpeed=1002;
	document.getElementById('MyRunImage').src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHGSURBVEhL3VU9a8JQFFXMILp0EFwcMknBv+Di5KLQH9BdNxd/QH6Ag+Dm7CC4dKguCgoOjoKDHRwyCIoQX9KPfDQxeb03JNLKqx9VKe2FwyM379yTd97LfYH/EY7jJABlSqnAgvfuFsB5lOMDSDdQoEEIsURRpPP5nOq67o6yLFPDMDYQ7zDnCXCP8z3qcQEEHohitVqlPM/TdDpNR6ORO2Ku1Wpp9Xp9LUmSDvMI4AE4d0cL+QKCIFB8RJHhcLgVwHw0GjXz+bzS6/VkTdNMmC8DGsA9bBtLYDabbS3y88Fg0InH43qpVCLT6fTVsizXNuDjHiXcYqxgCYzHY/frB4PBVsAHx3F2KpV6q9VqZLVaabZt44oeoQ7bNpZAv993R8ztCviIRCJWNptVOp2OrKoqroZtG0tg3wo+A22LxWJGsVgkk8nk2TRNA2p9tY0lwNqDfQiFQnYymVQrlcp6uVyqnm1NV4QlsHuKdgt+h3A4vMlkMgpYLIEIrqb8OwLnWLRYLA5bdOomFwqF0zb5lGPabrcve0wv8qPtaRWG1ypezmoVrGaXy+WUbrer/LjZYTEsjoUv3a6ve+FgAPF6V+Yfj0DgAwwJrfT5XLbZAAAAAElFTkSuQmCC";
	MyplayerX = playerX;
	MyplayerY = playerY;
	document.getElementById('programmoutput').value='';
	isRun = 1;
	InitProg(true);
	//var strings=StartTextProg.split('\n');
	while (steps[AnimTime+1]!=undefined)
	{
		AnimTime=AnimTime+1;
		if (steps[AnimTime] == 'шагвниз')
			MyplayerY++;
		if (steps[AnimTime] == 'шагвверх')
			MyplayerY--;
		if (steps[AnimTime] == 'закрасить')
			map[MyplayerX][MyplayerY][1] = 1;
		if (steps[AnimTime] == 'шагвправо')
			MyplayerX++;
		if (steps[AnimTime] == 'шагвлево')
			MyplayerX--;
		if (steps[AnimTime].indexOf('вывод') ==0)
			document.getElementById('programmoutput').value+=GetIn(steps[AnimTime],'вывод','');
		if (steps[AnimTime].indexOf('Error') + 1) {
			if (steps[AnimTime].indexOf('шагвниз') + 1)
				playerS = 2;
			if (steps[AnimTime].indexOf('шагвверх') + 1)
				playerS = 0;
			if (steps[AnimTime].indexOf('шагвправо') + 1)
				playerS = 1;
			if (steps[AnimTime].indexOf('шагвлево') + 1)
				playerS = 3;
			AnimTime = 1000000000 + AnimTime;
			break;
		}
		if (steps[AnimTime].indexOf('write_prog') ==0)
		{
			TextProgLine[~~GetIn(steps[AnimTime],'write_prog','_')]=GetIn(GetIn(steps[AnimTime],'write_prog',''),'_','');
			needUpdate=true;
		}
	}
	AnimTime=1000000000;
	playerX = MyplayerX;
	playerY = MyplayerY;
	isRun = 2;
}
function MyRun() {
	off_fast_display();
	if (isRun==0)
	{
		isRun = 1;
		InitProg(true);
	}
	if (isRun==2 && (steps[AnimTime]==undefined))
	{
		isRun = 1;
		InitProg(true);
	}
	if (Animflag == true) {
		if (PlayerSpeed > 400)
		{
			//x4
			document.getElementById('MyRunImage').src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM9SURBVEhL3ZU9SCNBFMdPvEZESSEikiJgc2AKvxpFURC0UPFQy0NBBBHBKmAbRUUrRRuVKyyCHCp4wln5SUQsBRVPEYkmJ4n52DWaZNfd7DzfWxLvzE3MXnsP/gw7M+/9Zt68mf3wfxhjzIyyAYCdp8TYJ9THhItxQycTBnAIgqC6XC7weDwgSZLeiqIIsizH0Z5xzk/UF5qfcDVm6GBBR9fMzAxYLBaora2Fo6MjvaW+1dXV2OLiYigYDEo4T0B9R5/PhkFJgN1uB/okyMHBwSuA+nNzc5XW1taH7e1tMRaLKThfRDnQN3PaeICrq6vXFCX7s7KyWGFhoTQ0NCScn58/qaqqpw396YzMejCe8QDHx8f66vf3918BSWVnZ2ulpaWRubk54f7+PqZpGu3oB8bhp40H2Nvb01vqSwUklZOTozY1NT1sbm6K0WiUdsNPGw/w3g7+FKWtoKBA7u/vF05OTsKKosgY623aeADeGZBMJpM+nqqSkhKtubk5ur6+HsKypt2oqG8oKxeQWkXUbzabweFwAN2VdMIzoTujYUxIQDyGATabjS6dnraJiQkYHR3lanx8nE1NTcHy8jLDy6sZThG1Xq8X6uvroaqqClpaWt6ovb1d6+7u1vr6+qCnp4eVlZXJS0tLUcOHTO3NzQ2gI6AjhEIhHXh5eQl+vx/cbjfDb4YVBYFAQO7o6PCNjY0pXACvTJOA8vJyWFlZQTeA09NTfdW3t7cwPz8P09PTEbyA8UgkInV2dt5hup7/eQcVFRWwtrbGCHB2dsZqamrYxcWFOjw8LA0MDPgRIGcEpDsDWml1dTXb2dnRKwUBcavVquJYoLGxMWwYwHvsZmdnFcwzNDQ0gNPppPhwfX0ttLW1Berq6vzFxcWRdwEUjIJT4NTnemFhAc809EwA7Fd2d3efCED5xmdc8fl8MQz+kA5g9IfzhCnSsEQft7a2vARIGo4reE+Cg4ODvr8AZOic8ZeJ+kqAysrKMP4X3gBwLH54eBjG1Iq0GgJ0dXX9BhgxjGPHXcWxTB9HRkbctIt02tjYuMPq8k1OTsoJ98xGAFyZ2tvb68anOpifny+mU15enlhUVPTL6XQKL7Ml0wNZznXQAAAAAElFTkSuQmCC";
			PlayerSpeed = 400;
		}
		else if (PlayerSpeed > 200)
		{
			//x8
			document.getElementById('MyRunImage').src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANdSURBVEhL3VVJSyNREB5xLiJKDiIecggIIjiI28UF8eQODip4CSIoeFOQ/IAoiuhJXA7KHEQiDCo4wnhyX8CjIGJAwWhCiFm6O0ln7U53TVWTOGN4mWSuU/Dx6Nev6uv6qur1p//DVFXVI0wAYGYh+a4S8Tnpkruhkw4DWHiel202GzgcDohGo9oqCALEYrEEWhzPWBFGOp90zc3QwYCOtqWlJTAYDNDS0gI3NzfaSnu7u7uRjY0NzufzRfEcj/iBPl9zJkoRmM1moEciubq6eieg/cLCQqm3t9d/fHwsRCIRCc8LCAv6ZpeNRfD09PQuUWo/Ly9PLS0tjU5MTPAPDw+iLMuabOhPNdJrwVjGIri9vdW+/vz8/J0ghfz8fKWqqiq0srLCu93uiKIolNFPjMOWjUVwdnamrbSXTpBCQUGB3N7e7j88PBTC4TBlw5aNRfC3DP4EyVZSUhIbHx/n7+7uApIkxTDWR9lYBKwaEHQ6nfY+HeXl5UpHR0d4f3+fw7ambGTEd8QXJkF6F9G+Xq8Hi8UCNCuZgDWhmVEwJiRJHDkTmEwmbQAvLi5gfn4eZmZmmJibm1MXFxdhZ2dHDQQCiZwlotXlckFrays0NDRAT0/PB/T19SnDw8PK2NgYjIyMqPX19fHt7e1QzkWm9eXlBWpqamBzcxM4jtNgt9tVq9UKz8/PajAYVLGjwOv1xvr7+99mZ2clJgGrTVMEtbW1lD66AXg8HnVqairR1dUFQ0NDcHJyIuFcqKFQKDowMOBEueL/nEFdXR3s7e2pRIATTc/q2tpaAr9Ympyc9NGEZyXIVIPX11dobGxU8Uu1TkFZFGyGML7zdnd38xjQhxnIWQlYl93y8rKEekNbWxtcXl5SfMAbNtzZ2enFungrKys9ePO6kUBhElAwCk6B06/r9fV1rCcXJwLcl05PT0UiuL+/92JNRLwuPKOjo36UyMOSKNcfjogSKdiiwaOjIxcRPD4++qurq4PNzc1vFRUVAs4Bh2c/SkSGzll/mYhvRID9HcD/gkaAd4+MjSCsrq4Gt7a2/DgnYdongsHBwd8EuRgRoUQK6i1OT0/bKYtMODg4cDY1Nb0tLCzEku7ZjQhEUZSNRqMTr2quuLhYyISioiKhrKzMeX19zf8ClsPG2VjtOcUAAAAASUVORK5CYII=";
			PlayerSpeed = 200;
		}
		else
		{
			//inf
			document.getElementById('MyRunImage').src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANVSURBVEhL3VU7SCNBGD7xGhElhYhFioDNgVf4ahRBKy0UPB/lqSCCnVUKGyE+UbAQFUEJohDlUMEIp4IPFEW0E1J4JBbR5HQjJrt5bjab7M59syQ5Eza6194PH8POzvd/8z9m5tP/YbIs6wEjIcSkhuS/L8DnJEW7gaSDAwvLsnGn00ncbjeJRqPKyHEcEQQhAYthzS/gO12fpGozEAwgOufm5ojBYCANDQ3k+vpaGenc9vY2v7Ky4vN6vVGsYwErON80C6UETCYToZ9U5PLyMi1A5wsLC8W2tjb/yckJx/O8iPUcYAH347SpCdzf36dTlJrPy8uTS0tLo0NDQ+zd3V0oHo8raQOf1kivOFMzNYHb21tl9+fn52mBFPLz86WKiorwwsIC+/LywkuSRCP6CT/qaVMTODs7U0Y6ly2QQkFBQby5udm/v7/PRSIRGo162tQE3ovgLWjaSkpKhMHBQdZmswVEURTgKzNtagJqNaDQ6XTK/2yUl5dLLS0tkd3dXR/amkYTB34AX1UFsruIzuv1emKxWAg9K7mAmtAzI8EnSYq4NQsYjUZ66JS0TU1NkbGxMVVMTk7KMzMzZHNzU8bhlTSniI4Mw5DGxkZSW1tLWltbM9De3i719vZKAwMDpK+vT66srBTW1tYimotMx4eHBwIiAZH4fL4MYDNyOByW0VHk9fVV6Ozs9ExMTIiqAmptmhKoqqoiW1tboOU2CEW7urqekK7YP0dQXV1NdnZ2ZJqujY0Ncnp6KuP6SOCCjB0eHvoRXdDhcHDvCuSqwePjI6mrq5OtVqtEC7q4uEhmZ2eDNzc3zPr6+vP4+LgH3/6enh43Trs9p4DaZTc/Py+6XC7S1NSktOvIyEgkFAolkG9+aWnJRYEblw8EAkJHR4cDh9CWIUCdUefUcfZ1vby8jDr6YlQA8yIOlH94eNgHUQ4t68Hun66urhjs/hkcDhG43kag9cEJIUUSWjR4dHTE4D9vNptDBwcHfpp/FFbEveRfXV0N2e12Nl0DaiB/+GQCZipQU1MTwLvAYD6n0S7q7u7+K6DFwDNh1wm0aXB0dNR1fHzM5MLe3t5TfX29Z3p6WkjSPzYqgJ3F+/v7XbiqvcXFxVwuFBUVcWVlZb8vLi7YP5dj0fKQKKOAAAAAAElFTkSuQmCC";
			PlayerSpeed = 1;
		}
		return;
	}
	RunKumir(myCodeMirror.getValue(),document.getElementById('area').value);
	var m_onerror=false;
	for (var i=0;i<ErrorKumir.length;i++)
		if (ErrorKumir[i][0]<8)
		{
			m_onerror=true;
		}
	if ((new Date)-last_MyFastRun_click>100 && m_onerror)
	{
		alert('Запуск невозможен так как найдены ошибки');
		return;
	}
	Init(true);
	//RobotPositions = Prog();
	//console.log(RobotPositions);
	AnimTime = -1;
	Animflag = true;
	Init(true);
}

function MyToCurs() {
	off_fast_display();
	if (isRun==0)
	{
		isRun = 1;
		InitProg(true);
	}
	if (isRun==2 && (steps[AnimTime]==undefined))
	{
		isRun = 1;
		InitProg(true);
	}
	if (Animflag == false) {
		RunKumir(myCodeMirror.getValue(),document.getElementById('area').value);
		var m_onerror=false;
		for (var i=0;i<ErrorKumir.length;i++)
			if (ErrorKumir[i][0]<8)
			{
				m_onerror=true;
			}
		if (m_onerror)
		{
			alert('Запуск невозможен так как найдены ошибки');
			return;
		}
		AnimTime = -1;
		Init(true);
		Animflag = true;
		MyplayerX = playerX;
		MyplayerY = playerY;
		document.getElementById('programmoutput').value='';
	}
	PlayerSpeed=1002;
	var def_img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHGSURBVEhL3VU9a8JQFFXMILp0EFwcMknBv+Di5KLQH9BdNxd/QH6Ag+Dm7CC4dKguCgoOjoKDHRwyCIoQX9KPfDQxeb03JNLKqx9VKe2FwyM379yTd97LfYH/EY7jJABlSqnAgvfuFsB5lOMDSDdQoEEIsURRpPP5nOq67o6yLFPDMDYQ7zDnCXCP8z3qcQEEHohitVqlPM/TdDpNR6ORO2Ku1Wpp9Xp9LUmSDvMI4AE4d0cL+QKCIFB8RJHhcLgVwHw0GjXz+bzS6/VkTdNMmC8DGsA9bBtLYDabbS3y88Fg0InH43qpVCLT6fTVsizXNuDjHiXcYqxgCYzHY/frB4PBVsAHx3F2KpV6q9VqZLVaabZt44oeoQ7bNpZAv993R8ztCviIRCJWNptVOp2OrKoqroZtG0tg3wo+A22LxWJGsVgkk8nk2TRNA2p9tY0lwNqDfQiFQnYymVQrlcp6uVyqnm1NV4QlsHuKdgt+h3A4vMlkMgpYLIEIrqb8OwLnWLRYLA5bdOomFwqF0zb5lGPabrcve0wv8qPtaRWG1ypezmoVrGaXy+WUbrer/LjZYTEsjoUv3a6ve+FgAPF6V+Yfj0DgAwwJrfT5XLbZAAAAAElFTkSuQmCC";
	if (def_img!=document.getElementById('MyRunImage').src)
		document.getElementById('MyRunImage').src=def_img;
	PlayerSpeed=100000000;
	isRun = 2;
	if (AnimTime == -1 || steps[AnimTime]==undefined || steps[AnimTime].indexOf('str') ==0 )
		AnimTime=AnimTime+1;
	while (steps[AnimTime]!=undefined)
	{
		if (steps[AnimTime] == 'шагвниз')
			MyplayerY++;
		if (steps[AnimTime] == 'шагвверх')
			MyplayerY--;
		if (steps[AnimTime] == 'закрасить')
			map[MyplayerX][MyplayerY][1] = 1;
		if (steps[AnimTime] == 'шагвправо')
			MyplayerX++;
		if (steps[AnimTime] == 'шагвлево')
			MyplayerX--;
		if (steps[AnimTime].indexOf('вывод') ==0)
			document.getElementById('programmoutput').value+=GetIn(steps[AnimTime],'вывод','');
		if (steps[AnimTime].indexOf('Error') + 1) {
			if (steps[AnimTime].indexOf('шагвниз') + 1)
				playerS = 2;
			if (steps[AnimTime].indexOf('шагвверх') + 1)
				playerS = 0;
			if (steps[AnimTime].indexOf('шагвправо') + 1)
				playerS = 1;
			if (steps[AnimTime].indexOf('шагвлево') + 1)
				playerS = 3;
			AnimTime = 1000000000 + AnimTime;
			break;
		}
		if (steps[AnimTime].indexOf('str') ==0)
			if (myCodeMirror.getCursor().line+''==GetIn(steps[AnimTime],'str',''))
			{
				var strok=GetIn(steps[AnimTime],'str','');
				ExeString=~~strok;
				lastExeString=-2;
				break;
			}
		if (steps[AnimTime].indexOf('write_prog') ==0)
		{
			TextProgLine[~~GetIn(steps[AnimTime],'write_prog','_')]=GetIn(GetIn(steps[AnimTime],'write_prog',''),'_','');
			needUpdate=true;
		}
		AnimTime=AnimTime+1;
	}
	playerX = MyplayerX;
	playerY = MyplayerY;
}
function MyToNew() {
	off_fast_display();
	if (isRun==0)
	{
		isRun = 1;
		InitProg(true);
	}
	if (isRun==2 && (steps[AnimTime]==undefined))
	{
		isRun = 1;
		InitProg(true);
	}
	if (Animflag == false) {
		RunKumir(myCodeMirror.getValue(),document.getElementById('area').value);
		var m_onerror=false;
		for (var i=0;i<ErrorKumir.length;i++)
			if (ErrorKumir[i][0]<8)
			{
				m_onerror=true;
			}
		if (m_onerror)
		{
			alert('Запуск невозможен так как найдены ошибки');
			return;
		}
		AnimTime = 0;
		Init(true);
		Animflag = true;
		MyplayerX = playerX;
		MyplayerY = playerY;
		document.getElementById('programmoutput').value='';
	}
	PlayerSpeed=1002;
	var def_img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHGSURBVEhL3VU9a8JQFFXMILp0EFwcMknBv+Di5KLQH9BdNxd/QH6Ag+Dm7CC4dKguCgoOjoKDHRwyCIoQX9KPfDQxeb03JNLKqx9VKe2FwyM379yTd97LfYH/EY7jJABlSqnAgvfuFsB5lOMDSDdQoEEIsURRpPP5nOq67o6yLFPDMDYQ7zDnCXCP8z3qcQEEHohitVqlPM/TdDpNR6ORO2Ku1Wpp9Xp9LUmSDvMI4AE4d0cL+QKCIFB8RJHhcLgVwHw0GjXz+bzS6/VkTdNMmC8DGsA9bBtLYDabbS3y88Fg0InH43qpVCLT6fTVsizXNuDjHiXcYqxgCYzHY/frB4PBVsAHx3F2KpV6q9VqZLVaabZt44oeoQ7bNpZAv993R8ztCviIRCJWNptVOp2OrKoqroZtG0tg3wo+A22LxWJGsVgkk8nk2TRNA2p9tY0lwNqDfQiFQnYymVQrlcp6uVyqnm1NV4QlsHuKdgt+h3A4vMlkMgpYLIEIrqb8OwLnWLRYLA5bdOomFwqF0zb5lGPabrcve0wv8qPtaRWG1ypezmoVrGaXy+WUbrer/LjZYTEsjoUv3a6ve+FgAPF6V+Yfj0DgAwwJrfT5XLbZAAAAAElFTkSuQmCC";
	if (def_img!=document.getElementById('MyRunImage').src)
		document.getElementById('MyRunImage').src=def_img;
	PlayerSpeed=100000000;
	isRun = 2;
	if (AnimTime == -1 || steps[AnimTime]==undefined || steps[AnimTime].indexOf('str') ==0 )
		AnimTime=AnimTime+1;
	while (steps[AnimTime]!=undefined)
	{
		if (steps[AnimTime] == 'шагвниз')
			MyplayerY++;
		if (steps[AnimTime] == 'шагвверх')
			MyplayerY--;
		if (steps[AnimTime] == 'закрасить')
			map[MyplayerX][MyplayerY][1] = 1;
		if (steps[AnimTime] == 'шагвправо')
			MyplayerX++;
		if (steps[AnimTime] == 'шагвлево')
			MyplayerX--;
		if (steps[AnimTime].indexOf('вывод') ==0)
			document.getElementById('programmoutput').value+=GetIn(steps[AnimTime],'вывод','');
		if (steps[AnimTime].indexOf('Error') + 1) {
			if (steps[AnimTime].indexOf('шагвниз') + 1)
				playerS = 2;
			if (steps[AnimTime].indexOf('шагвверх') + 1)
				playerS = 0;
			if (steps[AnimTime].indexOf('шагвправо') + 1)
				playerS = 1;
			if (steps[AnimTime].indexOf('шагвлево') + 1)
				playerS = 3;
			AnimTime = 1000000000 + AnimTime;
			break;
		}
		if (steps[AnimTime].indexOf('str') ==0)
		{
			var strok=GetIn(steps[AnimTime],'str','');
			ExeString=~~strok;
			lastExeString=-2;
			break;
		}
		if (steps[AnimTime].indexOf('write_prog') ==0)
		{
			TextProgLine[~~GetIn(steps[AnimTime],'write_prog','_')]=GetIn(GetIn(steps[AnimTime],'write_prog',''),'_','');
			needUpdate=true;
		}
		AnimTime=AnimTime+1;
	}
	playerX = MyplayerX;
	playerY = MyplayerY;
}
function update_rez_task(s){
	if (s!='OK')
		alert(s);
	
	if (_info_prog_nexttime_timer) clearTimeout(_info_prog_nexttime_timer);
	_info_prog_nexttime_timer = setTimeout(_info_prog_nexttime_function);
}
function SendProgramm(){
	if (debug)console.log(document.getElementsByClassName('button_for_send_prog')[0]);
	document.getElementsByClassName('button_for_send_prog')[0].disabled =true;
	setTimeout(()=>{
		document.getElementsByClassName('button_for_send_prog')[0].disabled =false;
	}, 5000);
	server_request('send_program',{ task_name: Editor_opentask, programm: myCodeMirror.getValue() } ,update_rez_task);
}
var copypaste = '';
function MyСut() {
	MyCopy();
	if (myCodeMirror.getSelection() != '')
		myCodeMirror.deleteH()
}

function MyCopy() {
	copypaste = myCodeMirror.getSelection();
	document.execCommand('copy');
}
function MyPaste() {
	if (copypaste != '') {
		if (myCodeMirror.getSelection() != '')
			myCodeMirror.deleteH();
		var s = '';
		for (var i = 0; i < myCodeMirror.getCursor()["line"]; i++) {
			s = s + myCodeMirror.getLine(i) + '\r\n';
		}
		for (var i = 0; i < myCodeMirror.getCursor()["ch"]; i++)
			s = s + myCodeMirror.getLine(myCodeMirror.getCursor()["line"])[i];
		s = s + copypaste;

		var x = s.split('\n').length - 1;
		var y = s.split('\n')[s.split('\n').length - 1].length;

		for (var i = myCodeMirror.getCursor()["ch"]; i < myCodeMirror.getLine(myCodeMirror.getCursor()["line"]).length; i++)
			s = s + myCodeMirror.getLine(myCodeMirror.getCursor()["line"])[i];
		if (myCodeMirror.getCursor()["ch"] < myCodeMirror.getLine(myCodeMirror.getCursor()["line"]).length)
			s = s + '\r\n';
		for (var i = myCodeMirror.getCursor()["line"] + 1; i < myCodeMirror.lineCount(); i++) {
			s = s + myCodeMirror.getLine(i) + '\r\n';
		}
		myCodeMirror.setValue(s);
		myCodeMirror.setCursor(x, y);
	} else {
		alert('Ничего не скопировано (Копировать необходимо через кнопку в верхнем меню)');
	}
}

(function (mod) {
	mod(CodeMirror);
})(function (CodeMirror) {
	"use strict";

	CodeMirror.defineMode("kumir", function () {
		function words(str) {
			var obj = {},
			words = str.split(" ");
			for (var i = 0; i < words.length; ++i)
				obj[words[i]] = true;
			return obj;
		}
		var keywords = words(
				"влево вправо вверх вниз закрасить " +
				"слева справа сверху снизу стена радиация температура свободно клетка закрашена");
		var keywords2 = words("Робот");
		var keywords3 = words("цел вещ лог сим лит таб целтаб вещтаб логтаб симтаб литтаб");
		var keywords4 = words("Да Нет да нет");
		var atoms = {
			"null": true
		};

		var isOperatorChar = /[+\-*&%=<>!?|\/]/;

		function tokenBase(stream, state) {
			var ch = stream.next();
			if (ch == "#" && state.startOfLine) {
				stream.skipToEnd();
				return "meta";
			}
			if (ch == '"' || ch == "'") {
				state.tokenize = tokenString(ch);
				return state.tokenize(stream, state);
			}
			if (ch == "(" && stream.eat("*")) {
				state.tokenize = tokenComment;
				return tokenComment(stream, state);
			}
			if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
				return null;
			}
			if (/\d/.test(ch)) {
				stream.eatWhile(/[\wа-яА-ЯёЁ\.]/);
				return "number";
			}
			if (ch == "|") {
				//if (stream.eat("|")) {
				stream.skipToEnd();
				return "comment";
				//}
			}

			if (isOperatorChar.test(ch)) {
				stream.eatWhile(isOperatorChar);
				return "operator";
			}
			stream.eatWhile(/[\wа-яА-ЯёЁ\$_]/);
			var cur = stream.current();

			if (keywords4.propertyIsEnumerable(cur))
				return "number";
			if (keywords3.propertyIsEnumerable(cur))
				return "string";
			if (keywords2.propertyIsEnumerable(cur))
				return "atom";

			if (keywords.propertyIsEnumerable(cur))
				return "keyword";
			if (atoms.propertyIsEnumerable(cur))
				return "atom";
			return "variable";
		}

		function tokenString(quote) {
			return function (stream, state) {
				var escaped = false,
				next,
				end = false;
				while ((next = stream.next()) != null) {
					if (next == quote && !escaped) {
						end = true;
						break;
					}
					escaped = !escaped && next == "\\";
				}
				if (end || !escaped)
					state.tokenize = null;
				return "number";
			};
		}

		function tokenComment(stream, state) {
			var maybeEnd = false,
			ch;
			while (ch = stream.next()) {
				if (ch == ")" && maybeEnd) {
					state.tokenize = null;
					break;
				}
				maybeEnd = (ch == "*");
			}
			return "comment";
		}

		// Interface

		return {
			startState: function () {
				return {
					tokenize: null
				};
			},

			token: function (stream, state) {
				if (stream.eatSpace())
					return null;
				var style = (state.tokenize || tokenBase)(stream, state);
				if (style == "comment" || style == "meta")
					return style;
				return style;
			},

			electricChars: "{}"
		};
	});

	CodeMirror.defineMIME("text/x-kumir", "kumir");

});

var BodyPane = document.getElementById('Body');

var leftPane = document.getElementById('left-pane');
var rightPane = document.getElementById('right-pane');
var programmPane = document.getElementById('programm');
var paneSep = document.getElementById('panes-separator');
var topmenuPane = document.getElementById('topmenu');
var topmenuPanemax = document.getElementById('topmenumax');
// The script below constrains the target to move horizontally between a left and a right virtual boundaries.
// - the left limit is positioned at 10% of the screen width
// - the right limit is positioned at 90% of the screen width
var leftLimit = 10;
var rightLimit = 90;
var programmStr = 'использовать Робот' + '\r\n' + 'алг' + '\r\n' + 'нач' + '\r\n\r\n' + 'кон';
//programmPane.value = programmStr;
var WORD = /[\w$]+/, RANGE = 500;

/*CodeMirror.registerHelper("hint", "anyword", function (editor, options) {
	var word = options && options.word || WORD;
	var range = options && options.range || RANGE;
	var cur = editor.getCursor(),
	curLine = editor.getLine(cur.line);
	var end = cur.ch,
	start = end;
	while (start && word.test(curLine.charAt(start - 1)))
		--start;
	var curWord = start != end && curLine.slice(start, end);

	var list = options && options.list || [],
	seen = {};
	var re = new RegExp(word.source, "g");
	for (var dir = -1; dir <= 1; dir += 2) {
		var line = cur.line,
		endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
		for (; line != endLine; line += dir) {
			var text = editor.getLine(line),
			m;
			while (m = re.exec(text)) {
				if (line == cur.line && m[0] === curWord)
					continue;
				if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
					seen[m[0]] = true;
					list.push(m[0]);
				}
			}
		}
	}
	return {
		list: list,
		from: CodeMirror.Pos(cur.line, start),
		to: CodeMirror.Pos(cur.line, end)
	};
});*/

function myhinthelp(editor, options) {
	var word = new RegExp('[a-zA-Zа-яА-ЯёЁ$]+'); //"/[\w$]+/";    //options && options.word || WORD;
	var range = options && options.range || RANGE;
	var cur = editor.getCursor(),
	curLine = editor.getLine(cur.line);
	var end = cur.ch,
	start = end;
	while (start && word.test(curLine.charAt(start - 1)))
		--start;
	if (end && word.test(curLine.charAt(end)))
		return {
			list: [],
			from: CodeMirror.Pos(cur.line, start),
			to: CodeMirror.Pos(cur.line, end)
		};
	var curWord = start != end && curLine.slice(start, end);

	var list = options && options.list || [],
	seen = {};
	var re = new RegExp(word.source, "g");
	
	var texts = ['влево\r\n\t',
'вправо\r\n\t',
'вверх\r\n\t',
'вниз\r\n\t',
'закрасить\r\n\t',

'слева ',
'справа ',
'сверху ',
'снизу ',
'стена ',
'свободно ',
'радиация ',
'температура ',

'если __ то\r\n\t\0\r\n\tвсе',
'если __ то\r\n\t\0\r\n\tиначе\r\n\t\0\r\n\tвсе',
'если ',
'то\r\n\t\0',
'иначе\r\n\t',
'все\r\n\t',
'выбор\r\n\t\0при :\r\n\0\0\t\r\n\tвсе',
'выбор\r\n\t\0',
'при __ :\r\n\t',
'при ',
'нц пока __ \r\n\t\0\r\n\tкц',
'нц __ раз\r\n\t\0\r\n\tкц',
'нц для __ от  до \r\n\t\0\r\n\tкц',
'нц\r\n\t\0\r\n\tкц',
'нц для __ от  до  шаг \r\n\t\0\r\n\tкц',
'кц\r\n\t',

'цел ',
'вещ ',
'лог ',
'сим ',
'лит ',
'таб ',
'целтаб ',
'вещтаб ',
'логтаб ',
'симтаб ',
'литтаб ',

'да ',
'нет ',
'и ',
'или ',
'не ',

'знач ',
'вывод ',
'ввод ',

'нс ',

'раз ',
'пока ',
'для ',
'от ',
'до ',
'шаг ',

'выход\r\n\t',

'алг ',
'нач\r\n\t',
'кон\r\n\t',

'утв ',


'арг ',
'рез ',
'аргрез ',

'клетка',
'закрашена',
'чистая',

'дано ',
'надо '];//"влево вправо вверх вниз закрасить слева справа сверху снизу стена радиация температура свободно цел вещ лог сим лит таб целтаб вещтаб логтаб симтаб литтаб да нет алг нач кон дано надо арг рез аргрез знач и или не утв выход ввод вывод нс если то иначе все выбор при нц кц кц_при раз пока для от до шаг".split(" ");
	
	if (curWord==false)
		return {
			list: [],
			from: CodeMirror.Pos(cur.line, start),
			to: CodeMirror.Pos(cur.line, end)
		};
	
	if (cur.ch==curLine.length && /^[\t ]*[a-zA-ZА-Яа-я]{1,32}$/.test(curLine) )//write only variable
	{
		var prog=editor.getValue().split('\n');
		
		for (var line=cur.line;line>=0;line--)
		{
			var typ=prog[line].trim().split(' ')[0];
			if ('цел вещ лог сим лит таб целтаб вещтаб логтаб симтаб литтаб'.split(' ').indexOf(typ)!=-1)
			{
				var s=GetIn(prog[line].trim(),' ','').split(',');
				for (var var_i=0;var_i<s.length;var_i++)
					if (s[var_i].split('[')[0].split('=')[0].indexOf(curWord)==0)
					{
						list.push(s[var_i].split('[')[0].split('=')[0]+':=');
						list.push(s[var_i].split('[')[0].split('=')[0]+':='+s[var_i].split('[')[0].split('=')[0]+' + 1');
						list.push(s[var_i].split('[')[0].split('=')[0]+':='+s[var_i].split('[')[0].split('=')[0]+' - 1');
						list.push(s[var_i].split('[')[0].split('=')[0]+':='+s[var_i].split('[')[0].split('=')[0]+' * 2');
						list.push(s[var_i].split('[')[0].split('=')[0]+':=div('+s[var_i].split('[')[0].split('=')[0]+', 2)');
					}
			}
		}
	}
	for (var i = 0; i < texts.length; i++) {
		var line = curLine,text;
		var ttabs='\t'.repeat(line.split('\t').length-1);
		text = texts[i].replace(/\t/g,ttabs).replace(/\0/g,'\t');
		if (m = re.exec(text))
		{
			if ( text.trim() === curWord.trim())
			{
				continue;
			}
			if ((!curWord || m['input'].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m['input'].trim())) {
				seen[m['input'].trim()] = true;
				list.push(m['input']);
			}
			while (m = re.exec(text)){}
		}
		
	}
	for (var dir = -1; dir <= 1; dir += 2) {
		var line = cur.line,
		endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
		for (; line != endLine; line += dir) {
			var text = editor.getLine(line),
			m;
			while (m = re.exec(text)) {
				if (line == cur.line || m[0] === curWord)
					continue;
				if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
					seen[m[0]] = true;
					list.push(m[0]);
				}
			}
		}
	}
	if (list.length>=texts.length)
		return {
			list: [],
			from: CodeMirror.Pos(cur.line, start),
			to: CodeMirror.Pos(cur.line, end)
		};
	return {
		list: list,
		from: CodeMirror.Pos(cur.line, start),
		to: CodeMirror.Pos(cur.line, end)
	};
}

var myCodeMirror = CodeMirror.fromTextArea(document.getElementById('programm'), {
	lineNumbers: true, // показывать номера строк
	matchBrackets: true, // подсвечивать парные скобки
	mode: "kumir", // стиль подсветки
	indentUnit: 2, // размер табуляции
	gutters: ["CodeMirror-lint-markers"],
	lint: true,
	completeSingle: false,
	indentWithTabs:true,
	hintOptions: {
		hint: myhinthelp
	},
	extraKeys: {
		"Tab": "indentMore"
	 },
	 highlightSelectionMatches: {showToken: /\w/}
});
var programm_errors = [[0, 'error', 'чё за робот'], [1, 'warning', 'чёт ещё']];
function validator(text, options) {
	if ("complete"!=document.readyState)
		return;
	if (steps[AnimTime]!=undefined)
		return;
	if (debug)
		console.log([text, options, options.globals]);
	
	var output = [];
	var t = 0;
	if (Editor_opentask!='')
		if (text.length<=32000)
			SaveVal('SaveEditorValue_'+Editor_opentask,text);
	if (text.length>32000)
		myCodeMirror.setValue(text.slice(0,31500));
	var start = new Date;
	if (document.getElementsByClassName('isprog')[0].style.opacity=='1')
		t = t + RunKumir(text,document.getElementById('area').value);
	else
		t = t + RunKumir(text,'');
	var end = new Date;
	t=end-start;
	if (t==t)
		options.delay=Math.min(Math.round(t||0)*2+1,500);
	if (debug)
		console.log("Трансляция заняла " + Math.round(t) + " милисекнд");
	
	programm_errors = [];
	for (i = 0; i < ErrorKumir.length; i++)
		if (ErrorKumir[i][0] < 8) {
			programm_errors.push([ErrorKumir[i][2], 'error', ErrorKumir[i][1]]);
		} else {
			programm_errors.push([ErrorKumir[i][2], 'warning', ErrorKumir[i][1]]);
		}
	for (var i = 0; i < programm_errors.length; i++) {
		var error = programm_errors[i];
		if (error) {
			var start = 0,
			end = 10000;

			// Convert to format expected by validation service
			var hint = {
				message: error[2],
				severity: error[1],
				from: CodeMirror.Pos(error[0], start),
				to: CodeMirror.Pos(error[0], end)
			};
			output.push(hint);
		}
	}
	if (is_fast_display==true)
	{
		MyFastRun();
	}
	return output;
}

CodeMirror.registerHelper("lint", "kumir", validator);
var format_length=[];

myCodeMirror.setValue(programmStr); //"использовать Робот\r\nалг ЗакраскаПути\r\nнач\r\nцел i, j\r\nвещ таб РадКлет[1:3,1:3]\r\n| Замеряем радиацию в каждой клетке\r\nнц для i от 1 до 3\r\nнц для j от 1 до 3\r\nРадКлет[i,j]:= радиация\r\nесли снизу свободно то\r\nвниз\r\nвсе\r\nкц\r\n\r\nесли i<3 то\r\nесли справа свободно то\r\nвправо;\r\nвверх;\r\nвверх;\r\nвверх\r\nвсе\r\nвсе\r\nкц\r\nвверх;\r\n\r\n\r\nвещ таб СумРад[1:6]\r\n| А здесь найдем сумму радиаций по каждому из 6 путей\r\nСумРад[1]:= РадКлет[1,1] + РадКлет[3,3] + РадКлет[1,2] + РадКлет[1,3]+РадКлет[2,3]\r\nСумРад[2]:= РадКлет[1,1] + РадКлет[3,3] + РадКлет[1,2] + РадКлет[2,2]+РадКлет[2,3]\r\nСумРад[3]:= РадКлет[1,1] + РадКлет[3,3] + РадКлет[1,2] + РадКлет[2,2]+РадКлет[3,2]\r\nСумРад[4]:= РадКлет[1,1] + РадКлет[3,3] + РадКлет[2,1] + РадКлет[2,2]+РадКлет[2,3]\r\nСумРад[5]:= РадКлет[1,1] + РадКлет[3,3] + РадКлет[2,1] + РадКлет[2,2]+РадКлет[3,2]\r\nСумРад[6]:= РадКлет[1,1] + РадКлет[3,3] + РадКлет[2,1] + РадКлет[3,1]+РадКлет[3,2]\r\n| Теперь из всех шести значений СумРад найдем минимальное\r\nвещ Миним=500 \r\nцел НомерПути\r\nцел к\r\nнц для к от 1 до 6\r\nесли СумРад[к] < Миним то \r\nМиним:=СумРад[к]\r\nНомерПути:=к\r\nвсе \r\nкц\r\n| Теперь Миним это минимальное облучение, а к - номер нужного пути\r\n| Осталось закрасить нужный путь\r\nвывод НомерПути\r\n\r\nвыбор\r\nпри НомерПути=1: \r\nзакрасить;\r\nвлево;\r\nзакрасить;\r\nвлево;\r\nзакрасить;\r\nвверх;\r\nзакрасить;\r\nвверх;\r\nзакрасить\r\nпри НомерПути=2:\r\nзакрасить;\r\nвлево;\r\nзакрасить;\r\nвверх;\r\nзакрасить;\r\nвлево;\r\nзакрасить;\r\nвверх;\r\nзакрасить\r\nпри НомерПути=3:\r\nзакрасить;\r\nвверх;\r\nзакрасить;\r\nвлево;\r\nзакрасить;\r\nвлево;\r\nзакрасить; \r\nвверх;\r\nзакрасить\r\nпри НомерПути=4: \r\nзакрасить;\r\nвлево; \r\nзакрасить;\r\nвверх; \r\nзакрасить; \r\nвверх;\r\nзакрасить;\r\nвлево; \r\nзакрасить\r\nпри НомерПути=5: \r\nзакрасить; \r\nвверх; \r\nзакрасить;\r\nвлево;\r\nзакрасить;\r\nвверх;\r\nзакрасить;\r\nвлево;\r\nзакрасить\r\nпри НомерПути=6: \r\nзакрасить;\r\nвверх; \r\nзакрасить; \r\nвверх; \r\nзакрасить;\r\nвлево; \r\nзакрасить;\r\nвлево;\r\nзакрасить\r\nвсе\r\n\r\nвывод \"Минимальное общее облучение радиацией     \" , Миним\r\n\r\nкон\r\n");

function formating_code()
{
	var s = '';
	if (myCodeMirror.lineCount()==0 || myCodeMirror.getLine(0).indexOf('| |')<0)
	{
		var format_steck=[];
		format_length=[]
		var format_error=!1;
		for (var i = 0; i < myCodeMirror.lineCount(); i++) {
			format_length[i]=undefined;
			var line = myCodeMirror.getLine(i);
			var parse_line = line.trim().split(' ')[0].split('\t')[0].split('(')[0].replace('ё','е');
			if (format_steck.length>0)
			{
				if (line.trim()=='')
					format_length[i]=format_steck.length;
				if (line.trim().split('|')[0]!='')
					format_length[i]=format_steck.length;
			}
			if (parse_line=='нач')
			{
				if (format_steck.length!=0)
					format_error=true;
				format_length[i] = 0;
				format_steck=['нач'];
			}
			if (parse_line=='нц'||parse_line=='если'||parse_line=='выбор')
			{
				if (format_steck.length<1)
					format_error = true;
				format_length[i] = format_steck.length;
				format_steck.push(parse_line);
			}
			var tmp_h=format_steck.length-1;
			if (parse_line=='кц')
			{
				if (format_steck.length<2)
					format_error=true;
				else if (format_steck[tmp_h]=='нц'){
					format_steck.pop();
					format_length[i] = format_steck.length;
				}else
					format_error=true;
			}
			if (parse_line=='все')
			{
				if (format_steck.length<2)
					format_error=true;
				else if (format_steck[tmp_h]=='если'||format_steck[tmp_h]=='если_иначе'){
					format_steck.pop();
					format_length[i] = format_steck.length;
				}else if (format_steck[tmp_h]=='выбор'){
					format_steck.pop();
					format_length[i] = format_steck.length;
				}else if (format_steck[tmp_h-1]=='выбор' && (format_steck[tmp_h]=='иначе' || format_steck[tmp_h]=='при')){
					format_steck.pop();
					format_steck.pop();
					format_length[i] = format_steck.length;
				}else
					format_error=true;
			}
			if (parse_line=='при')
			{
				if (format_steck.length<2)
					format_error=true;
				else if (format_steck[tmp_h]=='выбор'){
					format_length[i] = format_steck.length;
					format_steck.push('при');
				}else if (format_steck[tmp_h]=='при'){
					format_steck.pop();
					format_length[i] = format_steck.length;
					format_steck.push('при');
				}else
					format_error=true;
			}
			if (parse_line=='иначе')
			{
				if (format_steck.length<2)
					format_error=true;
				else if (format_steck[tmp_h]=='если'){
					format_steck.pop();
					format_length[i] = format_steck.length;
					format_steck.push('если_иначе');
				}else if (format_steck[tmp_h]=='выбор'){
					format_length[i] = format_steck.length;
					format_steck.push('иначе');
				}else if (format_steck[tmp_h]=='при'){
					format_steck.pop();
					format_length[i] = format_steck.length;
					format_steck.push('иначе');
				}else
					format_error=true;
			}
			if (parse_line=='кон')
			{
				if (format_steck.length!=1)
					format_error=true;
				format_length[i] = 0;
				format_steck=[];
			}
		}
		if (format_steck.length!=0)
			format_error=true;
		for (var i = 0; i < myCodeMirror.lineCount(); i++)
			if (format_length[i]!=undefined && format_error==!1){
				var line = myCodeMirror.getLine(i);
				var s = '\t'.repeat(format_length[i])+line.trimLeft();
				if (s != myCodeMirror.getLine(i))
						myCodeMirror.replaceRange('\t'.repeat(format_length[i]), {
							line: i,
							ch: 0
						}, {
							line: i,
							ch: myCodeMirror.getLine(i).length-line.trimLeft().length
						}, "+move");
			}else
			{
				var line = myCodeMirror.getLine(i);
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
				var s = '\t'.repeat(v >> 1) + ' '.repeat(v & 1) + line.trimLeft();
				if (s != myCodeMirror.getLine(i))
					if (((TabInProgramm!=undefined)&&(TabInProgramm.work!=undefined)&&(TabInProgramm.work==true)&&(TabInProgramm[i] != undefined))||(myCodeMirror.getLine(i).trim() == ''))
						myCodeMirror.replaceRange('\t'.repeat(v >> 1) + ' '.repeat(v & 1), {
							line: i,
							ch: 0
						}, {
							line: i,
							ch: t
						}, "+move");
			}
	}
}



myCodeMirror.on("keyup", function (cm, event) {
	if (!cm.state.completionActive && /*Enables keyboard navigation in autocomplete list*/
		event.keyCode != 13 ) { /*Enter - do not open autocomplete list just after item has been selected in it*/
		CodeMirror.commands.autocomplete(cm, null, {
			completeSingle: false
		});
	}
	//if (event.code=="KeyZ" && event.ctrlKey)
	//	return;
	//console.log(event);
	/*
myCodeMirror.undo();
while(1){
  var last=myCodeMirror.getHistory().undone;
  last=last[last.length-1];
  if (last && last.changes && last.changes[0] && last.changes[0].text && last.changes[0].text.join(',').trim()!='')
    break;
  myCodeMirror.undo();
}
*/
	if (event.code=="ControlLeft"||event.code=="ControlRight")
		return;
	formating_code();
});
var _id_push_data_=undefined;
var _info_prog_nexttime_timer=0;//TODO

function _info_prog_nexttime_function(){
	if ((_id_push_data_!=undefined)&&(Editor_opentask!=''))
		server_request('get_programs', Editor_opentask, get_info_data);
}

function get_info_programm_open(i)
{
	//if (document.getElementById('programm_view_div').style.display=='none')
	//{
		//document.getElementById('programm_view_pre').innerText='';
		document.getElementById('programm_view_div').style.display='';
		//document.getElementById('programm_view_div').style.opacity=".5";
	//}
	document.getElementById('programm_view_pre').innerText=last_info_data[i].programm;
	document.getElementById('programm_view_div').style.opacity="1";
}

// var where_how_exit_time=0;

let blinkEndTime = 0;
function blinkTopMenu() {
	const topMenu = document.getElementById('topmenumax');
	if (!topMenu || !topMenu.children.length) return;
	const targetElement = topMenu.children[0];
	
	blinkEndTime = +new Date() + 3500;
	
	// Очищаем предыдущий интервал, если он был
	if (targetElement.blinkInterval) {
		clearInterval(targetElement.blinkInterval);
	}
	
	// Функция для переключения цвета
	function toggleColor() {
		if (Date.now() < blinkEndTime) {
			targetElement.style.background = targetElement.style.background === '' ? '#ff0000' : '';
		} else {
			clearInterval(targetElement.blinkInterval);
			targetElement.style.background = '';
		}
	}
	
	targetElement.blinkInterval = setInterval(toggleColor, 333);
	
	toggleColor();
}



var last_info_data=[];
function get_info_data(parse_s){
	//if (debug)
		console.log(parse_s);
	last_info_data=parse_s;
	var timeou=3000;
	var doc_s='';
	doc_s+='<tr><th>Номер</th><th>Когда</th><th>Задача</th><th>Язык</th><th>Вердикт</th></tr>';
	for (var i=0;i<parse_s.length;i++){
		doc_s+='<tr>';
		doc_s+='<td title="Открыть программу" style="color: #288ce4;text-decoration: underline;" onclick="get_info_programm_open('+i+')">'+parse_s[i].N+'</td>';
		var now = new Date();
		doc_s+='<td>'+new Date(parse_s[i].send_time - now.getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T', ' ').replace('-', '.').replace('-', '.')+'</td>';
		doc_s+='<td>'+Editor_opentask+'</td>';
		doc_s+='<td>ВебКумир</td>';
		if (parse_s[i].value==1)
		{
			doc_s+='<td style="color: #0a0;">OK</td>';
			//if ((new Date())-where_how_exit_time>20000)
			//where_how_exit_time=new Date();
			blinkTopMenu();
		}else
		//if (parse_s[i][1].trim().split(' ')[0]=='Error')
		
		if (parse_s[i].value==0)
			doc_s+='<td style="color: #a00;">0%</td>';
		else
			doc_s+='<td style="color: #288ce4;" onclick="window.open(\'./whatissolution.html\', \'_blank\');"><u>Частичное решение: '+(parse_s[i].value*100+'').slice(0,4)+'%</u><img title="Что такое штраф?" style="margin-left: 3px;vertical-align:middle;" alt="Что такое штраф?" unselectable="on" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVEhLtZYxbuJQEIYpEBRQIeiMRIVS5AZAR0mx5d6AC6SkoNgTIHEFFCqa3GLpU4CEBAUSmISNRIjtgPN/j5dsEmHW0sojDXma+f9/5r03tpOKsjAM0/Kr4/F4o7/dc25zV/K0pcUzER0rcC/3Pdlms/Hm8/kBZ42RA2OxjqVHG50I2JLfHQ4Hb7lc7gaDwbbdbruNRuOhWq36OGti5MCAhQM3cjdW/Kd8sdvtvOFw+FCr1Z5yuZyfyWSCYrHoOY7zirMmRg4MWDhw0ThbhOoA2H6n03ELhcJLPp/3m83mn16vtx2Px+50On3GWRMjBwYsHLi2SMvKnkwBR35HFwDVmVcul/f9fn+zWq32OoKjuvpixMiBAQsHrt0Jx3W6E2GZli7nyFbVjREfjUZb3eOLgFz07yAIwsViYZw1MXJgwMKBiwZaaKJNAUbxnsuq1+tPbJmufN/fK35r878QVt44a2I2dwsWDlw00EKTPMdzI/c1EY9cGue6Xq+fPwCnXXa/FyBmc6ZBOHDRQAtNtA2ZmWbsstlswOUp8XeLJ5Ef6vIRYZw1MZszRwwHLhpooUncFHBd18x2qVTymBCBmYRrBDDEogpgYOHARQMtND8K8HTqATJzPplMOJ6Z4hXLNxiEzx0RBhYOXDTQQtNg+IlTYDabhZVKxThrQ7YG9mKBGEd0sQBYOJFHFOOSIwuAYQ3n7CUrEWtMLxT455gm+6DpJ9lXBSZgci+7d1Mgudc1pqaS/eBgtkgyn8zPJmAyH/3PRidyxvA//m1Jpd4AmceFkKb5xGIAAAAASUVORK5CYII=" width="22" height="22"></td>';
		/*else
		if (parse_s[i][1].trim().split(' ')[0]=='Queue')
		{
			doc_s+='<td>В очереди</td>';
			timeou=500;
		}else
		if (parse_s[i][1].trim().split(' ')[0]=='Testing')
		{
			doc_s+='<td>Тестируется</td>';
			timeou=500;
		}else
		{
			doc_s+='<td>'+parse_s[i][1].trim()+'</td>';
		}*/
		doc_s+='</tr>';
	}
	if (_id_push_data_!=undefined && _id_push_data_.innerHTML != doc_s)
	{	
		var temp, div;
		var tbody=_id_push_data_;
		while(temp = tbody.firstChild) {
			tbody.removeChild(temp);
		}
		div = document.createElement('div');
		div.innerHTML = '<table><tbody>' + doc_s + '</tbody></table>' ;
		div = div.getElementsByTagName('tbody')[0];
		while(temp = div.firstChild) {
			tbody.appendChild(temp);
		}
	}
	
	if (_info_prog_nexttime_timer) clearTimeout(_info_prog_nexttime_timer);
	_info_prog_nexttime_timer = setTimeout(_info_prog_nexttime_function, timeou-10);
}

function SelectIt(evt, CommandName, CommandVal) {
	if (evt == undefined)
		evt = document.getElementById("defaulttab");
	var i,
	tabcontent,
	tablinks;
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		if (Editor_dark_mode)
			document.getElementById('id_tab').children[i].style.background='#3a3a3a';
		else
			document.getElementById('id_tab').children[i].style.background='white';
	}
	var _id_map = document.getElementById("id_map");
	var _id_no_tab = document.getElementById("id_no_tab");
	var _id_no_tab_hidden = document.getElementById("id_no_tab_hidden");
	var _id_iframe = document.getElementById("id_iframe");
	var _id_file = document.getElementById("id_file");
	var _id_text = document.getElementById("id_text");
	var _id_push = document.getElementById("id_push");
	if (debug)
		console.log([CommandName, CommandVal]);
	_id_push_data_=undefined;
	//_id_map.style.visibility="hidden";
	//_id_iframe.style.visibility="hidden";
	//_id_file.style.visibility="hidden";
	myCodeMirror.setValue(myCodeMirror.getValue());
	_id_no_tab.style.height = (BodyPane.clientHeight - document.getElementById("id_tab").clientHeight) + "px";
	_id_no_tab.style.width = "100%";
	if (_id_no_tab.children.length != 0)
		_id_no_tab_hidden.appendChild(_id_no_tab.children[0]);
	//===============
	/*id_push_data*/
	//===============
	AnimTime=1000000000+AnimTime; Init(true);CProg(123);isRun = 0;document.getElementById('programmoutput').value='';
	_id_no_tab.innerHTML = '';
	if (CommandName == 'Site') {
		_id_no_tab.appendChild(_id_iframe);
		_id_iframe = document.getElementById("id_iframe");
		
		//_id_iframe.style.visibility="visible";
		_id_iframe.childNodes[1].src = CommandVal;//
	}else
	{
		_id_iframe = document.getElementById("id_iframe");
		_id_iframe.childNodes[1].src = 'about:blank';//
	}
	if (CommandName == 'File') {
		_id_no_tab.appendChild(_id_file);
		//_id_file.remove();
		_id_file = document.getElementById("id_file");

		//_id_file.style.visibility="visible";
		document.getElementById("id_file_src_1").src = CommandVal;
		if (document.getElementById("id_file_src_2") != null)
			document.getElementById("id_file_src_2").data = CommandVal;
		if (document.getElementById("id_file_src_3") != null)
			document.getElementById("id_file_src_3").innerHTML = 'This browser does not support PDFs. Please download the PDF to view it: <a href="' + CommandVal + '">Download PDF</a>';

	}
	if (CommandName == 'Map') {
		_id_no_tab.appendChild(_id_map);
		//_id_map.remove();
		_id_map = document.getElementById("id_map");
		document.getElementById("canvas").style.opacity='-999';
		
		setTimeout(function f(){
			document.getElementById('area').value = CommandVal;
			document.getElementById("canvas").style.opacity='0';
			Init(true);
			myCodeMirror.setValue(myCodeMirror.getValue());
		});
		Array.prototype.forEach.call(document.getElementsByClassName('isprog'), function (element) {
			element.style.filter = 'alpha(Opacity=100)';
			element.style.opacity = 1;
		});
		//_id_map.style.visibility="visible";
	} else
	{
		Array.prototype.forEach.call(document.getElementsByClassName('isprog'), function (element) {
			element.style.filter = 'alpha(Opacity=50)';
			element.style.opacity = 0.5;
		});
		document.getElementById('area').value=Editor_defaut_fil; 
	}
	if (CommandName == 'Text') {
		_id_no_tab.appendChild(_id_text);
		_id_text = document.getElementById("id_text");
		if (Editor_dark_mode)
		{
			if (_id_text.childNodes[1].style.color=='')
			{
				_id_text.childNodes[1].style.color='#555';
				setTimeout(function (){_id_text.childNodes[1].style.color='#666';},100);
				setTimeout(function (){_id_text.childNodes[1].style.color='#777';},200);
				setTimeout(function (){_id_text.childNodes[1].style.color='#888';},300);
				setTimeout(function (){_id_text.childNodes[1].style.color='#999';},400);
				setTimeout(function (){_id_text.childNodes[1].style.color='#AAA';},500);
				setTimeout(function (){_id_text.childNodes[1].style.color='#BBB';},600);
				setTimeout(function (){_id_text.childNodes[1].style.color='#CCC';},700);
				setTimeout(function (){_id_text.childNodes[1].style.color='#DDD';},800);
				setTimeout(function (){_id_text.childNodes[1].style.color='#EEE';},900);
				setTimeout(function (){_id_text.childNodes[1].style.color='';},1000);
			}
		}
		else
		{
			if (_id_text.childNodes[1].style.color=='')
			{
				_id_text.childNodes[1].style.color='#FFF';
				setTimeout(function (){_id_text.childNodes[1].style.color='#EEE';},100);
				setTimeout(function (){_id_text.childNodes[1].style.color='#DDD';},200);
				setTimeout(function (){_id_text.childNodes[1].style.color='#CCC';},300);
				setTimeout(function (){_id_text.childNodes[1].style.color='#BBB';},400);
				setTimeout(function (){_id_text.childNodes[1].style.color='#AAA';},500);
				setTimeout(function (){_id_text.childNodes[1].style.color='#999';},600);
				setTimeout(function (){_id_text.childNodes[1].style.color='#888';},700);
				setTimeout(function (){_id_text.childNodes[1].style.color='#777';},800);
				setTimeout(function (){_id_text.childNodes[1].style.color='#666';},900);
				setTimeout(function (){_id_text.childNodes[1].style.color='#555';},1000);
				setTimeout(function (){_id_text.childNodes[1].style.color='#444';},1100);
				setTimeout(function (){_id_text.childNodes[1].style.color='#333';},1200);
				setTimeout(function (){_id_text.childNodes[1].style.color='#222';},1300);
				setTimeout(function (){_id_text.childNodes[1].style.color='#111';},1400);
				setTimeout(function (){_id_text.childNodes[1].style.color='';},1500);
			}
		}
		//_id_iframe.style.visibility="visible";
		_id_text.childNodes[1].innerHTML = CommandVal.replace(/[\n]/g, '<br>');
	}
	if (CommandName == 'Load') {
		_id_no_tab.appendChild(_id_push);
		_id_push = document.getElementById("id_push");
		_id_push_data_=document.getElementById("id_push_data");
		
		if (_info_prog_nexttime_timer) clearTimeout(_info_prog_nexttime_timer);
		_info_prog_nexttime_timer = setTimeout(_info_prog_nexttime_function);
		
		setTimeout(function f3209234(){_id_push.childNodes[3].disabled =false;}, 100);
	}
	//document.getElementById(cityName).style.display = "block";
	if (evt.currentTarget != undefined)
		evt.currentTarget.style.background = "#ccc";
	else
		evt.style.background = "#ccc";
}
var resizeCur=0;
function resizeSep(el, pageX, startX, pageY, startY, fix) {

	if (fix!=undefined)
	{
		fix.skipX = true;

		if (pageX < window.innerWidth * leftLimit / 100) {
			pageX = window.innerWidth * leftLimit / 100;
			fix.pageX = pageX;
		}
		if (pageX > window.innerWidth * rightLimit / 100) {
			pageX = window.innerWidth * rightLimit / 100;
			fix.pageX = pageX;
		}
	}

	var cur = pageX;
	resizeCur=cur;
	if (cur < window.innerWidth * leftLimit / 100) {
		cur = window.innerWidth * leftLimit / 100;
	}
	if (cur > window.innerWidth * rightLimit / 100) {
		cur = window.innerWidth * rightLimit / 100;
	}

	var right = (window.innerWidth - cur );
	leftPane.style.width = (cur-document.getElementById("panes-separator").clientWidth/2) + 'px';
	rightPane.style.width = (right-document.getElementById("panes-separator").clientWidth/2) + 'px';
	paneSep.style.left = (cur-document.getElementById("panes-separator").clientWidth/2) + 'px';
	rightPane.style.left = (cur+document.getElementById("panes-separator").clientWidth/2) + 'px';
	//if (Math.random>0.9)
	document.getElementById("allprogrammdiv").style.height = (BodyPane.clientHeight - topmenuPane.clientHeight) + "px";
	myCodeMirror.setSize((leftPane.clientWidth), Math.floor((BodyPane.clientHeight - topmenuPane.clientHeight) * 0.7));
	document.getElementById("id_no_tab").style.height = (BodyPane.clientHeight - document.getElementById("id_tab").clientHeight) + "px";
	document.getElementById("id_map").style.height = document.getElementById("id_no_tab").style.height;
	document.getElementById("id_iframe").style.height = document.getElementById("id_no_tab").style.height;
	document.getElementById("id_file").style.height = document.getElementById("id_no_tab").style.height;
	
	document.getElementById("programmoutput").style.height = (document.getElementById("programmdiv2").clientHeight-6) + "px";
	document.getElementById("programmoutput").style.width = (document.getElementById("programmdiv2").clientWidth-6) + "px";
}
paneSep.sdrag(resizeSep, null, 'horizontal');
function resizeSep2()
{
	resizeSep(0,resizeCur);
}
window.addEventListener("resize",  resizeSep2);
function decimalAdjust(type, value, exp) {
	// Если степень не определена, либо равна нулю...
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// Если значение не является числом, либо степень не является целым числом...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Сдвиг разрядов
	value = value.toString().split('e');
	value = Math[type]( + (value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Обратный сдвиг
	value = value.toString().split('e');
	return  + (value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

Math.floor10 = function (value, exp) {
	return decimalAdjust('floor', value, exp);
};
function keyup_test(e)
{
	setTimeout(
		function f()
		{
			setTimeout(
				function f2()
				{if (debug)
					console.log([Keys,e]);
				},200);
				
			if (e.key=='F8')//f11
			{
				var kek=formating(myCodeMirror.getValue(),document.getElementById('area').value);if (kek!=undefined) myCodeMirror.setValue(kek);
			}
			if (e.key=='F4')//f10
			{
				//Keys[121]=false;
				MyToCurs();
			}
			if (e.key=='F2')//f8
			{
				MyToNew();
			}
			if (!is_fast_display && e.key=="Escape")
			{
				AnimTime=1000000000+AnimTime; Init(true);CProg(123);isRun = 0;document.getElementById('programmoutput').value='';
			}
			if (Keys[120] && Keys[16])
			{
				MyFastRun();
			}
			if (Keys[120] && (!Keys[16]))
			{
				MyRun();
			}
			if (myCodeMirror!=undefined)
			{
				if (Keys[27] && Keys[38])
				{
					//CodeMirror.Pass;
					//myCodeMirror.setCursor({'line':(myCodeMirror.getCursor().line+1),'ch':myCodeMirror.getCursor().ch});
					//myCodeMirror.replaceRange('вверх\r\n\t',{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch},{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch});
				}
				if (Keys[27] && Keys[37])
				{
					//CodeMirror.Pass;
					//myCodeMirror.setCursor({'line':(myCodeMirror.getCursor().line),'ch':(myCodeMirror.getCursor().ch+1)});
					//myCodeMirror.replaceRange('влево\r\n\t',{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch},{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch});
					//myCodeMirror.replaceRange({myCodeMirror.getCursor().line,myCodeMirror.getCursor().ch},{myCodeMirror.getCursor().line,myCodeMirror.getCursor().ch},'влево\r\n\t');
				}
				if (Keys[27] && Keys[39])
				{
					//CodeMirror.Pass;
					//myCodeMirror.setCursor({'line':(myCodeMirror.getCursor().line),'ch':(myCodeMirror.getCursor().ch-1)});
					//myCodeMirror.replaceRange('вправо\r\n\t',{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch},{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch});
					//myCodeMirror.replaceRange({myCodeMirror.getCursor().line,myCodeMirror.getCursor().ch},{myCodeMirror.getCursor().line,myCodeMirror.getCursor().ch},'вправо\r\n\t');
				}
				if (Keys[27] && Keys[40])
				{
					//CodeMirror.Pass;
					//myCodeMirror.setCursor({'line':(myCodeMirror.getCursor().line-1),'ch':(myCodeMirror.getCursor().ch)});
					//myCodeMirror.replaceRange('вниз\r\n\t',{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch},{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch});
					//myCodeMirror.replaceRange({myCodeMirror.getCursor().line,myCodeMirror.getCursor().ch},{myCodeMirror.getCursor().line,myCodeMirror.getCursor().ch},'вниз\r\n\t');
				}
			}
		}
	,1)
}
function Editor_print(s,s2)
{
	
	var line = myCodeMirror.getLine(myCodeMirror.getCursor().line);
	var ttabs='\t'.repeat(line.split('\t').length-1);
	if (line.trim().split(' ')[0]=='нц'||line.trim().split(' ')[0]=='нц пока'||line.trim().split(' ')[0]=='если'||line.trim().split(' ')[0]=='при')
	{
		if (line.trim()=='нц')
			if (line[myCodeMirror.getCursor().ch-1]!=' ')
				s2=' пока '+s2;
			else
				s2='пока '+s2;
		if (myCodeMirror.somethingSelected())
		{
			if (myCodeMirror.getSelection().split(' ').length==1)
			{
				var rep=s2.split(' ')[0];
				if (rep=='клетка')
				{
					if (myCodeMirror.getSelection().trim()=='свободно')
						rep='стена';
					else if (myCodeMirror.getSelection().trim()=='стена')
						rep='свободно';
					else if (myCodeMirror.getSelection().trim()=='снизу')
						rep='слева';
					else if (myCodeMirror.getSelection().trim()=='слева')
						rep='сверху';
					else if (myCodeMirror.getSelection().trim()=='сверху')
						rep='справа';
					else if (myCodeMirror.getSelection().trim()=='справа')
						rep='снизу';
					else if (myCodeMirror.getSelection().trim()=='чистая')
						rep='закрашена';
					else if (myCodeMirror.getSelection().trim()=='закрашена')
						rep='чистая';
				}
				var pos_line=Math.min(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]);
				var pos_ch=Math.min(myCodeMirror.listSelections()[0]["anchor"]["ch"],myCodeMirror.listSelections()[0]["head"]["ch"]);
				myCodeMirror.replaceRange(rep,{
					'line':pos_line,
					'ch':pos_ch},{
					'line':Math.max(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]),
					'ch':Math.max(myCodeMirror.listSelections()[0]["anchor"]["ch"],myCodeMirror.listSelections()[0]["head"]["ch"])});
				if (rep!=s2.split(' ')[0])
				{
					myCodeMirror.setSelection({
					'line':pos_line,
					'ch':pos_ch},{
					'line':pos_line,
					'ch':pos_ch+rep.length});
				}
			}
			else
				myCodeMirror.replaceRange(s2,{'line':Math.min(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]),'ch':Math.min(myCodeMirror.listSelections()[0]["anchor"]["ch"],myCodeMirror.listSelections()[0]["head"]["ch"])},{'line':Math.max(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]),'ch':Math.max(myCodeMirror.listSelections()[0]["anchor"]["ch"],myCodeMirror.listSelections()[0]["head"]["ch"])});
			return;
		}
		ttabs+='\t';
		var text = s2+'\r\n\t'.replace(/\t/g,ttabs);
		var llline=myCodeMirror.getCursor().line;
		myCodeMirror.replaceRange(text.split('\r')[0],{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch},{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getCursor().ch});
		myCodeMirror.replaceRange('\r'+text.split('\r').slice(1).join('\r'),{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getLine(myCodeMirror.getCursor().line).length},{'line':myCodeMirror.getCursor().line,'ch':myCodeMirror.getLine(myCodeMirror.getCursor().line).length});
		myCodeMirror.setCursor({'line':(llline+1),'ch':10000});
		return;
	}
	if (myCodeMirror.somethingSelected())
	{
		myCodeMirror.replaceRange(s,{'line':Math.min(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]),'ch':Math.min(myCodeMirror.listSelections()[0]["anchor"]["ch"],myCodeMirror.listSelections()[0]["head"]["ch"])},{'line':Math.max(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]),'ch':Math.max(myCodeMirror.listSelections()[0]["anchor"]["ch"],myCodeMirror.listSelections()[0]["head"]["ch"])});
		return;
	}
	if (line.trim()!='')
	{
		if (line.trim().split(' ')[0]=='нц'||line.trim().split(' ')[0]=='если')
			ttabs+='\t';
		var text = ('\r\n\t'+s+'\r\n\t').replace(/\t/g,ttabs);
		myCodeMirror.setCursor({'line':myCodeMirror.getCursor().line,'ch':0});
		myCodeMirror.replaceRange(text,{'line':myCodeMirror.getCursor().line,'ch':line.length},{'line':myCodeMirror.getCursor().line,'ch':line.length});
		myCodeMirror.setCursor({'line':myCodeMirror.getCursor().line+2,'ch':10000});
	}else
	{
		var text = s+'\r\n\t'.replace(/\t/g,ttabs);
		myCodeMirror.replaceRange(text,{'line':myCodeMirror.getCursor().line,'ch':line.length},{'line':myCodeMirror.getCursor().line,'ch':line.length});
		myCodeMirror.setCursor({'line':myCodeMirror.getCursor().line,'ch':10000});
	}
}

myCodeMirror.setOption("extraKeys", {"Up":function()
{
	if (debug)
		console.log("Key Up pressed");
	if(!(Keys[27])) // logic to decide whether to move up or not
	{
		return CodeMirror.Pass;
	}
	else
	{
		Editor_print('вверх','сверху свободно');
	}
},
"Down":function()
{
	if (debug)
		console.log("Key Down pressed");
	if(!(Keys[27])) // logic to decide whether to move up or not
	{
		return CodeMirror.Pass;
	}
	else
	{
		Editor_print('вниз','снизу свободно');
	}
},
"Left":function()
{
	if (debug)
		console.log("Key Left pressed");
	if(!(Keys[27])) // logic to decide whether to move up or not
	{
		return CodeMirror.Pass;
	}
	else
	{
		Editor_print('влево','слева свободно');
	}
},
"Right":function()
{
	if (debug)
		console.log("Key Right pressed");
	if(!(Keys[27])) // logic to decide whether to move up or not
	{
		return CodeMirror.Pass;
	}
	else
	{
		Editor_print('вправо','справа свободно');
	}
},
"Space":function()
{
	if (debug)
		console.log("Key Space pressed");
	if(!(Keys[27])) // logic to decide whether to move up or not
	{
		return CodeMirror.Pass;
	}
	else
	{
		Editor_print('закрасить','клетка закрашена');
	}
},
"Tab": function()
{
	if (myCodeMirror.somethingSelected())
	{
		for (var i=Math.min(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]);i<=Math.max(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]);i++)
		{
			//console.log(i);
			var line = myCodeMirror.getLine(i);
			var t = 0;
			var v = 0;
			var out_s='';
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

			out_s += '\t'.repeat(Math.floor(v/2)+1);
			myCodeMirror.replaceRange(out_s,{'line':i,'ch':0},{'line':i,'ch':t});
		}
	}
	else
	{
		var i=myCodeMirror.getCursor().line;
		var j=myCodeMirror.getCursor().ch;
		var line = myCodeMirror.getLine(i);
		var reg=line.slice(j).match(/^.*?(?:до|шаг|от|то|для) /g);
		if (reg!=null)
		{
			myCodeMirror.setCursor(i,j+reg[0].length)
		}else
		myCodeMirror.execCommand("insertTab");
	}
},
"Shift-Tab": function()
{
	if (myCodeMirror.somethingSelected())
	{
		for (var i=Math.min(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]);i<=Math.max(myCodeMirror.listSelections()[0]["anchor"]["line"],myCodeMirror.listSelections()[0]["head"]["line"]);i++)
		{
			//console.log(i);
			var line = myCodeMirror.getLine(i);
			var t = 0;
			var v = 0;
			var out_s='';
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

			out_s += '\t'.repeat(Math.max(0, Math.floor(v/2)-1));
			myCodeMirror.replaceRange(out_s,{'line':i,'ch':0},{'line':i,'ch':t});
		}
	}
	else { 
		var i=myCodeMirror.getCursor().line
		var line = myCodeMirror.getLine(i);
		var t = 0;
		var v = 0;
		var out_s='';
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

		out_s += '\t'.repeat(Math.max(0, Math.floor(v/2)-1));
		myCodeMirror.replaceRange(out_s,{'line':i,'ch':0},{'line':i,'ch':t}); 
	}
},
"Backspace": function()
{
	if (!myCodeMirror.somethingSelected())
	{
		var cur=myCodeMirror.getCursor();
		var curl=myCodeMirror.getLine(myCodeMirror.getCursor().line);
		if (curl.slice(0,cur.ch).trim()=='' && myCodeMirror.getCursor().line>0)
		{
			myCodeMirror.replaceRange('', {
				line: myCodeMirror.getCursor().line-1,
				ch: myCodeMirror.getLine(myCodeMirror.getCursor().line-1).length+1
			}, {
				line: myCodeMirror.getCursor().line,
				ch: cur.ch
			}, "*move");
			return;
		}
	}
	return CodeMirror.Pass;
},
"Ctrl-Z": function()
{
	myCodeMirror.undo();
	while(1){
	  var last=myCodeMirror.getHistory().undone;
	  last=last[last.length-1];
	  if (!(last && last.changes && last.changes[0] && last.changes[0].text && last.changes[0].text.join(',').trim()==''))
		break;
	  myCodeMirror.undo();
	}
}
});
addEventListener("keydown", keyup_test);

function Init(f) {
	var smap = JSON.parse(document.getElementById('area').value).fil;
	var smapline = smap.split('\n')[1];
	mapsizeX = parseInt(smap.split('\n')[1].split(' ')[0]);
	mapsizeY = parseInt(smap.split('\n')[1].split(' ')[1]);
	if (map.length != mapsizeX + 2) {
		map = new Array(mapsizeX + 2);
		f = true;
	}
	for (var i = 0; i < map.length; i++)
		if (map[i] == undefined || map[i].length != mapsizeY + 2) {
			map[i] = new Array(mapsizeY + 2);
			f = true;
		}
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			if (map[i][j] == undefined || map[i][j].length != 7) {
				map[i][j] = new Array(7);
				f = true;
			}
			map[i][j][0] = 0; //Wall
			if (f == true)
				map[i][j][1] = 0; //Color
			map[i][j][2] = 0; //Radiation
			map[i][j][3] = 0; //Temperature
			map[i][j][4] = "$"; //Symbol
			map[i][j][5] = "$"; //Symbol1
			map[i][j][6] = ""; //Point
		}
	}
	if (f == true) {
		PlayerSpeed = 1000;
		document.getElementById('MyRunImage').src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANUSURBVEhL3VU7SyNRFF4hjYqSQtAiRcRmwbUQX4UiKARBFCI+qgVBLCwUm/yA2PhsBCtl8QEBFxVcYRHxgYqCjSAKuoVoNImbxCQzmTwnk8ycPWdI3DXcbGbbPfBxyc0957vnO+ee+fB/mKIoBoQFAKwspP/7iNClXbQbOukxgI3juKTdbgen0wnxeFxdeZ4HURRTaAk88wPxmc6nXbUZOhjR0T4/Pw9GoxFaWlrg4uJCXWlvc3MztrS0FPD7/XE8xyG+oY9ZM1GGwGq1Av0kkrOzszcC2i8uLpa6u7uDh4eHfCwWk/A8j7Chb37ZWAT39/dvEmX2CwoKlPLy8vj4+Dh3d3cXTiaTqmzoTzUyqMFYxiK4urpSb39ycvJGkIFOp5Orq6sjCwsLnNfrjcmyTBl9xzhs2VgEx8fH6kp72QQZFBUVJTs6OoK7u7t8NBqlbNiysQj+lsGfINnKysrEkZER7ubmRpAkScRY72VjEbBqQNDr9er/2aiqqpIxm+j29nYA25qySSK+Ij4xCbK7iPYNBgPYbDagt5ILWBN6MzLGhDSJUzOBxWKhRwenp6cwMzMDk5OTTExPTytzc3Owvr6u4OOVNUtEq8fjgba2NmhoaICurq53MJvN8uDgoDw8PAy4KrW1teLa2lpUc5FpfX5+hrq6OlhdXYVAIAButxvwTah4eHhQBEFQsKPA5/OJvb29nqmpKYlJwGrTDEF9fT1sbGygG8Dt7W1qYGBA7uzsBAwIe3t7VGA5EonE+/r6XlDKxD9nQPJsbW0pREA3Pjg4gJ2dHbmnp0caHR31Y6sm8hLkqoHD4YDm5mYFZ5LaKTguUpeXl/zy8rLfZDIJY2NjPhoheQlYww5Hg0Sk7e3taieRPT4+Ck1NTcHGxsZXLPQrEgdzSkTBKDgFZo1rbLkEEbS2tkpHR0dhIri+vn6tqamJoPb+p6enEBaYRrqSTaD1gxNGiWS8cWh/f99NBDgevJWVlSG8jBcL/XNxcdGBNZDeEZChc95PJuJLmkDAwqoE2KqRlZUVAeULE1Banm5DBP39/b8JtBgRuVyuFLZpaGJiwkFZ5ALOpBdsBs/s7KyYds9vRIAaJ4eGhhyFhYX+0tJSPhdKSkr4iooK1/n5OfcLSULN/I83FEAAAAAASUVORK5CYII=";
		playerS = 4;
		playerX = parseInt(smap.split('\n')[3].split(' ')[0]);
		playerY = parseInt(smap.split('\n')[3].split(' ')[1]);
	}
	for (var i = 0; i < mapsizeX + 1; i++) {
		for (var j = 0; j < mapsizeY + 1; j++) {
			map[i][j][0] = 0; //Wall
			if (f == true)
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
	var split_text=smap.split('\n');
	while (j < split_text.length) {
		//document.getElementById('area').value
		smapline = split_text[j].split(' ');
		if (split_text[j]=='')
			break;
		if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(split_text[j][0]) == -1)
			break;
		if (smapline.length > 2) {
			map[smapline[0]][smapline[1]][0] = parseInt(smapline[2]); //Wall
			if (f == true)
				map[smapline[0]][smapline[1]][1] = parseFloat(smapline[3]); //Color
			map[smapline[0]][smapline[1]][2] = parseFloat(smapline[4]); //Radiation
			map[smapline[0]][smapline[1]][3] = parseFloat(smapline[5]); //Temperature
			map[smapline[0]][smapline[1]][4] = smapline[6].trim(); //Symbol
			map[smapline[0]][smapline[1]][5] = smapline[7].trim(); //Symbol1
			map[smapline[0]][smapline[1]][6] = smapline[8].trim(); //Point
		}
		j++;
	}
}

setTimeout(function f1231421() {
	Init(false);
}, 1000);
var MyplayerY = 0;
var MyplayerX = 0;
var startDate = new Date;
var endDate = new Date;
var time = (endDate - startDate) / 100;
var flag_Anim=1;
window.requestAnimationFrame(fil_draw_anim);
function fil_draw_anim() {
	if (isRun==0)
	{
		isRun = 1;
		InitProg(true);
	}
	if (isRun==2 && (steps[AnimTime]==undefined) && false)
	{
		isRun = 1;
		InitProg(true);
	}
	if (AnimTime == -1) {
		Init(true);
		startDate = new Date;
		AnimTime = 0;
		MyplayerX = playerX;
		MyplayerY = playerY;
		document.getElementById('programmoutput').value='';
	}

	endDate = new Date;
	if (typeof steps== "undefined" || steps ==undefined)
	{
		window.requestAnimationFrame(fil_draw_anim);
		return;
	}
	if (steps[AnimTime] !=undefined)
	{
		time = (endDate - startDate) / PlayerSpeed;
		if (steps[AnimTime] == 'закрасить')
			time = (endDate - startDate) / (3*PlayerSpeed);
		if (steps[AnimTime].indexOf('str') == 0)
			time = (endDate - startDate) / (PlayerSpeed/5);
		if (steps[AnimTime].indexOf('вывод') == 0)
			time = (endDate - startDate) / (PlayerSpeed/3);
		if (steps[AnimTime].indexOf('write_prog') ==0)
			time = 2;
	}else{
		time = (endDate - startDate) / PlayerSpeed;
	}
	var m_onerror=false;
	for (var i=0;i<ErrorKumir.length;i++)
		if (ErrorKumir[i][0]<8)
		{
			m_onerror=true;
		}
	
	if (AnimTime >= steps.length||m_onerror) {
		var def_img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHGSURBVEhL3VU9a8JQFFXMILp0EFwcMknBv+Di5KLQH9BdNxd/QH6Ag+Dm7CC4dKguCgoOjoKDHRwyCIoQX9KPfDQxeb03JNLKqx9VKe2FwyM379yTd97LfYH/EY7jJABlSqnAgvfuFsB5lOMDSDdQoEEIsURRpPP5nOq67o6yLFPDMDYQ7zDnCXCP8z3qcQEEHohitVqlPM/TdDpNR6ORO2Ku1Wpp9Xp9LUmSDvMI4AE4d0cL+QKCIFB8RJHhcLgVwHw0GjXz+bzS6/VkTdNMmC8DGsA9bBtLYDabbS3y88Fg0InH43qpVCLT6fTVsizXNuDjHiXcYqxgCYzHY/frB4PBVsAHx3F2KpV6q9VqZLVaabZt44oeoQ7bNpZAv993R8ztCviIRCJWNptVOp2OrKoqroZtG0tg3wo+A22LxWJGsVgkk8nk2TRNA2p9tY0lwNqDfQiFQnYymVQrlcp6uVyqnm1NV4QlsHuKdgt+h3A4vMlkMgpYLIEIrqb8OwLnWLRYLA5bdOomFwqF0zb5lGPabrcve0wv8qPtaRWG1ypezmoVrGaXy+WUbrer/LjZYTEsjoUv3a6ve+FgAPF6V+Yfj0DgAwwJrfT5XLbZAAAAAElFTkSuQmCC";
		if (def_img!=document.getElementById('MyRunImage').src)
			document.getElementById('MyRunImage').src=def_img;
		AnimTime=1000000000;
		time = 0;
		Animflag = false;
		//CProg(123);
		//isRun = 2;
		//document.getElementById('programmoutput').value='';
	}
	isRun = 2;
	if (time >= 1) {
		
		startDate = new Date;
//myCodeMirror.markText({line:2, ch:0}, {line:2,  ch:100},{css:"background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAPCAYAAAAlH6X5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABASURBVBhXDcQxDQAgDEXBbxEFCKgCNhIUIIC5c2dmZmbUlJdcTinke115L51De1MEudNaNCeNQa2RGdVKpZCUHw/LJvqXJIu2AAAAAElFTkSuQmCC\")"})
		if (steps[AnimTime] == 'шагвниз')
			MyplayerY++;
		if (steps[AnimTime] == 'шагвверх')
			MyplayerY--;
		if (steps[AnimTime] == 'закрасить')
			map[MyplayerX][MyplayerY][1] = 1;

		if (steps[AnimTime] == 'шагвправо')
			MyplayerX++;
		if (steps[AnimTime] == 'шагвлево')
			MyplayerX--;
		if (steps[AnimTime].indexOf('вывод') ==0)
		{
			document.getElementById('programmoutput').value+=GetIn(steps[AnimTime],'вывод','');
		}
		if (steps[AnimTime].indexOf('str') ==0) {
			var strok=GetIn(steps[AnimTime],'str','');
			ExeString=~~strok;
			lastExeString=-2;
		}
		if (steps[AnimTime].indexOf('write_prog') ==0)
		{
			TextProgLine[~~GetIn(steps[AnimTime],'write_prog','_')]=GetIn(GetIn(steps[AnimTime],'write_prog',''),'_','');
			needUpdate=true;
		}
		if (steps[AnimTime].indexOf('Error') + 1) {
			if (steps[AnimTime].indexOf('шагвниз') + 1)
				playerS = 2;
			if (steps[AnimTime].indexOf('шагвверх') + 1)
				playerS = 0;
			if (steps[AnimTime].indexOf('шагвправо') + 1)
				playerS = 1;
			if (steps[AnimTime].indexOf('шагвлево') + 1)
				playerS = 3;
			AnimTime = 1000000000 + AnimTime;
		}
		playerX = MyplayerX;
		playerY = MyplayerY;

		if (AnimTime < steps.length)
			AnimTime++;

		time = 0;
	}

	if (AnimTime < steps.length)
		if (time <= 1)
			if (time >= 0) {
				if (steps[AnimTime] == 'шагвниз')
					playerY = MyplayerY + AnimF(time);
				if (steps[AnimTime] == 'шагвверх')
					playerY = MyplayerY - AnimF(time);

				if (steps[AnimTime] == 'закрасить')
					map[MyplayerX][MyplayerY][1] = Math.max(time, map[MyplayerX][MyplayerY][1]);

				if (steps[AnimTime] == 'шагвправо')
					playerX = MyplayerX + AnimF(time);
				if (steps[AnimTime] == 'шагвлево')
					playerX = MyplayerX - AnimF(time);
				if (steps[AnimTime].indexOf('Error') + 1) {
					if (steps[AnimTime].indexOf('шагвниз') + 1)
						playerY = MyplayerY + AnimFError(time);
					if (steps[AnimTime].indexOf('шагвверх') + 1)
						playerY = MyplayerY - AnimFError(time);
					if (steps[AnimTime].indexOf('шагвправо') + 1)
						playerX = MyplayerX + AnimFError(time);
					if (steps[AnimTime].indexOf('шагвлево') + 1)
						playerX = MyplayerX - AnimFError(time);
				}
			}
	window.requestAnimationFrame(fil_draw_anim);
}
var timeF = 0;
//setInterval(function (){console.log(timeF);timeF=0;}, 1000);
/*setInterval(function () {
	Init(false);
}, 10000);*/
window.requestAnimationFrame(Functions);
function Functions() {
	var AllMapDiv = document.getElementById('AllMap');
	if (AllMapDiv.style.height != '100%') {
		timeF++;
		if (timeF % 10 == 0)
			Sizeing();
		if (mouselastZ != MySlider.getValue()) {
			mouselastZ = MySlider.getValue();
			Sizeing();
		}
		if (document.getElementById('id_no_tab')!=undefined&&document.getElementById('id_no_tab').children[0]!=undefined&&document.getElementById('id_no_tab').children[0].id=='id_map')
		{
			Render();
			Interv();
			
			if (parseFloat(canvas.style.opacity)!=parseFloat(canvas.style.opacity))
				canvas.style.opacity='0';
			if (new Date()-last_time_opacity_canvas>1000)
				ast_time_opacity_canvas=new Date();
			if (canvas.style.opacity=='0')
				Sizeing();
			if (canvas.style.opacity!='1')
				canvas.style.opacity=''+Math.min((parseFloat(canvas.style.opacity)+(new Date()-last_time_opacity_canvas)/1000),1);
			last_time_opacity_canvas=new Date();
		}
		
	}
	window.requestAnimationFrame(Functions);
}
function AnimF(x) {
	return  - (Math.cos(x * 3.14159265) / 2) + 0.5; //((-((x-0.5)*2)^2)+1);
}
function AnimFError(x) {
	return  - (Math.cos(x * 3.14159265 * 2) / 14.288888) + 0.07;
}
//setInterval(Interv, 0);
function Interv() {
	ctx.drawImage(canvas2, 0, 0);
	var max = 200 / Math.max(mapsizeX + 2, mapsizeY + 2);
	DrawMyPlayer(playerX, playerY, max, playerS);
}
// setInterval(Sizeing, 0);
var last_time_opacity_canvas=new Date();
function Sizeing() {
	topmenuPane.style = 'height: ' + (topmenuPanemax.offsetTop + 32) + 'px;';
	myCodeMirror.setSize((leftPane.clientWidth), Math.floor((BodyPane.clientHeight - topmenuPane.clientHeight) * 0.7));
	document.getElementById("allprogrammdiv").style.height = (BodyPane.clientHeight - topmenuPane.clientHeight) + "px";

	var max = 200 / Math.max(mapsizeX + 2, mapsizeY + 2);
	//ctx.fillRect(0,0, max, max);
	if (mouselastZ <  - (canvas.clientWidth))
		mouselastZ =  - (canvas.clientWidth);

	if (mouselastZ > (canvas.clientWidth * 0.5)) {

		if (mapX - mapZ * (100) > 0)
			mapX = mapZ * (100);
		if (mapX - mapZ * (-100) < canvas.clientWidth)
			mapX = mapZ * (-100) + canvas.clientWidth;
	} else {
		var problemsX = 1000;
		while (problemsX > 0.1) {
			var TL = mapX + mapZ * (-max * ((mapsizeX + 2) / 2));
			var TR = mapX + mapZ * (max * ((mapsizeX + 2) / 2));
			var XAve = (TL + TR) / 2;
			problemsX = problemsX / 2;
			if (XAve > (canvas.width * 0.5))
				mapX = mapX - problemsX;
			else
				if (XAve < (canvas.width * 0.5))
					mapX = mapX + problemsX;
		}
		mapX = Math.floor(mapX * 5) / 5;
	}
	if (mouselastZ > (canvas.clientHeight * 0.5)) {
		if (mapY - mapZ * (100) > 0)
			mapY = mapZ * (100);
		if (mapY - mapZ * (-100) < canvas.clientHeight)
			mapY = mapZ * (-100) + canvas.clientHeight;
	} else {
		var problemsY = 1000;
		while (problemsY > 0.1) {
			var BL = mapY + mapZ * (-max * ((mapsizeY + 2) / 2));
			var BR = mapY + mapZ * (max * ((mapsizeY + 2) / 2));
			var YAve = (BL + BR) / 2;
			problemsY = problemsY / 2;
			if (YAve > (canvas.height * 0.5))
				mapY = mapY - problemsY;
			else
				if (YAve < (canvas.height * 0.5))
					mapY = mapY + problemsY;

		}
		mapY = Math.floor(mapY * 5) / 5;
	}
	var last_mapZ = mapZ;
	if (mouselastZ < -100)
		mapZ = 1 / ((-mouselastZ) / 100);
	else
		if (mouselastZ > 100)
			mapZ = (mouselastZ / 100);
		else
			mapZ = 1;
	if (last_mapZ != mapZ) {
		//console.log(mapZ/last_mapZ);
		mapX -= (canvas.clientWidth * 0.5);
		mapX = mapX * ((mapZ / last_mapZ));
		mapX += (canvas.clientWidth * 0.5);
		mapY -= (canvas.clientHeight * 0.5);
		mapY = mapY * ((mapZ / last_mapZ));
		mapY += (canvas.clientHeight * 0.5);
		Sizeing();
	}
	if (canvas.height != canvas2.height) {
		canvas.height = canvas2.height;
		canvas.width = canvas2.width;
	}
	if (canvas.width != canvas2.width) {
		canvas.height = canvas2.height;
		canvas.width = canvas2.width;
	}
	//Interv();
}
var FrameTime = 0;

//setInterval(Render, 0);
var before_fps_counder=0;
var sred_fps=60;
function Render() {
	for (FrameTime = 1; FrameTime <= 5; FrameTime++) {
		if (FrameTime == 1)
			//Init(false);
			FrameTime = 1;
		else
			if (FrameTime == 2) {
				if (canvas.clientHeight != canvas3.height) {
					canvas3.height = canvas.clientHeight;
					canvas3.width = canvas.clientWidth;
				}
				if (canvas.clientWidth != canvas3.width) {
					canvas3.height = canvas.clientHeight;
					canvas3.width = canvas.clientWidth;
				}
			} else
				if (FrameTime == 3) {
					if (Editor_dark_mode)
						ctx3.fillStyle = "#003300";
					else
						ctx3.fillStyle = "#008000";
					ctx3.fillRect(0, 0, canvas.width, canvas.height);
				} else
					if (FrameTime == 4) {
						var max = 200 / Math.max(mapsizeX + 2, mapsizeY + 2);
						//if (Editor_dark_mode)
						//	ctx3.fillStyle = "#003300";
						//else
						//	DrawMyRect(-max * ((mapsizeX + 2) / 2), -max * ((mapsizeY + 2) / 2), max * ((mapsizeX + 2) / 2), max * ((mapsizeY + 2) / 2), "green")
						var defcolor="#FFFF00";
						if (Editor_dark_mode)
							defcolor = "#A0A000";
						
						
						var mysize1 = 100;
						var mysize2 = 20;

						var i2 = -1,
						j2 = -1;
						var image = new Image();
						image.src = "data:image/png;base64,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";

						ctx3.fillStyle = defcolor;
						var maxDivmysize1=(max / mysize1);
						for (var iTs = 1; iTs < mapsizeX+2; iTs ++) 
						{
							var i = (max*(mapsizeX+2) / 2)-max*iTs;
							var mj= -max * ((mapsizeY + 2) / 2);
							var mxj= max * ((mapsizeY + 2) / 2-1);
							DrawMyRect(i- maxDivmysize1, mj, i + maxDivmysize1, mxj + (max));
						}
						for (var jTs = 1; jTs < mapsizeY+2; jTs ++)
						{
							var j = (max*(mapsizeY+2) / 2)-max*jTs;
							var mi= -max * ((mapsizeX + 2) / 2);
							var mxi= max * ((mapsizeX + 2) / 2-1);
							DrawMyRect(mi, j - maxDivmysize1, mxi + (max), j + maxDivmysize1);
						}
						for (var i2 = 0; i2 < mapsizeX; i2++) 
							for (var j2 = 0; j2 < mapsizeY;j2++) 
								if (map[i2][j2][1] > 0)
								{
									var i = -(max*(mapsizeX+2) / 2)+max*(i2+1);
									var j = -(max*(mapsizeY+2) / 2)+max*(j2+1);
									var color_back="rgba(150,150,150," + map[i2][j2][1] + ")";
									if (Editor_dark_mode)
										color_back="rgba(100,100,100," + map[i2][j2][1] + ")";
									if (ctx3.fillStyle != color_back)
										ctx3.fillStyle = color_back;
									DrawMyRect(i + maxDivmysize1, j + maxDivmysize1, i + (max) - maxDivmysize1, j + (max) - maxDivmysize1);
								}
						ctx3.fillStyle = defcolor;
						var maxDivmysize2=(max / mysize2);
						for (var i2 = 0; i2 < mapsizeX; i2++) 
							for (var j2 = 0; j2 < mapsizeY;j2++) 
								{
									var i = -(max*(mapsizeX+2) / 2)+max*(i2+1);
									var j = -(max*(mapsizeY+2) / 2)+max*(j2+1);
										if (((map[i2][j2][0] >> 0) & 1) == 1)
											DrawMyRect(i - maxDivmysize2, j - maxDivmysize2, i + maxDivmysize2, j + maxDivmysize2 + max);

										if (((map[i2][j2][0] >> 3) & 1) == 1)
											DrawMyRect(i - maxDivmysize2, j - maxDivmysize2, i + maxDivmysize2 + max, j + maxDivmysize2);

										if (((map[i2][j2][0] >> 1) & 1) == 1)
											DrawMyRect(i + max-maxDivmysize2, j - maxDivmysize2, i + max + maxDivmysize2, j + max + maxDivmysize2);

										if (((map[i2][j2][0] >> 2) & 1) == 1)
											DrawMyRect(i - maxDivmysize2, j + max-maxDivmysize2, i + max + maxDivmysize2, j + max + maxDivmysize2);
								}
						ctx3.fillStyle = '#FFFFFF';
						for (var i2 = 0; i2 < mapsizeX; i2++) 
							for (var j2 = 0; j2 < mapsizeY;j2++) 
							{
								var i = -(max*(mapsizeX+2) / 2)+max*(i2+1);
								var j = -(max*(mapsizeY+2) / 2)+max*(j2+1);
								if (map[i2][j2][2] > 1) {
									ctx3.globalAlpha = Math.min(map[i2][j2][2] / 100,1);
									ctx3.drawImage(image, mapX + mapZ * ((-max * ((mapsizeX + 2) / 2)) + (i2 + 1.05) * max), mapY + mapZ * ((-max * ((mapsizeY + 2) / 2)) + (j2 + 1.05) * max), (mapZ * (((-max * ((mapsizeX + 2) / 2)) + (i2 + 2) * max) - ((-max * ((mapsizeX + 2) / 2)) + (i2 + 1) * max))) / 2.2, (mapZ * ((-max * ((mapsizeY + 2) / 2)) + (j2 + 2) * max - ((-max * ((mapsizeY + 2) / 2)) + (j2 + 1) * max))) / 2.2);
									ctx3.globalAlpha = 1;
								}
								if (map[i2][j2][6] == "1") {
									ctx3.beginPath();
									ctx3.arc(mapX + mapZ * ((-max * ((mapsizeX + 2) / 2)) + (i2 + 1.8) * max), mapY + mapZ * ((-max * ((mapsizeY + 2) / 2)) + (j2 + 1.8) * max), 0.1*max*mapZ, 0, 2 * Math.PI);
									ctx3.fill();
								}
								if ((map[i2][j2][4] != "$") && (map[i2][j2][4] != "")) {
									if (Math.floor(mapZ * 5) > 2 && map[i2][j2][4].charCodeAt(0)>=32) {
										ctx3.font = Math.floor(0.4*max*mapZ) + 'px Arial';
										ctx3.fillText(map[i2][j2][4], mapX + mapZ * ((-max * ((mapsizeX + 2) / 2)) + (i2 + 1.08) * max), mapY + mapZ * ((-max * ((mapsizeY + 2) / 2)) + (j2 + 1.32) * max));
									}
								}
								if ((map[i2][j2][5] != "$") && (map[i2][j2][5] != "")) {
									if (Math.floor(mapZ * 5) > 2 && map[i2][j2][5].charCodeAt(0)>=32) {
										ctx3.font = Math.floor(0.4*max*mapZ) + 'px Arial';
										ctx3.fillText(map[i2][j2][5], mapX + mapZ * ((-max * ((mapsizeX + 2) / 2)) + (i2 + 1.08) * max), mapY + mapZ * ((-max * ((mapsizeY + 2) / 2)) + (j2 + 1.9) * max));
									}
								}
							}
						//ctx.rotate((Math.PI / 180) * 0);
						//ctx.translate(200, 80); // translate to rectangle center
						ctx3.fillStyle = defcolor;
						DrawMyRect((-max * ((mapsizeX + 2) / 2)) + max - (max / mysize2), (-max * ((mapsizeY + 2) / 2)) + max - (max / mysize2), (-max * ((mapsizeX + 2) / 2)) + max + (max / mysize2), (max * ((mapsizeY + 2) / 2)) - max + (max / mysize2));
						DrawMyRect((-max * ((mapsizeX + 2) / 2)) + max - (max / mysize2), (-max * ((mapsizeY + 2) / 2)) + max + (max / mysize2), (max * ((mapsizeX + 2) / 2)) - max + (max / mysize2), (-max * ((mapsizeY + 2) / 2)) + max - (max / mysize2));

						DrawMyRect((-max * ((mapsizeX + 2) / 2)) + max - (max / mysize2), (max * ((mapsizeY + 2) / 2)) - max + (max / mysize2), (max * ((mapsizeX + 2) / 2)) - max + (max / mysize2), (max * ((mapsizeY + 2) / 2)) - max - (max / mysize2));
						DrawMyRect((max * ((mapsizeX + 2) / 2)) - max - (max / mysize2), (-max * ((mapsizeY + 2) / 2)) + max - (max / mysize2), (max * ((mapsizeX + 2) / 2)) - max + (max / mysize2), (max * ((mapsizeY + 2) / 2)) - max + (max / mysize2));
						
					} else
						if (FrameTime == 5) {
							canvas2.height = canvas3.height;
							canvas2.width = canvas3.width;
							ctx2.drawImage(canvas3, 0, 0);
							var now=Date.now();
							sred_fps=sred_fps*0.995+(1000/(now-before_fps_counder))*0.005;
							before_fps_counder=now;
							ctx2.fillStyle = '#FFFFFF';
							ctx2.font ='20 px Arial';
							ctx2.fillText(Math.round(sred_fps/5)*5+' fps', 5,10);
							//FrameTime=0;
						}
	}
	//DrawMyRect((-max*((mapsizeX+2)/2))+(playerX+1)*max,(-max*((mapsizeY+2)/2))+(playerY+1)*max,(-max*((mapsizeX+2)/2))+(playerX+2)*max,(-max*((mapsizeY+2)/2))+(playerY+2)*max,"#F0F0F0");
	//ctx.fillRect(mapZ*mapX, mapZ*mapY, mapZ*100, mapZ*100);
	//topmenuPane.style.height=topmenuPanemax.getBoundingClientRect().top+'px';
}

canvas.addEventListener('mousemove', printPosition);
canvas.addEventListener("touchmove", printPosition);

canvas.addEventListener('mousedown', mousemapdown);
canvas.addEventListener("touchstart", mousemapdown);

canvas.addEventListener('mouseup', mousemapup);
canvas.addEventListener("touchend", mousemapup);

canvas.addEventListener('mouseout', mousemapup);
canvas.addEventListener("touchcancel", mousemapup);

var mouselastZ = 0;
if (canvas.addEventListener) {
	if ('onwheel' in document) {
		// IE9+, FF17+, Ch31+
		canvas.addEventListener("wheel", onWheel);
	} else if ('onmousewheel' in document) {
		// устаревший вариант события
		canvas.addEventListener("mousewheel", onWheel);
	} else {
		// Firefox < 17
		canvas.addEventListener("MozMousePixelScroll", onWheel);
	}
} else { // IE8-
	canvas.attachEvent("onmousewheel", onWheel);
}

function onWheel(e) {
	e = e || window.event;

	// wheelDelta не даёт возможность узнать количество пикселей
	var delta = e.deltaY || e.detail || e.wheelDelta;
	var ua = navigator.userAgent;
	if (ua.search(/Chrome/) > 0)
		MySlider.setValue(MySlider.getValue() - delta);
	else
		MySlider.setValue(MySlider.getValue() + delta);
	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
	//Sizeing()
}
function DrawMyRect(a, b, c, d, color) {
	//if (ctx3.fillStyle != color)
	//	ctx3.fillStyle = color;
	if (Math.round(mapZ * (c - a))>1 &&  Math.round(mapZ * (d - b))>1) 
		ctx3.fillRect(Math.round(mapX + mapZ * a), Math.round(mapY + mapZ * b), Math.round(mapZ * (c - a)), Math.round(mapZ * (d - b)));
	else
		ctx3.fillRect(mapX + mapZ * a, mapY + mapZ * b, mapZ * (c - a), mapZ * (d - b));
}
function DrawMyPlayer(a, b, max, s) {
	var image = new Image();
	//Down
	if (s == 2)
		image.src = "data:image/png;base64,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";
	else
		//Right
		if (s == 1)
			image.src = "data:image/png;base64,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";
		else
			//Left
			if (s == 3)
				image.src = "data:image/png;base64,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";
			else
				//Up
				if (s == 0)
					image.src = "data:image/png;base64,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";
				else
					//normal
					if (s == 4)
						image.src = "data:image/png;base64,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";
					else
						image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAAD6CAYAAACbOxrJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQISURBVHhe7dPBDQJBEAPBDZ3QyAxO4usA8Lp6VAH4MUeSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEnSH/Q6H+C56vIoWOOR4QIeGS7gkeEC78fvKsujYFdlaQgsqywNgWWVpSGwrLI0BJZVlobAssrSEFhWWRoCyypLQ2BZZWkILKssDYFllaUhsKyyNASWVZaGwLLK0hBYVlkaAssqS0NgWWVpCCyrLA2BZZWlIbCssjQEllWWhsCyytIQWFZZGgLLKktDYFllaQgsqywNgWWVpSGwrLI0BJZVlobAssrSEFhWWRoCyypLQ2BZZWkILKssDYFllaUhsKyyNASWVZaGwLLK0hBYVlkaAssqS0NgWWVpCCyrLA2BZZWlIbCssjQEllWWhsCyytIQWFZZGgLLKktDYFllaQgsqywNgWWVpSGwrLI0BJZVlobAssrSEFhWWRoCyypLQ2BZZWkILKssDYFllaUhsKyyNASWVZaGwLLK0hBYVlkaAssqS0NgWWVpCCyrLA2BZZWlIbCssjQEllWWhsCyytIQWFZZGgLLKktDYFllaQgsqywNgWWVpSGwrLI0BJZVlobAssrSEFhWWRoCyypLQ2BZZWkILKssDYFllaUhsKyyNASWVZaGwLLK0hBYVlkaAssqS0NgWWVpCCyrLA2BZZWlIbCssjQEllWWhsCyytIQWFZZGgLLKktDYFllaQgsqywNgWWVpSGwrLI0BJZVlobAssrSEFhWWRoCyypLQ2BZZWkILKssDYFllaUhsKyyNASWVZaGwLLK0hBYVlkaAssqS0NgWWVpCCyrLA2BZZWlIbCssjQEllWWhsCyytIQWFZZGgLLKktDYFllaQgsqywNgWWVpSGwrLI0BJZVlobAssrSEFhWWRoCyypLQ2BZZWkILKssDYFllaUhsKyyNASWVZaGwLLK0hBYVlkaAssqS0NgWWVpCCyrLA2BZZWlIbCssjQEllWWhsCyytIQWFZZGgLLKktDYFllaQgsqywNgWWVpSGwrLI0BJZVlobAssrSEFhWWRoCyypLQ2BZZWkILKssDYFllaUhsKyyNASWVZaGwLLK0hBYVlkaAssqS0NgWWVpCCyrLA2BZZWlIbCssjQEllWWhsCyytIQWFZZGgLLKktDYFllaQgsqywNgWWVpSGwrLI0BJZVlobAssrSEFhWWRoCyypLQ2BZZWkILKssDYFllaUhsKyyNASWVZaGwLLK0hBYVlkaAssqS0NgWWVpCCyrLA2BZZWlIbCssjQEllWWhsCyytIQWFZZGgLLKktDYFllaQgsqywNgWWSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEnDnfMFQuBAYifhQ4YAAAAASUVORK5CYII=";
	ctx.drawImage(image, mapX + mapZ * ((-max * ((mapsizeX + 2) / 2)) + (a + 1) * max), mapY + mapZ * ((-max * ((mapsizeY + 2) / 2)) + (b + 1) * max), mapZ * (((-max * ((mapsizeX + 2) / 2)) + (a + 2) * max) - ((-max * ((mapsizeX + 2) / 2)) + (a + 1) * max)), mapZ * ((-max * ((mapsizeY + 2) / 2)) + (b + 2) * max - ((-max * ((mapsizeY + 2) / 2)) + (b + 1) * max)));

}

var mousestatus = false;
var mouselastX = 0;
var mouselastY = 0;

function printPosition(e) {
	var positionx = parseFloat(getPosition(e).split(':')[0]);
	var positiony = parseFloat(getPosition(e).split(':')[1]);
	if (mousestatus) {
		mapX += (positionx - mouselastX);
		mapY += (positiony - mouselastY);
		Sizeing();
	}
	mouselastX = positionx;
	mouselastY = positiony;
}

function mousemapdown(e) {
	mousestatus = true;
	var positionx = parseFloat(getPosition(e).split(':')[0]);
	var positiony = parseFloat(getPosition(e).split(':')[1]);
	mouselastX = positionx;
	mouselastY = positiony;
	printPosition(e);
}
function mousemapup(e) {
	if (mousestatus == true) {
		mousestatus = false;
	}
} //++330055--
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
//CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor---CharacterEditor
var stopline = [[0, 100], [1, 6], [1, 9], [1, 16], [1, 16], [1, 16]];

var CharacterEditor_visible = 0;
var CharacterEditor_up = 0;

var CharacterEditor_end, CharacterEditor_start;

var CharacterEditor_img_number1 = new Image();
CharacterEditor_img_number1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFJSURBVGhD7dTBbcMwDIVhnwN0m27UTbpdl+kK7nsN5dAWJYvJydE7fIAPNA3+CLKsv7dVnqeAL3oE/PkYk5m9mmwHUEAv2wEU0Mt2AAX0sh1AAb1sB1BAL9sBFNDLdgAF9LIdYDjgsiz358xHrsZu227tsW5DAbmQvr8+pwl4GtG6nQYsy2YMSNVMYd26Af0imjEgVXNk3ZoBj0to1oAUzkIYMFpAMwekahaqgNGLxewBaTcLu4DRC54C3m2zoF+gZ7dFtxdssHUA/Qd6dlt0O23xyiyEAVtLZg64i1dmoRmQoiWt2bdgt0V37+KVWegGpOOi3uzl2W3Hm6t4ZRZOA9KsAZvxyLoNBaTZAnbjkXUbDkizBKRuPLJuqYD/MrNXk+0ACuhlO4ACetkOoIBetgMooJftAAroZTuAAnrZDvAIKE9RwJfc1j9GWDMvHzzFUAAAAABJRU5ErkJggg==";
var CharacterEditor_img_number1_stop1 = new Image();
CharacterEditor_img_number1_stop1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE1SURBVGhD7dTBrcIwEIThnJHohjLSBZ3Q3WvmtRBmYR0WYjseOEU7h1+KlJEif7IyLf+nRX2fAH/sBfh3HovZHi3WAQkwxjogAcZYByTAGOuABBhjHZAAY6wDEmCMdUACjLEOaBhwnufnM/ORo+Vnm6Zp++4zdxsCNDzrdr2kAdxFdLddwIKXEbCL6G5dwIiXFbCJ6G5NwE+8zIBVRHerAtbwrMyA1maLNoA1uFJ2QOtti94Aa2gxAT5bt0g3MOZnq6GVzGB1QPoHxvxsNThrxStbVAW0BNjBK1vUBLQE2MArW9QFtLIDVvHKFu0CWlkBm3iWuw0BWtkAu3iWuw0DWlkArS6e5W4U4CNme7RYByTAGOuABBhjHZAAY6wDEmCMdUACjLEOSIAx1gG9ANVXCfCnTssdrAlsL+WM1jgAAAAASUVORK5CYII=";
var CharacterEditor_img_number1_stop2 = new Image();
CharacterEditor_img_number1_stop2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE1SURBVGhD7dTBrcIwEIThnJHohjLSBZ3Q3WvmtRBmYR0WYjseOEU7h1+KlJEif7IyLf+nRX2fAH/sBfh3HovZHi3WAQkwxjogAcZYByTAGOuABBhjHZAAY6wDEmCMdUACjLEOaBhwmqbnM/ORo+Vnm+d5++4zdxsCNDzrdr2kAdxFdLddwIKXEbCL6G5dwIiXFbCJ6G5NwE+8zIBVRHerAtbwrMyA1maLNoA1uFJ2QOtti94Aa2gxAT5bt0g3MOZnq6GVzGB1QPoHxvxsNThrxStbVAW0BNjBK1vUBLQE2MArW9QFtLIDVvHKFu0CWlkBm3iWuw0BWtkAu3iWuw0DWlkArS6e5W4U4CNme7RYByTAGOuABBhjHZAAY6wDEmCMdUACjLEOSIAx1gG9ANVXCfCnTssdN0FsL6njKVQAAAAASUVORK5CYII=";

var CharacterEditor_img_number2 = new Image();
CharacterEditor_img_number2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFZSURBVGhD7dTBbcMwEERRAbkZSDfpyJ34kG5SSJpJCwrHniVWIiVx7ZO1c/jIIWsa8xBkmv8us3o+Ab5YBfz5/hjqfv/7ec4i2+gmQF9kG90E6Itso5sAfZFtdBOgL7KNbgL0RbbRTYC+yDa6CdAX2Ua3YcBpmu4/Q1/ybnEbtja/W0e3IUA8iG7XrzSAh4h0OwS0xzICoubGotsuoH8IZQREzR2i2ybg+hGUFRB1b0tdwN4DKDMgam5LDWDvg1Z2QLS4LS0Aex/wCfBRvS3pL9DHbb3tFgyqQ0n/A33c1tuOKp7dlrqAW4iZARd4dlvaBOwhZgVs8Oy2tAuI1g/Zl5wybltvbvDstnQIiLICbuIhug0BomyAu3iIbsOAKAsg2sVDdAsBIv8lpyuyjW4C9EW20U2Avsg2ugnQF9lGNwH6ItvoJkBfZBvdBOiLbKNbBVTPJcCXusz/mPyjpy22syIAAAAASUVORK5CYII=";
var CharacterEditor_img_number2_stop1 = new Image();
CharacterEditor_img_number2_stop1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFOSURBVGhD7dTBbcMwEERRAbkZSDcpQ12kkxzSTQpJM2lB4TpDYmQtKa59incOHzpoAWEeDC/bz2VT9yfAB2uAX58vU13vv1+fs8g2uAmQi2yDmwC5yDa4CZCLbIObALnINrgJkItsg5sAucg2uAmQi2yD2zTguq7XZ+gj/y1sW5bl+O42uE0BGp718f6WBvAUEW6ngBUvI+AQEW5DQMbLCthFhFsX8BYvM6CLCDcX0MOzMgNah9vSAdCDq2UHtHa3pR2gh8YJ8K92W9IvkMM2D61mBs2hpP9ADts8OKvh1duSC9hDzAy4w6u3pS6gh5gV8IBXb0tDQCs7oItXb0ungFZWwC6eBbcpQCsb4BDPgts0oJUF0BriWXALAVr8kacrsg1uAuQi2+AmQC6yDW4C5CLb4CZALrINbgLkItvgJkAusg1uDVDdlwAf6rL9Av6t3KezzOIuAAAAAElFTkSuQmCC";
var CharacterEditor_img_number2_stop2 = new Image();
CharacterEditor_img_number2_stop2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFOSURBVGhD7dTBbcMwEERRAbkZSDcpQ12kkxzSTQpJM2lB4TpDYmQtKa59incOHzpoAWEeDC/bz2VT9yfAB2uAX58vU13vv1+fs8g2uAmQi2yDmwC5yDa4CZCLbIObALnINrgJkItsg5sAucg2uAmQi2yD2zTgsizXZ+gj/y1sW9f1+O42uE0BGp718f6WBvAUEW6ngBUvI+AQEW5DQMbLCthFhFsX8BYvM6CLCDcX0MOzMgNah9vSAdCDq2UHtHa3pR2gh8YJ8K92W9IvkMM2D61mBs2hpP9ADts8OKvh1duSC9hDzAy4w6u3pS6gh5gV8IBXb0tDQCs7oItXb0ungFZWwC6eBbcpQCsb4BDPgts0oJUF0BriWXALAVr8kacrsg1uAuQi2+AmQC6yDW4C5CLb4CZALrINbgLkItvgJkAusg1uDVDdlwAf6rL9Aonl3KdPslAfAAAAAElFTkSuQmCC";

var CharacterEditor_img_number3 = new Image();
CharacterEditor_img_number3.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFtSURBVGhD7dTBaQNBEETRBd8EzsYZORMfnI0DcTJOYV1lUVYz1Mz2SKfV9OGDDqOGeght+89lr+6vAB/sBvj9mmvm7dnCtq/Pl1RyK8AYtjksl9wKMIZtDssltwKMYZvDcsmtAGPY5rBccivAGLY5LJfcCjCGbQ7LJbcCjGGbw3LJLQ24bdv1c+LtacM24nBrC9YmtxQgD7KP97dlAI8Q5XYIqGMrArIWTsltCBgPsRUBWYvH5NYFbI+wVQHZFKA7wFYGZClA90W1OiAbArovxArwWv0Ce2HbESAN/h1Q/QfGsG0EKLzhL1D1Dri3TxO29QAjXgqQuSO9t08RtjnAFi8NyNpDo7enD9taQIc3BchWBezhMbmlANlqgCM8Jrc0IFsFkI3wmNymAP+aeXu2sM1hueRWgDFsc1guuRVgDNsclktuBRjDNoflklsBxrDNYbnkVoAxbHNYLrkVYAzbHJZLbjfA6q4K8KEu+y+XpaOnIOieJQAAAABJRU5ErkJggg==";
var CharacterEditor_img_number3_stop1 = new Image();
CharacterEditor_img_number3_stop1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFWSURBVGhD7dSxbcNQEINhAekMeJuMoS2ySYpsk0GyTFZQeDZoHxzq6WRXwrH4ARXX8MODpuX3tLjnM+CL3QF/zrX23B4tbPv+eitFNwPmsE1hqehmwBy2KSwV3QyYwzaFpaKbAXPYprBUdDNgDtsUlopuBsxhm8JS0c2AOWxTWCq6lQHneb5+F24PG7YFzjRN/8Aeo1sJMPCiz4/3NoBbiHTbBCReR8ARIt2GgBmvK+AaIt1WAR/xOgMqRLpJQIUXdQaMSoAKjnUHjIaACi1nwGt+gWth2xZgGNwckP+BOWwbARJv+AKZAdfxSoCRATVeGTDqDqjwdgFGXQHX8CK6lQCjboAjvIhuZcCoC2A0wovotgvw0p7bo4VtCktFNwPmsE1hqehmwBy2KSwV3QyYwzaFpaKbAXPYprBUdDNgDtsUlopuBsxhm8JS0e0O6J7KgC91Wv4A/VbcpzAbOkUAAAAASUVORK5CYII=";
var CharacterEditor_img_number3_stop2 = new Image();
CharacterEditor_img_number3_stop2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFWSURBVGhD7dSxbcNQEINhAekMeJuMoS2ySYpsk0GyTFZQeDZoHxzq6WRXwrH4ARXX8MODpuX3tLjnM+CL3QF/zrX23B4tbPv+eitFNwPmsE1hqehmwBy2KSwV3QyYwzaFpaKbAXPYprBUdDNgDtsUlopuBsxhm8JS0c2AOWxTWCq6lQGnabp+F24PG7YFzjzP/8Aeo1sJMPCiz4/3NoBbiHTbBCReR8ARIt2GgBmvK+AaIt1WAR/xOgMqRLpJQIUXdQaMSoAKjnUHjIaACi1nwGt+gWth2xZgGNwckP+BOWwbARJv+AKZAdfxSoCRATVeGTDqDqjwdgFGXQHX8CK6lQCjboAjvIhuZcCoC2A0wovotgvw0p7bo4VtCktFNwPmsE1hqehmwBy2KSwV3QyYwzaFpaKbAXPYprBUdDNgDtsUlopuBsxhm8JS0e0O6J7KgC91Wv4AiI7cp8EBaGQAAAAASUVORK5CYII=";

function CharacterEditor_DrawNumber(x, y, sel, n, min, max, num, color1, color2, color3) {
	if (n <= min) {
		if (sel == num)
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number3_stop1, x, y);
		else if (sel == num + 1)
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number2_stop1, x, y);
		else
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number1_stop1, x, y);
	} else if (n >= max) {
		if (sel == num)
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number3_stop2, x, y);
		else if (sel == num + 1)
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number2_stop2, x, y);
		else
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number1_stop2, x, y);
	} else {
		if (sel == num)
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number3, x, y);
		else if (sel == num + 1)
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number2, x, y);
		else
			CharacterEditor_ctx.drawImage(CharacterEditor_img_number1, x, y);
	}
	CharacterEditor_ctx.fillStyle = color1;
	CharacterEditor_ctx.fillRect(x + 20, y + 5, 14, 25);
	CharacterEditor_ctx.fillStyle = color2;
	CharacterEditor_ctx.fillRect(x + 20 + 14, y + 5, 14, 25);
	CharacterEditor_ctx.fillStyle = color3;
	CharacterEditor_ctx.fillRect(x + 20 + 14 + 14, y + 5, 14, 25);
}

var CharacterEditor_div = document.getElementById("CharacterEditor");
var CharacterEditor_canvas = document.getElementById("CharacterEditorCanvas");
var CharacterEditor_ctx = CharacterEditor_canvas.getContext("2d");
var AnimNum = 1;


setInterval(function f18491283() {
	AnimNum++;
	if (AnimNum > 16) {
		AnimNum = 1
	}
}, 200);
//setInterval(function (){}, 10);

var CharacterEditor_Skin = 0, CharacterEditor_HairstyleNum = 6, CharacterEditor_EyeNum = 4, CharacterEditor_ShirtNum = 1, CharacterEditor_PantsNum = 2, CharacterEditor_FootwearNum = 4;
var CharacterEditor_Select = -1;
function onloadone() {
	//CharacterEditor_open();
	window.requestAnimationFrame(CharacterEditor_Anim);
	//var MyInterval=setInterval(function (){CharacterEditor_visible=CharacterEditor_visible+0.01;}, 10);
	//setTimeout(function (){clearInterval(MyInterval);CharacterEditor_visible=1}, 1000);
}
function CharacterEditor_open() {
	if (CharacterEditor_up == 0) {
		CharacterEditor_up = 1;
		CharacterEditor_visible = 0.001;
		CharacterEditor_start = new Date();
		CharacterEditor_Skin = game_pers_edit[0];
		CharacterEditor_HairstyleNum = game_pers_edit[1];
		CharacterEditor_EyeNum = game_pers_edit[2];
		CharacterEditor_ShirtNum = game_pers_edit[3];
		CharacterEditor_PantsNum = game_pers_edit[4];
		CharacterEditor_FootwearNum = game_pers_edit[5];
		
		if (CharacterEditor_Skin > stopline[0][1])
			CharacterEditor_Skin = stopline[0][1];
		if (CharacterEditor_Skin < stopline[0][0])
			CharacterEditor_Skin = stopline[0][0];

		if (CharacterEditor_HairstyleNum > stopline[1][1])
			CharacterEditor_HairstyleNum = stopline[1][1];
		if (CharacterEditor_HairstyleNum < stopline[1][0])
			CharacterEditor_HairstyleNum = stopline[1][0];

		if (CharacterEditor_EyeNum > stopline[2][1])
			CharacterEditor_EyeNum = stopline[2][1];
		if (CharacterEditor_EyeNum < stopline[2][0])
			CharacterEditor_EyeNum = stopline[2][0];

		if (CharacterEditor_ShirtNum > stopline[3][1])
			CharacterEditor_ShirtNum = stopline[3][1];
		if (CharacterEditor_ShirtNum < stopline[3][0])
			CharacterEditor_ShirtNum = stopline[3][0];

		if (CharacterEditor_PantsNum > stopline[4][1])
			CharacterEditor_PantsNum = stopline[4][1];
		if (CharacterEditor_PantsNum < stopline[4][0])
			CharacterEditor_PantsNum = stopline[4][0];

		if (CharacterEditor_FootwearNum > stopline[5][1])
			CharacterEditor_FootwearNum = stopline[5][1];
		if (CharacterEditor_FootwearNum < stopline[5][0])
			CharacterEditor_FootwearNum = stopline[5][0];
	}
}
function CharacterEditor_close() {
	CharacterEditor_up = 0;
	CharacterEditor_visible = 0.999;
	CharacterEditor_start = new Date();
	var outline = [0, 0, 0, 0, 0, 0];
	outline[0] = CharacterEditor_Skin;
	outline[1] = CharacterEditor_HairstyleNum;
	outline[2] = CharacterEditor_EyeNum;
	outline[3] = CharacterEditor_ShirtNum;
	outline[4] = CharacterEditor_PantsNum;
	outline[5] = CharacterEditor_FootwearNum;
	server_request('edit_personage',  outline, ()=>{});
	return outline;
}
function CharacterEditor_f(e) {
	return (Math.sqrt(e) * (((BodyPane.clientHeight / 2) - (512 / 2)) + 512)) - 512;
}
function CharacterEditor_Anim() {
	if (CharacterEditor_visible > 0) {
		if (CharacterEditor_up == 1) {
			CharacterEditor_end = new Date();
			if ((CharacterEditor_end.getTime() - CharacterEditor_start.getTime()) < 1000)
				CharacterEditor_visible = (CharacterEditor_end.getTime() - CharacterEditor_start.getTime()) / 1000;
			if ((CharacterEditor_end.getTime() - CharacterEditor_start.getTime()) >= 1000)
				CharacterEditor_visible = 1;
		} else {
			CharacterEditor_end = new Date();
			if ((CharacterEditor_end.getTime() - CharacterEditor_start.getTime()) < 1000)
				CharacterEditor_visible = 1 - ((CharacterEditor_end.getTime() - CharacterEditor_start.getTime()) / 1000);
			if ((CharacterEditor_end.getTime() - CharacterEditor_start.getTime()) >= 1000)
				CharacterEditor_visible = 0;
		}
		CharacterEditor_div.style.top = CharacterEditor_f(CharacterEditor_visible) + "px";

		var Skin = CharacterEditor_Skin,
		HairstyleNum = CharacterEditor_HairstyleNum,
		EyeNum = CharacterEditor_EyeNum,
		ShirtNum = CharacterEditor_ShirtNum,
		PantsNum = CharacterEditor_PantsNum,
		FootwearNum = CharacterEditor_FootwearNum;
		CharacterEditor_canvas.height = 512;
		CharacterEditor_canvas.width = 320;
		CharacterEditor_ctx.mozImageSmoothingEnabled = false;
		CharacterEditor_ctx.oImageSmoothingEnabled = false;
		CharacterEditor_ctx.webkitImageSmoothingEnabled = false;
		CharacterEditor_ctx.msImageSmoothingEnabled = false;
		CharacterEditor_ctx.imageSmoothingEnabled = false;

		game_draw_personage(80, 40, AnimNum, Skin, HairstyleNum, EyeNum, ShirtNum, PantsNum, FootwearNum, CharacterEditor_ctx, 80 * 2, 80 * 2);
		var game_canvas_personagep = document.getElementById("gamecanvaspersonagep(" + Skin + "," + HairstyleNum + "," + EyeNum + "," + ShirtNum + "," + PantsNum + "," + FootwearNum + ")");
		var fillbackground = "rgba(0, 0, 0,1)";
		var fontbackground = "bold 25px Arial";
		CharacterEditor_ctx.fillStyle = fillbackground;
		CharacterEditor_ctx.font = fontbackground;
		var k = 40;
		//console.log(game_canvas_personagep.innerHTML);
		CharacterEditor_ctx.fillText("Цвет кожи:", 5, 285);
		CharacterEditor_ctx.fillText("Номер прически:", 5, 285 + 1 * k);
		CharacterEditor_ctx.fillText("Номер глаз:", 5, 285 + 2 * k);
		CharacterEditor_ctx.fillText("Номер рубашки:", 5, 285 + 3 * k);
		CharacterEditor_ctx.fillText("Номер штанов:", 5, 285 + 4 * k);
		CharacterEditor_ctx.fillText("Номер обуви:", 5, 285 + 5 * k);
		CharacterEditor_DrawNumber(320 - 90, 285 - 35 + 10, CharacterEditor_Select, CharacterEditor_Skin, stopline[0][0], stopline[0][1], 1, game_canvas_personagep.innerHTML.split(";")[0], game_canvas_personagep.innerHTML.split(";")[1], game_canvas_personagep.innerHTML.split(";")[2]);
		CharacterEditor_DrawNumber(320 - 90, 285 + 1 * k - 35 + 10, CharacterEditor_Select, CharacterEditor_HairstyleNum, stopline[1][0], stopline[1][1], 3, game_canvas_personagep.innerHTML.split(";")[3], game_canvas_personagep.innerHTML.split(";")[4], game_canvas_personagep.innerHTML.split(";")[5]);
		CharacterEditor_DrawNumber(320 - 90, 285 + 2 * k - 35 + 10, CharacterEditor_Select, CharacterEditor_EyeNum, stopline[2][0], stopline[2][1], 5, game_canvas_personagep.innerHTML.split(";")[6], game_canvas_personagep.innerHTML.split(";")[6], game_canvas_personagep.innerHTML.split(";")[6]);
		CharacterEditor_DrawNumber(320 - 90, 285 + 3 * k - 35 + 10, CharacterEditor_Select, CharacterEditor_ShirtNum, stopline[3][0], stopline[3][1], 7, game_canvas_personagep.innerHTML.split(";")[7], game_canvas_personagep.innerHTML.split(";")[7], game_canvas_personagep.innerHTML.split(";")[7]);
		CharacterEditor_DrawNumber(320 - 90, 285 + 4 * k - 35 + 10, CharacterEditor_Select, CharacterEditor_PantsNum, stopline[4][0], stopline[4][1], 9, game_canvas_personagep.innerHTML.split(";")[8], game_canvas_personagep.innerHTML.split(";")[8], game_canvas_personagep.innerHTML.split(";")[8]);
		CharacterEditor_DrawNumber(320 - 90, 285 + 5 * k - 35 + 10, CharacterEditor_Select, CharacterEditor_FootwearNum, stopline[5][0], stopline[5][1], 11, game_canvas_personagep.innerHTML.split(";")[9], game_canvas_personagep.innerHTML.split(";")[9], game_canvas_personagep.innerHTML.split(";")[9]);

	}

	CharacterEditor_div.style.left = (BodyPane.clientWidth / 2) - (320 / 2) + "px";
	window.requestAnimationFrame(CharacterEditor_Anim);
}

CharacterEditor_canvas.addEventListener('mousemove', CharacterEditor_printPosition);
CharacterEditor_canvas.addEventListener("touchmove", CharacterEditor_printPosition);
CharacterEditor_canvas.addEventListener('mousedown', CharacterEditor_mousemapdown);
CharacterEditor_canvas.addEventListener("touchstart", CharacterEditor_mousemapdown);
CharacterEditor_canvas.addEventListener('mouseup', CharacterEditor_mousemapup);
CharacterEditor_canvas.addEventListener("touchend", CharacterEditor_mousemapup);
CharacterEditor_canvas.addEventListener('mouseout', CharacterEditor_mousemapup);
CharacterEditor_canvas.addEventListener("touchcancel", CharacterEditor_mousemapup);
var CharacterEditor_points = [[1, 300, 275], [2, 235, 275],
	[3, 300, 315], [4, 235, 315],
	[5, 300, 355], [6, 235, 355],
	[7, 300, 395], [8, 235, 395],
	[9, 300, 435], [10, 235, 435],
	[11, 300, 475], [12, 235, 475]];
var CharacterEditor_Down = 0;
var CharacterEditor_time = 0;
setInterval(function f1839180() {
	if (CharacterEditor_Down == 1) {
		CharacterEditor_time++;
		if ((CharacterEditor_time == 1) || (CharacterEditor_time > 10)) {
			switch (CharacterEditor_Select) {
			case 1:
				CharacterEditor_Skin++;
				break;
			case 2:
				CharacterEditor_Skin--;
				break;
			case 3:
				CharacterEditor_HairstyleNum++;
				break;
			case 4:
				CharacterEditor_HairstyleNum--;
				break;
			case 5:
				CharacterEditor_EyeNum++;
				break;
			case 6:
				CharacterEditor_EyeNum--;
				break;
			case 7:
				CharacterEditor_ShirtNum++;
				break;
			case 8:
				CharacterEditor_ShirtNum--;
				break;
			case 9:
				CharacterEditor_PantsNum++;
				break;
			case 10:
				CharacterEditor_PantsNum--;
				break;
			case 11:
				CharacterEditor_FootwearNum++;
				break;
			case 12:
				CharacterEditor_FootwearNum--;
				break;
			}
			if (CharacterEditor_Skin > stopline[0][1])
				CharacterEditor_Skin = stopline[0][1];
			if (CharacterEditor_Skin < stopline[0][0])
				CharacterEditor_Skin = stopline[0][0];

			if (CharacterEditor_HairstyleNum > stopline[1][1])
				CharacterEditor_HairstyleNum = stopline[1][1];
			if (CharacterEditor_HairstyleNum < stopline[1][0])
				CharacterEditor_HairstyleNum = stopline[1][0];

			if (CharacterEditor_EyeNum > stopline[2][1])
				CharacterEditor_EyeNum = stopline[2][1];
			if (CharacterEditor_EyeNum < stopline[2][0])
				CharacterEditor_EyeNum = stopline[2][0];

			if (CharacterEditor_ShirtNum > stopline[3][1])
				CharacterEditor_ShirtNum = stopline[3][1];
			if (CharacterEditor_ShirtNum < stopline[3][0])
				CharacterEditor_ShirtNum = stopline[3][0];

			if (CharacterEditor_PantsNum > stopline[4][1])
				CharacterEditor_PantsNum = stopline[4][1];
			if (CharacterEditor_PantsNum < stopline[4][0])
				CharacterEditor_PantsNum = stopline[4][0];

			if (CharacterEditor_FootwearNum > stopline[5][1])
				CharacterEditor_FootwearNum = stopline[5][1];
			if (CharacterEditor_FootwearNum < stopline[5][0])
				CharacterEditor_FootwearNum = stopline[5][0];
		}
	}
}, 100);
function CharacterEditor_printPosition(e) {
	if (CharacterEditor_Down == 1) {
		var positionx = parseFloat(getPosition(e).split(':')[0]);
		var positiony = parseFloat(getPosition(e).split(':')[1]);
		var BestR = 1000000;
		var BestP = 1;
		var R = 0;
		for (var i = 0; i < CharacterEditor_points.length; i++) {
			R = Math.sqrt(((CharacterEditor_points[i][1] - positionx) * (CharacterEditor_points[i][1] - positionx)) + ((CharacterEditor_points[i][2] - positiony) * (CharacterEditor_points[i][2] - positiony)));
			if (R < BestR) {
				BestP = CharacterEditor_points[i][0];
				BestR = R;
			}
		}
		R = Math.sqrt((((320 - 30) - positionx) * ((320 - 30) - positionx)) + ((30 - positiony) * (30 - positiony)));
		if (R < 15) {
			BestR = 0;
			BestP = 1000;
		}
		if ((BestR > 10) || (CharacterEditor_Select != BestP)) {
			CharacterEditor_mousemapup(e);
			return;
		}
	}
}
function CharacterEditor_mousemapdown(e) {
	var positionx = parseFloat(getPosition(e).split(':')[0]);
	var positiony = parseFloat(getPosition(e).split(':')[1]);
	var BestR = 1000000;
	var BestP = 1;
	var R = 0;
	for (var i = 0; i < CharacterEditor_points.length; i++) {
		R = Math.sqrt(((CharacterEditor_points[i][1] - positionx) * (CharacterEditor_points[i][1] - positionx)) + ((CharacterEditor_points[i][2] - positiony) * (CharacterEditor_points[i][2] - positiony)));
		if (R < BestR) {
			BestP = CharacterEditor_points[i][0];
			BestR = R;
		}
	}
	R = Math.sqrt((((320 - 30) - positionx) * ((320 - 30) - positionx)) + ((30 - positiony) * (30 - positiony)));
	if (R < 15) {
		BestR = 0;
		BestP = 1000;
	}
	if (BestR < 10) {
		CharacterEditor_Down = 1;
		CharacterEditor_time = 0;
		CharacterEditor_Select = BestP;
		//console.log('CharacterEditor_mousemapdown ' + positionx + " " + positiony);
	}

}
function CharacterEditor_mousemapup(e) {
	var positionx = parseFloat(getPosition(e).split(':')[0]);
	var positiony = parseFloat(getPosition(e).split(':')[1]);
	if (CharacterEditor_Down == 1) {
		CharacterEditor_Down = 0;
		CharacterEditor_Select = 0;
		//console.log('CharacterEditor_mousemapup ' + positionx + " " + positiony);
		var R = Math.sqrt((((320 - 30) - positionx) * ((320 - 30) - positionx)) + ((30 - positiony) * (30 - positiony)));
		//console.log('CharacterEditor_mousemapup '+R);
		if (R < 15) {
			CharacterEditor_close();
		}
	}

}
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
//GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas---GameCanvas
var ping = 0;

var game_img_personage = new Image();
var game_img_personage_gerl = new Image();
var server='';
game_img_personage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAQCAYAAAD506FJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAU6SURBVHhe5ZQvj2VFFMTHrUaSsAIxODwOTQiKBIHjKyBZjSIIJBaJxaDXzbdAjkKSoB78Xk691Ot7+t99e7dnMpVUbt/uqlPnnn4zdxm+++yDU8Y4PhxZNozjw5Flwzg+HFk2jOPDkWXDOD4cWTaM48ORZcM4PhxZNozjY0HQD198eOaPX398Ie+jTXjTzjhuAt1TyPfsl5hf9vDS8j37xeQjIihrYLSJWo1bvO+ixoy39Dn31FCd55Lv/nI9U6Pkc8hXjqjs2Xz3zXilFffUKH2j3s3wygK9Iu53r9cY9Zc1tHdUvrzSOTlzhmUDr+GZZa2QX8G9mccZlg28xmw+kB96Deeov6yj96ee7/Q6UHVqNdj3LHm8h5oXKFf0OqrVqsH+LfmbBmoM+QactcJ7DcivnJKjfnEm372s9c7z7z+/v/Cv375t+j1LVD0xLFeQ3/Vav498UNbQ7LzmiF90n9ZPOZ/Z+qxVj6fW1KnVkM71zl4PI/ktv3SlXuzOgAY4PL19k5Kz2g8QKJRnxmb4/1iZ7+dkqBcuguz7L386P2v58nu+1n6pPT/PFfnAa/gfj7+jCfkGpd+pvRm/1v5+ZD6z8VkzL/R+H60e0PisXa91z78y/1LAmygbQhPyDdSkfCU56/lX5XOmc/XAe9lPy6/holEvM355V+QD1WgRTcg3kN//6ES9j/hbPDKf2fismB16rTXTWo2an315Wz2szj8DIUYVUUE1ELIU8noTvp6psSJfw0KnOiVrfrzuR8t72c9Tzgd49EdTkrOQpWh5xVtqHJ3PbDRnp+6D8xG//97Qay1/rcbq/LuHh4cTRKhQkT2dhzyFvGpCDalGyFKszgcMB12th5ClkFd65TtHa6zI13ypk3Fk/uiyPzzIWchSrM4HtbnDnh9NNnOvM1LDs+U7PJ/B/vPv6fT4+HgeskJF9jhDU7sE9uX1D1C4zkN+BfZX5ju8jjOOm2DA0mc9hKyJFfnkafY8M7ombFdgH9JDRp2H/Arse0ZG14TtCuzDLBvqPORVaH7iqA+gz+YO6SFkTUgvvpd8BPy3ICgbutZo0IbtAs5u+QNGszJfKHU8e54SaGHZQxw3sSqfc5+/ckXNtTV/aXhmdE3YLlid7+BcuVqP+AT6c+Ib9YIl+Qj5b4GQsFoD+o8StgvY8wsU/Z117QJX5wvqQzr3hqQJ5XnvWoekiSPzW9+uXPc71cPo/Gv+Wg+r8x2qAVW3lpsBv3K1Vn5ImtibL+3ufAp89Pmb0ydf/Xz69Jtfr8geZ1kTZZOE1RpofcjefMA+tcmo5UvT+hFIoz6VT3ZImvAM5ejbf3n1qlvjlvxatvJ5hyHfgLM982ePPPXs8xfVgzRhvcLefMA+tcv793xpNJuwbkCOcuVp9e3gjtUDet3FqB/szeccKn9XD7oADbx8D9kGCnc95CMYithrYG8+oLZnkS2v/OozLCmkKb1xXIV/o18afeD/4/7+fB7yKvbml7n49ENSbyGtghzPLN9DtoF6dj18jvfvmXDEA8jkjvGTjcfvQ32FvIq9+cC/Xd9f9hHSLTD+/vr1+SN4qli5F/Iq+ABxxp9pb/V7LyEbgmqpHhzNZq1L0yWqn5B3sTdfufpmsjnr+YFqoFW/2V7Iq/CZz/gz7a1+7yVkTeDBrxq9zBLqQfeu+1DdXr13kY+XJ/n6dvXRrcehGFvp3gxm/Jk226thRtuD1xqpl+lm/CXcO+LPdLzP/IhUw/XZ3gxm/Jk226thRluD19hTp+Ydref+EX0JPNmdb+vd3f0HOLXadoGm3twAAAAASUVORK5CYII=";
game_img_personage_gerl.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAQCAYAAAD506FJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVVSURBVHhe7ZSvjyxVEIXXPY0k4QnE4vA4NCEoEgSOfwHJ0yiCQGKRWAwat/8FchWSBDXkm9Q3qb5d9/aPoWke2ZOcTM+tc+pU153dhwpfffTOpWKUD0eVDaN8OKpsGOXDUWXDKB+OKhtG+XBU2TDKh6PKhlE+HFU2jPKxIOibT94tuXaIPHRmlIdAV2XDLT0qRnkIdFU23NKjYpSHQFdlwy09KkZ5CHRVNtzSo2KUh0BXZcMtPSpGeQh0VTbc0qNilIdAV2XDLT0qRrkPRFVw5lKjUY97vPIl/yU/5CVe8vfn3z3A2+wfeallhmWGUQ/Z84+85sqwzDDqIV/8Y39m5Ye9HiOP7HmBubLyw16PkUf2vBMzzxWXmmRNj2u8PFfc0qPHNV6e/c7nH79+fePvP325Odt+MiwTZL86n/+NfDDqIf/Pfnabd20/PnPvXg91rb5lz39a/refv389ZAA+L7+9KZk1eMJ+BWc5oGJvgLPzgXU+yTCHiyD78dPvrp+ch2WCtn/uly91yc/nGfnAe7BPS2rt3jNGXokm5DOcnc9u8q7ZF/p8H6MeaPKus97nJf8p+RywWBvkIdqB0HhRYb/7D9jvZ+WD3MMZ+N7OQz0sE6B1uWjMWes/Ox8tdA5/LDLXYNgm6HmlPUI+gX3PygfsJu+K3eHx2Z32evT8nOt1jrBMcFo+BxIhRpvYMA8gw371M5TePER+tocXFfb/RD6LyT3s05J62CawZ56B7+08lf/sfOAMflbMmrDdwBl0jsprDYbtBj2VV2ZN2G7gDO7NB+zGPWd6H9Tp0ZtBf/69ofOZunOEZYKz8x+enp4uEKGhkjPrIb+BplKvQziQPbI27Declc9z/qGg680Qlgn0s9jsMz+z6nF2vnC/9KvY2z+g7vy+S8usCdsEZ+eD3t5h7l31QFPtPPcZ/QGD0/JZ7J9/XS7Pz8/XJRsqOaOGpncJnOvNL2C49ZBPwPmZ+SwEgtwnM6QztBejvpohLDOcnU+eu+ezYtaEbQLOoe/S0nrIJ+A8Z1TMmrBNwDmssqH1kHfh/qQ+YK+QzoC+2jvEl+8pLDOol3nuw/IR8N+CoGrpPqNBG7YbqN3zB4zmzHzR6vhc8gAvBqCF7QwhHeLefJ735FPP+zdXutfR/tXwWTFrwnbD2fkZ1M31eY1PMF8mPr35nno4JR8h/y0QEtYbwP8oYbuBs3yBMn/nuXeBZ+cL51CXvSEZwrw8u88hGeLI/NG7m5v9mc6wdv89f2+Gs/Mz7AHt28utgN9cn80PyRB789XuzqfBex+/uXzw2feXD7/4cULOqFVDtEMS1htg9CJ78wHn9Cajl69m9CNQ45zmkx2SIXKGOb77D69eLfa4J7+XbT7fYchnoLZn/5yR58x5/9IZ1IR1gr35gHN6t/ef89W4m7DOQI65ekZzZ3DHzoDeu1jrB3vzqUPzd83gBbjw9nvIZjA86yEvwVLk0gB78wG9cxbZevU7Z1hKqGm9Ue4iv2O+NObA/8vj47Ue8i725re5+PwhOVtIuyAnZ7bfQzaDM2c9fBvvP2fCNR5AJneMn2w8+T6cK+Rd7M0H+d19/3aOkM6B8efXr68vwafN2rOQd8ELyC3+SnuvP88SslWwl/3g2myevTQv0XlCvoi9+eb6zmRTW/IDe6B13uos5F3knW/xV9p7/XmWkA2BB789ljJbOIP37n3Yd6nfP5GPl0/yfXfnWOxHUcZRebYFW/yVtjrrYYt2CbnXmn6Vbou/Rfau8Vc6vm/5Edkj66uzLdjir7TVWQ9btD3kHnv69Lxr+2X/Gn0LPNWdz/s9PPwNGSHYBsBP2mgAAAAASUVORK5CYII=";
var game_drawX = 0, game_drawY = 0;
var game_pers_edit = [70, 1, 1, 1, 1, 1];
var game_render_type = 0;

var game_old_players = {};
var game_players = {};
var game_draw_players = {};
var game_time = 0;

var game_map = {};
var game_dors = {};
var game_personage_AnimationNum = 1;

var game_canvas = document.getElementById("gamecanvas");
var game_ctx = game_canvas.getContext("2d");
var game_canvas_copy = document.getElementById("gamecanvascopy");
var game_canvas_copy_ctx = game_canvas_copy.getContext("2d");
var game_tileset = document.getElementById("gametileset");
var game_canvas_personages = document.getElementById("gamecanvaspersonages");
var game_Render_Img = document.getElementById("GameRenderImage");

var game_mouse_time = 0;
var game_mouse_X = 0;
var game_mouse_Y = 0;
var game_mouse_onclick = 0;
var speed_pers=700;

function game_mousemapdown(e) {
	game_mouse_onclick = true;
	//  console.log('game_mousemapdown');
	game_mouse_time = new Date();
	game_mouse_X = parseFloat(getPosition(e).split(':')[0]);
	game_mouse_Y = parseFloat(getPosition(e).split(':')[1]);
}
function game_mousemapup(e) {
	if (game_mouse_onclick == true) {
		//console.log('game_mousemapup');
		var end_X = game_mouse_X - parseFloat(getPosition(e).split(':')[0]);
		var end_Y = game_mouse_Y - parseFloat(getPosition(e).split(':')[1]);

		var end = (new Date().getTime()) - game_mouse_time;
		if (Math.sqrt(end_X * end_X + end_Y * end_Y) / end > 0.3) {
			//console.log('Yes');
			//console.log('X='+end_X+' Y='+end_Y);
			var v = 0;
			if (Math.abs(end_X) < Math.abs(end_Y)) {
				if (end_Y < 0)
					v = 40; //Keys[40] = true;
				else
					v = 38; //Keys[38] = true;
			} else {
				if (end_X < 0)
					v = 39; //Keys[39] = true;
				else
					v = 37; //Keys[37] = true;
			}
		}
		if (v > 1) {
			setTimeout(function f() {
				Keys[v] = false;
				Keys[v] = false;
				Keys[v] = false;
				Keys[v] = false;
			}, 300);
			Keys[v] = true;
		}

		// else
		//    console.log('No');

		game_mouse_onclick = false;
		//if ((end - start)>10)
		//console.log('SecondWay: '+(end - start)+'ms');
	}
}

game_canvas_copy.addEventListener('mousedown', game_mousemapdown);
game_canvas_copy.addEventListener("touchstart", game_mousemapdown);

game_canvas_copy.addEventListener('mouseup', game_mousemapup);
game_canvas_copy.addEventListener("touchend", game_mousemapup);

game_canvas_copy.addEventListener('mouseout', game_mousemapup);
game_canvas_copy.addEventListener("touchcancel", game_mousemapup);

function GetPos() {
	var AllMapDiv = document.getElementById('AllMap');
	if (AllMapDiv.style.height != '0%')
		server_request("get_positions", undefined, UpPos);

	var timerId4 = setTimeout(GetPos, Math.max(ping * 10, speed_pers));
}

function UpPos(s) {
	if (game_is_first==2)
	{
		if (GetVal('OpenEditor_task','')!='')
		{
			write_text_loader('Открываем редактор...');
			OpenEditor(GetVal('OpenEditor_task',''));
			setTimeout(function f(){write_text_loader('Готово');close_loader();},1000);
		}else
		{
			write_text_loader('Готово');
			close_loader();
		}
		game_is_first=0;
	}
	game_old_players = game_players;
	game_players = s;
	game_time = 0;
	if (game_drawX - Math.round(game_drawX) == 0)
		if (game_drawY - Math.round(game_drawY) == 0)
			for (var i = 0; i < game_players.length; i++)
				if (game_players[i].is_current_user) {
					game_drawX = game_players[i].pos_x;
					game_drawY = game_players[i].pos_y;
					game_pers_edit = game_players[i].personage;
				}
}

function GetPos2() {
	if(document.getElementById('AllMap').style.height == '0%')
		return;
	var ind = 0;
	game_draw_players = [];
	game_time++;
	var t = 1 - game_time / 16;
	if (t < 0)
		t = 0;
	for (var i = 0; i < game_players.length; i++)
		for (var j = 0; j < game_old_players.length; j++)
			if (game_old_players[j].name == game_players[i].name)
				if (!game_players[i].is_current_user) {
					game_draw_players.push([]);
					game_draw_players[ind][4] = 1;
					
					
					
					if (game_players[i].pos_x > game_old_players[j].pos_x)
						game_draw_players[ind][4] = 5 + Math.round(3 - t * 3);
					if (game_players[i].pos_x < game_old_players[j].pos_x)
						game_draw_players[ind][4] = 13 + Math.round(3 - t * 3);
					if (game_players[i].pos_y < game_old_players[j].pos_y)
						game_draw_players[ind][4] = 9 + Math.round(3 - t * 3);
					if (game_players[i].pos_y > game_old_players[j].pos_y)
						game_draw_players[ind][4] = 1 + Math.round(3 - t * 3);
					game_draw_players[ind][0] = game_players[i].name;
					game_draw_players[ind][1] = (1 - t) * game_players[i].pos_x + t * game_old_players[j].pos_x;
					game_draw_players[ind][2] = (1 - t) * game_players[i].pos_y + t * game_old_players[j].pos_y;
					game_draw_players[ind][3] = game_players[i].is_admin || false;

					game_draw_players[ind][5] = game_players[i].personage[0];
					game_draw_players[ind][6] = game_players[i].personage[1];
					game_draw_players[ind][7] = game_players[i].personage[2];
					game_draw_players[ind][8] = game_players[i].personage[3];
					game_draw_players[ind][9] = game_players[i].personage[4];
					game_draw_players[ind][10] = game_players[i].personage[5];
					ind++;
				}
	
	
	
}

function onloadtwo() {
	if (debug) console.log('ONLOAD');
	game_canvas = document.getElementById("gamecanvas");
	game_ctx = game_canvas.getContext("2d");
	game_canvas_copy = document.getElementById("gamecanvascopy");
	game_canvas_copy_ctx = game_canvas_copy.getContext("2d");
	game_tileset = document.getElementById("gametileset");
	game_canvas_personages = document.getElementById("gamecanvaspersonages");
	game_Render_Img = document.getElementById("GameRenderImage");
	window.requestAnimationFrame(game_function);
	if ((GetVal("name","")!="")&&(GetVal("token","")!="")&&(GetVal("server","")!=""))
	{
		server_set_default_varible('token',GetVal('token',''));
		server_set_default_varible('turnir',GetVal('server',''));
		server = GetVal("server","");
		game_is_first=1;
		document.getElementById('loading_text').innerHTML='Получение карты...';
		mapget(true);
		var timerId5 = setInterval(GetPos2, speed_pers / 16);
	}else
	{
		sessionStorage.clear();
		document.location.href="./login.html";
	}
	var a = parseInt(GetVal('game_render_type', '0'))
		game_render_type = 0;
	for (var i = 0; i < a; i++)
		Game_Render_Next();
	//render_personage(100,6,1,16,10,2);
	//const end = new Date().getTime();
	//console.log('SecondWay: '+(end - start)+'ms');
};
var game_is_first=1;
function mapget(need_repeat) {
	server_request("get_map", undefined, // if(document.getElementById('AllMap').style.height != '0%') 
		function f(s){game_mapgeting(s);if (need_repeat)setTimeout(function f(){mapget(need_repeat)}, Math.random() * 60000 + 60000);},
		function f(s){console.error(s);document.location.href="./select_server.html";}
	);
}

function Game_Render_Next() {
	var a = ["tileset/FlatDesign.png", "tileset/StenaDesign.png", "tileset/3DDesign.png"];
	game_render_type++;
	if (game_render_type > 2) {
		game_render_type = 0;
	}
	game_Render_Img.src = a[game_render_type];
	SaveVal('game_render_type', '' + game_render_type + '');
};
function roundRect(ctx,sx,sy,ex,ey,r) {
    var r2d = Math.PI/180;
    if( ( ex - sx ) - ( 2 * r ) < 0 ) { r = ( ( ex - sx ) / 2 ); } //ensure that the radius isn't too large for x
    if( ( ey - sy ) - ( 2 * r ) < 0 ) { r = ( ( ey - sy ) / 2 ); } //ensure that the radius isn't too large for y
    ctx.beginPath();
	ctx.fillStyle = '#32203c';
	ctx.strokeStyle = '#201426';
    ctx.moveTo(sx+r,sy);
    ctx.lineTo(ex-r,sy);
    ctx.arc(ex-r,sy+r,r,r2d*270,r2d*360,false);
    ctx.lineTo(ex,ey-r);
    ctx.arc(ex-r,ey-r,r,r2d*0,r2d*90,false);
    ctx.lineTo(sx+r,ey);
    ctx.arc(sx+r,ey-r,r,r2d*90,r2d*180,false);
    ctx.lineTo(sx,sy+r);
    ctx.arc(sx+r,sy+r,r,r2d*180,r2d*270,false);
    ctx.closePath();
	ctx.stroke();
	ctx.globalAlpha = 0.5;
	ctx.fill();
	ctx.globalAlpha = 1;
}
function rainbow_rgb_to_hex(red, green, blue)
{
  var h = ((red << 16) | (green << 8) | (blue)).toString(16);
  // add the beginning zeros
  while (h.length < 6) h = '0' + h;
  return '#' + h;
}
function rainbow_color_from_hue(hue)
{
  var h = (hue % 360)/60;
  var c = 255;
  var x = (1 - Math.abs(h%2 - 1))*255;
  var color;

  var i = Math.floor(h);
  if (i == 0) color = rainbow_rgb_to_hex(c, x, 0);
  else if (i == 1) color = rainbow_rgb_to_hex(x, c, 0);
  else if (i == 2) color = rainbow_rgb_to_hex(0, c, x);
  else if (i == 3) color = rainbow_rgb_to_hex(0, x, c);
  else if (i == 4) color = rainbow_rgb_to_hex(x, 0, c);
  else color = rainbow_rgb_to_hex(c, 0, x);

  return color;
}

function game_copy() {
	if (game_canvas_copy.height != game_canvas_copy.clientHeight)
		game_canvas_copy.height = game_canvas_copy.clientHeight;
	if (game_canvas_copy.width != game_canvas_copy.clientWidth)
		game_canvas_copy.width = game_canvas_copy.clientWidth;
	game_canvas_copy_ctx.mozImageSmoothingEnabled = false;
	game_canvas_copy_ctx.oImageSmoothingEnabled = false;
	game_canvas_copy_ctx.webkitImageSmoothingEnabled = false;
	game_canvas_copy_ctx.msImageSmoothingEnabled = false;
	game_canvas_copy_ctx.imageSmoothingEnabled = false;
	var pixel_size;
	
	if (game_canvas_copy.clientHeight < game_canvas_copy.clientWidth) {
		var k = game_canvas_copy.clientHeight / game_canvas_copy.clientWidth;
		var h = game_canvas.width * k;
		game_canvas_copy_ctx.drawImage(game_canvas, 0, Math.floor((game_canvas.height - h) / 2), game_canvas.width, h, 0, 0, game_canvas_copy.width, game_canvas_copy.height);
		pixel_size=game_canvas_copy.width/game_canvas.width;
	} else {
		var k = game_canvas_copy.clientWidth / game_canvas_copy.clientHeight;
		var h = game_canvas.height * k;
		game_canvas_copy_ctx.drawImage(game_canvas, Math.floor((game_canvas.width - h) / 2), 0, h, game_canvas.height, 0, 0, game_canvas_copy.width, game_canvas_copy.height);
		pixel_size=game_canvas_copy.height/game_canvas.height;
	}
	//  let text = ctx.measureText('Hello world');
    // console.log(text.width);  // 56;
	//var s='';
	var h=game_canvas_copy.height;
	var w=game_canvas_copy.width;
	game_canvas_copy_ctx.textBaseline="middle";
	game_canvas_copy_ctx.fillStyle = "#FFF";
	game_canvas_copy_ctx.textAlign = 'center';
	var font_size=Math.floor(pixel_size*1.7);
    game_canvas_copy_ctx.font = font_size+"pt Arial";
	game_canvas_copy_ctx.lineWidth = Math.floor(pixel_size/2);
	var isdraw={};
	for (var i=game_draw_players.length-1;i>=0;i--)
	  if (game_draw_players[i][1]==game_draw_players[i][1])
	  {
		var p_name=game_draw_players[i][0];
		var p_x=game_draw_players[i][1]-Math.round(16 *game_drawX)/16;
		var p_y=game_draw_players[i][2]-Math.round(16 *game_drawY)/16;
		var c_x=Math.floor(p_x*pixel_size*16+w/2);
		var c_y=Math.floor(p_y*pixel_size*16+h/2-pixel_size*18);
		//var text_h=game_canvas_copy_ctx.measureText(p_name);
		//console.log(p_name,p_x,p_y);
		if (c_x<0)
			continue;
		if (c_x>w)
			continue;
		if (c_y<0)
			continue;
		if (c_y>h)
			continue;
		if (isdraw[p_x+';'+p_y]>0)
		{
			isdraw[p_x+';'+p_y]++;
			continue;
		}
		var r=pixel_size;
		if (game_canvas_copy_ctx.measureText(p_name).width>pixel_size*16-r*2)
		{
			while (game_canvas_copy_ctx.measureText(p_name+'...').width>pixel_size*16-r*2 && p_name!='')
				p_name=p_name.slice(0,-1);
			p_name=p_name+'...';
		}
		var text_w=game_canvas_copy_ctx.measureText(p_name).width;
		roundRect(game_canvas_copy_ctx,c_x-text_w/2-r,c_y-Math.floor(font_size*0.9),c_x+text_w/2+r,c_y+Math.floor(font_size*0.7),r);
		if (game_draw_players[i][3])
			game_canvas_copy_ctx.fillStyle = rainbow_color_from_hue((new Date()-1)/5);
		else
			game_canvas_copy_ctx.fillStyle = "#FFF";
		isdraw[p_x+';'+p_y]=1;
        game_canvas_copy_ctx.fillText(p_name, c_x, c_y);
		//s+='<div style="position:absolute;background:#32203c78;border: 2px solid #201426;border-radius: 8px;text-align: center;left: '+Math.floor(p_x*pixel_size*16+w/2-pixel_size*8)+'px;top: '+Math.floor(p_y*pixel_size*16+h/2-pixel_size*22)+'px;width: '+Math.floor(pixel_size*16)+'px;">'+p_name+'</div>';
	  }
	game_canvas_copy_ctx.fillStyle = "#FFF";
	font_size=Math.floor(pixel_size*1);
    game_canvas_copy_ctx.font = font_size+"pt Arial";
	var keys=Object.keys(isdraw);
	for (var i=0;i<keys.length;i++)
		if (isdraw[keys[i]]>1)
		{
			var p_x=parseFloat(keys[i].split(';')[0]);
			var p_y=parseFloat(keys[i].split(';')[1]);
			var c_x=Math.floor(p_x*pixel_size*16+w/2);
			var c_y=Math.floor(p_y*pixel_size*16+h/2-pixel_size*15.5);
			game_canvas_copy_ctx.fillText('и ещё '+(isdraw[keys[i]]-1), c_x, c_y);
		}
	//document.getElementById('personage_login').innerHTML=s;
	

}


function game_mapgetpol(s) {
	seed(s);
	var kek = random();
	if (kek > 0.5 / 2)
		return 21
		if (kek > 0.5 / 4)
			return 22
			if (kek > 0.5 / 8)
				return 23
				if (kek > 0.5 / 16)
					return 24
					if (kek > 0.5 / 32)
						return 25
						if (kek > 0.5 / 64)
							return 26
							if (kek > 0.5 / 128)
								return 27
								if (kek > 0.5 / 256)
									return 28
									if (kek > 0.5 / 512)
										return 29
										return 21
}

var game_map_walls = [2, 38, 4, 6, 31, 34, 36, 33, 35, 32];

function game_mapgeting(MapJSON) {
	if (game_is_first==1)
	{
		document.getElementById('loading_text').innerHTML='Получение информации о игроках...';
		GetPos();
		game_is_first=2;
		//setTimeout(function (){Serv_Command('get_dors',function (s){array_of_dors=JSON.parse(s); update_zamok()})},500);
	}
	setTimeout(update_zamok, 500);
	console.log(MapJSON);
	game_dors={};
	game_map={};
	var mapN;
	
	for (var i = 0; i < MapJSON.ROOMs.length; i++) {
		/*
			 ------
			
			 ------
		*/
		for (var j = MapJSON.ROOMs[i].x1; j <= MapJSON.ROOMs[i].x2; j++) {
			mapN = j + ";" + (MapJSON.ROOMs[i].y1-1);
			game_map[mapN] = 2;
			mapN = j + ";" + (MapJSON.ROOMs[i].y2+1);
			game_map[mapN] = 38;
		}
		/*
			 ------
			|      |
			 ------
		*/
		for (var j = MapJSON.ROOMs[i].y1; j <= MapJSON.ROOMs[i].y2; j++) {
			mapN = (MapJSON.ROOMs[i].x1-1) + ";" + j;
			game_map[mapN] = 4;
			mapN = (MapJSON.ROOMs[i].x2+1) + ";" + j;
			game_map[mapN] = 6;
		}
		/*
			15----62
			|      |
			37----84
		*/
		mapN = (MapJSON.ROOMs[i].x1-1) + ";" + (MapJSON.ROOMs[i].y1-1);
		game_map[mapN] = 1; // 1
		mapN = (MapJSON.ROOMs[i].x2+1) + ";" + (MapJSON.ROOMs[i].y1-1);
		game_map[mapN] = 3; // 2
		mapN = (MapJSON.ROOMs[i].x1-1) + ";" + (MapJSON.ROOMs[i].y2+1);
		game_map[mapN] = 7; // 3
		mapN = (MapJSON.ROOMs[i].x2+1) + ";" + (MapJSON.ROOMs[i].y2+1);
		game_map[mapN] = 9; // 4
		
		mapN = (MapJSON.ROOMs[i].x1) + ";" + (MapJSON.ROOMs[i].y1-1);
		game_map[mapN] = 45; // 5
		mapN = (MapJSON.ROOMs[i].x2) + ";" + (MapJSON.ROOMs[i].y1-1);
		game_map[mapN] = 45; // 6
		mapN = (MapJSON.ROOMs[i].x1) + ";" + (MapJSON.ROOMs[i].y2+1);
		game_map[mapN] = 37; // 7
		mapN = (MapJSON.ROOMs[i].x2) + ";" + (MapJSON.ROOMs[i].y2+1);
		game_map[mapN] = 39; // 8
		
		for (var x = MapJSON.ROOMs[i].x1; x <= MapJSON.ROOMs[i].x2; x++)
			for (var y = MapJSON.ROOMs[i].y1; y <= MapJSON.ROOMs[i].y2; y++) {
				mapN = x + ";" + y;
				game_map[mapN] = game_mapgetpol(mapN);
			}
	}

	for (var i = 0; i < MapJSON.RVs.length; i++) {
		for (var j = MapJSON.RVs[i].y1; j <= MapJSON.RVs[i].y2; j++) {
			mapN = (MapJSON.RVs[i].x - 1) + ";" + j;
			if (game_map[mapN] == 45) {
				game_map[mapN] = 35;
			} else if (game_map[mapN] == 37) {
				game_map[mapN] = 36;
			} else if (game_map[mapN] == 39) {
				game_map[mapN] = 33;
			} else if (game_map[mapN] == 38) {
				game_map[mapN] = 32;
			} else if (game_map[mapN] == 2) {
				game_map[mapN] = 35;
			} else {
				game_map[mapN] = 4;
			}
			mapN = (MapJSON.RVs[i].x) + ";" + j;
			game_map[mapN] = game_mapgetpol(mapN);
			mapN = (MapJSON.RVs[i].x + 1) + ";" + j;
			if (game_map[mapN] == 45) {
				game_map[mapN] = 34;
			} else if (game_map[mapN] == 37) {
				game_map[mapN] = 36;
			} else if (game_map[mapN] == 39) {
				game_map[mapN] = 33;
			} else if (game_map[mapN] == 38) {
				game_map[mapN] = 31;
			} else if (game_map[mapN] == 2) {
				game_map[mapN] = 34;
			} else {
				game_map[mapN] = 6;
			}
		}
		if (MapJSON.RVs[i].dor) {
			mapN = (MapJSON.RVs[i].x) + ";" + Math.floor((MapJSON.RVs[i].y1 + MapJSON.RVs[i].y2) / 2);
			if (MapJSON.RVs[i]["dor"] == ""){}else
			if (MapJSON.RVs[i]["dor"] == "open")
				game_map[mapN] = 41;
			else if (MapJSON.RVs[i]["dor"].split("solved_task:").length == 2) {
				game_map[mapN] = 41;
				array_of_dors[mapN] = MapJSON.RVs[i]["dor"].split("task:")[1];
			} else if (MapJSON.RVs[i]["dor"].split("task:").length == 2) {
				game_map[mapN] = 42;
				game_dors[mapN] = MapJSON.RVs[i]["dor"].split("task:")[1];
				array_of_dors[mapN] = MapJSON.RVs[i]["dor"].split("task:")[1];
			} else
				game_map[mapN] = 3254;
		}
	}
	for (var i = 0; i < MapJSON.RHs.length; i++) {
		for (var j = MapJSON.RHs[i].x1; j <= MapJSON.RHs[i].x2; j++) {
			mapN = j + ";" + (MapJSON.RHs[i].y - 1);
			if (game_map[mapN] == 4) {
				game_map[mapN] = 35;
			} else if (game_map[mapN] == 6) {
				game_map[mapN] = 34;
			} else {
				game_map[mapN] = 2;
			}
			mapN = j + ";" + MapJSON.RHs[i].y;
			game_map[mapN] = game_mapgetpol(mapN);
			mapN = j + ";" + (MapJSON.RHs[i].y + 1);
			if (game_map[mapN] == 4) {
				game_map[mapN] = 32;
			} else if (game_map[mapN] == 6) {
				game_map[mapN] = 31;
			} else {
				game_map[mapN] = 38;
			}
		}
		if (MapJSON.RHs[i]["dor"]) {
			mapN = Math.floor((MapJSON.RHs[i].x1 + MapJSON.RHs[i].x2) / 2) + ";" + (MapJSON.RHs[i].y);
			if (MapJSON.RHs[i]["dor"] == ""){}else
			if (MapJSON.RHs[i]["dor"] == "open")
				game_map[mapN] = 43;
			else if (MapJSON.RHs[i]["dor"].split("solved_task:").length == 2) {
				game_map[mapN] = 43;
				array_of_dors[mapN] = MapJSON.RHs[i]["dor"].split("task:")[1];
			} else if (MapJSON.RHs[i]["dor"].split("task:").length == 2) {
				game_map[mapN] = 44;
				game_dors[mapN] = MapJSON.RHs[i]["dor"].split("task:")[1];
				array_of_dors[mapN] = MapJSON.RHs[i]["dor"].split("task:")[1];
			} else
				game_map[mapN] = 3254;
		}
	}
	for (var i = 0; i < MapJSON.Ds.length; i++) {
		mapN = MapJSON.Ds[i].x + ";" + MapJSON.Ds[i].y;
		game_map[mapN] = 46;
	}
	setTimeout(render_minimap,100);
}
function render_minimap(){
	function render_minimap2(){
		if (document.getElementById('AllMap').style.height != "0%")
		{
			var a=Object.keys(game_map);
			var TL_X=0,TL_Y=0,BR_X=0,BR_Y=0;
			for (var i=0;i<a.length;i++)
			{
				if (TL_X>parseInt(a[i].split(';')[0]))
					TL_X=parseInt(a[i].split(';')[0]);
				if (TL_Y>parseInt(a[i].split(';')[1]))
					TL_Y=parseInt(a[i].split(';')[1]);
				if (BR_X<parseInt(a[i].split(';')[0]))
					BR_X=parseInt(a[i].split(';')[0]);
				if (BR_Y<parseInt(a[i].split(';')[1]))
					BR_Y=parseInt(a[i].split(';')[1]);
			}
			TL_X-=2;
			TL_Y-=2;
			BR_X+=2;
			BR_Y+=2;
			
			var minimap_canvas=document.getElementById('minimap_canvas');
			minimap_canvas_ctx = minimap_canvas.getContext("2d");
			minimap_canvas.height =Math.max(BR_X-TL_X,BR_Y-TL_Y)*16;
			minimap_canvas.width = Math.max(BR_X-TL_X,BR_Y-TL_Y)*16;
			minimap_canvas.mozImageSmoothingEnabled = false;
			minimap_canvas.oImageSmoothingEnabled = false;
			minimap_canvas.webkitImageSmoothingEnabled = false;
			minimap_canvas.msImageSmoothingEnabled = false;
			minimap_canvas.imageSmoothingEnabled = false;

			var h=16;//Math.round(1024/(BR_X-TL_X));
			var w=16;//Math.round(1024/(BR_Y-TL_Y));
			var mid = Math.max(BR_X-TL_X,BR_Y-TL_Y)*16/2;
			if (h>w)
				h=w;
			if (w>h)
				w=h;
			var game_render_type_save=game_render_type;
			game_render_type=1;
			for (var i=0;i<a.length;i++)
			{
				var ser=(BR_X+TL_X)/2;
				var x=(parseInt(a[i].split(';')[0])-ser)*h+mid;
				ser=(BR_Y+TL_Y)/2;
				var y=(parseInt(a[i].split(';')[1])-ser)*h+mid;
				 game_draw_texture(x, y, game_map[a[i]], 0,minimap_canvas_ctx);
			}	 
			for (var i=0;i<game_draw_players.length;i++)
			{
				var ser=(BR_X+TL_X)/2;
				var x=(game_draw_players[i][1]-ser+0.5)*h+mid;
				ser=(BR_Y+TL_Y)/2;
				var y=(game_draw_players[i][2]-ser)*h+mid;
				minimap_canvas_ctx.fillStyle = '#FAA';
				minimap_canvas_ctx.beginPath();
				minimap_canvas_ctx.arc(x,y,h*0.4,0,2 * Math.PI, false);
				minimap_canvas_ctx.fill();
			}
			var ser=(BR_X+TL_X)/2;
			var x=(game_drawX-ser+0.5)*h+mid;
			ser=(BR_Y+TL_Y)/2;
			var y=(game_drawY-ser)*h+mid;
			minimap_canvas_ctx.fillStyle = '#F00';
			minimap_canvas_ctx.beginPath();
			minimap_canvas_ctx.arc(x,y,h*0.7,0,2 * Math.PI, false);
			minimap_canvas_ctx.fill();
			for (var i=0;i<a.length;i++)
			{
				var ser=(BR_X+TL_X)/2;
				var x=(parseInt(a[i].split(';')[0])-ser)*h+mid;
				ser=(BR_Y+TL_Y)/2;
				var y=(parseInt(a[i].split(';')[1])-ser)*h+mid;
				 game_draw_texture(x, y, game_map[a[i]], 1, minimap_canvas_ctx);
			}
			game_render_type=game_render_type_save;
		}
		//if (game_draw_players.length<1)
		//  setTimeout(render_minimap2,1000);
	}
	setTimeout(render_minimap2,100);
}
var need_open_task='';
var array_of_dors={};
function update_zamok()
{
	if (Object.keys(array_of_dors)[
		(Object.keys(array_of_dors).indexOf(game_drawX+';'+game_drawY)+1)+
		(Object.keys(array_of_dors).indexOf(game_drawX+';'+(game_drawY+1))+1)+
		(Object.keys(array_of_dors).indexOf((game_drawX+1)+';'+game_drawY)+1)+
		(Object.keys(array_of_dors).indexOf(game_drawX+';'+(game_drawY-1))+1)+
		(Object.keys(array_of_dors).indexOf((game_drawX-1)+';'+game_drawY)+1)-1]!=undefined)
	{
		document.getElementById('OMap-right-pane').style.width='400px';
		if (debug)console.log('kek');
		document.getElementById('OMap-right-bottom-pane').children[0].style.left='0px';
		document.getElementById('OMap-right-bottom-pane').children[0].style.display='';
		need_open_task=array_of_dors[Object.keys(array_of_dors)[(Object.keys(array_of_dors).indexOf(game_drawX+';'+game_drawY)+1)+(Object.keys(array_of_dors).indexOf(game_drawX+';'+(game_drawY+1))+1)+(Object.keys(array_of_dors).indexOf((game_drawX+1)+';'+game_drawY)+1)+(Object.keys(array_of_dors).indexOf(game_drawX+';'+(game_drawY-1))+1)+(Object.keys(array_of_dors).indexOf((game_drawX-1)+';'+game_drawY)+1)-1]];
		document.getElementById('OMap-right-bottom-pane').children[0].onclick=function (){OpenEditor(need_open_task)};
		
		let n_src='tileset/lock_open.png';
		for (var dor in game_dors)if (game_dors[dor] == need_open_task) {n_src='tileset/lock_close.png';}
		if (document.getElementById('OMap-right-bottom-pane').children[0].children[0].src != n_src)
			document.getElementById('OMap-right-bottom-pane').children[0].children[0].src = n_src;
		
		document.getElementById('OMap-right-bottom-pane').children[1].style.left='100px';
		document.getElementById('OMap-right-bottom-pane').children[2].style.left='200px';
		document.getElementById('OMap-right-bottom-pane').children[3].style.left='300px';
		
	}else
	{
		document.getElementById('OMap-right-pane').style.width='300px';
		
		document.getElementById('OMap-right-bottom-pane').children[0].style.left='0px';
		document.getElementById('OMap-right-bottom-pane').children[0].style.display='none';
		document.getElementById('OMap-right-bottom-pane').children[1].style.left='0px';
		document.getElementById('OMap-right-bottom-pane').children[2].style.left='100px';
		document.getElementById('OMap-right-bottom-pane').children[3].style.left='200px';
		
	}
}

var game_time_anim=Date.now();
function game_personage_left(s) {
	if (s) {
		game_personage_AnimationNum = 13;
		game_time_anim=Date.now();
		var intervalID = setInterval(function f27394823() {
			game_drawX = game_drawX - Math.min(Date.now()-game_time_anim,speed_pers)/speed_pers;
			game_time_anim=Date.now();
		}, 33); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 14;
		}, speed_pers/4); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 15;
		}, speed_pers/4*2); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 16;
		}, speed_pers/4*3); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 13;
			clearInterval(intervalID);
			game_drawX = game_drawX - Math.min(Date.now()-game_time_anim,speed_pers)/speed_pers;
			game_time_anim=Date.now();
			game_drawX = Math.round(game_drawX);
			game_drawY = Math.round(game_drawY);
			update_zamok();
			render_minimap();
		}, speed_pers); // (*)
	} else {
		game_drawX = Math.round(game_drawX);
		game_drawY = Math.round(game_drawY);
		Keys[40] = false;
		Keys[39] = false;
		Keys[38] = false;
		Keys[37] = false;
	}
	if (game_map[Math.round(game_drawX-1)+';'+Math.round(game_drawY)]==46)
		server_request('get_coin', {}, (x)=>{
			if (x.probability==1 || x.probability==0) return mapget();
			showFortuneWheel(x, function() { mapget(); });
		});
}

function game_personage_up(s) {
	if (s) {
		game_personage_AnimationNum = 9;
		game_time_anim=Date.now();
		var intervalID = setInterval(function f() {
			game_drawY = game_drawY - Math.min(Date.now()-game_time_anim,speed_pers)/speed_pers;
			game_time_anim=Date.now();
		}, 33); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 10;
		}, speed_pers/4*1); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 11;
		}, speed_pers/4*2); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 12;
		}, speed_pers/4*3); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 9;
			clearInterval(intervalID);
			game_drawY = game_drawY - Math.min(Date.now()-game_time_anim,speed_pers)/speed_pers;
			game_time_anim=Date.now();
			//console.log([game_drawX, game_drawY]);
			game_drawX = Math.round(game_drawX);
			game_drawY = Math.round(game_drawY);
			update_zamok();
			render_minimap();
		}, speed_pers); // (*)
	} else {
		game_drawX = Math.round(game_drawX);
		game_drawY = Math.round(game_drawY);
		Keys[40] = false;
		Keys[39] = false;
		Keys[38] = false;
		Keys[37] = false;
	}
	if (game_map[Math.round(game_drawX)+';'+Math.round(game_drawY-1)]==46)
		server_request('get_coin', {}, (x)=>{
			if (x.probability==1 || x.probability==0) return mapget();
			showFortuneWheel(x, function() { mapget(); });
		});
}

function game_personage_right(s) {
	if (s) {
		game_personage_AnimationNum = 5;
		game_time_anim=Date.now();
		var intervalID = setInterval(function f() {
			game_drawX = game_drawX + Math.min(Date.now()-game_time_anim,speed_pers)/speed_pers;
			game_time_anim=Date.now();
		}, 33); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 6;
		}, speed_pers/4*1); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 7;
		}, speed_pers/4*2); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 8;
		}, speed_pers/4*3); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 5;
			clearInterval(intervalID);
			game_drawX = game_drawX + Math.min(Date.now()-game_time_anim,speed_pers)/speed_pers;
			game_time_anim=Date.now();
			game_drawX = Math.round(game_drawX);
			game_drawY = Math.round(game_drawY);
			update_zamok();
			render_minimap();
		}, speed_pers); // (*)
	} else {
		game_drawX = Math.round(game_drawX);
		game_drawY = Math.round(game_drawY);
		Keys[40] = false;
		Keys[39] = false;
		Keys[38] = false;
		Keys[37] = false;
	}
	if (game_map[Math.round(game_drawX+1)+';'+Math.round(game_drawY)]==46)
		server_request('get_coin', {}, (x)=>{
			if (x.probability==1 || x.probability==0) return mapget();
			showFortuneWheel(x, function() { mapget(); });
		});
}

function game_personage_down(s) {
	if (s) {
		game_personage_AnimationNum = 1;
			game_time_anim=Date.now();
		var intervalID = setInterval(function f() {
			game_drawY = game_drawY + Math.min(Date.now()-game_time_anim,speed_pers)/speed_pers;
			game_time_anim=Date.now();
		}, 33); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 2;
		}, speed_pers/4*1); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 3;
		}, speed_pers/4*2); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 4;
		}, speed_pers/4*3); // (*)
		setTimeout(function f() {
			game_personage_AnimationNum = 1;
			clearInterval(intervalID);
			game_drawY = game_drawY + Math.min(Date.now()-game_time_anim,speed_pers)/speed_pers;
			game_time_anim=Date.now();
			game_drawX = Math.round(game_drawX);
			game_drawY = Math.round(game_drawY);
			update_zamok();
			render_minimap();
		}, speed_pers); // (*)
	} else {
		game_drawX = Math.round(game_drawX);
		game_drawY = Math.round(game_drawY);
		Keys[40] = false;
		Keys[39] = false;
		Keys[38] = false;
		Keys[37] = false;
	}
	if (game_map[Math.round(game_drawX)+';'+Math.round(game_drawY+1)]==46)
		server_request('get_coin', {}, (x)=>{
			if (x.probability==1 || x.probability==0) return mapget();
			showFortuneWheel(x, function() { mapget(); });
		});
}
function __setVal(s){
	if (debug)
		console.log(s);
	if (GetVal('SaveEditorValue_'+Editor_opentask,s.trim()).trim().replace(/[\r]/g, '')!=s.trim().replace(/[\r]/g, ''))
	{
		//if (confirm('Восстановить прошлую сессию?'))
		//myCodeMirror.setValue(GetVal(Editor_opentask,''));
		//else
		//myCodeMirror.setValue(s);
	}
	else
	{
		setInterval(formating_code,100);
		myCodeMirror.setValue(s);
	}
	
}
/*
function __get_is_access(f){
	Serv_Command("get_is_access", f);
}
*/
var old_Editor_opentask='';
function ParseTask(Editor_task) {
	var s2 = '';
	__setVal(Editor_task.default_program);
	//Serv_LoadFile(server+'/task/'+Editor_tabs[i].URLDefaultProgram,__setVal);
	//Serv_LoadFile('task/'+Editor_tabs[i].URLDefaultProgram,myCodeMirror.setValue);
	for (var j = 0; j < Editor_task.tabs.length; j++) {
		s2 = s2 + '<button class="tablinks" ';
		if (j == 0)
			s2 = s2 + 'id="defaulttab" ';
		s2 = s2 + 'onclick="SelectIt(event, ';
		if (Editor_task.tabs[j].type == 'text')
			s2 = s2 + '\'Text\',\'' + (Editor_task.tabs[j].text.addSlashes()) + '\'';
		if (Editor_task.tabs[j].type == 'site')
			s2 = s2 + '\'Site\',\'' + (Editor_task.tabs[j].url.addSlashes()) + '\'';
		if (Editor_task.tabs[j].type == 'fil')
			s2 = s2 + '\'Map\',\''+ (Editor_task.tabs[j].value.addSlashes()) + '\'';
		if (Editor_task.tabs[j].type == 'load')
			s2 = s2 + '\'Load\',\'' + (Editor_opentask.addSlashes()) + '\'';
		if (Editor_task.tabs[j].type == 'file')
			s2 = s2 + '\'File\',\'' + (Editor_task.tabs[j].url.addSlashes()) + '\'';
		s2 = s2 + ')">' + Editor_task.tabs[j].name + '</button>';
	}
	//<button class="tablinks" id="defaulttab" onclick="SelectIt(event, 'File', '/Files/exemple.pdf')">Задача А1</button>
	//<button class="tablinks" onclick="SelectIt(event, 'Map', '/Files/A1_1.fil')">Тест 1</button>
	//<button class="tablinks" onclick="SelectIt(event, 'Map', '/Files/A1_2.fil')">Тест 2</button>
	//<button class="tablinks" onclick="SelectIt(event, 'Map', '/Files/A1_3.fil')">Тест 3</button>
	//<button class="tablinks" onclick="SelectIt(event, 'Load', '/Load/A1')">Отправить</button>
	//<button class="tablinks" onclick="SelectIt(event, 'Site', '/top')">Tоп</button>
	if (s2=='')
	{
		alert('Данной задачи не найдено. Убедитесь что у вас есть доступ к этой задачи. (задача "'+Editor_opentask+'")');
		Editor_opentask=old_Editor_opentask;
	}
	else
	{
		document.getElementById('id_tab').innerHTML = s2;
		document.getElementById("defaulttab").onclick();
		Editor_style_update();
	}
	close_Editor_loader();
}
function close_Editor_loader()
{
	document.getElementById('loading_text2').innerHTML='Готово';
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity=".9";},50);
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity=".7";},100);
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity=".5";},150);
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity=".2";},200);
	setTimeout(function f(){document.getElementById("load_div_id2").style.display="none";},250);
	setTimeout(function f(){document.getElementById("load_div_id2").style.display="none";},1000);
}
function write_text_Editor_loader(s)
{
	document.getElementById('loading_text2').innerHTML=s;
	//document.getElementById("load_div_id").style.display="";
	//document.getElementById("load_div_id").style.opacity="1";
}
function open_Editor_loader()
{
	document.getElementById('loading_text2').innerHTML='Загрузка...';
	document.getElementById("load_div_id2").style.display="";
	if (Editor_dark_mode)
	{
		document.getElementById("load_div_id2").style.background="#000";
		document.getElementById("load_div_id2").children[0].style.color="#FFF";
	}else{
		document.getElementById("load_div_id2").style.background="#FFF";
		document.getElementById("load_div_id2").children[0].style.color="#000";
	}
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity=".2";},50);
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity=".5";},100);
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity=".7";},150);
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity=".9";},200);
	setTimeout(function f(){document.getElementById("load_div_id2").style.opacity="1";},250);
}

function OpenEditor(s) {
	if (((document.getElementById('AllMap').style.height != "100%"))&&(s==Editor_opentask))
		return;
	
	resizeSep(0,window.innerWidth/2);
	SaveVal('OpenEditor_task',s);
	//alert(s);
	old_Editor_opentask=Editor_opentask;
	Editor_opentask = s;
	if (GetVal('SaveEditorValue_'+Editor_opentask,'')!='')
	{
		myCodeMirror.setValue(GetVal('SaveEditorValue_'+Editor_opentask,''));
		setInterval(formating_code,100);
	}
	server_request("get_task", Editor_opentask,  ParseTask);
	//Serv_LoadFile('\\task\\all.json', ParseTabs);
	//if ((end - start)>10)
	//console.log('SecondWay: '+(end - start)+'ms');
	if (document.getElementById('AllMap').style.height != "0%")
	{
		var end = new Date().getTime();
		document.getElementById('AllMap').style.height = "99%";
		setTimeout(function f3209235() {
			var timing = 1000 - Math.abs(end - (new Date().getTime()));
			if (timing > 0)
			{
				setTimeout(f3209235, 1);
				document.getElementById('AllMap').style.height = " " + (Math.sqrt(timing / 1000) * 100) + "% ";
			}else
			{
				document.getElementById('OMap-right-top-pane').style.visibility = "hidden";
				document.getElementById('AllMap').style.height = "0%";
			}
		}, 1);
	}
}
function CloseEditor(s) {
	//alert(s);
	
	setTimeout(open_Editor_loader,1000);
	SaveVal('OpenEditor_task','');
	Editor_opentask = '';
	mapget();
	game_old_players = '';
	game_players = '';
	var end = new Date().getTime();
	//if ((end - start)>10)
	//console.log('SecondWay: '+(end - start)+'ms');

	setTimeout(function f32092335() {
		var timing = 1000 - Math.abs(end - (new Date().getTime()));
		if (timing > 0)
		{
			setTimeout(f32092335, 1);
			document.getElementById('AllMap').style.height = " " + (100 - (Math.pow(timing / 1000, 2) * 100)) + "% ";
		}
		else
		{
			document.getElementById('AllMap').style.height = "100%";
		}
	}, 1);
	document.getElementById('OMap-right-top-pane').style.visibility = "visible";
}

var game_anim_timer = 0;
var timerId2 = setTimeout(function Keyget() {
	if (document.getElementById('AllMap').style.height != '0%') {
		if (game_drawX - Math.round(game_drawX) == 0)
			if (game_drawY - Math.round(game_drawY) == 0) {
				// for (var i = 0; i < game_players["count"]; i++)
				if (Keys[40] || Keys[39] || Keys[38] || Keys[37]||Keys[65]||Keys[87]||Keys[68]||Keys[83]) {
					//console.log([Keys[40], Keys[39], Keys[38], Keys[37],game_drawX,game_drawY,game_drawX - Math.round(game_drawX),game_drawY - Math.round(game_drawY)]);
					game_drawY = game_drawY + 0.01;
					game_drawX = game_drawX + 0.01;
					
					//console.log(["---",Keys[40], Keys[39], Keys[38], Keys[37],game_drawX,game_drawY,game_drawX - Math.round(game_drawX),game_drawY - Math.round(game_drawY)]);
					game_anim_timer = 0;
					if (Keys[37]||Keys[65]) {
						mapN = Math.round(game_drawX - 1).toString() + ";" + Math.round(game_drawY).toString();
						if (game_map_walls.filter(x=>x==game_map[mapN]).length) {
							game_drawX = Math.round(game_drawX);
							game_drawY = Math.round(game_drawY);
							Keys[40] = false;
							Keys[39] = false;
							Keys[38] = false;
							Keys[37] = false;
						} else {
							server_request("move", "left", function f(s){game_personage_left(s);for (var dor in game_dors)if (dor == mapN) {	OpenEditor(game_dors[dor]);	}});
							//for (var dor in game_dors)
							//	if (dor == mapN) {
							//		OpenEditor(game_dors[dor]);
							//	}
						}
					} else if (Keys[38]||Keys[87]) {
						mapN = Math.round(game_drawX).toString() + ";" + Math.round(game_drawY - 1).toString();
						if (game_map_walls.filter(x=>x==game_map[mapN]).length) {
							game_drawX = Math.round(game_drawX);
							game_drawY = Math.round(game_drawY);
							Keys[40] = false;
							Keys[39] = false;
							Keys[38] = false;
							Keys[37] = false;
						} else {
							server_request("move", "up", function f(s){game_personage_up(s);for (var dor in game_dors)if (dor == mapN) {	OpenEditor(game_dors[dor]);	}});
						}
					} else if (Keys[39]||Keys[68]) {
						mapN = Math.round(game_drawX + 1).toString() + ";" + Math.round(game_drawY).toString();
						if (game_map_walls.filter(x=>x==game_map[mapN]).length) {
							game_drawX = Math.round(game_drawX);
							game_drawY = Math.round(game_drawY);
							Keys[40] = false;
							Keys[39] = false;
							Keys[38] = false;
							Keys[37] = false;
						} else {
							server_request("move", "right", function f(s){game_personage_right(s);for (var dor in game_dors)if (dor == mapN) {	OpenEditor(game_dors[dor]);	}});
						}
					} else if (Keys[40]||Keys[83]) {
						mapN = Math.round(game_drawX).toString() + ";" + Math.round(game_drawY + 1).toString();
						if (game_map_walls.filter(x=>x==game_map[mapN]).length) {
							game_drawX = Math.round(game_drawX);
							game_drawY = Math.round(game_drawY);
							Keys[40] = false;
							Keys[39] = false;
							Keys[38] = false;
							Keys[37] = false;
						} else {
							server_request("move", "down", function f(s){game_personage_down(s);for (var dor in game_dors)if (dor == mapN) {	OpenEditor(game_dors[dor]);	}});
						}
					}
					
				}

				game_anim_timer++;
				if (game_anim_timer > 50)
					if (game_personage_AnimationNum != 9) {
						game_anim_timer = 0;
						game_personage_AnimationNum = 1;
					} else {
						if (Math.random() > 0.5)
							game_personage_AnimationNum = 13;
						else
							game_personage_AnimationNum = 5;
						game_anim_timer = 0;
					}
			}
	}
	timerId = setTimeout(Keyget, 33); // (*)
}, 30);

var drawblock = "0;0";
var map_size = 16;
var game_last_frame = new Date();
function game_function() {
	//const start = new Date().getTime();

	/*besti=1;
	best=100000000;
	for (var i=0.1;i<20;i=i+0.1){
	var k=((game_canvas.clientHeight/i)*(game_canvas.clientWidth/i));
	var k2=16*16;//Math.sqrt(Math.pow(game_canvas.clientHeight/besti,2)+Math.pow(game_canvas.clientWidth/besti,2));
	//console.log(i+'='+Math.abs(k-k2));
	if (Math.abs(k-k2)<best ){
	besti=i;
	best=Math.abs(k-k2);
	}
	}*/
	//console.log(besti);

	var AllMapDiv = document.getElementById('AllMap');
	if (AllMapDiv.style.height != '0%') {
		if (game_canvas.height != 16 * (map_size - 1))
			game_canvas.height = 16 * (map_size - 1);
		if (game_canvas.width != 16 * (map_size - 1))
			game_canvas.width = 16 * (map_size - 1);
		game_ctx.fillStyle = 'rgba(50,32,60,1)';
		game_ctx.fillRect(0, 0, game_canvas.height, game_canvas.width);
		for (var j = -1; j < map_size + 1; j++)
			for (var i = -1; i < map_size + 1; i++) {
				drawblock = ((Lfloor(game_drawX) + i - (map_size / 2 - 1)).toString() + ';' + (Lfloor(game_drawY) + j - (map_size / 2 - 1)).toString());
				if (drawblock in game_map) {
					game_draw_texture(16 * i - 16 * drob(game_drawX), 16 * j - 16 * drob(game_drawY), game_map[drawblock], 0)
				} else {
					//game_getmap(parseInt(drawblock.split(";")[0]), parseInt(drawblock.split(";")[1]));
					//game_draw_texture(16 * i - 16 * drob(game_drawX), 16 * j - 16 * drob(game_drawY), game_map[drawblock], 0)
				}
			}

		for (var j = 0; j < game_draw_players["length"]; j++) 
		if (game_drawY - game_draw_players[j][2]+0.1>=0){
			game_draw_personage(Math.round(16 * (map_size / 2 - 1) - 16 * (game_drawX - game_draw_players[j][1])), Math.round(16 * (map_size / 2 - 1) - 7 - 16 * (game_drawY - game_draw_players[j][2])), game_draw_players[j][4], game_draw_players[j][5], game_draw_players[j][6], game_draw_players[j][7], game_draw_players[j][8], game_draw_players[j][9], game_draw_players[j][10]);
			//drawblock = ((Lfloor(game_drawX) + i - (map_size / 2 - 1)).toString() + ';' + (Lfloor(game_drawY) + j - (map_size / 2 - 1)).toString());
			//	game_draw_personage(16*Lfloor(game_drawX-game_draw_players[j][1])+ 16* (map_size / 2 - 1), 16*Lfloor(game_drawY-game_draw_players[j][2]+16) + 16*(map_size / 2 - 1) - 7, game_personage_AnimationNum, 50, 6, 4, 1, 2, 4);
			//game_draw_players;
			//
		}
		game_draw_personage(16 * (map_size / 2 - 1), 16 * (map_size / 2 - 1) - 7, game_personage_AnimationNum, game_pers_edit[0], game_pers_edit[1], game_pers_edit[2], game_pers_edit[3], game_pers_edit[4], game_pers_edit[5]);
		for (var j = 0; j < game_draw_players["length"]; j++) 
		if (game_drawY - game_draw_players[j][2]+0.1<0){
			game_draw_personage(Math.round(16 * (map_size / 2 - 1) - 16 * (game_drawX - game_draw_players[j][1])), Math.round(16 * (map_size / 2 - 1) - 7 - 16 * (game_drawY - game_draw_players[j][2])), game_draw_players[j][4], game_draw_players[j][5], game_draw_players[j][6], game_draw_players[j][7], game_draw_players[j][8], game_draw_players[j][9], game_draw_players[j][10]);
			//drawblock = ((Lfloor(game_drawX) + i - (map_size / 2 - 1)).toString() + ';' + (Lfloor(game_drawY) + j - (map_size / 2 - 1)).toString());
			//	game_draw_personage(16*Lfloor(game_drawX-game_draw_players[j][1])+ 16* (map_size / 2 - 1), 16*Lfloor(game_drawY-game_draw_players[j][2]+16) + 16*(map_size / 2 - 1) - 7, game_personage_AnimationNum, 50, 6, 4, 1, 2, 4);
			//game_draw_players;
			//
		}
		for (var j = -1; j < map_size + 1; j++)
			for (var i = -1; i < map_size + 1; i++) {
				drawblock = ((Lfloor(game_drawX) + i - (map_size / 2 - 1)).toString() + ';' + (Lfloor(game_drawY) + j - (map_size / 2 - 1)).toString());
				if (drawblock in game_map) {
					game_draw_texture(16 * i - 16 * drob(game_drawX), 16 * j - 16 * drob(game_drawY), game_map[drawblock], 1)
				} else {
					//game_getmap(parseInt(drawblock.split(";")[0]), parseInt(drawblock.split(";")[1]));
					//game_draw_texture(16 * i - 16 * drob(game_drawX), 16 * j - 16 * drob(game_drawY), game_map[drawblock], 1)
				}
			}
		//game_ctx.fillRect(1, 1, 5, 5);
		game_copy();
	}
	//const end = new Date().getTime();
	//if ((end - start)>10)
	//console.log('SecondWay: '+(end - start)+'ms');
	game_fps.push(1000/((new Date())-game_last_frame));
	if (game_fps.length>50)
		game_fps.shift();
	
	game_last_frame = new Date();
	window.requestAnimationFrame(game_function);
}
function game_draw_texture(x, y, num, _frame,ctx) {
	if (ctx==undefined)
		ctx=game_ctx;
	var h = 16,
	w = 16;
	if (_frame == 1)
		switch (num) {
		case 31:
			if (game_render_type == 2)
				ctx.drawImage(game_tileset, 0 + 144, 0, 16, 16, x, y - 16, h, w);
			break;
		case 32:
			if (game_render_type == 2)
				ctx.drawImage(game_tileset, 16 + 144, 0, 16, 16, x, y - 16, h, w);
			break;
		case 33:
			if (game_render_type == 2)
				ctx.drawImage(game_tileset, 32 + 144, 0, 16, 16, x, y - 16, h, w);
			break;
		case 36:
			if (game_render_type == 2)
				ctx.drawImage(game_tileset, 32 + 144, 16, 16, 16, x, y - 16, h, w);
			break;
		case 37:
			if (game_render_type == 2)
				ctx.drawImage(game_tileset, 0 + 144, 32, 16, 16, x, y - 16, h, w);
			break;
		case 38:
			if (game_render_type == 2)
				ctx.drawImage(game_tileset, 16 + 144, 32, 16, 16, x, y - 16, h, w);
			break;
		case 39:
			if (game_render_type == 2)
				ctx.drawImage(game_tileset, 32 + 144, 32, 16, 16, x, y - 16, h, w);
			break;
		case 41:
			ctx.drawImage(game_tileset, 0 + 64, 16, 16, 16 * 2, x, y - 16, h, w * 2);
			break;
		case 42:
			ctx.drawImage(game_tileset, 16 + 64, 16, 16, 16 * 2, x, y - 16, h, w * 2);
			break;
		case 43:
			ctx.drawImage(game_tileset, 32 + 64, 16, 16, 16 * 2, x, y - 16, h, w * 2);
			break;
		case 44:
			ctx.drawImage(game_tileset, 16 + 32 + 64, 16, 16, 16 * 2, x, y - 16, h, w * 2);
			break;
		}
	if (_frame == 0)
		switch (num) {
		case 1:
			if (game_render_type == 0)
				ctx.drawImage(game_tileset, 0, 0, 16, 16, x, y, h, w); //╔
			if (game_render_type != 0) {
				ctx.drawImage(game_tileset, 0, 0, 16, 16, x, y - 16, h, w); //╔
				game_draw_texture(x, y, 4, 0,ctx);
			}
			break;
		case 2:
			if (game_render_type == 0)
				ctx.drawImage(game_tileset, 16, 0, 16, 16, x, y, h, w); //═ - top
			if (game_render_type != 0) {
				ctx.drawImage(game_tileset, 16, 0, 16, 16, x, y - 16, h, w); //═ - top
				game_draw_texture(x, y, 11, 0,ctx);
			}
			break;
		case 3:
			if (game_render_type == 0)
				ctx.drawImage(game_tileset, 32, 0, 16, 16, x, y, h, w); //╗
			if (game_render_type != 0) {
				ctx.drawImage(game_tileset, 32, 0, 16, 16, x, y - 16, h, w); //╗
				game_draw_texture(x, y, 6, 0,ctx);
			}
			break;
		case 4:
			ctx.drawImage(game_tileset, 0, 16, 16, 16, x, y, h, w); //║ - left
			break;
		case 5:
			ctx.drawImage(game_tileset, 16, 16, 16, 16, x, y, h, w); //░
			break;
		case 6:
			ctx.drawImage(game_tileset, 32, 16, 16, 16, x, y, h, w); //║ - left
			break;
		case 7:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 0, 32, 16, 16, x, y, h, w); //╚
			if (game_render_type == 2) {
				ctx.drawImage(game_tileset, 0, 32, 16, 16, x, y - 16, h, w); //╚
				game_draw_texture(x, y, 5, 0,ctx)
			}
			break;
		case 8:
			ctx.drawImage(game_tileset, 16, 32, 16, 16, x, y, h, w); //═ - bottom
			break;
		case 9:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 32, 32, 16, 16, x, y, h, w); //╝
			if (game_render_type == 2) {
				ctx.drawImage(game_tileset, 32, 32, 16, 16, x, y - 16, h, w); //╝
				game_draw_texture(x, y, 5, 0,ctx);
			}
			break;
			//stena
		case 11:
			if (game_mapgetpol(drawblock) == 21)
				ctx.drawImage(game_tileset, 0, 0 + 64, 16, 16, x, y, h, w); //random()
			else
				game_draw_texture(x, y, game_mapgetpol(drawblock) - 10, 0,ctx); //random()
			break;
		case 12:
			ctx.drawImage(game_tileset, 16, 0 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 13:
			ctx.drawImage(game_tileset, 32, 0 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 14:
			ctx.drawImage(game_tileset, 0, 16 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 15:
			ctx.drawImage(game_tileset, 16, 16 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 16:
			ctx.drawImage(game_tileset, 32, 16 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 17:
			ctx.drawImage(game_tileset, 0, 32 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 18:
			ctx.drawImage(game_tileset, 16, 32 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 19:
			ctx.drawImage(game_tileset, 32, 32 + 64, 16, 16, x, y, h, w); //random()
			break;
			//pol
		case 21:
			ctx.drawImage(game_tileset, 0 + 64, 0 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 22:
			ctx.drawImage(game_tileset, 16 + 64, 0 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 23:
			ctx.drawImage(game_tileset, 32 + 64, 0 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 24:
			ctx.drawImage(game_tileset, 0 + 64, 16 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 25:
			ctx.drawImage(game_tileset, 16 + 64, 16 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 26:
			ctx.drawImage(game_tileset, 32 + 64, 16 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 27:
			ctx.drawImage(game_tileset, 0 + 64, 32 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 28:
			ctx.drawImage(game_tileset, 16 + 64, 32 + 64, 16, 16, x, y, h, w); //random()
			break;
		case 29:
			ctx.drawImage(game_tileset, 32 + 64, 32 + 64, 16, 16, x, y, h, w); //random()
			break;
			//stena2
		case 31:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 0 + 144, 0, 16, 16, x, y, h, w);
			if (game_render_type == 2) {
				game_draw_texture(x, y, 6, 0,ctx);
			}
			break;
		case 32:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 16 + 144, 0, 16, 16, x, y, h, w);
			if (game_render_type == 2) {
				game_draw_texture(x, y, 4, 0,ctx);
			}
			break;
		case 33:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 32 + 144, 0, 16, 16, x, y, h, w);
			if (game_render_type == 2) {
				game_draw_texture(x, y, 6, 0,ctx);
			}
			break;
		case 34:
			if (game_render_type == 0)
				ctx.drawImage(game_tileset, 0 + 144, 16, 16, 16, x, y, h, w);
			if (game_render_type != 0) {
				ctx.drawImage(game_tileset, 0 + 144, 16, 16, 16, x, y - 16, h, w);
				game_draw_texture(x, y, 11, 0,ctx);
			}
			break;
		case 35:
			if (game_render_type == 0)
				ctx.drawImage(game_tileset, 16 + 144, 16, 16, 16, x, y, h, w);
			if (game_render_type != 0) {
				ctx.drawImage(game_tileset, 16 + 144, 16, 16, 16, x, y - 16, h, w);
				game_draw_texture(x, y, 11, 0,ctx);
			}
			break;
		case 36:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 32 + 144, 16, 16, 16, x, y, h, w);
			if (game_render_type == 2) {
				game_draw_texture(x, y, 4, 0,ctx);
			}
			break;
		case 37:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 0 + 144, 32, 16, 16, x, y, h, w);
			if (game_render_type == 2) {
				game_draw_texture(x, y, 5, 0,ctx);
			}
			break;
		case 38:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 16 + 144, 32, 16, 16, x, y, h, w);
			if (game_render_type == 2) {
				game_draw_texture(x, y, 5, 0,ctx);
			}
			break;
		case 39:
			if (game_render_type != 2)
				ctx.drawImage(game_tileset, 32 + 144, 32, 16, 16, x, y, h, w);
			if (game_render_type == 2) {
				game_draw_texture(x, y, 5, 0,ctx);
			}
			break;
			//dor
		case 41:
			game_draw_texture(x, y, 21, 0,ctx);
			game_draw_texture(x, y - 16, 21, 0,ctx);
			break;
		case 42:
			game_draw_texture(x, y, 21, 0,ctx);
			game_draw_texture(x, y - 16, 21, 0,ctx);
			break;
		case 43:
			game_draw_texture(x, y, 21, 0,ctx);
			break;
		case 44:
			game_draw_texture(x, y, 21, 0,ctx);
			break;
		case 45:
			if (game_render_type == 0)
				ctx.drawImage(game_tileset, 16, 0, 16, 16, x, y, h, w); //═ - top
			if (game_render_type != 0) {
				ctx.drawImage(game_tileset, 16, 0, 16, 16, x, y - 16, h, w); //═ - top
				ctx.drawImage(game_tileset, 144+16*Math.floor((((new Date()).getMilliseconds() % 500)*2*4/1000)), 64+16, 16, 16, x, y, h, w);
			}
			break;
		case 46:
			ctx.drawImage(game_tileset, 144+16*Math.floor((((new Date()).getSeconds() % 4))), 64, 16, 16, x, y, h, w);
			break;
		default:
			ctx.drawImage(game_tileset, 64 - 16, 64 - 16, 16, 16, x, y, h, w);
			break;
		}
}
function game_draw_personage(x, y, AnimationNum, Skin /*цвет кожи*/, HairstyleNum /*номер прически*/, EyeNum /*номер глаз*/, ShirtNum /*номер рубашки*/, PantsNum /*номер штанов*/, FootwearNum /*номер обуви*/, my_local_game_ctx, h, w) {

	if (my_local_game_ctx == undefined)
		my_local_game_ctx = game_ctx;
	if (h == undefined)
		h = 16;
	if (w == undefined)
		w = 16;
	if (Skin > stopline[0][1])
		Skin = stopline[0][1];
	if (Skin < stopline[0][0])
		Skin = stopline[0][0];

	if (HairstyleNum > stopline[1][1])
		HairstyleNum = stopline[1][1];
	if (HairstyleNum < stopline[1][0])
		HairstyleNum = stopline[1][0];

	if (EyeNum > stopline[2][1])
		EyeNum = stopline[2][1];
	if (EyeNum < stopline[2][0])
		EyeNum = stopline[2][0];

	if (ShirtNum > stopline[3][1])
		ShirtNum = stopline[3][1];
	if (ShirtNum < stopline[3][0])
		ShirtNum = stopline[3][0];

	if (PantsNum > stopline[4][1])
		PantsNum = stopline[4][1];
	if (PantsNum < stopline[4][0])
		PantsNum = stopline[4][0];

	if (FootwearNum > stopline[5][1])
		FootwearNum = stopline[5][1];
	if (FootwearNum < stopline[5][0])
		FootwearNum = stopline[5][0];

	render_personage(Skin /*цвет кожи*/, HairstyleNum /*номер прически*/, EyeNum /*номер глаз*/, ShirtNum /*номер рубашки*/, PantsNum /*номер штанов*/, FootwearNum /*номер обуви*/)
	var game_canvas_personage = document.getElementById("gamecanvaspersonage(" + Skin + "," + HairstyleNum + "," + EyeNum + "," + ShirtNum + "," + PantsNum + "," + FootwearNum + ")");
	if (AnimationNum > 0)
		if (AnimationNum <= 16)
			my_local_game_ctx.drawImage(game_canvas_personage, 16 * (AnimationNum - 1), 0, 16, 16, Math.floor(x * 16) / 16, Math.floor(y * 16) / 16, h, w);
}
function render_personage(Skin /*цвет кожи*/, HairstyleNum /*номер прически*/, EyeNum /*номер глаз*/, ShirtNum /*номер рубашки*/, PantsNum /*номер штанов*/, FootwearNum /*номер обуви*/) {
	if (Skin > stopline[0][1])
		Skin = stopline[0][1];
	if (Skin < stopline[0][0])
		Skin = stopline[0][0];

	if (HairstyleNum > stopline[1][1])
		HairstyleNum = stopline[1][1];
	if (HairstyleNum < stopline[1][0])
		HairstyleNum = stopline[1][0];

	if (EyeNum > stopline[2][1])
		EyeNum = stopline[2][1];
	if (EyeNum < stopline[2][0])
		EyeNum = stopline[2][0];

	if (ShirtNum > stopline[3][1])
		ShirtNum = stopline[3][1];
	if (ShirtNum < stopline[3][0])
		ShirtNum = stopline[3][0];

	if (PantsNum > stopline[4][1])
		PantsNum = stopline[4][1];
	if (PantsNum < stopline[4][0])
		PantsNum = stopline[4][0];

	if (FootwearNum > stopline[5][1])
		FootwearNum = stopline[5][1];
	if (FootwearNum < stopline[5][0])
		FootwearNum = stopline[5][0];

	var game_canvas_personage = document.getElementById("gamecanvaspersonage(" + Skin + "," + HairstyleNum + "," + EyeNum + "," + ShirtNum + "," + PantsNum + "," + FootwearNum + ")");
	//var game_canvas_personage_ctx = game_canvas_personage.getContext("2d");
	if (!game_canvas_personage) {
		var Skin100 = Skin;
		Skin = Skin / 100;
		var colorofskin3 = "rgba(" + Lfloor(97 + Skin * (241 - 97)) + "," + Lfloor(56 + Skin * (181 - 56)) + "," + Lfloor(17 + Skin * (128 - 17)) + ",1)"
			var colorofskin2 = "rgba(" + Lfloor(117 + Skin * (253 - 117)) + "," + Lfloor(70 + Skin * (204 - 70)) + "," + Lfloor(24 + Skin * (167 - 24)) + ",1)"
			var colorofskin1 = "rgba(" + Lfloor(130 + Skin * (255 - 130)) + "," + Lfloor(79 + Skin * (214 - 79)) + "," + Lfloor(29 + Skin * (188 - 29)) + ",1)"
			Skin = Skin100;
		var colorofHairstyle3 = "rgba(127,127,127,1)";
		var colorofHairstyle2 = "rgba(127,127,127,1)";
		var colorofHairstyle1 = "rgba(127,127,127,1)";
		var colorofEye = "rgba(127,127,127,1)";

		var colorofShirt = "rgba(127,127,127,1)";
		var colorofPants = "rgba(127,127,127,1)";
		var colorofFootwear = "rgba(127,127,127,1)";

		switch (HairstyleNum) {
		case 1:
			colorofHairstyle3 = "rgba(97,56,17,01)";
			colorofHairstyle2 = "rgba(122,73,25,1)";
			colorofHairstyle1 = "rgba(133,83,33,1)";
			break;
		case 2:
			colorofHairstyle3 = "rgba(164,77,0,1)";
			colorofHairstyle2 = "rgba(211,99,0,1)";
			colorofHairstyle1 = "rgba(237,112,0,1)";
			break;
		case 3:
			colorofHairstyle3 = "rgba(69,47,28,1)";
			colorofHairstyle2 = "rgba(95,69,44,1)";
			colorofHairstyle1 = "rgba(115,86,57,1)";
			break;
		case 4:
			colorofHairstyle3 = "rgba(164,77,0,1)";
			colorofHairstyle2 = "rgba(223,105,0,1)";
			colorofHairstyle1 = "rgba(107,45,137,1)";
			break;
		case 5:
			colorofHairstyle3 = "rgba(97,56,17,1)";
			colorofHairstyle2 = "rgba(130,80,30,1)";
			colorofHairstyle1 = "rgba(106,197,230,1)";
			break;
		case 6:
			colorofHairstyle3 = "rgba(194,146,0,1)";
			colorofHairstyle2 = "rgba(235,191,55,1)";
			colorofHairstyle1 = "rgba(255,215,94,1)";
			break;
		}
		switch (EyeNum) {
		case 1:
			colorofEye = "rgba(24,0,255,1)";
			break;
		case 2:
			colorofEye = "rgba(255,195,11,1)";
			break;
		case 3:
			colorofEye = "rgba(128,128,128,1)";
			break;
		case 4:
			colorofEye = "rgba(102,61,20,1)";
			break;
		case 5:
			colorofEye = "rgba(8,232,222,1)";
			break;
		case 6:
			colorofEye = "rgba(153,102,204,1)";
			break;
		case 7:
			colorofEye = "rgba(15,82,186,1)";
			break;
		case 8:
			colorofEye = "rgba(0,128,0,1)";
			break;
		case 9:
			colorofEye = "rgba(210,180,140,1)";
			break;
		}
		switch (ShirtNum) {
		case 1:
			colorofShirt = "rgba(128,0,0,1)";
			break;
		case 2:
			colorofShirt = "rgba(255,0,0,1)";
			break;
		case 3:
			colorofShirt = "rgba(128,0,128,1)";
			break;
		case 4:
			colorofShirt = "rgba(255,0,255,1)";
			break;
		case 5:
			colorofShirt = "rgba(0,128,0,1)";
			break;
		case 6:
			colorofShirt = "rgba(0,255,0,1)";
			break;
		case 7:
			colorofShirt = "rgba(128,128,0,1)";
			break;
		case 8:
			colorofShirt = "rgba(255,255,0,1)";
			break;
		case 9:
			colorofShirt = "rgba(0,0,128,1)";
			break;
		case 10:
			colorofShirt = "rgba(0,0,255,1)";
			break;
		case 11:
			colorofShirt = "rgba(0,128,128,1)";
			break;
		case 12:
			colorofShirt = "rgba(0,255,255,1)";
			break;
		case 13:
			colorofShirt = "rgba(0,0,0,1)";
			break;
		case 14:
			colorofShirt = "rgba(128,128,128,1)";
			break;
		case 15:
			colorofShirt = "rgba(192,192,192,1)";
			break;
		case 16:
			colorofShirt = "rgba(255,255,255,1)";
			break;
		}
		switch (PantsNum) {
		case 1:
			colorofPants = "rgba(128,0,0,1)";
			break;
		case 2:
			colorofPants = "rgba(255,0,0,1)";
			break;
		case 3:
			colorofPants = "rgba(128,0,128,1)";
			break;
		case 4:
			colorofPants = "rgba(255,0,255,1)";
			break;
		case 5:
			colorofPants = "rgba(0,128,0,1)";
			break;
		case 6:
			colorofPants = "rgba(0,255,0,1)";
			break;
		case 7:
			colorofPants = "rgba(128,128,0,1)";
			break;
		case 8:
			colorofPants = "rgba(255,255,0,1)";
			break;
		case 9:
			colorofPants = "rgba(0,0,128,1)";
			break;
		case 10:
			colorofPants = "rgba(0,0,255,1)";
			break;
		case 11:
			colorofPants = "rgba(0,128,128,1)";
			break;
		case 12:
			colorofPants = "rgba(0,255,255,1)";
			break;
		case 13:
			colorofPants = "rgba(0,0,0,1)";
			break;
		case 14:
			colorofPants = "rgba(128,128,128,1)";
			break;
		case 15:
			colorofPants = "rgba(192,192,192,1)";
			break;
		case 16:
			colorofPants = "rgba(255,255,255,1)";
			break;
		}
		switch (FootwearNum) {
		case 1:
			colorofFootwear = "rgba(128,0,0,1)";
			break;
		case 2:
			colorofFootwear = "rgba(255,0,0,1)";
			break;
		case 3:
			colorofFootwear = "rgba(128,0,128,1)";
			break;
		case 4:
			colorofFootwear = "rgba(255,0,255,1)";
			break;
		case 5:
			colorofFootwear = "rgba(0,128,0,1)";
			break;
		case 6:
			colorofFootwear = "rgba(0,255,0,1)";
			break;
		case 7:
			colorofFootwear = "rgba(128,128,0,1)";
			break;
		case 8:
			colorofFootwear = "rgba(255,255,0,1)";
			break;
		case 9:
			colorofFootwear = "rgba(0,0,128,1)";
			break;
		case 10:
			colorofFootwear = "rgba(0,0,255,1)";
			break;
		case 11:
			colorofFootwear = "rgba(0,128,128,1)";
			break;
		case 12:
			colorofFootwear = "rgba(0,255,255,1)";
			break;
		case 13:
			colorofFootwear = "rgba(0,0,0,1)";
			break;
		case 14:
			colorofFootwear = "rgba(128,128,128,1)";
			break;
		case 15:
			colorofFootwear = "rgba(192,192,192,1)";
			break;
		case 16:
			colorofFootwear = "rgba(255,255,255,1)";
			break;
		}
		game_canvas_personages.insertAdjacentHTML('beforeend', "<canvas id=\"gamecanvaspersonage(" + Skin + "," + HairstyleNum + "," + EyeNum + "," + ShirtNum + "," + PantsNum + "," + FootwearNum + ")\" style=\"height:32px;width:512px;-ms-interpolation-mode: nearest-neighbor;image-rendering: pixelated;\"></canvas>");
		game_canvas_personages.insertAdjacentHTML('beforeend', "<p id=\"gamecanvaspersonagep(" + Skin + "," + HairstyleNum + "," + EyeNum + "," + ShirtNum + "," + PantsNum + "," + FootwearNum + ")\" >" + colorofskin3 + ";" + colorofskin2 + ";" + colorofskin1 + ";" + colorofHairstyle3 + ";" + colorofHairstyle2 + ";" + colorofHairstyle1 + ";" + colorofEye + ";" + colorofShirt + ";" + colorofPants + ";" + colorofFootwear + "</p>");

		var game_canvas_personage = document.getElementById("gamecanvaspersonage(" + Skin + "," + HairstyleNum + "," + EyeNum + "," + ShirtNum + "," + PantsNum + "," + FootwearNum + ")");
		var game_canvas_personagep = document.getElementById("gamecanvaspersonagep(" + Skin + "," + HairstyleNum + "," + EyeNum + "," + ShirtNum + "," + PantsNum + "," + FootwearNum + ")");
		setTimeout(function f() {
			game_canvas_personage.remove();
			game_canvas_personagep.remove();
		}, 20000);
		game_personage_ctx = game_canvas_personage.getContext("2d");
		if (!game_img_personage.complete || (typeof game_img_personage.naturalWidth != "undefined" && game_img_personage.naturalWidth == 0) ) {
			return false;
		}
		if (!game_img_personage_gerl.complete || (typeof game_img_personage_gerl.naturalWidth != "undefined" && game_img_personage_gerl.naturalWidth == 0) ) {
			return false;
		}
		game_canvas_personage.width = game_img_personage.width;
		game_canvas_personage.height = game_img_personage.height;
		if (HairstyleNum==5||HairstyleNum==4)
			game_personage_ctx.drawImage(game_img_personage_gerl, 0, 0);
		else
			game_personage_ctx.drawImage(game_img_personage, 0, 0);
		var myImageData = game_personage_ctx.createImageData(game_canvas_personage.width, game_canvas_personage.height);
		var pixelData = [0, 0, 0, 0];
		var pixelsData = game_personage_ctx.getImageData(0, 0, game_img_personage.width, game_img_personage.height).data;
		var game_r,
		game_g,
		game_b,
		game_a;
		for (var i = 0; i < game_canvas_personage.width; i++)
			for (var j = 0; j < game_canvas_personage.height; j++) {
				pixelData = [pixelsData[((j * (myImageData.width * 4)) + (i * 4)) + 0], pixelsData[((j * (myImageData.width * 4)) + (i * 4)) + 1], pixelsData[((j * (myImageData.width * 4)) + (i * 4)) + 2], pixelsData[((j * (myImageData.width * 4)) + (i * 4)) + 3]];
				game_r = ((j * (myImageData.width * 4)) + (i * 4)) + 0;
				game_g = ((j * (myImageData.width * 4)) + (i * 4)) + 1;
				game_b = ((j * (myImageData.width * 4)) + (i * 4)) + 2;
				game_a = ((j * (myImageData.width * 4)) + (i * 4)) + 3;
				myImageData.data[game_r] = pixelData[0];
				myImageData.data[game_g] = pixelData[1];
				myImageData.data[game_b] = pixelData[2];
				myImageData.data[game_a] = pixelData[3];
				if ((pixelData[0] == 224) && (pixelData[1] == 162) && (pixelData[2] == 90)) {
					myImageData.data[game_r] = RGBAToR(colorofskin3);
					myImageData.data[game_g] = RGBAToG(colorofskin3);
					myImageData.data[game_b] = RGBAToB(colorofskin3);
					myImageData.data[game_a] = 255;
				} else
					if ((pixelData[0] == 238) && (pixelData[1] == 184) && (pixelData[2] == 114)) {
						myImageData.data[game_r] = RGBAToR(colorofskin2);
						myImageData.data[game_g] = RGBAToG(colorofskin2);
						myImageData.data[game_b] = RGBAToB(colorofskin2);
						myImageData.data[game_a] = 255;
					} else
						if ((pixelData[0] == 255) && (pixelData[1] == 194) && (pixelData[2] == 123)) {
							myImageData.data[game_r] = RGBAToR(colorofskin1);
							myImageData.data[game_g] = RGBAToG(colorofskin1);
							myImageData.data[game_b] = RGBAToB(colorofskin1);
							myImageData.data[game_a] = 255;
						} else
							if ((pixelData[0] == 97) && (pixelData[1] == 56) && (pixelData[2] == 17)) {
								myImageData.data[game_r] = RGBAToR(colorofHairstyle3);
								myImageData.data[game_g] = RGBAToG(colorofHairstyle3);
								myImageData.data[game_b] = RGBAToB(colorofHairstyle3);
								myImageData.data[game_a] = 255;
							} else
								if ((pixelData[0] == 122) && (pixelData[1] == 73) && (pixelData[2] == 25)) {
									myImageData.data[game_r] = RGBAToR(colorofHairstyle2);
									myImageData.data[game_g] = RGBAToG(colorofHairstyle2);
									myImageData.data[game_b] = RGBAToB(colorofHairstyle2);
									myImageData.data[game_a] = 255;
								} else
									if ((pixelData[0] == 133) && (pixelData[1] == 83) && (pixelData[2] == 33)) {
										myImageData.data[game_r] = RGBAToR(colorofHairstyle1);
										myImageData.data[game_g] = RGBAToG(colorofHairstyle1);
										myImageData.data[game_b] = RGBAToB(colorofHairstyle1);
										myImageData.data[game_a] = 255;
									} else
										if ((pixelData[0] == 37) && (pixelData[1] == 75) && (pixelData[2] == 139)) {
											myImageData.data[game_r] = RGBAToR(colorofEye);
											myImageData.data[game_g] = RGBAToG(colorofEye);
											myImageData.data[game_b] = RGBAToB(colorofEye);
											myImageData.data[game_a] = 255;
										} else
											if ((pixelData[0] == 246) && (pixelData[1] == 249) && (pixelData[2] == 255)) {
												myImageData.data[game_r] = RGBAToR(colorofShirt);
												myImageData.data[game_g] = RGBAToG(colorofShirt);
												myImageData.data[game_b] = RGBAToB(colorofShirt);
												myImageData.data[game_a] = 255;
											} else
												if ((pixelData[0] == 232) && (pixelData[1] == 232) && (pixelData[2] == 232)) {
													myImageData.data[game_r] = Math.max(RGBAToR(colorofShirt) - 23, 0);
													myImageData.data[game_g] = Math.max(RGBAToG(colorofShirt) - 23, 0);
													myImageData.data[game_b] = Math.max(RGBAToB(colorofShirt) - 23, 0);
													myImageData.data[game_a] = 255;
												} else
													if ((pixelData[0] == 201) && (pixelData[1] == 201) && (pixelData[2] == 201)) {
														myImageData.data[game_r] = Math.max(RGBAToR(colorofShirt) - 54, 0);
														myImageData.data[game_g] = Math.max(RGBAToG(colorofShirt) - 54, 0);
														myImageData.data[game_b] = Math.max(RGBAToB(colorofShirt) - 54, 0);
														myImageData.data[game_a] = 255;
													} else
														if ((pixelData[0] == 45) && (pixelData[1] == 86) && (pixelData[2] == 153)) {
															myImageData.data[game_r] = RGBAToR(colorofPants);
															myImageData.data[game_g] = RGBAToG(colorofPants);
															myImageData.data[game_b] = RGBAToB(colorofPants);
															myImageData.data[game_a] = 255;
														} else
															if ((pixelData[0] == 38) && (pixelData[1] == 77) && (pixelData[2] == 141)) {
																myImageData.data[game_r] = Math.max(RGBAToR(colorofPants) - 23, 0);
																myImageData.data[game_g] = Math.max(RGBAToG(colorofPants) - 23, 0);
																myImageData.data[game_b] = Math.max(RGBAToB(colorofPants) - 23, 0);
																myImageData.data[game_a] = 255;
															} else
																if ((pixelData[0] == 28) && (pixelData[1] == 63) && (pixelData[2] == 123)) {
																	myImageData.data[game_r] = Math.max(RGBAToR(colorofPants) - 54, 0);
																	myImageData.data[game_g] = Math.max(RGBAToG(colorofPants) - 54, 0);
																	myImageData.data[game_b] = Math.max(RGBAToB(colorofPants) - 54, 0);
																	myImageData.data[game_a] = 255;
																} else
																	if ((pixelData[0] == 145) && (pixelData[1] == 7) && (pixelData[2] == 7)) {
																		myImageData.data[game_r] = RGBAToR(colorofFootwear);
																		myImageData.data[game_g] = RGBAToG(colorofFootwear);
																		myImageData.data[game_b] = RGBAToB(colorofFootwear);
																		myImageData.data[game_a] = 255;
																	} else
																		if ((pixelData[0] == 170) && (pixelData[1] == 29) && (pixelData[2] == 29)) {
																			myImageData.data[game_r] = Math.max(RGBAToR(colorofFootwear) - 63, 0);
																			myImageData.data[game_g] = Math.max(RGBAToG(colorofFootwear) - 63, 0);
																			myImageData.data[game_b] = Math.max(RGBAToB(colorofFootwear) - 63, 0);
																			myImageData.data[game_a] = 255;
																		} else
																			if ((pixelData[0] == 179) && (pixelData[1] == 37) && (pixelData[2] == 37)) {
																				myImageData.data[game_r] = Math.max(RGBAToR(colorofFootwear) - 74, 0);
																				myImageData.data[game_g] = Math.max(RGBAToG(colorofFootwear) - 74, 0);
																				myImageData.data[game_b] = Math.max(RGBAToB(colorofFootwear) - 74, 0);
																				myImageData.data[game_a] = 255;
																			}

			}
		game_personage_ctx.putImageData(myImageData, 0, 0);

	}

}
function game_get_texture(x, y) {
	return 5;
}
function RGBAToR(s) {
	var j = 0;
	for (var i = 4; i < s.length; i++)
		if ((s[i] >= '0') && (s[i] <= '9')) {
			j = j * 10;
			j += s[i] - '0';
		} else if (s[i] == ",")
			break;
	return j;
	//return parseInt(s.split('rgba(')[1].split(',')[0]);
}
function RGBAToG(s) {
	return parseInt(s.split(',')[1]);
}
function RGBAToB(s) {
	return parseInt(s.split(',')[2]);
}
function parse_notification(s)
{
	var myjson=JSON.parse(s);
	var mytime=Date.now()/1000;
	var keys=[];
	for(var k in myjson) if ((parseFloat(k)<mytime)&&(GetVal('notification_'+myjson[k][0],0)==0)) keys.push(k);
	for (var i=0;i<keys.length;i++)
	{
		SaveVal('notification_'+myjson[keys[i]][0],1);
		alert(myjson[keys[i]][1]);
	}
}

/*
function test_notification()
{
	Serv_LoadFile('notification.json',parse_notification)
	setTimeout(test_notification,20000);
}
setTimeout(test_notification,5000);
*/
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER

function helper_open()
{
	document.getElementById("helper_button").style.display="none";
	document.getElementById("helper_div").style.display="";
	document.getElementById("helper_div").style.opacity=".1";
	setTimeout(function f(){document.getElementById("helper_div").style.opacity=".2";},50);
	setTimeout(function f(){document.getElementById("helper_div").style.opacity=".5";},100);
	setTimeout(function f(){document.getElementById("helper_div").style.opacity=".7";},150);
	setTimeout(function f(){document.getElementById("helper_div").style.opacity=".9";},200);
	setTimeout(function f(){document.getElementById("helper_div").style.opacity="1";},250);
}
function helper_close()
{
	setTimeout(function f(){document.getElementById("helper_div").style.opacity=".9";},50);
	setTimeout(function f(){document.getElementById("helper_div").style.opacity=".7";},100);
	setTimeout(function f(){document.getElementById("helper_div").style.opacity=".5";},150);
	setTimeout(function f(){document.getElementById("helper_div").style.opacity=".2";},200);
	setTimeout(function f(){document.getElementById("helper_div").style.display="none";document.getElementById("helper_button").style.display="";},250);
}



function showFortuneWheel(data, callback) {
    if (data.probability < 0 || data.probability > 1 || [1, 2].indexOf(data.res) === -1) {
        console.error("Invalid input data");
        return;
    }

    // Контейнер для колеса
    var container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%) scale(0.8)';
    container.style.opacity = '0';
    container.style.zIndex = '1000';
    container.style.transition = 'all 0.5s ease-out';

    // Canvas для колеса
    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.transition = 'transform 5s cubic-bezier(0.2, 0.8, 0.3, 1)';
    container.appendChild(canvas);

    // Указатель
    var pointer = document.createElement('div');
    pointer.style.position = 'absolute';
    pointer.style.top = '0';
    pointer.style.left = '50%';
    pointer.style.transform = 'translateX(-50%)';
    pointer.style.width = '0';
    pointer.style.height = '0';
    pointer.style.borderLeft = '15px solid transparent';
    pointer.style.borderRight = '15px solid transparent';
    pointer.style.borderTop = '25px solid #FFF';
    container.appendChild(pointer);

    document.body.appendChild(container);

    // Анимация появления колеса
    setTimeout(function() {
        container.style.opacity = '1';
        container.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);

    // Расчет секторов
    var goldenAngle = data.probability * 360;
    var grayAngle = 360 - goldenAngle;
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = Math.min(centerX, centerY) - 10;
    
    // Золотой сектор
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    var offset = Math.PI / 2;
    ctx.arc(centerX, centerY, radius, 0 - offset, goldenAngle / 180 * Math.PI - offset);
    ctx.closePath();
    ctx.fillStyle = '#FFD700';
    ctx.fill();

    // Серый сектор
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius * 0.98, goldenAngle / 180 * Math.PI - offset, 2 * Math.PI - offset);
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();
    
    ctx.font = "60px Open Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline="middle";
    ctx.fillStyle = '#FFF';
    ctx.translate(centerX, centerY);
    ctx.rotate(goldenAngle / 180 * Math.PI / 2 + Math.PI );
    ctx.fillText("$", 0, radius * 0.7 );

    // Конечный угол
    var fullRotations = 5;
    var targetRotation;
    var rnd = Math.random() * 0.5 + 0.25;
    if (data.res === 2) {
        targetRotation = 360 * fullRotations - goldenAngle * rnd;
    } else {
        targetRotation = 360 * fullRotations - goldenAngle - grayAngle * rnd;
    }

    setTimeout(function() {
        canvas.style.transform = 'rotate(' + targetRotation + 'deg)';
		callback();
    }, 100);

    // Функция для создания салюта с гравитацией
    function createFireworks() {
        var fireworksContainer = document.createElement('div');
        fireworksContainer.style.position = 'fixed';
        fireworksContainer.style.top = '0';
        fireworksContainer.style.left = '0';
        fireworksContainer.style.width = '100%';
        fireworksContainer.style.height = '100%';
        fireworksContainer.style.zIndex = '999';
        fireworksContainer.style.pointerEvents = 'none';
        document.body.appendChild(fireworksContainer);

        var particles = [];
        var colors = [//'#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
						'#F1E5AC', '#EEBC1D', '#FFD700', '#F1E5AC', '#EEBC1D', '#FFD700'];
        var particleCount = 120;

        // Гравитационная константа
        var gravity = 0.02;

        // Создание частиц
        for (var i = 0; i < particleCount; i++) {
            var p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.width = '10px';
            p.style.height = '10px';
            p.style.borderRadius = '50%';
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.left = '50%';
            p.style.top = '50%';
            p.style.opacity = '1';
            p.style.transform = 'translate(-50%, -50%)';
            fireworksContainer.appendChild(p);
            
            // Начальные параметры частицы
            var angle = Math.random() * Math.PI * 2;
            var speed = 0.25 + Math.random() * 1;
            
            particles.push({
                element: p,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 1 + Math.random() * 1,
                life: 1000 + Math.random() * 2000
            });
        }

        // Анимация частиц с гравитацией
        var lastTime = Date.now();
        
        function animateParticles() {
            var currentTime = Date.now();
            var deltaTime = Math.min(50, currentTime - lastTime); // Ограничиваем deltaTime
            lastTime = currentTime;
            
            var aliveParticles = 0;
            
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                if (!p.element.parentNode || p.life <= 0) continue;
                
                // Применяем гравитацию
                p.vy += gravity;
                
                // Обновляем позицию
                p.x += p.vx * deltaTime;
                p.y += p.vy * deltaTime;
                
                // Уменьшаем время жизни
                p.life -= deltaTime;
                
                // Обновляем элемент
                p.element.style.left = p.x + 'px';
                p.element.style.top = p.y + 'px';
                p.element.style.opacity = Math.max(0, p.life / 100);
                p.element.style.width = (p.size * Math.max(0, p.life / 100)) + 'px';
                p.element.style.height = (p.size * Math.max(0, p.life / 100)) + 'px';
                
                // Проверяем жизнь частицы
                if (p.life > 0) {
                    aliveParticles++;
                } else {
                    if (p.element.parentNode) {
                        p.element.parentNode.removeChild(p.element);
                    }
                }
            }
            
            if (aliveParticles > 0) {
                setTimeout(animateParticles, 30);
            } else {
                if (fireworksContainer.parentNode) {
                    document.body.removeChild(fireworksContainer);
                }
            }
        }
        
        setTimeout(animateParticles, 30);
    }

    // Обработка завершения анимации
    var handleAnimationEnd = function() {
        // Анимация исчезновения колеса
        container.style.transition = 'all 0.5s ease-in';
        container.style.opacity = '0';
        container.style.transform = 'translate(-50%, -50%) scale(0.8)';
        if (data.res === 2)
            createFireworks();
        
        setTimeout(function() {
            // Удаляем колесо
            if (container.parentNode) {
                document.body.removeChild(container);
            }
            
        }, 500);
    };

    setTimeout(handleAnimationEnd, 6000);
}



//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
//HELPER---HELPER---HELPER---HELPER---HELPER---HELPER---HELPER
