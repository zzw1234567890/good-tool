const vscode = require("vscode");
const fs = require("fs");

const getSrcPath = fileName => {
  const endIndex = fileName.indexOf("src") + 3;
  return fileName.slice(0, endIndex);
}

const getStyleFile = document => {
  const {fileName} = document;
  const path = fileName.slice(0, fileName.lastIndexOf("\\")) + "\\";
  const text = document.getText();
  const str = "import styles from \"";
  const startIndex = text.indexOf(str) + str.length;
  let endIndex = startIndex + 1;
  while(text.charAt(endIndex++) !== ";");
  endIndex -= 2;
  return path + text.slice(startIndex, endIndex).replace("/", "\\");
}

const getWordPositionByFile = (path, word) => {
  const content = fs.readFileSync(path).toString();
  const arr = content.split("\n");
  let row = 0, col = 0;
  for(let i = 0; i < arr.length; i++){
    col = arr[i].indexOf(word);
    if(col !== -1){
      break;
    }
    row ++;
  }
  return new vscode.Position(row, col);
}

const getModuleDir = path => {
  const parentDirName = "\\pages\\";
  const arr = path.split("\\");
  const pagesIndex = path.indexOf(parentDirName);
  const endIndex = pagesIndex + parentDirName.length + arr[arr.indexOf(parentDirName) + 1].length;
  return path.slice(0, endIndex);
}

const localeFiles = ["en_US", "zh_CN"];

const getLocaleFiles = path => {
  let res = [];
    const files = fs.readdirSync(path);
    files.forEach((item) => {
      item = path + "\\" + item;
      const stat = fs.lstatSync(item);
      if(stat.isDirectory()){
        res = res.concat(getLocaleFiles(item));
      }else if(localeFiles.some(v => item.indexOf(v) !== -1)){
        res.push(item);
      }
    })
    return res;
}

module.exports = { 
  getSrcPath,
  getStyleFile,
  getWordPositionByFile,
  getModuleDir,
  getLocaleFiles
};