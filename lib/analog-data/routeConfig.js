const vscode = require("vscode");
const fs = require("fs");
const { getDirPathByProjectPath } = require("../global-config");
const { writeLog } = require("../log");
const { setRouteLastUpdateTime, filter } = require("./checkConfigFile");

const { workspace } = vscode;

// 路由配置
global.routes = {
  GetRoutes: new Map(),
  PostRoutes: new Map(),
  PutRoutes: new Map(),
  DeleteRoutes: new Map(),
  WsRoutes: new Map(),
};

const getRoutes = () => {
  return global.routes;
};

const setRoutes = (routes) => {
  global.routes = routes;
};

// 根据请求类型获取对应的路由表
const getRoutesByMethod = (method) => {
  const routes = getRoutes();
  switch (method.toLowerCase()) {
    case "get":
      return routes.GetRoutes;
    case "post":
      return routes.PostRoutes;
    case "put":
      return routes.PutRoutes;
    case "delete":
      return routes.DeleteRoutes;
    case "ws":
      return routes.WsRoutes;
    default:
      return new Map();
  }
};

// 读取配置文件
const readConfigFilesSync = (dir) => {
  const configs = [];
  const files = fs.readdirSync(dir).filter(filter);
  for (let i = 0; i < files.length; i++) {
    const path = (files[i] = dir + files[i]);
    try {
      const config = JSON.parse(fs.readFileSync(path).toString());
      // writeLog(config);
      Array.isArray(config)
        ? configs.push(...config)
        : Object.keys(config).length && configs.push(config);
    } catch (err) {}
  }
  return [files, configs];
};

// 将配置添加到路由表
const bindRoute = (configs) => {
  const routes = {
    GetRoutes: new Map(),
    PostRoutes: new Map(),
    PutRoutes: new Map(),
    DeleteRoutes: new Map(),
    WsRoutes: new Map(),
  };
  const { GetRoutes, PostRoutes, PutRoutes, DeleteRoutes, WsRoutes } = routes;
  for (const config of configs) {
    switch (config.method.toLowerCase()) {
      case "get":
        GetRoutes.set(config.url, config.data);
        break;
      case "post":
        PostRoutes.set(config.url, config.data);
        break;
      case "put":
        PutRoutes.set(config.url, config.data);
        break;
      case "delete":
        DeleteRoutes.set(config.url, config.data);
      case "ws":
        WsRoutes.set(config.url, config.data);
    }
  }
  setRoutes(routes);
};

// 向外部提供配置路由的函数
const configRoute = () => {
  let files = [];
  let configs = [];
  // 读取所有项目文件夹下的配置
  workspace.workspaceFolders.forEach(({ uri: { fsPath } }) => {
    const [f, c] = readConfigFilesSync(getDirPathByProjectPath(fsPath));
    configs = configs.concat(c);
    files = files.concat(f);
  });
  bindRoute(configs);
  writeLog("路由配置成功!");
  setRouteLastUpdateTime(new Date().getTime());
  return true;
};

// 匹配路由，配置成功返回data，否则返回false
const matchRoute = (path, routes) => {
  // 优先url全等匹配
  for (const [url, data] of routes) {
    if (path === url) {
      writeLog(`命中路由：${url}`);
      return data;
    }
  }
  const urls = [];
  // 如果没有匹配到，再进行模糊匹配，模糊匹配选择url最长的
  for (const [url, data] of routes) {
    if (path.includes(url)) {
      urls.push({ url, data });
    }
  }
  if (urls.length) {
    const { url, data } = urls.reduce(
      (pre, current) => (current.url.length > pre.url.length ? current : pre),
      urls[0]
    );
    writeLog(`命中路由：${url}`);
    return data;
  }
  return false;
};

// 初始化函数
const initRoute = () => {
  Promise.resolve().then(() => {
    if (!configRoute()) {
      vscode.window.showErrorMessage("项目路径异常!");
    }
  });
};

module.exports = {
  initRoute,
  configRoute,
  getRoutes,
  setRoutes,
  getRoutesByMethod,
  matchRoute,
};
