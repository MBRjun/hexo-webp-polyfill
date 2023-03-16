'use strict';

var scripts = ["/assets/js/webp-polyfill.min.js?v=1.0.1"];

// Load Polyfiller JS then Polyfill WebP elements
if ('ActiveXObject' in window) {
	parallelLoadScripts(scripts,
	function() {
		console.log('[hexo-webp-polyfill] polyfilling document');
		var webpMachine = new webpHero.WebpMachine();
		webpMachine.polyfillDocument();
	});
}

// Load JS
function parallelLoadScripts(scripts, callback) {
	if (typeof(scripts) !== 'object') {
		var scripts = [scripts];
	}
	var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
	var s = [];
	var loaded = 0;
	for (var i = 0; i < scripts.length; i++) {
		s[i] = document.createElement('script');
		s[i].setAttribute('type', 'text/javascript');
		s[i].onload = s[i].onreadystatechange = function() {
			if (!
			/*@cc_on!@*/
			0 || this.readyState === 'loaded' || this.readyState === 'complete') {
				loaded++;
				this.onload = this.onreadystatechange = null;
				this.parentNode.removeChild(this);
				if (loaded === scripts.length && typeof(callback) === 'function') callback();
			}
		};
		s[i].setAttribute('src', scripts[i]);
		HEAD.appendChild(s[i]);
	}
}
