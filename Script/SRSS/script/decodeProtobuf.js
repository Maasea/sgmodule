import { spawnSync } from "child_process";
import fs from "fs";
import zlib from "zlib";

const fileName = "path to your file";
const output = `${fileName}.bin`;

// Content-Type is grpc or protobuf
const isGRPC = false;

// read file
const fileData = fs.readFileSync(fileName);
const header = fileData.subarray(0, 5);
let data = isGRPC ? fileData.subarray(5) : fileData;

// decompress gzip
if (isGRPC && header[0]) {
  data = zlib.gunzipSync(data);
}

// use protoc cli to decode protobuf to text
const text = decodeBinary(data, false);

if (text) {
  fs.writeFileSync(output, text);
}

function decodeBinary (data, toCN = false) {
  const protoc = spawnSync("protoc", ["--decode_raw"], {
    input: data, encoding: "utf8",
  });

  if (protoc.stderr) {
    console.error(`ERROR：${protoc.stderr}`);
    return "";
  }

  return toCN
    ? protoc.stdout.replace(/(\\\d{3})+/g, Octal2Chinese)
    : protoc.stdout;
}

function Octal2Chinese (str) {
  const splits = str.split("\\");
  let encoded = "";

  splits.forEach(
    (code) => !code || (encoded += "%" + parseInt(code, 8).toString(16)));

  try {
    return decodeURI(encoded);
  } catch (e) {
    console.error(`[SkIP] ${e.toString()}  ${str}`);
    return str;
  }
}
