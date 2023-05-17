const { default: fetch } = require("node-fetch");
const {
  getProxy,
  isUseFileConfigProxy,
  getOpenAnalogData,
} = require("../global-config");
const { writeLog } = require("../log");
const request = require("request");
const Websocket = require("ws");
const { getRoutesByMethod, matchRoute } = require("./routeConfig");
const { randomUUID } = require("crypto");

// 忽略https，解决https请求失败问题
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// 根据请求头从proxy中获取对应的API服务器地址
const getTargetAndSource = (req) => {
  const proxy = getProxy();
  const headers = req.headers;
  let source = "*";
  // 如果使用proxy.json配置代理，匹配source，否则使用默认代理
  if (isUseFileConfigProxy()) {
    if (headers["x-forwarded-proto"]) {
      source = `${headers["x-forwarded-proto"]}://${headers["x-forwarded-for"]}:${headers["x-forwarded-port"]}`;
      source = source.replace("ws", "http");
    } else {
      source = `http://${headers.host}`;
    }
  }
  return { source, ...proxy.get(source) };
};

const forwardWs = (wsServer, req) => {
  const { target, stompWs, ws } = getTargetAndSource(req);
  let wsUrl = stompWs ? stompWs : ws;
  wsUrl = wsUrl.includes("ws") ? wsUrl : target.replace("http", "ws") + wsUrl;

  const protocol = req.headers["sec-websocket-protocol"];
  const client = new Websocket(wsUrl, [protocol]);
  client.onmessage = (msg) => {
    // console.log("recive server: ", msg.data);
    wsServer.send(msg.data);
  };
  client.onclose = () => {
    writeLog("服务端连接断开");
  };
  client.onerror = (e) => {
    writeLog("与服务端的连接发生错误: " + e.message);
  };

  wsServer.on("message", (msg) => {
    // console.log("recive client: ", msg);
    let url = wsUrl;
    try {
      url = msg.matchAll(/destination:(.*)\n\n/gs).next().value[1];
    } catch (e) {}
    if (getOpenAnalogData()) {
      // 模拟ws message
      const routes = getRoutesByMethod("ws");
      let data = matchRoute(url, routes);
      if (data) {
        if (typeof data !== "string") {
          data = JSON.stringify(data);
        }
        let res;
        if (stompWs) {
          const header = {
            destination: url,
            subscription: `${url}/${protocol}`,
            "message-id": randomUUID(),
            "content-type": "text/plain;charset=UTF-8",
            "content-length": data.length,
          };
          res = "MESSAGE\n";
          for (const key in header) {
            res += `${key}:${header[key]}\n`;
          }
          res += `\n${data}`;
        } else {
          res = data;
        }
        wsServer.send(res);
        return;
      }
    }
    writeLog(`转发ws请求：${url}`);
    client.send(msg);
  });
  wsServer.on("close", () => {
    writeLog("客户端连接断开");
  });
  wsServer.on("error", (e) => {
    writeLog("与客户端的连接发生错误: " + e.message);
  });
};

const forward = (req, res) => {
  const { source, target } = getTargetAndSource(req);
  if (!target) {
    const log = `没有匹配的转发规则: ${source}`;
    writeLog(log);
    res.send(log);
    return;
  }
  const url = target + req.originalUrl;
  const method = req.method.toLowerCase();
  const options = {
    method: method,
    headers: req.headers,
  };
  if (method !== "get") {
    options.body = JSON.stringify(req.body);
  }
  fetch(url, options)
    .then((result) => {
      const { headers, status } = result;
      // for (const [k, v] of headers) {
      //   res.setHeader(k, v);
      // }
      res.status(status);

      // 支持图片
      if (headers.get("content-type").indexOf("image") != -1) {
        return result.blob();
      }
      // 支持文件下载
      if (res.getHeader("Content-Description") === "File Transfer") {
        return result.text();
      }
      try {
        return result.json();
      } catch (e) {
        return result.text();
      }
    })
    .then((data) => {
      writeLog(`转发${method}请求：${url}`);
      // 图片处理
      if (
        Object.prototype.toString.call(data) === "[object Blob]" &&
        data.type.indexOf("image") != -1
      ) {
        request(url).pipe(res);
        return;
      }
      res.send(data);
    })
    .catch(() => {
      writeLog(`${method}请求转发失败:${url}`);
      res.send("转发失败");
    });
};

module.exports = {
  forward,
  forwardWs,
};
