const esbuild = require('esbuild')
const now = new Date().toLocaleString()

esbuild.buildSync({
  entryPoints: ['main.ts'],
  bundle: true,
  minify: true,
  banner: { js: `// Build: ${now}` },
  inject: ['./lib/text-polyfill.mjs'],
  sourcemap: false,
  define: { DEBUG: 'false' },
  outfile: '../youtube.beta.js',
})
