import * as fs from "fs";
import * as zlib from "zlib";
import { spawnSync } from "child_process";

const fileName = "v";
const path = "../raw/";
const output = fileName;
const grpcResponse = fs.readFileSync(path + fileName);

const header = grpcResponse.subarray(0, 5);
let data = grpcResponse.subarray(5);

if (header[0]) {
  data = zlib.gunzipSync(data);
}

const protoc = spawnSync("protoc", ["--decode_raw"], {
  input: data,
  encoding: "utf8",
});

if (protoc.stderr) {
  console.error(`执行命令时出错：${protoc.stderr}`);
} else {
  const decodeStr = protoc.stdout.replace(/(\\\d{3})+/g, Octal2Chinese);
  fs.writeFileSync(`${path}${output}.bin`, decodeStr);
}

function Octal2Chinese(str) {
  const splits = str.split("\\");
  let encoded = "";

  splits.forEach(
    (code) => !code || (encoded += "%" + parseInt(code, 8).toString(16))
  );

  try {
    return decodeURI(encoded);
  } catch (e) {
    console.error(e.toString(), str);
    return str;
  }
}
