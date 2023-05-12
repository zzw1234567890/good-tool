const fs = require("fs");
const { getModuleParent, getProjectPath } = require("./global-config");
const { workspace, window } = require("vscode");

const getModuleDir = (path) => {
  const parentDirName = getModuleParent();
  const arr = path.split("\\");
  const pagesIndex = path.indexOf(parentDirName);
  if (pagesIndex === -1) {
    return arr.slice(0, -1).join("\\");
  }
  const endIndex =
    pagesIndex +
    parentDirName.length +
    arr[arr.indexOf(parentDirName) + 1].length +
    1;
  return path.slice(0, endIndex);
};

// 过滤文件
const verfityScriptFile = (
  folder,
  allowScriptFiles = [".js", ".jsx", ".ts", ".tsx"]
) => allowScriptFiles.some((v) => folder.indexOf(v) !== -1);
// 获取指定目录下的文件
const getAllScriptFiles = (path, allowScriptFiles) => {
  let res = [];
  const files = fs.readdirSync(path);
  files.forEach((item) => {
    item = path + "\\" + item;
    const stat = fs.lstatSync(item);
    if (stat.isDirectory()) {
      res = res.concat(getAllScriptFiles(item, allowScriptFiles));
    } else {
      verfityScriptFile(item, allowScriptFiles) && res.push(item);
    }
  });
  return res;
};

const getFileContent = (path) => fs.readFileSync(path).toString();

const getParentPath = (path) => path.slice(0, path.lastIndexOf("\\")) + "\\";

// 获取当前打开文件的项目目录
const getCurrentProjectPath = () => {
  for (const {
    uri: { fsPath },
  } of workspace.workspaceFolders) {
    const currentFilePath = window.activeTextEditor.document.uri.path;
    if (currentFilePath.includes(fsPath.replaceAll("\\", "/").slice(2))) {
      return fsPath;
    }
  }
  return getProjectPath();
};

module.exports = {
  getAllScriptFiles,
  getModuleDir,
  getFileContent,
  getParentPath,
  getCurrentProjectPath,
};
