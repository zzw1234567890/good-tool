// @ts-nocheck
const vscode = require("vscode");
const { getStyleFile, getWordPositionByFile, getModuleDir, getLocaleFiles } = require("./util");

/**
 * react className 跳转到定义
 * @param {*} document
 * @param {*} position
 */

const classNameDefinition = (document, position) => {
  let nextPosition = position, prePosition;
  let text;
  // 获取左边界位置
  do{
    prePosition = nextPosition;
    nextPosition = prePosition.translate(0, -1);
    text = document.getText(new vscode.Range(nextPosition, prePosition));
  }while(text && text !== "\"" && text !== " ");
  if(text !== "\""){
    return;
  }
  const startPosition = prePosition;
  // 获取右边界位置
  nextPosition = position;
  do{
    prePosition = nextPosition;
    nextPosition = prePosition.translate(0, 1);
    text = document.getText(new vscode.Range(nextPosition, prePosition));
  }while(text && text !== "\"" && text !== " ");
  if(text !== "\""){
    return;
  }
  const endPosition = prePosition;
  const word = document.getText(new vscode.Range(startPosition, endPosition));

  if(document.getText(new vscode.Range(startPosition.translate(0, -8), startPosition)) === "styles[\""){
    return getStylePosition(document, word);
  }else if(document.getText(new vscode.Range(startPosition.translate(0, -10), startPosition)) === "intl.get(\""){
    return getLocalesPosition(document, word);
  }

  // const styleFileList = getStyleFileList(getSrcPath(fileName));
};

const getStylePosition = (document, word) => {
  const styleFile = getStyleFile(document);
  const wordPosition = getWordPositionByFile(styleFile, word);
  return new vscode.Location(vscode.Uri.file(styleFile), wordPosition);
}

const getLocalesPosition = (document, word) => {
  const moduleDir = getModuleDir(document.fileName);
  const localeFiles = getLocaleFiles(moduleDir);
  const positions = [];
  localeFiles.forEach(file => {
    const location = new vscode.Location(vscode.Uri.file(file), getWordPositionByFile(file, word));
    positions.push(location);
  })
  return positions;
}

// 过滤样式文件
// const allowFiles = ["css", "scss", "less"];
// const verfityFile = (file) => {
//   const fileNameSplit = file.split(".");
//   return allowFiles.indexOf(fileNameSplit[fileNameSplit.length - 1]) !== -1;
// };
// // 过滤不需要的文件和文件夹
// const filterFileList = ["node_modules", ".vscode"];
// const filterFile = (folder) => filterFileList.some(v => folder.indexOf(v) !== -1)

// const getStyleFileList = (path) => {
//   let res = [];
//   const files = fs.readdirSync(path);
//   files.forEach((item) => {
//     item = path + "\\" + item;
//     if(filterFile(item)){
//       return;
//     }
//     const stat = fs.lstatSync(item);
//     if(stat.isDirectory()){
//       res = res.concat(getStyleFileList(item));
//     }else{
//       verfityFile(item) && res.push(item);
//     }
//   })
//   return res;
// }

module.exports = { classNameDefinition };
