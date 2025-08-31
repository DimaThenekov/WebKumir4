function SaveVal(a, b) {
	sessionStorage.setItem(a, b);
}
function GetVal(a, b) {
	if (null != sessionStorage.getItem(a))
		return sessionStorage.getItem(a);
	else
		return b;
}
function myf()
{
	server_set_default_varible('token',GetVal('token',''));
	server_request('ping', undefined, loginup);
	//console.log('press');
}
function loginup()
{
	server_request('server_list', undefined, _server_list_f_2);
	document.getElementsByName('back')[0].style.display = '';
	document.getElementsByName('back')[0].onclick=function f(){document.location.href = './login.html';};
	
	Object.keys(sessionStorage).forEach(function(key){
		if (key.indexOf('SaveEditorValue_')==0)
			sessionStorage.removeItem(key);
		if (key=='OpenEditor_task')
			sessionStorage.removeItem(key);
	});
}
function select_serv(g)
{
	//SaveVal("login",GameLogin);
	//SaveVal("password",GamePassword);
	open_loader();
	SaveVal('server',g);
	document.location.href="./index.html";
}
var serv_s=[];
var serv_time='';
function _server_list_f_2(s)
{
	serv_s=s;
	serv_time=new Date();
	_server_list_f();
}
function _server_list_f()
{
	var turnirs=serv_s;
	close_loader();
	function ToText(seconds)
	{
		return ToText2(seconds);
	}
	function ToText2(seconds)
	{
		  interval=seconds / 31536000;
		  if (interval > 9) {
			return '∞'
		  }
		  if (interval > 1) {
			if (Math.floor(seconds / 2592000)%12!=0)
				return Math.floor(interval) + " г. и "+(Math.floor(seconds / 2592000)%12) + " м."
			else
				return Math.floor(interval) + " г.";
		  }
		  interval = seconds / 2592000;
		  if (interval > 1) {
			if (Math.floor(seconds / 86400)%30!=0)
				return Math.floor(interval) + " м. и "+(Math.floor(seconds / 86400)%30) + " д."
			else
				return Math.floor(interval) + " м.";
		  }
		  
		  interval = seconds / 86400;
		  if (interval > 1) {
			if (Math.floor(seconds / 3600)%24!=0)
				return Math.floor(interval) + " д. и "+(Math.floor(seconds / 3600)%24) + " ч."
			else
				return Math.floor(interval) + " д.";
		  }
		  
		  interval = seconds / 3600;
		  if (interval > 1) {
			if (Math.floor(seconds / 60)%60!=0)
				return Math.floor(interval) + " ч. и "+(Math.floor(seconds / 60)%60) + " м."
			else
				return Math.floor(interval) + " ч.";
		  }
		  
		  interval = seconds / 60;
		  if (interval > 1) {
			if (Math.floor(seconds%60)!=0)
				return Math.floor(interval) + " м. и "+Math.floor(seconds%60) + " с."
			else
				return Math.floor(interval) + " м.";
		  }
		  return Math.floor(seconds) + " с.";
	}
	
	
	var s2 = ''+//'<tr class="mth"><th colspan="4">Выберите сервер</th></tr>' +
			'<tr class="mth">' +
				'<th>Название</th>' +
				'<th>Доступность</th>' +
				'<th>Начало</th>' +
				'<th>Продолжительность</th>' +
			'</tr>';
	
	let d = 1000;
	for (var i = 0; i < turnirs.length; i++) {
		var s = turnirs[i];
		var oncl = s.status === 'OK' ? "select_serv('" + s.uid + "')" : '';
		var startText;
		
		if (s.time_start_diff < 0) {
			startText = 'Было ' + ToText2(-s.time_start_diff/1000) + ' назад';
		} else {
			startText = 'Будет через ' + ToText2(s.time_start_diff/1000);
			if (d>s.time_start_diff+1) d = s.time_start_diff+1;
		}
		
		s2 += '<tr class="mtr" onclick="' + oncl + '">' +
				'<td>' + s.name + '</td>' +
				'<td>' + s.status + '</td>' +
				'<td>' + startText + '</td>' +
				'<td>' + ToText2(s.duration) + '</td>' +
			'</tr>';
	}
	
	var temp, div;
	var tbody=document.getElementsByClassName('tab')[0];
	while(temp = tbody.firstChild) {
		tbody.removeChild(temp);
	}
	div = document.createElement('div');
	div.innerHTML = '<table><tbody>' + s2 + '</tbody></table>' ;
	div = div.getElementsByTagName('tbody')[0];
	while(temp = div.firstChild) {
		tbody.appendChild(temp);
	}
	
	setTimeout(()=>{
		server_request('server_list', undefined, _server_list_f_2);
	}, d);
	//document.getElementsByClassName('tab')[0].innerHTML=s2
}



var img = new Image();
img.onload = function() {
	if (null == localStorage.getItem('backgraund_image')){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.height = this.naturalHeight;
		canvas.width = this.naturalWidth;
		ctx.drawImage(this, 0, 0); 
		localStorage.setItem('backgraund_image', canvas.toDataURL('image/jpeg', 0.5));
	}
	
	var canvas = document.getElementById('back_img');
	var ctx = canvas.getContext('2d');
	canvas.height = canvas.clientHeight+1;
	canvas.width = canvas.clientWidth;
	ctx.mozImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	function fff(p,t){
		if (t==undefined)
			t=10;
		if (canvas.height != canvas.clientHeight || canvas.width != canvas.clientWidth)
		{
			canvas.height = canvas.clientHeight;
			canvas.width = canvas.clientWidth;
			var x = 0;
			var y = 0;
			var w = ctx.canvas.width;
			var h = ctx.canvas.height;
			var offsetX = 0.5;
			var offsetY = 0.5;

			var iw = img.width,
				ih = img.height,
				r = Math.min(w / iw, h / ih),
				nw = iw * r,   // new prop. width
				nh = ih * r,   // new prop. height
				cx, cy, cw, ch, ar = 1;

			// decide which gap to fill    
			if (nw < w) ar = w / nw;                             
			if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
			nw *= ar;
			nh *= ar;

			// calc source rectangle
			cw = iw / (nw / w);
			ch = ih / (nh / h);

			cx = (iw - cw) * offsetX;
			cy = (ih - ch) * offsetY;

			// make sure source rectangle is valid
			if (cx < 0) cx = 0;
			if (cy < 0) cy = 0;
			if (cw > iw) cw = iw;
			if (ch > ih) ch = ih;

			// fill image in dest. rectangle
			ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
			window.requestAnimationFrame(fff);
		}
		else
			setTimeout(fff,t,0,Math.min(t*2,200));
	}
	fff(0,1000);
}

if (null != localStorage.getItem('backgraund_image'))
	img.src = localStorage.getItem('backgraund_image');
else
	img.src = 'tileset/background.jpg';
