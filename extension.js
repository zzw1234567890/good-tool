const vscode = require("vscode");
const {
  isUpdateRouteConfig,
  isUpdateProxyConfig,
  initConfigFileCount,
} = require("./lib/analog-data/checkConfigFile");
const { checkDir } = require("./lib/checkFolder");
const { initProxy, configProxy } = require("./lib/analog-data/proxy-config");
const { initRoute, configRoute } = require("./lib/analog-data/route-config");
const { start, reStart, stop } = require("./lib/analog-data/server");
const {
  updateConfigFile,
  patchTotal,
  generateActionCode,
  apiTest,
  wssTest,
} = require("./lib/commands");
const {
  updateConfig,
  getPort,
  isOpen,
  isUseFileConfigProxy,
} = require("./lib/global-config");
const { antdHover } = require("./lib/hover-provider/antdHover");
const { classNameDefinition } = require("./lib/react-classname-provider/classNameProvider");

/** 插件激活时调用
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
  const { subscriptions } = context;
  const { commands, window, workspace } = vscode;
  if (!workspace.workspaceFolders) {
    return;
  }

  // 注册"更新配置文件"命令
  subscriptions.push(
    commands.registerCommand("good-tool.updateConfigFile", updateConfigFile)
  );

  // 注册"统计代码更改行数"命令
  subscriptions.push(
    commands.registerCommand("good-tool.patchTotal", patchTotal)
  );

  // 注册"生成 action 文件"命令
  subscriptions.push(
    commands.registerCommand("good-tool.generateActionCode", generateActionCode)
  );

  // antd组件悬停提示
  subscriptions.push(
    vscode.languages.registerHoverProvider(["javascript", "typescript", {pattern: "**/*.tsx"}], {
      provideHover: antdHover,
    })
  );

  // 支持react className跳转到定义
  subscriptions.push(
    vscode.languages.registerDefinitionProvider(["javascript", "typescript", {pattern: "**/*.tsx"}], {
      provideDefinition: classNameDefinition,
  }));
  
  // 延时注册命令，等待服务启动，确认端口号
  setTimeout(() => {
    // 注册"API测试webView"命令
    subscriptions.push(commands.registerCommand("good-tool.apiTest", apiTest));
    // 注册"WSS测试webView"命令
    subscriptions.push(commands.registerCommand("good-tool.wssTest", wssTest(getPort())));
  }, 2000);

  // 监听配置变化
  subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(() => {
      // 获取更新前的配置
      const prePort = getPort();
      const preOpen = isOpen();
      const preIsUseFileConfigProxy = isUseFileConfigProxy();
      updateConfig();
      const nowPort = getPort();
      const nowOpen = isOpen();
      const nowIsUseFileConfigProxy = isUseFileConfigProxy();
      if (!preOpen && !nowOpen) {
        return;
      }
      if (preOpen && !nowOpen) {
        stop();
        window.showInformationMessage("服务已关闭!");
        return;
      }
      if (!preOpen && nowOpen) {
        start();
        init();
        window.showInformationMessage("服务已开启!");
      }
      prePort !== nowPort && reStart();
      preIsUseFileConfigProxy !== nowIsUseFileConfigProxy && configProxy();
    })
  );

  if (isOpen()) {
    start();
    init();
  }

  // 监听配置文件更新
  setInterval(() => {
    isUpdateRouteConfig() && configRoute();
    isUpdateProxyConfig() && configProxy();
  }, 2000);
};

const init = () => {
  checkDir();
  initConfigFileCount();
  initRoute();
  initProxy();
};

const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
