const vscode = require("vscode");
const fs = require("fs");
const {
  getAllScriptFiles,
  getModuleDir,
  getFileContent,
  getParentPath,
} = require("../util");
const { getDefinePath } = require("../global-config");
const { writeLog } = require("../log");

const { window, commands } = vscode;

const autoGenerateDataByResult = async ({ fsPath: path }) => {
  try {
    const content = getFileContent(path);
    const defines = getDefines(content);
    const interfaceDefintions = getInterfaceDefinitions(path, defines);
    const items = Object.keys(interfaceDefintions).map((v) => ({
      label: v,
      picked: true,
    }));
    const selectedKeys = await window.showQuickPick(items, {
      canPickMany: true,
    });
    if (!selectedKeys || selectedKeys.length === 0) {
      return;
    }
    let fileName = await window.showInputBox({
      title: "请输入生成数据定义文件名称",
    });
    if(!fileName){
      return;
    }
    fileName.indexOf(".json") === -1 && (fileName += ".json");
    const selectedDefine = selectedKeys.map(
      (v) => interfaceDefintions[v.label]
    );
    generateDefineFile(fileName, selectedDefine);
  } catch (e) {
    writeLog(e.message);
    window.showInformationMessage("没有检测到可用的定义！");
  }
};

const getDefines = (content) => {
  const pattern = /useResult<(.*?)>\((.*?)\)/g;
  const defines = [];
  for (const match of content.matchAll(pattern)) {
    if (match.length === 3) {
      defines.push([match[1], match[2]]);
    }
  }
  return defines;
};

const getInterfaceDefinitions = (path, defines) => {
  const res = {};
  defines.map(([define]) => {
    const obj = { total: 0 };
    if (define.indexOf("[]") !== -1) {
      define = define.slice(0, -2);
      obj.total = 25;
    }
    obj.columns = getDefinitionOne(path, define);
    res[define] = obj;
  });
  const scriptFiles = getAllScriptFiles(getModuleDir(path));
  for (const file of scriptFiles) {
    defines.map(([define, stateId]) => {
      const url = getUrl(file, stateId);
      if (url) {
        if (define.indexOf("[]") !== -1) {
          define = define.slice(0, -2);
        }
        res[define].url = url;
      }
    });
  }
  return res;
};

const getDefinitionOne = (path, define) => {
  const content = getFileContent(path);
  const pattern = new RegExp(`import {.*?${define}.*?} from "(.*?)";`, "gs");
  const fileName = content
    .matchAll(pattern)
    .next()
    .value[1].replaceAll("/", "\\");
  path = getParentPath(path) + fileName;
  if (fs.existsSync(path + ".ts")) {
    path += ".ts";
  } else if (fs.existsSync(path + ".tsx")) {
    path += ".tsx";
  } else if (fs.existsSync(path + "\\index.ts")) {
    path += "\\index.ts";
  } else {
    path += "\\index.tsx";
  }
  return getInterfaceInfo(path, define);
};

const getInterfaceInfo = (path, define) => {
  const content = getFileContent(path);
  const pattern = new RegExp(`(interface|enum) ${define} \{(.*?)\}`, "gs");
  const match = content.matchAll(pattern).next();
  if (match.value) {
    const [_, type, value] = match.value;
    const str = value.replace(/\n|\r|\t| /g, "");
    return type === "interface" ? parseInterface(path, str) : parseEnum(str);
  }
};

// 获取url
const getUrl = (path, stateId) => {
  const content = getFileContent(path);
  let pattern = new RegExp(`stateId: ${stateId},`, "gs");
  const index = content.search(pattern);
  if (index == -1) {
    return;
  }
  // 向左查找最近的'{'的位置
  let l = index,
    r = index;
  while (l > 0 && content.charAt(l--) !== "{");
  while (r < content.length && content.charAt(r++) !== "}");
  const match = content
    .slice(l + 1, r)
    .matchAll(/url: "(.*?)"/gs)
    .next();
  return match.value[1];
  // 向右查找最近的'}'的位置
};

// 解析interface
const parseInterface = (path, str) => {
  str = str.replace(/\n|\r|\t| /g, "");
  return str.split(/;|,/g).reduce((pre, value) => {
    if (value) {
      const t = value.split(":");
      pre[t[0]] = typeToString(t[0], t[1], path);
    }
    return pre;
  }, {});
};

// 解析enum
const parseEnum = (str) => {
  str = str.replace(/\n|\r|\t|"| /g, "");
  const res = str
    .split(",")
    .reduce((pre, value, index) => {
      if (!value) {
        return pre;
      }
      const t = value.split("=");
      if (t.length === 1) {
        pre.push(index === 0 ? 0 : Number(pre[index - 1]) + 1);
      } else {
        pre.push(t[1]);
      }
      return pre;
    }, [])
    .join(",");
  return `enum(${res})`;
};

const typeToString = (key, type, path) => {
  if (key.toLowerCase().indexOf("time") !== -1) {
    return "timestamp";
  }
  switch (type) {
    case "number":
    case "string":
      return type;
    default:
      return type.indexOf("|") !== -1 ? type : getDefinitionOne(path, type);
  }
};

const generateDefineFile = (fileName, selectedDefine) => {
  const path = (fileName = getDefinePath() + fileName);
  selectedDefine.forEach((define) => (define.method = "get"));
  fs.writeFileSync(path, JSON.stringify(selectedDefine));
  window.showInformationMessage("生成数据描述文件成功!");
  commands.executeCommand("good-tool.generateAnalogData", { fsPath: path })
};

module.exports = {
  autoGenerateDataByResult,
};