module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>wss-test</title>
  <style></style>
</head>
<body>
  <div class="root d-flex">
    <div class="left bg-primary h-100 font-white p-2 d-flex f-flow-column">
      <h2 class="p-3">Message list</h2>
      <ul class="message-list mt-5 f-grow-1 scrollbar api-list">
        <li class="message-tpl p-3 border-r-3 d-none" onclick="clickMessage(this)">设备请求许可证</li>
      </ul>
    </div>
    <div class="right bg-light h-100 f-grow-1 d-flex f-flow-column">
      <div class="header p-2 center bg-white">
        <h1>Wss test</h1>
      </div>
      <div class="f-grow-1 p-4">
        <div class="body bg-white h-100 w-100">
          <div class="message d-flex f-flow-column p-4">
            <label for="url">Send:</label>
            <div class="d-flex align-items-center mt-2">
              <div id="method" class="border-r-3 d-flex align-items-center">
                <div class="selector w-100 d-flex justify-content-between hover-pointer" onclick="clickSelector()">
                  <input type="text" name="method" class="px-2 hover-pointer" value="FR 20440" onblur="onBlur(this)">
                </div>
                <ul class="url-list selector-ul border-r-3 w-100 bg-white">
                  <li class="url-tpl d-flex align-items-center justify-content-center d-none" onclick="clickOption(this)">
                    <span class="mx-3">FR 20440</span>
                  </li>
                </ul>
              </div>
              <div class="url f-grow-1 d-flex align-items-center">
                <input type="text" class="w-100 h-100 px-2 url-input" value="ws://10.182.121.200:8002?from=10&sn=0010035599538920">
                <button class="action bg-primary font-white border-r-3 px-2 hover-pointer ml-3" onclick="clickConnect()">连接</button>
                <button class="action bg-primary font-white border-r-3 px-2 hover-pointer ml-3" onclick="clickClose()">关闭</button>
              </div>
            </div>
            <div class="d-flex w-100">
              <div class="d-flex f-flow-column f-grow-1 pr-3">
                <label for="message-data" class="mt-3">Message:</label>
                <pre contenteditable="true" class="mt-2 message-data p-2 border-r-3 border-1 scrollbar" placeholder="json string" name="message-data"></pre>
                <div class="action-div mt-3">
                  <button class="action bg-primary font-white border-r-3 px-2 hover-pointer" onclick="sendMessage()">发送</button>
                  <button class="action bg-primary font-white border-r-3 px-2 hover-pointer ml-3" onclick="save()">保存</button>
                </div>
              </div>
              <div class="d-flex f-flow-column f-grow-1">
                <label for="session" class="mt-3">Session:</label>
                <ul class="mt-2 session d-flex f-flow-column border-r-3 border-1 border-primary scrollbar p-2">
                  <li class="server d-flex align-items-center mt-2 w-100 d-none">
                    <div class="head border-1 bg-primary font-white d-flex justify-content-center align-items-center">S</div>
                    <pre class="session-message d-flex align-items-center bg-light border-r-3 border-1 mt-1 py-1 px-2 triangle-left ml-3">{"result": [], "success": 1}</pre>
                    <div class="null"></div>
                  </li>
                  <li class="client d-flex align-items-center mt-2 w-100 f-direction-row-reverse d-none">
                    <div class="head border-1 bg-primary font-white d-flex justify-content-center align-items-center">C</div>
                    <pre class="session-message d-flex align-items-center bg-light border-r-3 border-1 mt-1 py-1 px-2 triangle-right mr-3">{"result": [], "success": 1}</pre>
                    <div class="null"></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script></script>
</body>
</html>`