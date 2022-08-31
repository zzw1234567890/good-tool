const fs = require("fs");
const { getModuleParent } = require("./global-config");

const getModuleDir = (path) => {
  const parentDirName = getModuleParent();
  const arr = path.split("\\");
  const pagesIndex = path.indexOf(parentDirName);
  const endIndex =
    pagesIndex +
    parentDirName.length +
    arr[arr.indexOf(parentDirName) + 1].length + 1;
  return path.slice(0, endIndex);
};

// 过滤文件
const verfityScriptFile = (folder, allowScriptFiles = [".js", ".jsx", ".ts", ".tsx"]) =>
  allowScriptFiles.some((v) => folder.indexOf(v) !== -1);
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

module.exports = {
  getAllScriptFiles,
  getModuleDir,
  getFileContent,
  getParentPath
}