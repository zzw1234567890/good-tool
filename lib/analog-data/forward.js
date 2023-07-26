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
  const { target, stompWs } = getTargetAndSource(req);
  let wsUrl = req.url.replace("/.websocket", "");
  wsUrl =
    typeof stompWs === "string"
      ? stompWs + wsUrl
      : target.replace("http", "ws") + wsUrl;

  const protocol = req.headers["sec-websocket-protocol"];
  const client = new Websocket(wsUrl, [protocol]);
  client.onmessage = (msg) => {
    // console.log("recive server: ", msg.data);
    wsServer.send(msg.data);
  };
  client.onclose = () => {
    writeLog(`服务端 [${wsUrl}] 连接断开`);
    console.log(wsServer);
    wsServer.close();
  };
  client.onerror = (e) => {
    writeLog(`与服务端的连接 [${wsUrl}] 发生错误: ${e.message}`);
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
    if (client.readyState) {
      client.send(msg);
    } else {
      // 转发首次连接时，可能还未与服务端建立连接，导致无法转发，因此在open里转发一次
      client.onopen = () => client.send(msg);
    }
  });
  wsServer.on("close", () => {
    writeLog(`客户端 [${wsUrl}] 连接断开`);
    client.close();
  });
  wsServer.on("error", (e) => {
    writeLog(`与客户端 [${wsUrl}] 的连接发生错误: ${e.message}`);
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
    options.body = req.rawBody;
  }
  try {
    request(url, options).pipe(res);
    writeLog(`转发${method}请求：${url}`);
  } catch (e) {
    writeLog(`${method}请求转发失败:${url}，errMsg: ${e.message}`);
  }
  // 下载的url访问一次后文件会被删除，所以根据url识别下载连接，只请求一次
  // if (url.includes("/rest/download")) {
  //   request(url, options).pipe(res);
  //   writeLog(`转发${method}请求：${url}`);
  //   return;
  // }
  // fetch(url, options)
  //   .then((result) => {
  //     const { headers, status } = result;
  //     // for (const [k, v] of headers) {
  //     //   res.setHeader(k, v);
  //     // }
  //     res.status(status);

  //     const contentType = headers.get("content-type");
  //     // 支持图片
  //     if (contentType.includes("image")) {
  //       request(url).pipe(res);
  //       return;
  //     }
  //     // 支持文件下载
  //     if (
  //       contentType === "application/octet-stream" ||
  //       contentType === "text/plain; charset=utf-8"
  //     ) {
  //       return result.text();
  //     }
  //     try {
  //       return result.json();
  //     } catch (e) {
  //       return result.text();
  //     }
  //   })
  //   .then((data) => {
  //     writeLog(`转发${method}请求：${url}`);
  //     // 图片处理
  //     if (!data) {
  //       return;
  //     }
  //     res.send(data);
  //   })
  //   .catch(() => {
  //     writeLog(`${method}请求转发失败:${url}`);
  //     res.send("转发失败");
  //   });
};

module.exports = {
  forward,
  forwardWs,
};
