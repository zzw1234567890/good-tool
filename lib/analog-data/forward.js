const { default: fetch } = require("node-fetch");
const { getProxy, isUseFileConfigProxy } = require("../global-config");
const { writeLog } = require("../log");
const request = require('request');

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
    } else {
      source = `http://${headers.host}`;
    }
  }
  const target = proxy.get(source);
  return [source, target];
};

const forward = (req, res) => {
  const [source, target] = getTargetAndSource(req);
  if (!target) {
    writeLog(`没有匹配的转发规则: ${source}`);
    res.send(null);
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
      for (const [k, v] of headers) {
        res.setHeader(k, v);
      }
      res.status(status);
      
      // 支持图片
      if(headers.get("content-type").indexOf("image") != -1){
        return result.blob();
      }
      // 支持文件下载
      if(res.getHeader("Content-Description") === "File Transfer"){
        return result.text();
      }
      return result.json();
    })
    .then((data) => {
        writeLog(`转发${method}请求：${url}`);
        console.log(Object.prototype.toString.call(data));
        // 图片处理
        if(Object.prototype.toString.call(data) === "[object Blob]" && data.type.indexOf("image") != -1){
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
};
