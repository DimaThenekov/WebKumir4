function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
}
	
function myf()
{
	if (document.getElementsByClassName('btn btn-primary btn-block btn-large')[0].disabled)
		return;
	document.getElementsByClassName('btn btn-primary btn-block btn-large')[0].disabled=true;
	SaveVal("login",document.getElementsByName('u')[0].value);
	open_loader();
	write_text_loader('Авторизуемся...');
	sessionStorage.clear();
	server_request('login', {
		name: document.getElementsByName('u')[0].value,
		password: document.getElementsByName('p')[0].value
	}, loginup, loginup_err);
	//console.log('press');
}
function loginup(g)
{
	SaveVal("name", document.getElementsByName('u')[0].value);
	SaveVal("token", g);
	document.location.href="./select_server.html";
}

function loginup_err(g)
{
	
	open_loader();
	write_text_loader('Неверное имя или пароль');
	setTimeout(()=>{
		document.getElementsByClassName('btn btn-primary btn-block btn-large')[0].disabled=false;
		close_loader();
	},1000);
}

server_request('is_registration_enabled', undefined, _can_i_register_f);
function _can_i_register_f(s)
{
	if (s)
		document.getElementById('can_reg').style.display='';
	close_loader();
}



var img = new Image();
img.onload = function() {
	if (null == localStorage.getItem('backgraund_image'))
	{
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
};

if (null != localStorage.getItem('backgraund_image'))
	img.src = localStorage.getItem('backgraund_image');
else
	img.src = 'tileset/background.jpg';