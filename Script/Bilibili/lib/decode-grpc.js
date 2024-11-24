import * as fs from "fs";
import * as zlib from "zlib";
import { spawnSync } from "child_process";

const fileName = "91E8D557-9DF7-4A9A-A29A-032B7C35F362";
const path = "D:/Mfiles/";
const output = fileName;
const grpcResponse = fs.readFileSync(path + fileName);

const header = grpcResponse.subarray(0, 5);
// let data = grpcResponse.subarray(5);
let data = grpcResponse

// if (header[0]) {
//   data = zlib.gunzipSync(data);
// }

let isProto = true
let protoc
if (isProto) {
  const messageType = "youtube.response.watch.Watch"
  const protobuf = `watch.proto`
  protoc = spawnSync("protoc", [`--decode=${messageType}`, `--proto_path=${path}`, protobuf], {
    input: data,
    encoding: "utf8",
  })
} else {
  protoc = spawnSync("protoc", ["--decode_raw"], {
    input: data,
    encoding: "utf8",
  });
}

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
