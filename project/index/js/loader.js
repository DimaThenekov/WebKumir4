
var can_run_script=false;
var __debug=false;
document.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById('loading_text')==null)
	{
		if (__debug) console.log('DOM is load...');
	}
	else
		document.getElementById('loading_text').innerHTML='DOM is load...';
	can_run_script=true;
});
var RunScriptNum=0;
function LoadAndRunScripts(ScriptsBeforeLoadDOM,OnLoadDOM,ScriptsAfterLoadDOM,OnLoadingScripts,OnLoadScripts,debug)
{
	if (debug==undefined)
		debug=false;
	if (!debug)
	{
		function serv_load_script(url, f , i) {
			if (localStorage.getItem('script/'+url)!=null)
			{
				f(localStorage.getItem('script/'+url), i);
				//return;
			}
			function serv_load_script2(url, f , i) {
				var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
				var xhr = new XHR();
				xhr.open('GET', url, true);
				xhr.onload = function () {
					if (xhr.status == 200)
						if (localStorage.getItem('script/'+url)==null)
						{
							localStorage.setItem('script/'+url, xhr.responseText);
							f(xhr.responseText, i);
						}else
						{
							if (localStorage.getItem('script/'+url)!=xhr.responseText)
							{
								localStorage.setItem('script/'+url, xhr.responseText);
								setTimeout(function (){location.href=location.href;},1000);
							}
						}
					else
						xhr.onerror();
				}
				xhr.onerror = function () {
						if (__debug) console.log('Server did not respond');
				}
				xhr.send();
			}
			if (localStorage.getItem('script/'+url)!=null)
				setTimeout(function (){serv_load_script2(url, f , i)},5000);
			else
				serv_load_script2(url, f , i);
		}
		var LoadSourse=[];
		var i;
		for (i=0;i<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length;i++)
			LoadSourse[i]='_NoLoad_';
		function load_css(n)
		{
			var se = document.createElement('style');
			se.type = "text/css";
			se.innerHTML = LoadSourse[n];
			RunScriptNum++;
			document.getElementsByTagName('head')[0].appendChild(se);
		}
		function run_script(n)
		{
			if (n<ScriptsBeforeLoadDOM.length)
				OnLoadingScripts('Загрузка('+Math.round(100*RunScriptNum/(ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length))+'%)...<br\>('+ScriptsBeforeLoadDOM[n]+')');
			if (n>=ScriptsBeforeLoadDOM.length && n<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length)
				OnLoadingScripts('Загрузка('+Math.round(100*RunScriptNum/(ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length))+'%)...<br\>('+ScriptsAfterLoadDOM[n-ScriptsBeforeLoadDOM.length]+')');
			if (n<ScriptsBeforeLoadDOM.length && ScriptsBeforeLoadDOM[n].split('.').pop()=='css')
			{
				load_css(n);
				return;
			}
			if (n>=ScriptsBeforeLoadDOM.length && n<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length && ScriptsAfterLoadDOM[n-ScriptsBeforeLoadDOM.length].split('.').pop()=='css')
			{
				load_css(n);
				return;
			}
			var se = document.createElement('script');
			se.type = "text/javascript";
			se.text = LoadSourse[n]+'\r\nRunScriptNum++;';
			document.getElementsByTagName('head')[0].appendChild(se);
			if (n<ScriptsBeforeLoadDOM.length)
				OnLoadingScripts('Запуск<br\>"'+ScriptsBeforeLoadDOM[n]+'"');
			if (n>=ScriptsBeforeLoadDOM.length && n<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length)
				OnLoadingScripts('Запуск<br\>"'+ScriptsAfterLoadDOM[n-ScriptsBeforeLoadDOM.length]+'"');
		}
		function can_run(v)
		{
			if (!(/*document.readyState === "complete"|| document.readyState === "loaded"|| document.readyState === "interactive"*/can_run_script) && RunScriptNum>=ScriptsBeforeLoadDOM.length)
			{
				if (v!=1234)
					setTimeout(can_run,1);
				return;
			}
			if (LoadSourse[RunScriptNum]==undefined)
			{
				OnLoadScripts();
				return;
			}
			if (LoadSourse[RunScriptNum]=='_NoLoad_')
			{
				if (v!=1234)
					setTimeout(can_run,4);
				return;
			}
			if (LoadSourse[RunScriptNum]=='_Launching_')
			{
				if (v!=1234)
					setTimeout(can_run,4);
				return;
			}
			var tmp=RunScriptNum;
			if (tmp==ScriptsBeforeLoadDOM.length)
				OnLoadDOM();
			run_script(tmp);
			LoadSourse[tmp]='_Launching_';
			//if (v!=1234)
				//setTimeout(can_run,1);
			can_run(v);
		}
		//can_run();
		for (i=0;i<ScriptsBeforeLoadDOM.length;i++)
		{
			serv_load_script(ScriptsBeforeLoadDOM[i],function (s,j){LoadSourse[j]=s;},i);
		}
		for (i=ScriptsBeforeLoadDOM.length;i<LoadSourse.length;i++)
		{
			serv_load_script(ScriptsAfterLoadDOM[i-ScriptsBeforeLoadDOM.length],function (s,j){LoadSourse[j]=s;},i);
		}
		can_run();
	}
	else
	{
		var LoadSourse=[];
		for (var i=0;i<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length;i++)
			LoadSourse[i]='';
		function load_css(n,h)
		{
			var se = document.createElement( 'link' );
			se.rel = 'stylesheet';
			se.type = 'text/css';
			document.getElementsByTagName('head')[0].appendChild(se);
			if (h==1)
				se.href = ScriptsBeforeLoadDOM[n];
			if (h==2)
				se.href = ScriptsAfterLoadDOM[n];
			RunScriptNum++;
		}
		function run_script(n)
		{
			if (n<ScriptsBeforeLoadDOM.length)
				OnLoadingScripts('Загрузка('+Math.round(100*RunScriptNum/(ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length))+'%)...<br\>('+ScriptsBeforeLoadDOM[n]+')');
			if (n>=ScriptsBeforeLoadDOM.length && n<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length)
				OnLoadingScripts('Загрузка('+Math.round(100*RunScriptNum/(ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length))+'%)...<br\>('+ScriptsAfterLoadDOM[n-ScriptsBeforeLoadDOM.length]+')');
			if (n<ScriptsBeforeLoadDOM.length && ScriptsBeforeLoadDOM[n].split('.').pop()=='css')
			{
				load_css(n,1);
				return;
			}
			if (n>=ScriptsBeforeLoadDOM.length && n<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length && ScriptsAfterLoadDOM[n-ScriptsBeforeLoadDOM.length].split('.').pop()=='css')
			{
				load_css(n-ScriptsBeforeLoadDOM.length,2);
				return;
			}
			var se = document.createElement('script');
			se.type = "text/javascript";
			se.onreadystatechange = function () {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					this.onreadystatechange = null;
					this.onload = null;
					RunScriptNum++;
					if (n<ScriptsBeforeLoadDOM.length)
						OnLoadingScripts('Запуск<br\>"'+ScriptsBeforeLoadDOM[n]+'"');
					if (n>=ScriptsBeforeLoadDOM.length && n<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length)
						OnLoadingScripts('Запуск<br\>"'+ScriptsAfterLoadDOM[n-ScriptsBeforeLoadDOM.length]+'"');
				}
			};
			se.onload = function() {
				this.onreadystatechange = null;
				this.onload = null;
				RunScriptNum++;
				if (n<ScriptsBeforeLoadDOM.length)
					OnLoadingScripts('Запуск<br\>"'+ScriptsBeforeLoadDOM[n]+'"');
				if (n>=ScriptsBeforeLoadDOM.length && n<ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length)
					OnLoadingScripts('Запуск<br\>"'+ScriptsAfterLoadDOM[n-ScriptsBeforeLoadDOM.length]+'"');
			};
			if (n<ScriptsBeforeLoadDOM.length)
				se.src = ScriptsBeforeLoadDOM[n];
			else
				se.src = ScriptsAfterLoadDOM[n-ScriptsBeforeLoadDOM.length];
			document.getElementsByTagName('head')[0].appendChild(se);
		}
		function can_run()
		{
			if (!(/*document.readyState === "complete"|| document.readyState === "loaded"|| document.readyState === "interactive"*/can_run_script) && RunScriptNum>=ScriptsBeforeLoadDOM.length)
			{
				setTimeout(can_run,10);
				return;
			}
			if (RunScriptNum>=ScriptsBeforeLoadDOM.length+ScriptsAfterLoadDOM.length)
			{
				OnLoadScripts();
				return;
			}
			if (LoadSourse[RunScriptNum]=='_Launching_')
			{
				setTimeout(can_run,4);
				return;
			}
			var tmp=RunScriptNum;
			if (tmp==ScriptsBeforeLoadDOM.length)
				OnLoadDOM();
			run_script(tmp);
			LoadSourse[tmp]='_Launching_';
			can_run();
		}
		can_run();
	}
}
setTimeout(function f(){
	if (typeof list_file!='undefined' && typeof list_file_after!='undefined')
		LoadAndRunScripts(list_file,function f(){
			if (document.getElementById('loading_text')==null)
			{
				if (__debug) console.log('DOM is loading...');
			}
			else
				document.getElementById('loading_text').innerHTML='DOM is loading...';
		},list_file_after,function f(s)
			{
				if (document.getElementById('loading_text')==null)
				{
					if (__debug) console.log(s);
				}
				else
					document.getElementById('loading_text').innerHTML=s;
			},function f()
			{
				if (typeof onLoadScripts!='undefined')
				{
					onLoadScripts();
				}
				setTimeout(also_list_file_f,1000);
				if (document.getElementById('loading_text')==null)
				{
					if (__debug) console.log('Подключение к серверу...');
				}
				else
					document.getElementById('loading_text').innerHTML='Подключение к серверу...';
			},location.href.indexOf('localhost')>=0);
	else
		if (__debug) console.log('list_file is undefined');
},1);
function also_list_file_f(){
	if (typeof also_list_file!='undefined')
	{
		for (var i=0;i<also_list_file.length;i++)
			if (localStorage.getItem('script/'+also_list_file[i])==null)
			{
				if (__debug) console.log(also_list_file[i]);
				
				var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
				var xhr = new XHR();
				xhr.open('GET', also_list_file[i], true);
				xhr.ind=i;
				xhr.onload = function () {
					if (this.status == 200)
					{
						if (localStorage.getItem('script/'+also_list_file[this.ind])==null)
						{
							localStorage.setItem('script/'+also_list_file[this.ind], this.responseText);
						}
					}
					else
						this.onerror();
				}
				xhr.onerror = function () {
						if (__debug) console.log('Server did not respond');
				}
				xhr.send();
			}
	}
	else
		if (__debug) console.log('also_list_file is undefined');
}
function close_loader()
{
	document.getElementById('loading_text').innerHTML='Готово';
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity=".9";},50);
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity=".7";},100);
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity=".5";},150);
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity=".2";},200);
	setTimeout(function f(){document.getElementById("load_div_id").style.display="none";},250);
	setTimeout(function f(){document.getElementById("load_div_id").style.display="none";},400);
}
function write_text_loader(s)
{
	document.getElementById('loading_text').innerHTML=s;
	//document.getElementById("load_div_id").style.display="";
	//document.getElementById("load_div_id").style.opacity="1";
}
function open_loader()
{
	document.getElementById('loading_text').innerHTML='Загрузка...';
	document.getElementById("load_div_id").style.display="";
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity=".2";},50);
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity=".5";},100);
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity=".7";},150);
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity=".9";},200);
	setTimeout(function f(){document.getElementById("load_div_id").style.opacity="1";},250);
}
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
/*lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib lib*/
var MD5 = function (r) {
	function i(r, n) {
		return r << n | r >>> 32 - n
	}
	function c(r, n) {
		var t,
		o,
		e,
		u,
		a;
		return e = 2147483648 & r,
		u = 2147483648 & n,
		a = (1073741823 & r) + (1073741823 & n),
		(t = 1073741824 & r) & (o = 1073741824 & n) ? 2147483648 ^ a ^ e ^ u : t | o ? 1073741824 & a ? 3221225472 ^ a ^ e ^ u : 1073741824 ^ a ^ e ^ u : a ^ e ^ u
	}
	function n(r, n, t, o, e, u, a) {
		var f;
		return r = c(r, c(c((f = n) & t | ~f & o, e), a)),
		c(i(r, u), n)
	}
	function t(r, n, t, o, e, u, a) {
		var f;
		return r = c(r, c(c(n & (f = o) | t & ~f, e), a)),
		c(i(r, u), n)
	}
	function o(r, n, t, o, e, u, a) {
		return r = c(r, c(c(n ^ t ^ o, e), a)),
		c(i(r, u), n)
	}
	function e(r, n, t, o, e, u, a) {
		return r = c(r, c(c(t ^ (n | ~o), e), a)),
		c(i(r, u), n)
	}
	function u(r) {
		var n,
		t = "",
		o = "";
		for (n = 0; n <= 3; n++)
			t += (o = "0" + (r >>> 8 * n & 255).toString(16)).substr(o.length - 2, 2);
		return t
	}
	var a,
	f,
	C,
	g,
	h,
	v,
	d,
	S,
	l,
	m = Array();
	for (m = function (r) {
		for (var n, t = r.length, o = t + 8, e = 16 * (1 + (o - o % 64) / 64), u = Array(e - 1), a = 0, f = 0; f < t; )
			a = f % 4 * 8, u[n = (f - f % 4) / 4] = u[n] | r.charCodeAt(f) << a, f++;
		return a = f % 4 * 8,
		u[n = (f - f % 4) / 4] = u[n] | 128 << a,
		u[e - 2] = t << 3,
		u[e - 1] = t >>> 29,
		u
	}
		(r = function (r) {
			r = r.replace(/\r\n/g, "\n");
			for (var n = "", t = 0; t < r.length; t++) {
				var o = r.charCodeAt(t);
				o < 128 ? n += String.fromCharCode(o) : (127 < o && o < 2048 ? n += String.fromCharCode(o >> 6 | 192) : (n += String.fromCharCode(o >> 12 | 224), n += String.fromCharCode(o >> 6 & 63 | 128)), n += String.fromCharCode(63 & o | 128))
			}
			return n
		}
			(r)), v = 1732584193, d = 4023233417, S = 2562383102, l = 271733878, a = 0; a < m.length; a += 16)
		v = n(f = v, C = d, g = S, h = l, m[a + 0], 7, 3614090360), l = n(l, v, d, S, m[a + 1], 12, 3905402710), S = n(S, l, v, d, m[a + 2], 17, 606105819), d = n(d, S, l, v, m[a + 3], 22, 3250441966), v = n(v, d, S, l, m[a + 4], 7, 4118548399), l = n(l, v, d, S, m[a + 5], 12, 1200080426), S = n(S, l, v, d, m[a + 6], 17, 2821735955), d = n(d, S, l, v, m[a + 7], 22, 4249261313), v = n(v, d, S, l, m[a + 8], 7, 1770035416), l = n(l, v, d, S, m[a + 9], 12, 2336552879), S = n(S, l, v, d, m[a + 10], 17, 4294925233), d = n(d, S, l, v, m[a + 11], 22, 2304563134), v = n(v, d, S, l, m[a + 12], 7, 1804603682), l = n(l, v, d, S, m[a + 13], 12, 4254626195), S = n(S, l, v, d, m[a + 14], 17, 2792965006), v = t(v, d = n(d, S, l, v, m[a + 15], 22, 1236535329), S, l, m[a + 1], 5, 4129170786), l = t(l, v, d, S, m[a + 6], 9, 3225465664), S = t(S, l, v, d, m[a + 11], 14, 643717713), d = t(d, S, l, v, m[a + 0], 20, 3921069994), v = t(v, d, S, l, m[a + 5], 5, 3593408605), l = t(l, v, d, S, m[a + 10], 9, 38016083), S = t(S, l, v, d, m[a + 15], 14, 3634488961), d = t(d, S, l, v, m[a + 4], 20, 3889429448), v = t(v, d, S, l, m[a + 9], 5, 568446438), l = t(l, v, d, S, m[a + 14], 9, 3275163606), S = t(S, l, v, d, m[a + 3], 14, 4107603335), d = t(d, S, l, v, m[a + 8], 20, 1163531501), v = t(v, d, S, l, m[a + 13], 5, 2850285829), l = t(l, v, d, S, m[a + 2], 9, 4243563512), S = t(S, l, v, d, m[a + 7], 14, 1735328473), v = o(v, d = t(d, S, l, v, m[a + 12], 20, 2368359562), S, l, m[a + 5], 4, 4294588738), l = o(l, v, d, S, m[a + 8], 11, 2272392833), S = o(S, l, v, d, m[a + 11], 16, 1839030562), d = o(d, S, l, v, m[a + 14], 23, 4259657740), v = o(v, d, S, l, m[a + 1], 4, 2763975236), l = o(l, v, d, S, m[a + 4], 11, 1272893353), S = o(S, l, v, d, m[a + 7], 16, 4139469664), d = o(d, S, l, v, m[a + 10], 23, 3200236656), v = o(v, d, S, l, m[a + 13], 4, 681279174), l = o(l, v, d, S, m[a + 0], 11, 3936430074), S = o(S, l, v, d, m[a + 3], 16, 3572445317), d = o(d, S, l, v, m[a + 6], 23, 76029189), v = o(v, d, S, l, m[a + 9], 4, 3654602809), l = o(l, v, d, S, m[a + 12], 11, 3873151461), S = o(S, l, v, d, m[a + 15], 16, 530742520), v = e(v, d = o(d, S, l, v, m[a + 2], 23, 3299628645), S, l, m[a + 0], 6, 4096336452), l = e(l, v, d, S, m[a + 7], 10, 1126891415), S = e(S, l, v, d, m[a + 14], 15, 2878612391), d = e(d, S, l, v, m[a + 5], 21, 4237533241), v = e(v, d, S, l, m[a + 12], 6, 1700485571), l = e(l, v, d, S, m[a + 3], 10, 2399980690), S = e(S, l, v, d, m[a + 10], 15, 4293915773), d = e(d, S, l, v, m[a + 1], 21, 2240044497), v = e(v, d, S, l, m[a + 8], 6, 1873313359), l = e(l, v, d, S, m[a + 15], 10, 4264355552), S = e(S, l, v, d, m[a + 6], 15, 2734768916), d = e(d, S, l, v, m[a + 13], 21, 1309151649), v = e(v, d, S, l, m[a + 4], 6, 4149444226), l = e(l, v, d, S, m[a + 11], 10, 3174756917), S = e(S, l, v, d, m[a + 2], 15, 718787259), d = e(d, S, l, v, m[a + 9], 21, 3951481745), v = c(v, f), d = c(d, C), S = c(S, g), l = c(l, h);
	return (u(v) + u(d) + u(S) + u(l)).toLowerCase()
};
var RegistrationHash = function (h, p) {
	return MD5('Hash:' + h + ';Password:' + p + ';');
};
function SaveVal(a, b) {
	sessionStorage.setItem(a, b);
}
function GetVal(a, b) {
	if (null !== sessionStorage.getItem(a))
		return sessionStorage.getItem(a);
	else
		return b;
}
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var _errors=[];
function _Damp(e2) {
	var XHR2 = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr2 = new XHR2();
	xhr2.open('POST', 'errordamp', true);
	xhr2.onreadystatechange = function () {}
	xhr2.onerror = function () {
		if (debug)
			console.log('Сервер не ответил(3.2).');
	}
	xhr2.send('errordamp+' + encodeURIComponent(e2).replace(/%20/g, "+"));
	setTimeout(function (){alert('Что-то пошло не так...');},500);
}
function _onerror(e,e2)
{
	if (_errors.length==0)
		setTimeout(function (){_Damp(JSON.stringify(_errors));},1500);
	_errors.push([e,e2]);
}
/*var f= window.requestAnimationFrame;
window.requestAnimationFrame = function (a) {
	f(function (){try{a()}catch(e){_onerror(e,'window.requestAnimationFrame');}});
};
var f2= setTimeout;
setTimeout = function (a,t) {
	f2(function (){try{a()}catch(e){_onerror(e,'setTimeout');}},t);
};*/

window.onerror=function (){_onerror(Array.prototype.slice.call(arguments).join('; '),'window.onerror')};


let t = 0;
function uid_gen() {
	return ((+new Date())).toString(16).toUpperCase().padStart(16, '0') +
	(++t % 16**8).toString(16).toUpperCase().padStart(8, '0') +
	Math.floor(Math.random()*(16**8)).toString(16).toUpperCase().padStart(8, '0');
}


// Transport detection and state variables
var sr_transport = typeof WebSocket !== 'undefined' ? 'websocket' : 'xhr';
var sr_ws = null;
var sr_isConnected = false;
var sr_requestQueue = [];
var sr_pendingResponses = {};
var sr_reconnectAttempts = 0;
var sr_currentRequest = null;
var sr_default_varible = {};


function server_set_default_varible(name,value) { sr_default_varible[name] = value; }

var sr_isNotFirstConnect = 0;
function sr_server_ofline(){
	sr_isNotFirstConnect = 1;
	open_loader();
	write_text_loader('Сервер перестал отвечать... Мы пытаемся переподключиться')
 }
function sr_server_online(){
	if(sr_isNotFirstConnect) {
		close_loader();
		sr_isNotFirstConnect = 2;
	}
}


// Connection management
function sr_connect() {
	if (sr_transport === 'websocket') {
		try {
			sr_ws = new WebSocket('ws://'+(location.host));
			sr_ws.onopen = sr_handleConnect;
			sr_ws.onmessage = sr_handleMessage;
			sr_ws.onerror = sr_handleError;
			sr_ws.onclose = sr_handleDisconnect;
		} catch (e) {
			sr_transport = 'xhr';
			sr_connect();
		}
	} else {
		sr_isConnected = true;
		sr_processQueue();
	}
}

function sr_disconnect() {
	sr_isConnected = false;
	if (sr_ws) {
		sr_ws.close();
		sr_ws = null;
	}
}

// Event handlers
function sr_handleConnect() {
	sr_reconnectAttempts = 0;
	sr_isConnected = true;
	sr_server_online();
	sr_processQueue();
}

// Reset sent flags for requests without responses
function sr_resetUnconfirmedRequests() {
    for (var i = 0; i < sr_requestQueue.length; i++) {
        var req = sr_requestQueue[i];
        if (req.sent && !sr_pendingResponses[req.uid]) {
            req.sent = false;
        }
    }
}

function sr_handleDisconnect() {
	if (sr_isConnected) sr_server_ofline();
	sr_isConnected = false;
	sr_resetUnconfirmedRequests();
	sr_scheduleReconnect();
}

function sr_handleError() {
	if (sr_isConnected) sr_server_ofline();
	sr_isConnected = false;
	sr_resetUnconfirmedRequests();
	sr_scheduleReconnect();
}

function sr_handleMessage(event) {
	try {
		var response = JSON.parse(event.data);
		if (response && response.uid) {
			sr_pendingResponses[response.uid] = response;
			sr_processQueue();
		} else
			console.error('Invalid response format');
	} catch (e) {
		console.error('Invalid response format');
	}
}

// Queue processing
function sr_processQueue() {
	if (!sr_isConnected || sr_requestQueue.length === 0) return;

	// Process completed requests in order
	while (sr_requestQueue.length > 0) {
		var nextRequest = sr_requestQueue[0];
		var response = sr_pendingResponses[nextRequest.uid];
		
		if (response) {
			// Remove from queue and pending
			sr_requestQueue.shift();
			delete sr_pendingResponses[nextRequest.uid];
			
			//location.href.includes("/login.html") || location.href.includes("/register.html")) {
			try {
				if (!window.pings) window.pings = [];
				window.pings.push(new Date()-nextRequest.time_start);
				while(window.pings.length>10) window.pings.shift();
				window.ping = Math.floor(window.pings.reduce((x,y)=>x+y,0)/window.pings.length);
				if (response.data !== undefined && response.error === '')
					nextRequest.resolve(response.data);
				else if(response.apiError) {
					nextRequest.reject(response.error);
				} else if (response.error !== 'Token expired!') alert(response.error); else location.href = '/';
			} catch(e) {
				console.error(e);
			}
			
			// Execute callback
		} else {
			break;
		}
	}

	// Send new requests if transport is ready
	if (sr_transport === 'websocket' && sr_isConnected) {
		for (var i = 0; i < sr_requestQueue.length; i++) {
			var req = sr_requestQueue[i];
			if (!req.sent) {
				try {
					sr_ws.send(JSON.stringify({
						...sr_default_varible,
						uid: req.uid,
						command: req.command,
						data: req.body,
					}));
					req.sent = true;
				} catch (e) {
					req.sent = false;
					sr_handleError();
					break;
				}
			}
		}
	}
	else if (sr_transport === 'xhr' && sr_isConnected && !sr_currentRequest) {
		sr_sendXhrRequest();
	}
}

function sr_sendXhrRequest() {
	if (sr_requestQueue.length === 0 || sr_currentRequest) return;

	var request = sr_requestQueue[0];
	sr_currentRequest = request;
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			sr_currentRequest = null;
			
			if (xhr.status === 200) {
				if (sr_isNotFirstConnect < 2) sr_server_online();
				try {
					var response = JSON.parse(xhr.responseText);
					sr_pendingResponses[request.uid] = response;
					sr_processQueue();
				} catch (e) {
					request.sent = false;
					sr_handleError();
				}
			} else {
				request.sent = false;
				sr_handleError();
			}
		}
	};
	
	try {
		xhr.send(JSON.stringify({
			...sr_default_varible,
			uid: request.uid,
			command: request.command,
			data: request.body,
		}));
		request.sent = true;
	} catch (e) {
		request.sent = false;
		sr_currentRequest = null;
		sr_handleError();
	}
}

let sr_scheduleReconnect_timer = 0;
// Reconnection logic
function sr_scheduleReconnect() {
	sr_reconnectAttempts++;
	var delay = Math.min(1000 * Math.pow(2, sr_reconnectAttempts), 5000);
	if (sr_scheduleReconnect_timer) clearTimeout(sr_scheduleReconnect_timer);
	sr_scheduleReconnect_timer = setTimeout(()=>{sr_scheduleReconnect_timer = 0; sr_connect()}, delay);
}



// Main request function
function server_request(command, body, resolve, reject) {
    if (window.frontend_demo) {
		return window.server_request_mock(command, body, resolve, reject);
    }
	var uid = uid_gen();
	var request = {
		uid: uid,
		command: command,
		body: body===undefined?0:body,
		resolve: resolve,
		reject: reject,
		default_varible: sr_default_varible,
		time_start: new Date(),
		sent: false
	};
	
	if (!request.reject) {
		request.reject = function f(s){
			alert(s);
		}
	}
	
	sr_requestQueue.push(request);
	sr_processQueue();
	return sr_requestQueue.length;
}

// Initial connection
if (!window.frontend_demo)
	sr_connect();