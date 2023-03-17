# hexo-webp-polyfill
[![NPM version](https://badge.fury.io/js/hexo-webp-polyfill.svg)](https://www.npmjs.com/package/hexo-webp-polyfill)

WebP image format browser polyfill for Hexo.

## Installation
- 📦 NPM
```
npm i hexo-webp-polyfill --save
```

- 📦 Yarn
```
yarn add hexo-webp-polyfill
```

- ⚙️ Enable the plugin in the main ``_config.yml`` file:
```yaml
webp_polyfill:
  enable: true
```

## Features
- ✅ Load [WebP](https://developers.google.com/speed/webp) image format in **Internet Explorer 9-11** and **IE-based browser**.
- ⚖️ ``93 kiB`` Polyfiller JS after Gzip (**will not** load in modern browsers)
- ⚖️ ``303 B`` main JS after Brotli (**will** load in all browsers)
- ⚠️ Doesn't yet support css ``background-image`` and ``picture`` elements([upstream](https://github.com/chase-moskal/webp-hero) issues).

## Special thanks to
* [chase-moskal/webp-hero](https://github.com/chase-moskal/webp-hero)
