import * as esbuild from 'esbuild'

const now = new Date().toLocaleString()
const debug = false


esbuild.buildSync({
  entryPoints: ['main-response.ts'],
  bundle: true,
  minify: !debug,
  banner: { js: `// Author: Maasea Build: ${now}` },
  inject: ['./lib/text-polyfill.mjs'],
  sourcemap: false,
  define: { 'DEBUG': `${debug}` },
  target: 'es2020',
  outfile: './dist/youtube.response.preview.js',
})

esbuild.buildSync({
  entryPoints: ['main-request.ts'],
  bundle: true,
  minify: !debug,
  banner: { js: `// Author: Maasea Build: ${now}` },
  inject: ['./lib/text-polyfill.mjs'],
  sourcemap: false,
  define: { 'DEBUG': `${debug}` },
  target: 'es2020',
  outfile: './dist/youtube.request.preview.js',
})
