module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API-TEST</title>
  <link rel="stylesheet" href="./api-test.css">
  <style></style>
</head>
<body>
  <div class="root d-flex">
    <div class="left bg-primary h-100 font-white p-2 d-flex f-flow-column">
      <h2 class="p-3">API列表</h2>
      <ul class="mt-5 f-grow-1 scrollbar api-list">
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li><li class="p-3">ha/config</li>
        <li class="p-3">ha/config</li>
      </ul>
    </div>
    <div class="right bg-light h-100 f-grow-1 d-flex f-flow-column">
      <div class="header p-2 center bg-white">
        <h1>API Test</h1>
      </div>
      <div class="f-grow-1 p-4">
        <div class="body bg-white h-100 w-100">
          <div class="request d-flex f-flow-column p-4">
            <label for="url">URL:</label>
            <div class="d-flex align-items-center mt-2">
              <div id="method" class="border-r-3 d-flex align-items-center">
                <div class="selector w-100 d-flex justify-content-between hover-pointer" onclick="clickSelector()">
                  <input type="text" name="method" class="px-2 hover-pointer" value="GET" onblur="onBlur(this)">
                </div>
                <ul class="selector-ul border-r-3 w-100 bg-white">
                  <li class="d-flex align-items-center" onclick="clickOption(this)">
                    <span class="ml-3">GET</span>
                  </li>
                  <li class="d-flex align-items-center" onclick="clickOption(this)">
                    <span class="ml-3">POST</span>
                  </li>
                  <li class="d-flex align-items-center" onclick="clickOption(this)">
                    <span class="ml-3">PUT</span>
                  </li>
                  <li class="d-flex align-items-center" onclick="clickOption(this)">
                    <span class="ml-3">DELETE</span>
                  </li>
                </ul>
              </div>
              <div class="url f-grow-1 d-flex align-items-center">
                <input type="text" class="w-100 h-100 px-2" placeholder="http://">
                <button class="send bg-primary font-white border-r-3 px-2 hover-pointer ml-3">发送请求</button>
              </div>
            </div>
            <div class="d-flex w-100">
              <div class="d-flex f-flow-column f-grow-1 pr-3">
                <label for="body" class="mt-3">Body:</label>
                <textarea class="mt-2 body-param" placeholder="json string" name="body"></textarea>
              </div>
              <div class="d-flex f-flow-column f-grow-1">
                <label for="response" class="mt-3">Respone:</label>
                <textarea class="mt-2 response" name="response" disabled></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="./api-test.js"></script>
  <script></script>
</body>
</html>`;
