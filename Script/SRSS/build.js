import {buildSync} from "esbuild";

const now = new Date().toLocaleString();

buildSync({
    entryPoints: ["index.js"],
    bundle: true,
    minify: true,
    banner: {js: `// Build: ${now}`},
    // inject: ["./lib/textPolyfill.js"], // Insert the code at the top of the output file
    sourcemap: false,
    target: "es2020",
    outfile: "./dist/srss.js",
});

