const fs = require("fs");
const { getRoutesByMethod } = require("../analog-data/routeConfig");
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
	// 更新message
	app.all("/wssTest/updateMessage", (req, res) => {
		cors(res);
		console.log(req);
		console.log(req.body);
		const {title, message, messageFile} = req.body;
		if(!title || !message || !messageFile){
			return;
		}
		const path = `${wssConfigDir}\\${messageFile}`;
		const fileContent = JSON.parse(fs.readFileSync(path).toString());
		const messageList = fileContent.message;
		let i = 0;
		for(; i < messageList.length; i ++){
			if(messageList[i].title === title){
				messageList[i].data = JSON.parse(message);
				break;
			}
		}
		i === messageList.length && messageList.push({title, message});
		fs.writeFileSync(path, JSON.stringify(fileContent));
		res.send(true);
	})


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
