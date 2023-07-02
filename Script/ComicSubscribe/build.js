import { buildSync } from "esbuild";

const now = new Date().toLocaleString();

buildSync({
  entryPoints: ["index.js"],
  bundle: true,
  minify: true,
  banner: { js: `// Build: ${now} Author: Maasea` },
  sourcemap: false,
  target: "es2020",
  outfile: "./dist/comicSubscribe.js",
});

