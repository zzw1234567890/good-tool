const fs = require("fs");
const { getRoutesByMethod } = require("../analog-data/route-config");
const { checkConfigDir, checkConfigFile } = require("../checkFolder");
const { getDirPath, getPort } = require("../global-config");
const { getWssTestHtml } = require("./web-view");

const wssConfigDir = `${getDirPath()}\\wss-test`
const urlConfigPath = `${wssConfigDir}\\urls.json`;

const cors = (res) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': '*'
	})
}

// 判断文件是否存在，如果不存在则创建

const checkFileIsExist = () => {
	checkConfigDir(wssConfigDir);
	checkConfigFile(urlConfigPath);
}

module.exports = (app) => {
	app.get("/wssTest", (req, res) => {
		cors(res);
		res.send(getWssTestHtml(getPort()));
	})
	// 获取url列表
	app.get("/wssTest/getUrlList", (req, res) => {
		cors(res);
		checkFileIsExist();
		res.send(fs.readFileSync(urlConfigPath).toString());
	});
	// 获取message列表
	app.get("/wssTest/getMessageList", (req, res) => {
		cors(res);
		const messageFile = req.query.messageFile;
		const messageList = fs.readFileSync(`${wssConfigDir}\\${messageFile}`).toString();
		res.send(messageList);
	});


	// 获取API列表
	app.get("/apiTest/getRouteList", (req, res) => {
		cors(res);
		const result = {
			get: Object.keys(getRoutesByMethod("get")),
			post: Object.keys(getRoutesByMethod("post")),
			put: Object.keys(getRoutesByMethod("put")),
			delete: Object.keys(getRoutesByMethod("delete")),
		};
		console.log(result);
		res.send(JSON.stringify(result));
	});
}
