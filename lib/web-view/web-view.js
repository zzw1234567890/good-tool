const apiTestHtml = require("./api-test/api-test-html");
const apiTestCss = require("./api-test/api-test-css");
const apiTestJs = require("./api-test/api-test");
const wssTestHtml = require("./wss-test/wss-test-html");
const wssTestCss = require("./wss-test/wss-test-css");
const wssTestJs = require("./wss-test/wss-test");

const getApiTestHtml = () => {
  return apiTestHtml
    .replaceAll("<style></style>", `<style>${apiTestCss}</style>`)
    .replaceAll("<script></script>", `<script>${apiTestJs}</script>`);
};

const getWssTestHtml = port => {
  return wssTestHtml
    .replaceAll("<style></style>", `<style>${wssTestCss}</style>`)
    .replaceAll("<script></script>", `<script>${wssTestJs(port)}</script>`);
}

module.exports = { getApiTestHtml, getWssTestHtml };
