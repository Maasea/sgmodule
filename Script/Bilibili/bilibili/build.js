import * as esbuild from "esbuild";
const now = new Date().toLocaleString();

esbuild.buildSync({
  entryPoints: ["main.js"],
  bundle: true,
  minify: true,
  banner: { js: `// Build: ${now}` },
  inject: ["./lib/time-polyfill.js","./lib/text-polyfill.js"],
  sourcemap: false,
  outfile: "/dist/bilibili.helper.beta.js",
});

