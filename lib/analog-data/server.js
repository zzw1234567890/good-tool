// @ts-nocheck
const { window } = require("vscode");
const express = require("express");
const expressWs = require("express-ws");
const { default: fetch } = require("node-fetch");
const { getPort, setPort, getOpenAnalogData } = require("../global-config");
const { forward, forwardWs } = require("./forward");
const { getRoutesByMethod, matchRoute } = require("./routeConfig");
const { writeLog } = require("../log");
const { query } = require("./query");

const app = express();
expressWs(app);

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

const defineRoute = () => {
  // 加入wss的api
  wssController(app);

  app.ws("/**", forwardWs);

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
      defineRoute();
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
