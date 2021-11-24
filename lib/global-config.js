const vscode = require("vscode");

const extName = "good-tool";
const vsCodeDir = ".vscode";

const { workspace } = vscode;

const updateConfig = () => {
  const config = workspace.getConfiguration();
  // 开启服务
  global.open = config.get("open");
  // 服务端口
  global.port = config.get("port");
  // 使用配置文件配置代理
  global.useFileConfigProxy = config.get("useFileConfigProxy");
  // 初始化代理服务器
  global.useFileConfigProxy || global.proxy.set("*", config.get("proxy"));
  // 开启模拟数据
  global.openAnalogData = config.get("openAnalogData");
  // 开启urlPath模糊匹配
  global.openFuzzyMatch = config.get("openFuzzyMatch");
};

if (workspace.workspaceFolders) {
  // 项目路径
  global.projectPath = workspace.workspaceFolders[0].uri.fsPath;
  // .vscode路径
  global.vsCodeConfigPath = `${global.projectPath}\\${vsCodeDir}\\`;
  // 插件配置文件路径
  global.dirPath = `${global.vsCodeConfigPath}${extName}\\`;
  // 代理配置文件路径
  global.proxyConfigPath = `${global.dirPath}proxy.json`;
  // 代理服务器
  global.proxy = new Map();
  updateConfig();
}

const getProjectPath = () => {
  return global.projectPath;
};

const getPort = () => {
  return global.port;
};

const setPort = (port) => {
  port = port & 65535;
  global.port = port;
  workspace.getConfiguration().update("good-tool.port", port);
};

const getVsCodeConfigPath = () => {
  return global.vsCodeConfigPath;
};

const getVsCodeConfigPathByProjectPath = (projectPath) => {
  return `${projectPath}\\${vsCodeDir}\\`;
};

const getDirPath = () => {
  return global.dirPath;
};

const getDirPathByProjectPath = (projectPath) => {
  return `${getVsCodeConfigPathByProjectPath(projectPath)}${extName}\\`;
};

const getProxy = () => {
  return global.proxy;
};

const setProxy = (proxy) => {
  global.proxy = proxy;
};

const isOpen = () => {
  return global.open;
};

const isUseFileConfigProxy = () => {
  return global.useFileConfigProxy;
};

const getProxyConfigPath = () => {
  return global.proxyConfigPath;
};

const getProxyConfigPathByProjectPath = (projectPath) => {
  return `${getDirPathByProjectPath(projectPath)}proxy.json`;
};

const getOpenAnalogData = () => {
  return global.openAnalogData;
};

const getOpenFuzzyMatch = () => {
  return global.openFuzzyMatch;
}

module.exports = {
  extName,
  updateConfig,
  getProjectPath,
  getPort,
  setPort,
  getVsCodeConfigPath,
  getVsCodeConfigPathByProjectPath,
  getDirPath,
  getDirPathByProjectPath,
  getProxy,
  setProxy,
  isOpen,
  isUseFileConfigProxy,
  getProxyConfigPath,
  getProxyConfigPathByProjectPath,
  getOpenAnalogData,
  getOpenFuzzyMatch
};
