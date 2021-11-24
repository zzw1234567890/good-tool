const vscode = require("vscode");
const fs = require("fs");
const {
  isUseFileConfigProxy,
  setProxy,
  getProxyConfigPathByProjectPath,
} = require("../global-config");
const { setProxyLastUpdateTime } = require("./checkConfigFile");
const { writeLog } = require("../log");

const { workspace } = vscode;

// 判断文件是否存在，如果不存在则创建
const createIfNotExist = (path) => {
  !fs.existsSync(path) && fs.writeFileSync(path, "");
  return true;
};

// 绑定本地服务和API服务器
const bindProxy = (proxy) => {
  setProxy(proxy);
  setProxyLastUpdateTime(new Date().getTime());
};

// 读取配置文件
const readConfigFilesSync = (path, proxy) => {
  try {
    const proxyConfig = JSON.parse(fs.readFileSync(path).toString());
    for (const item of proxyConfig) {
      proxy.set(item.source, item.target);
    }
    writeLog(`代理配置成功：${path}`);
  } catch (err) {
    writeLog(`代理配置失败，${path}格式错误!`);
  }
};

// 配置proxy
const configProxy = () => {
  if (!isUseFileConfigProxy()) {
    return;
  }
  const proxy = new Map();
  workspace.workspaceFolders.forEach(({ uri: { fsPath } }) => {
    readConfigFilesSync(getProxyConfigPathByProjectPath(fsPath), proxy);
  });
  bindProxy(proxy);
};

// 检查代理配置模式，直接配置代理还是使用配置文件配置代理;检查配置文件是否存在;绑定代理
const initProxy = () => {
  workspace.workspaceFolders.forEach(({ uri: { fsPath } }) => {
    createIfNotExist(getProxyConfigPathByProjectPath(fsPath));
  });
  configProxy();
};

module.exports = {
  initProxy,
  configProxy,
};
