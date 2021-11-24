const fs = require("fs");
const sd = require("silly-datetime");
const { getDirPath } = require("./global-config");

// 日志文件名
const logFileName = "log.txt";
const logFilePath = `${getDirPath()}\\${logFileName}`;
// 允许的日志文件大小(10KB)
const maxSize = 10 * 1024;

// 检测日志文件是否存在，大小是否超出设置最大值
const check = () => {
  const file = fs.statSync(logFilePath);
  if (file.isFile && file.size > maxSize) {
    fs.unlinkSync(logFilePath);
  }
};

// 写日志
const writeLog = (string) => {
  console.log(string);
  string = `${sd.format(new Date(), "YYYY-MM-DD HH:mm:ss")}  ${string}\n`;
  fs.appendFile(logFilePath, string, () => {});
};

// 监听文件大小是否超过预设值
setInterval(() => {
  check();
}, 30000);

module.exports = {
  logFileName,
  writeLog,
};
