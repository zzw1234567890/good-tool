const vscode = require("vscode");
const fs = require("fs");
const { getProjectPath } = require("../global-config");

// 统计新增代码行数
const patchFilePath = `${getProjectPath()}\\.svn\\tmp\\svn.patch`;
const total = () => {
  fs.readFile(patchFilePath, { encoding: "utf-8" }, (err, data) => {
    const rowCount = data.replaceAll("+++", "").match(/\n\+/g).length;
    vscode.window.showInformationMessage(`新增代码：${rowCount} 行`);
  });
};

module.exports = { total };
