const vscode = require("vscode");
const fs = require("fs");
const { randomUUID, randomInt } = require("crypto");
const { writeLog } = require("../log");

const { window } = vscode;

const generateDataFile = ({ fsPath: path }) => {
  const configs = JSON.parse(fs.readFileSync(path).toString());
  try {
    const data = configs.map(({ url, method, total = 0, columns }) => ({
      url,
      method,
      data: {
        total: total || 1,
        result: generateData(columns, total),
      },
    }));
    path = path.replace("define\\", "");
    fs.writeFileSync(path, JSON.stringify(data));
    window.showInformationMessage("模拟数据文件生成成功!");
  } catch ({ message }) {
    writeLog("数据定义文件错误，" + message);
    window.showInformationMessage("模拟数据文件生成失败，查看日志了解详情!");
  }
};

const generateData = (columns, total) => {
  if (!total) {
    return generateOne(columns);
  }
  const result = [];
  for (let i = 0; i < total; i++) {
    result.push(generateOne(columns, i));
  }
  return result;
};

const generateOne = (columns, i = 0) => {
  const res = {};
  Object.keys(columns).forEach((key) => {
    let value = columns[key];
    if (value instanceof Object) {
      res[key] = generateData(value.columns, value.total);
      return;
    }
    value = value.replace(" ", "");
    const type = value.split("(")[0];
    const params = getParams(value);
    res[key] = doGenerate(type, params, i);
  });
  return res;
};

const doGenerate = (type, params, i) => {
  switch (type) {
    case "key":
      return generateKey();
    case "number":
      return generateNumber(params);
    case "string":
      return generateString(params);
    case "boolean":
      return generateBoolean();
    case "enum":
      return generateEnum(params);
    case "timestamp":
      return generateTimeStamp(params, i);
    case "array":
      return generateArray(params);
    default:
      throw new Error(
        `不支持的数据类型：${type}, 支持：key | number | string | enum | timestamp | boolean | array`
      );
  }
};

const getParams = (str) => {
  const l = str.indexOf("(");
  if (l === -1) {
    return;
  }
  return str.slice(l + 1, -1).split(",");
};

const generateKey = () => randomUUID();

const generateNumber = (params = [11]) => {
  if (params.length === 2) {
    return randomInt(Number(params[0]), Number(params[1]));
  }
  if (params[0] <= 11) {
    const min = Math.pow(10, params[0] - 1);
    return randomInt(min, min * 9);
  }
  throw new Error("number类型最大支持11位");
};

const generateString = (params = [128]) => {
  let len;
  if (params.length == 2) {
    len = randomInt(Number(params[0]), Number(params[1]));
  } else {
    len = randomInt(Number(params[0]));
  }
  if (len <= 128) {
    let res = "";
    while (res.length < len) {
      res += randomUUID();
    }
    return res.slice(0, len);
  }
  throw new Error("string类型最大支持128位");
};

const generateBoolean = () => randomInt(100) % 2 == 0;

const generateEnum = (params = []) => {
  let index;
  if (params.length > 0) {
    index = randomInt(0, params.length);
    const value = params[index];
    return !isNaN(value) ? Number(value) : value;
  }
  throw new Error("enum类型参数不能为空");
};

const generateTimeStamp = (params = ["day"], num) => {
  num *= 1000;
  let time = new Date().getTime();
  let res;
  switch (params[0]) {
    case "second":
      res = time + num;
      break;
    case "minute":
      res = time + num * 60;
      break;
    case "hour":
      res = time + num * 60 * 60;
      break;
    case "day":
      res = time + num * 60 * 60 * 24;
      break;
    case "month":
      res = time + num * 60 * 60 * 24 * 30;
      break;
    case "year":
      res = time + num * 60 * 60 * 24 * 30 * 12;
      break;
    default:
      throw new Error(
        `不支持的参数类型：${params[0]}, 支持：second | minute | hour | day | month | year`
      );
  }
  return res;
};

const generateArray = (params = ["string", "10"]) => {
  const paramStr = params.join(",");
  const i = paramStr.lastIndexOf(",");
  const typeWithParam = paramStr.slice(0, i);
  const len = Number(paramStr.slice(i + 1));
  const res = [];
  for (let i = 0; i < len; i++) {
    const type = typeWithParam.split("(")[0];
    const params = getParams(typeWithParam);
    res.push(doGenerate(type, params, i));
  }
  return res;
};

module.exports = {
  generateDataFile,
};
