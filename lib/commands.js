const vscode = require("vscode");
const { configProxy } = require("./analog-data/proxy-config");
const { configRoute } = require("./analog-data/route-config");
const { actionGenerator } = require("./code-generator/action");
const { isOpen, getProjectPath } = require("./global-config");
const { total } = require("./svn/patch");
const { getApiTestHtml, getWssTestHtml } = require("./web-view/web-view");

const { commands, window } = vscode;

// 更新配置文件
const updateConfigFile = () => {
  if (!isOpen()) {
    window.showInformationMessage("服务未开启!");
    return;
  }
  config();
  window.showInformationMessage("配置文件已更新!");
};

// 统计代码行数
const patchTotal = () => {
  commands.executeCommand("svn.patchAll").then(() => {
    commands.executeCommand("workbench.action.files.save").then(() => {
      commands.executeCommand("workbench.action.closeActiveEditor");
      total();
    });
  });
};

// 生成 action 文件
const generateActionCode = (path) => {
  window
    .showSaveDialog({
      defaultUri: vscode.Uri.file(getProjectPath()),
      filters: { JavaScript: ["js"], TypeScript: ["ts"] },
      title: "生成 action 文件",
      saveLabel: "确认",
    })
    .then((toPath) => {
      if (!toPath) {
        return;
      }
      actionGenerator(path.fsPath, toPath.fsPath);
    });
};

// API测试webView
const apiTest = () => {
  const panel = window.createWebviewPanel(
    "apiTest",
    "apiTest",
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = getApiTestHtml();
};

// WSS测试webView
const wssTest = port => () => {
  const panel = window.createWebviewPanel(
    "wssTest",
    "wssTest",
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );
  panel.webview.html = getWssTestHtml(port);
}

const config = () => {
  configRoute();
  configProxy();
};

module.exports = { updateConfigFile, patchTotal, generateActionCode, apiTest, wssTest };
