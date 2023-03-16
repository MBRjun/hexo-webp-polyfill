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
	hexo.log.warn(`[hexo-webp-polyfill] Plugin has already installed but not enabled.\nSee https://github.com/MBRjun/hexo-webp-polyfill for more information.`);
	return;
}

// Minify & Copy Polyfiller JS
hexo.extend.generator.register('webp-polyfill', function(locals) {
	return {
		path: '/assets/js/webp-polyfill.min.js',
		data: function() {
			var result = uglifyjs.minify(fs.readFileSync(POLYFILL_SCRIPT_PATH) + fs.readFileSync(WEBPHERO_SCRIPT_PATH));
			return result.code
		}
	};
});

// Polyfill document
hexo.extend.filter.register('after_generate', inject_assets(hexo));
