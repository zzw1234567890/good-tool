// @ts-nocheck
const vscode = require("vscode");
const Components = require("./antd-component");
var axios = require("axios");
var cheerio = require("cheerio");
const { writeLog } = require("../log");

/**
 * antd组件悬停提示
 * @param {*} document
 * @param {*} position
 */

const antdHover = async (document, position) => {
  const word = document.getText(document.getWordRangeAtPosition(position));
  const documentText = document.getText();
  const docLink = Components.docLink[word];
  if (documentText.includes("antd") && docLink) {
    const component =
      Components[word] ||
      (Components[word] = await getOnlineAntd(word, docLink));
    // hover内容支持markdown语法
    let hoverText = `[点击查看文档](${docLink})\n\n|属性|说明|类型|默认值|\n|:--|:--|:--|:--|`;
    for (const item of component) {
      hoverText = `${hoverText}\n|${item.field}|${item.desc}|${item.type}|${item.default}|`;
    }
    return new vscode.Hover(hoverText);
  }
};

const getOnlineAntd = async (word, docLink) => {
  const component = [];
  await axios
    .get(docLink)
    .then(({ data }) => {
      const $ = cheerio.load(data);
      const wordNode = $(`#${word}`);
      const table = wordNode.length
        ? wordNode.next("table").find("tbody")
        : $(".api-container table tbody").eq(0);
      const list = $(table).find("tr");
      for (let i = 0; i < list.length; i++) {
        const [field, desc, type, defaultValue] = list.eq(i).find("td");
        component.push({
          field: $(field).html(),
          desc: $(desc).html(),
          type: $(type).html(),
          default: $(defaultValue).html(),
        });
      }
    })
    .catch((err) => {
      writeLog(`爬取antd组件api失败${err.message}`);
    });
  return component;
};

module.exports = { antdHover };
