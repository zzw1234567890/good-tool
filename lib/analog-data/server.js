// @ts-nocheck
const {window} = require("vscode");
const express = require("express");
const { default: fetch } = require("node-fetch");
const { getPort, setPort, getOpenAnalogData, getOpenFuzzyMatch } = require("../global-config");
const { forward } = require("./forward");
const { getRoutesByMethod } = require("./route-config");
const { writeLog } = require("../log");
const { query } = require("./query");
const app = express();
const wssController = require("../web-view/controller");

// 解析post数据
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 过滤请求
const filter = (req, res, next) => {
  const filterRoutes = ["/", "/favicon.ico"];
  filterRoutes.indexOf(req.originalUrl) === -1
    ? next()
    : res.send("不被允许的请求");
};

// 加入wss的api
wssController(app);

// 拦截所有请求，进行路由选择
app.all("/**", filter, (req, res) => {
  if (!getOpenAnalogData()) {
    forward(req, res);
    return;
  }
  const routes = getRoutesByMethod(req.method);
  const data = matchRoute(req.path, routes);
  if (data) {
    // 如果请求类型为get并且带有查询条件
    req.method.toLowerCase() === "get" && req.query.query
      ? query(req, res, data)
      : res.send(data);
  } else {
    forward(req, res);
  }
});

// 匹配路由，配置成功返回data，否则返回false
const matchRoute = (path, routes) => {
  for (const [url, data] of routes) {
    if(path === url || (getOpenFuzzyMatch() && path.includes(url))){
      writeLog(`命中路由：${url}`);
      return data;
    }
  }
  return false;
};

let prePort = getPort();
// 启动一个http服务
let server;
const start = () => {
  if (server && server.listening) {
    return;
  }
  const port = getPort();
  prePort = port;
  // 启动前检测端口是否占用
  fetch(`http://127.0.0.1:${port}`)
    .then(() => {
      setPort(port + 1);
      window.showInformationMessage(
        `检测到端口冲突，已自动更换端口：${port + 1}`
      );
      start();
    })
    .catch(() => {
      server = app.listen(port, () => {
        writeLog("服务启动：http://127.0.0.1:" + port);
      });
    });
};

const stop = () => {
  server.close();
  writeLog("服务关闭：http://127.0.0.1:" + prePort);
};

const reStart = () => {
  stop();
  start();
};

module.exports = { start, stop, reStart, server, app };
