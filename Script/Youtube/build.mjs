import * as esbuild from 'esbuild'

const now = new Date().toLocaleString()
const debug = false

esbuild.buildSync({
  entryPoints: ['index.ts'],
  bundle: true,
  minify: !debug,
  banner: { js: `// Build: ${now}` },
  inject: ['./lib/text-polyfill.mjs'],
  sourcemap: false,
  outfile: './dist/youtube.response.preview.js',
})