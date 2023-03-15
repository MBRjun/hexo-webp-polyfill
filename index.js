'use strict';

const { inject_assets } = require('./lib/webp-polyfill');
const fs = require('fs');
const path = require('path');
const uglifyjs = require("uglify-js");

const { webp_polyfill } = hexo.config;
const ASSET_DIR = path.resolve(__dirname, '..');
const POLYFILL_SCRIPT_PATH = path.join(ASSET_DIR, 'webp-hero/dist-cjs/polyfills.js');
const WEBPHERO_SCRIPT_PATH = path.join(ASSET_DIR, 'webp-hero/dist-cjs/webp-hero.bundle.js');

if (!webp_polyfill || !webp_polyfill.enable) {
	return;
}

hexo.extend.generator.register('webp-polyfill', function(locals) {
	return {
		path: '/assets/js/webp-polyfill.min.js',
		data: function() {
			var result = uglifyjs.minify(fs.readFileSync(POLYFILL_SCRIPT_PATH) + fs.readFileSync(WEBPHERO_SCRIPT_PATH));
			return result.code
		}
	};
});


hexo.extend.filter.register('after_generate', inject_assets(hexo));
