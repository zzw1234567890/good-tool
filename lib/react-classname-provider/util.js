const vscode = require("vscode");
const fs = require("fs");
const { getModuleParent } = require("../global-config");
const { getParentPath, getFileContent } = require("../util");

const getSrcPath = (fileName) => {
  const endIndex = fileName.indexOf("src") + 3;
  return fileName.slice(0, endIndex);
};

// 获取左边界位置
const getLeftPosition = (document, position, flagStr) => {
  let nextPosition = position,
    prePosition;
  let text;
  do {
    prePosition = nextPosition;
    nextPosition = prePosition.translate(0, -1);
    text = document.getText(new vscode.Range(nextPosition, prePosition));
  } while (text && text !== flagStr && text !== " ");
  if (text !== flagStr) {
    return;
  }
  return prePosition;
};

// 获取右边界位置
const getRightPosition = (document, position, flagStr) => {
  let nextPosition = position,
    prePosition;
  let text;
  do {
    prePosition = nextPosition;
    nextPosition = prePosition.translate(0, 1);
    text = document.getText(new vscode.Range(nextPosition, prePosition));
  } while (text && text !== flagStr && text !== " ");
  if (text !== flagStr) {
    return;
  }
  return prePosition;
};

const getWordByFlagStr = (
  document,
  position,
  leftFlagStr,
  rightFlagStr = leftFlagStr
) => {
  const startPosition = getLeftPosition(document, position, leftFlagStr);
  const endPosition = getRightPosition(document, position, rightFlagStr);
  return document.getText(new vscode.Range(startPosition, endPosition));
};

const isClassName = (document, position) => {
  let t;
  do {
    const nextPosition = position.translate(0, -1);
    t = document.getText(new vscode.Range(nextPosition, position));
    position = nextPosition;
  } while (t && t !== "[" && position.character >= 1);
  return (
    t === "[" &&
    document.getText(new vscode.Range(position.translate(0, -6), position)) ===
      "styles"
  );
};

const isIntlGet = (document, position) => {
  let t;
  do {
    const nextPosition = position.translate(0, -1);
    t = document.getText(new vscode.Range(nextPosition, position));
    position = nextPosition;
  } while (t && t !== "(" && position.character >= 1);
  return (
    t === "(" &&
    document.getText(new vscode.Range(position.translate(0, -8), position)) ===
      "intl.get"
  );
};

const getStyleFile = (path) => {
  const parentPath = getParentPath(path);
  const text = getFileContent(path);
  const str = 'import styles from "';
  const startIndex = text.indexOf(str) + str.length;
  let endIndex = startIndex + 1;
  while (text.charAt(endIndex++) !== '"');
  endIndex--;
  return parentPath + text.slice(startIndex, endIndex).replace("/", "\\");
};

const allowStyleFiles = [".css", ".scss"];
const getParentStyleFile = (path) => {
  const res = [];
  const pattern = /@import "(.*?)"/g;
  const matchs = getFileContent(path).matchAll(pattern);
  const parentPath = getParentPath(path);
  for (const match of matchs) {
    if(match.length < 2 || !allowStyleFiles.some((v) => match[1].includes(v))){
      continue;
    }
    const newPath = parentPath + match[1].replaceAll("/", "\\");
    res.push(newPath);
    res.concat(getParentStyleFile(newPath));
  }
  return res;
};

const getWordPositionByFile = (path, word) => {
  const content = fs.readFileSync(path).toString();
  const arr = content.split("\n");
  let row = 0,
    col = 0;
  for (let i = 0; i < arr.length; i++) {
    col = arr[i].indexOf(word);
    if (col !== -1) {
      break;
    }
    row++;
  }
  if (row >= arr.length) {
    return;
  }
  return new vscode.Position(row, col);
};

const localeFiles = ["en_US.ts", "zh_CN.ts"];

const getLocaleFiles = (path) => {
  let res = [];
  const files = fs.readdirSync(path);
  files.forEach((item) => {
    item = path + "\\" + item;
    const stat = fs.lstatSync(item);
    if (stat.isDirectory()) {
      res = res.concat(getLocaleFiles(item));
    } else if (localeFiles.some((v) => item.indexOf(v) !== -1)) {
      res.push(item);
    }
  });
  return res;
};

const getRootLocaleFiles = (path) => {
  const localesDir = "locales\\";
  const index = path.indexOf(getModuleParent());
  path = index === -1 ? path.slice(0, path.indexOf("src\\") + "scr\\".length) + localesDir : path.slice(0, index) + localesDir;
  return localeFiles.map(v => path + v);
}

module.exports = {
  getSrcPath,
  getStyleFile,
  getWordPositionByFile,
  getLocaleFiles,
  getParentStyleFile,
  isClassName,
  isIntlGet,
  getLeftPosition,
  getRightPosition,
  getWordByFlagStr,
  getRootLocaleFiles
};
