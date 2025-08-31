Element.prototype.sdrag = function (g, h, k) {
	function l(a) {
		var b = {};
		if (g && g(c, a.pageX, d, a.pageY, e, b), "vertical" !== k) {
			var f = "pageX" in b ? b.pageX : a.pageX;
			"startX" in b && (d = b.startX);
			0 == "skipX" in b && (c.style.left = f - d + "px")
		}
		"horizontal" !== k && (a = "pageY" in b ? b.pageY : a.pageY, "startY" in b && (e = b.startY), 0 == "skipY" in b && (c.style.top = a - e + "px"))
	}
	var d = 0,
	e = 0,
	c = this,
	f = false;
	this.addEventListener("mousedown", function (a) {
		c.style.width = '64px';
		if (!(a.currentTarget instanceof HTMLElement || a.currentTarget instanceof SVGElement))
			throw Error("Your target must be an html element");
		f = true;
		var b = c.style.left ? parseInt(c.style.left) : 0,
		g = c.style.top ? parseInt(c.style.top) : 0;
		d = a.pageX - b;
		e = a.pageY - g;
		window.addEventListener("mousemove", l)
	});
	window.addEventListener("mouseup", function (a) {
		var v = c.clientWidth;
		c.style.width = '16px';
		if (f == true) {
			f = false;
			window.removeEventListener("mousemove", l);
		}
		g(0,(~~c.style.left.split('px')[0])+v/2);
	});
};
