const esbuild = require('esbuild')
const now = new Date().toLocaleString()

esbuild.buildSync({
  entryPoints: ['main.ts'],
  bundle: true,
  minify: true,
  banner: { js: `// Build: ${now}\n// 非压缩状态代码可见同目录下 youtube.src.js` },
  inject: ['./lib/text-polyfill.mjs'],
  sourcemap: false,
  define: { DEBUG: 'false' },
  outfile: '../youtube.js',
})

esbuild.buildSync({
  entryPoints: ['main.ts'],
  bundle: true,
  minify: false,
  banner: { js: `// Build: ${now}` },
  inject: ['./lib/text-polyfill.mjs'],
  sourcemap: false,
  define: { DEBUG: 'true' },
  outfile: '../youtube.src.js',
})
