const vscode = require("vscode");
const fs = require("fs");
const {
  isUseFileConfigProxy,
  setProxy,
  getProxyConfigPathByProjectPath,
  getProxyConfigPath,
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

// 切换环境
const switchEnv = async () => {
  const path = getProxyConfigPath();
  const proxyConfig = JSON.parse(fs.readFileSync(path).toString());
  const items = proxyConfig.map(({target, desc}) => {
    let tabCount = 10 - Math.ceil(target.length / 4);
    let label = target;
    while(tabCount-- > 0){
      label += "\t";
    }
    return {
      key: target,
      label: `${label}| desc: ${desc ? desc : ""}`,
    }
  });
  const selectedKey = await vscode.window.showQuickPick(items);
  if(!selectedKey){
    return;
  }
  const len = proxyConfig.length;
  for(let i = 0; i < len; i++){
    const v = proxyConfig[i];
    if(v.target === selectedKey["key"]){
      proxyConfig[i] = proxyConfig[len - 1];
      proxyConfig[len - 1] = v;
      break;
    }
  }
  fs.writeFileSync(path, JSON.stringify(proxyConfig));
};

module.exports = {
  initProxy,
  configProxy,
  switchEnv,
};
