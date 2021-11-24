const fs = require("fs");
const { getProjectPath, getDirPath } = require("../global-config");
const { writeLog } = require("../log");
const { tpl } = require("./tpl");

const tplPath = `${getDirPath()}action.tpl`;

// 判断文件是否存在，如果不存在则创建
const createIfNotExist = (path) => {
  !fs.existsSync(path) && fs.writeFileSync(path, tpl);
  return true;
};
// 生成 action 文件代码
const actionGenerator = (configPath, toPath) => {
  try {
    createIfNotExist(tplPath);
    fs.readFile(configPath, (err, data) => {
      data = JSON.parse(data.toString());
      const routeData = Array.isArray(data) ? data : [data];
      fs.writeFileSync(toPath.replace(".json", ".js"), replaceCode(routeData));
      // 写日志
      const projectPath = getProjectPath();
      const configFileName = configPath.replace(projectPath, "");
      const toFileName = toPath.replace(projectPath, "");
      writeLog(`生成 action 文件：${configFileName} -> ${toFileName}`);
    });
  } catch (err) {
    writeLog(err.message);
  }
};

const replaceCode = (routeData) => {
  // 给路由添加方法名称属性
  routeData.map((route) => {
    let { url, method } = route;
    let methodName = (method = method.toLowerCase());
    const urlArr = url.split(/\/|_/);
    for (const str of urlArr) {
      methodName = `${methodName}${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }
    route.methodName = methodName;
  });
  let code = fs.readFileSync(tplPath).toString();
  let startIndex;
  let endIndex;
  // 执行模板中的语句并替换
  while (
    (startIndex = code.indexOf("{{")) > -1 &&
    (endIndex = code.indexOf("}}")) > -1
  ) {
    const execCode = code.slice(startIndex + 2, endIndex);
    const execResult = eval(execCode);
    code = code.slice(0, startIndex) + execResult + code.slice(endIndex + 2);
  }
  return code;
};

module.exports = { actionGenerator };
