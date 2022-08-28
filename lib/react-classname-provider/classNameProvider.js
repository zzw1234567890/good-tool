// @ts-nocheck
const vscode = require("vscode");
const {
  getStyleFile,
  getWordPositionByFile,
  getModuleDir,
  getLocaleFiles,
  getParentStyleFile,
  isClassName,
  isIntlGet,
  getWordByFlagStr,
  getLeftPosition,
  getRightPosition,
  getAllScriptFiles,
} = require("./util");

/**
 * react className 跳转到定义
 * @param {*} document
 * @param {*} position
 */

const classNameDefinition = (document, position) => {
  const { fileName } = document;
  const startPosition = getLeftPosition(document, position, '"');
  const endPosition = getRightPosition(document, position, '"');
  const word = document.getText(new vscode.Range(startPosition, endPosition));

  if (isClassName(document, startPosition)) {
    return getStylePosition(fileName, word);
  } else if (isIntlGet(document, startPosition)) {
    return getLocalesPosition(fileName, word);
  }
};

const getStylePosition = (path, word) => {
  const importStyleFile = getStyleFile(path);
  const styleFiles = getParentStyleFile(importStyleFile);
  styleFiles.unshift(importStyleFile);
  return styleFiles
    .map((file) => {
      const position = getWordPositionByFile(file, `.${word} `);
      return position && new vscode.Location(vscode.Uri.file(file), position);
    })
    .filter((v) => v);
};

const getLocalesPosition = (path, word) => {
  const moduleDir = getModuleDir(path);
  const localeFiles = getLocaleFiles(moduleDir);
  const positions = [];
  localeFiles.forEach((file) => {
    const location = new vscode.Location(
      vscode.Uri.file(file),
      getWordPositionByFile(file, word)
    );
    positions.push(location);
  });
  return positions;
};

const cssDefinition = (document, position) => {
  const { fileName } = document;
  const word = getWordByFlagStr(document, position, ".", " ");
  const scriptFiles = getAllScriptFiles(getModuleDir(fileName));
  return scriptFiles
    .map((file) => {
      const position = getWordPositionByFile(file, `"${word}"`);
      return position && new vscode.Location(vscode.Uri.file(file), position);
    })
    .filter((v) => v);
};

const intlGetDefinition = (document, position) => {
  const { fileName } = document;
  const word = getWordByFlagStr(document, position, "\t", ":");
  const scriptFiles = getAllScriptFiles(getModuleDir(fileName));
  return scriptFiles
    .map((file) => {
      if(file === fileName){
        return;
      }
      const position = getWordPositionByFile(file, word);
      return position && new vscode.Location(vscode.Uri.file(file), position);
    })
    .filter((v) => v);
}

module.exports = {
  classNameDefinition,
  cssDefinition,
  intlGetDefinition
};