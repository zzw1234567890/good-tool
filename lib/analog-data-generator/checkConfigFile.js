const vscode = require("vscode");
const fs = require("fs");
const { getDirPathByProjectPath } = require("../global-config");

const { workspace } = vscode;

// 数据定义文件上次更新配置时间
let defineLastUpdateTime = new Date().getTime();
// 数据定义文件数量
let defineLastConfigFileCount = 0;

const setDefineLastUpdateTime = (updateTime) => {
  defineLastUpdateTime = updateTime;
};

// 获取多项目下的所有数据定义文件
const getDefineFiles = () => {
  let files = [];
  workspace.workspaceFolders.forEach(({ uri: { fsPath } }) => {
    const dir = getDirPathByProjectPath(fsPath) + "define";
    files = files.concat(fs.readdirSync(dir).map((v) => `${dir}\\${v}`));
  });
  return files;
};

// 初始化配置文件数量
const initDefineFileCount = () => {
  const files = getDefineFiles();
  updateDefineContext(files);
  defineLastConfigFileCount = files.length;
};

// 是否有新的数据定义文件
const hasNewDefineFile = () => {
  const files = getDefineFiles();
  if (files.length !== defineLastConfigFileCount) {
    defineLastConfigFileCount = files.length;
    updateDefineContext(files);
    return true;
  }
  for (const file of files) {
    if (fs.statSync(file).mtime.getTime() > defineLastUpdateTime) {
      updateDefineContext(files);
      return true;
    }
  }
  return false;
};

const updateDefineContext = (files) => {
  vscode.commands.executeCommand("setContext", "define.supportedFiles", files);
  setDefineLastUpdateTime(new Date().getTime());
};

module.exports = {
  initDefineFileCount,
  hasNewDefineFile,
};
