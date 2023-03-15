'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const uglifyjs = require("uglify-js");

const LIB_DIR = path.resolve(__dirname);
const LOADER_SCRIPT_PATH = path.join(LIB_DIR, 'loader.js');
const lib = uglifyjs.minify(fs.readFileSync(LOADER_SCRIPT_PATH).toString(), {
	ie: true
});

function inject_assets(hexo) {
	return () => {
		const route = hexo.route;
		const routes = route.list().filter(path => path.endsWith('.html'));
		const map = routes.map(path => {
			return new Promise((resolve, reject) => {
				const html = route.get(path);
				let htmlTxt = '';
				html.on('data', chunk => (htmlTxt += chunk));
				html.on('end', () => {
					const $ = cheerio.load(htmlTxt, {
						decodeEntities: true
					});
					$('head').append('<script>' + lib.code + '</script>');
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
