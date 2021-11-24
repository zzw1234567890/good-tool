const vscode = require("vscode");
const fs = require("fs");
const {
  isUseFileConfigProxy,
  getDirPathByProjectPath,
  getProxyConfigPathByProjectPath,
} = require("../global-config");

const { workspace } = vscode;

// 过滤非路由配置文件
const filterFiles = ["proxy.json"];
const filter = (file) => {
  return filterFiles.find((e) => e !== file) && file.slice(-5) === ".json";
};

// 路由上次更新配置时间
let routeLastUpdateTime = new Date().getTime();
// 路由配置文件数量
let routeLastConfigFileCount = 0;
// 代理上次更新配置时间
let proxyLastUpdateTime = new Date().getTime();
// 代理配置文件数量
let proxyLastConfigFileCount = 0;

// 获取多项目下的所有路由配置文件
const getRouteFiles = () => {
  let files = [];
  workspace.workspaceFolders.forEach(({ uri: { fsPath } }) => {
    const dir = getDirPathByProjectPath(fsPath);
    files = files.concat(
      fs
        .readdirSync(dir)
        .filter(filter)
        .map((v) => `${dir}\\${v}`)
    );
  });
  return files;
};

// 获取多项目下所有代理配置文件
const getProxyFiles = () => {
  const files = [];
  workspace.workspaceFolders.forEach(({ uri: { fsPath } }) => {
    try {
      const path = getProxyConfigPathByProjectPath(fsPath);
      fs.accessSync(path);
      files.push(path);
    } catch (err) {}
  });
  return files;
};

// 初始化配置文件数量
const initConfigFileCount = () => {
  routeLastConfigFileCount = getRouteFiles().length;
  proxyLastConfigFileCount = getProxyFiles().length;
};

const setRouteLastUpdateTime = (updateTime) => {
  routeLastUpdateTime = updateTime;
};
const setProxyLastUpdateTime = (updateTime) => {
  proxyLastUpdateTime = updateTime;
};

// 是否需要更新路由配置
const isUpdateRouteConfig = () => {
  const files = getRouteFiles();
  if (files.length !== routeLastConfigFileCount) {
    routeLastConfigFileCount = files.length;
    return true;
  }
  for (const file of files) {
    if (fs.statSync(file).mtime.getTime() > routeLastUpdateTime) {
      return true;
    }
  }
  return false;
};
// 是否需要更新代理配置
const isUpdateProxyConfig = () => {
  if (!isUseFileConfigProxy()) {
    return false;
  }
  const files = getProxyFiles();
  if (files.length !== proxyLastConfigFileCount) {
    proxyLastConfigFileCount = files.length;
    return true;
  }
  for (const file of files) {
    if (fs.statSync(file).mtime.getTime() > proxyLastUpdateTime) {
      return true;
    }
  }
  return false;
};

module.exports = {
  initConfigFileCount,
  isUpdateRouteConfig,
  isUpdateProxyConfig,
  setRouteLastUpdateTime,
  setProxyLastUpdateTime,
  filter,
};
