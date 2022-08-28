const vscode = require("vscode");
const fs = require("fs");
const {
  getVsCodeConfigPathByProjectPath,
  getDirPathByProjectPath,
} = require("./global-config");

const { workspace } = vscode;

// 检查目录是否存在，如果不存在则创建
const checkConfigDir = (path) => {
  !fs.existsSync(path) && fs.mkdirSync(path);
  return true;
};

// 检查文件是否存在，如果不存在则创建
const checkConfigFile = (path) => {
	!fs.existsSync(path) && fs.writeFileSync(path, "");
	return true;
};

const checkDir = () => {
  workspace.workspaceFolders.forEach(({ uri: { fsPath } }) => {
    const vsCodeConfigPath = getVsCodeConfigPathByProjectPath(fsPath);
    const dirPath = getDirPathByProjectPath(fsPath);
    checkConfigDir(vsCodeConfigPath) && checkConfigDir(dirPath) && checkConfigDir(`${dirPath}\\define\\`);
  });
};

module.exports = { checkConfigDir, checkConfigFile, checkDir };
