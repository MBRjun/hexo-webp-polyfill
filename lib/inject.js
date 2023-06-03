'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const uglifyjs = require("uglify-js");
const webp_polyfill = hexo.config.webp_polyfill;
const LIB_DIR = path.resolve(__dirname);

// Copy minified loader.js to documents
function inject_assets(hexo) {
	return () => {
		const route = hexo.route;
		const routes = route.list().filter(path => path.endsWith('.html'));

		// HTML 4
		if (!webp_polyfill.html5) {
			var JS_BEGIN_TAG = '<script type="text/javascript">';
		} else {
			var JS_BEGIN_TAG = '<script>';
		}

		// Force
		if (!webp_polyfill.force) {
			var LOADER_SCRIPT_PATH = path.join(LIB_DIR, 'loader.js');
		} else {
			var LOADER_SCRIPT_PATH = path.join(LIB_DIR, 'loader-force.js');
		}
		
		const map = routes.map(path => {
			return new Promise((resolve, reject) => {
				const html = route.get(path);
				let htmlTxt = '';
				html.on('data', chunk => (htmlTxt += chunk));
				html.on('end', () => {
					if (!webp_polyfill.minify) {
						var lib = fs.readFileSync(LOADER_SCRIPT_PATH).toString()
					} else {
						var lib = uglifyjs.minify(fs.readFileSync(LOADER_SCRIPT_PATH).toString(), {
							ie: true
						});
					}
					const $ = cheerio.load(htmlTxt, {
						decodeEntities: true
					});
					$('head').append(JS_BEGIN_TAG + lib.code + '</script>');
					hexo.log.debug(`[hexo-webp-polyfill] polyfilling ${path}`);
					resolve({
						path,
						html: $.html()
					});
				});
			});
		});

		return Promise.all(map).then(res =>
			res.map(obj => {
				route.set(obj.path, obj.html);
			}),
		);
	};
}

module.exports = {
	inject_assets
};
