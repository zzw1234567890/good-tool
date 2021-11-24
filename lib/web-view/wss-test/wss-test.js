module.exports = port => `const jsonFormat = text => {
  let res = "";
  let tabCount = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text.charAt(i);
    switch (c) {
      case "{":
      case "[":
        res += c + getTabs(++tabCount);
        break;
      case "}":
      case "]":
        if (i && text.charAt(i - 1) !== ",") {
          res += getTabs(--tabCount) + c;
        } else {
          res += c + getTabs(tabCount);
        }
        break;
      case ",":
        res += c + getTabs(tabCount);
        break;
      case "\\n":
        break;
      default:
        res += c;
    }
  }
  return res;
}

const getTabs = (n, tab = "  ") => {
  let res = "\\n";
  for (let i = 0; i < n; i++) {
    res += tab;
  }
  return res;
}


const port = ${port};
const method = document.getElementById("method");
const selector = method.getElementsByClassName("selector")[0];
const selectorUl = selector.nextElementSibling;
const selectInput = selector.getElementsByTagName("input")[0];
let isFocus = false;

// 下拉框点击事件
const clickSelector = () => {
  changeDisplay(selectorUl);
  method.style.backgroundColor =
    method.style.backgroundColor === "rgb(22, 101, 216)"
      ? "#ccc"
      : "rgb(22, 101, 216)";
  if (!isFocus) {
    selectInput.focus();
  }
  isFocus = !isFocus;
};

// 选择框失去焦点事件，当点击选项时，默认blur事件会在click事件前触发，延时触发clickSelector，先执行clickOption
const onBlur = (that) => {
  setTimeout(() => {
    if (selectorUl.style.display === "block") {
      clickSelector();
    }
  }, 200);
};

const urlInput = document.getElementsByClassName("url-input")[0];
// 选择项点击事件
const clickOption = (that) => {
  selectInput.value = that.getElementsByTagName("span")[0].innerText;
  urlInput.value = that.getAttribute("url");
  getMessageList(that.getAttribute("messageFile"));
  clickSelector();
};

// 显示/隐藏元素
const changeDisplay = (e) => {
  e.style.display = e.style.display !== "block" ? "block" : "none";
};

// 消息处理
const sessionDiv = document.getElementsByClassName("session")[0];
const serverTpl = document.getElementsByClassName("server")[0].cloneNode(true);
const clientTpl = document.getElementsByClassName("client")[0].cloneNode(true);
serverTpl.classList.remove("d-none");
clientTpl.classList.remove("d-none");

const addMessage = message => {
  const newNode = clientTpl.cloneNode(true);
  newNode.getElementsByClassName("session-message")[0].innerText = message;
  sessionDiv.append(newNode);
  sessionDiv.scrollTop = sessionDiv.scrollHeight
}

// 发送消息
const sendMessage = () => {
  const message = document.getElementsByClassName("message-data")[0].innerText;
  ws.send(message);
}
// 接收消息
const reviceMessage = ({ data: message }) => {
  const newNode = serverTpl.cloneNode(true);
  newNode.getElementsByClassName("session-message")[0].innerText = jsonFormat(message.replaceAll(/\\n|\\t| /g, ""));
  sessionDiv.append(newNode);
  sessionDiv.scrollTop = sessionDiv.scrollHeight
}

// websocket
let ws = new Object();
ws.send = () => addMessage("发送失败，未建立连接");
// connect
const connect = (url) => {
  addMessage("开始连接");
  try {
    ws = new WebSocket(url);
  } catch (e) {
    addMessage("连接失败");
    return;
  }
  ws.onopen = () => {
    addMessage("连接成功");
  };
  ws.onmessage = reviceMessage;
  ws.onclose = () => {
    reviceMessage({ data: "服务端连接关闭" });
  }
  ws.onerror = e => {
    addMessage("发生错误");
  }
  // send代理
  const _send = ws.send;
  ws.send = function (message) {
    if (!ws || ws.readyState !== 1) {
      addMessage("发送失败，未建立连接");
      return;
    }
    const res = _send.apply(this, arguments);
    addMessage(message);
    return res;
  }
}
// close
const clickClose = () => {
  if (!ws || ws.readyState !== 1) {
    addMessage("无需关闭，未建立连接");
    return;
  }
  ws.close();
  addMessage("客户端连接关闭")
}

const clickConnect = () => {
  connect(document.getElementsByClassName("url-input")[0].value);
}

const messageList = document.getElementsByClassName("message-list")[0];
const messageTpl = messageList.getElementsByClassName("message-tpl")[0].cloneNode(true);
messageTpl.classList.remove("d-none");
// 获取message列表
const getMessageList = messageFile => {
  messageList.innerHTML = "";
  fetch("http://127.0.0.1:" + port + "/wssTest/getMessageList?messageFile=" + messageFile, {})
    .then(res => res.json())
    .then(({ message, timer }) => {
      message.forEach(({ title, data }) => {
        const newNode = messageTpl.cloneNode(true);
        newNode.innerText = title;
        newNode.setAttribute("message-data", JSON.stringify(data));
        messageList.append(newNode);
      })
      message.length && messageList.querySelector("li:nth-child(1)").click();
    })
}

const messageData = document.getElementsByClassName("message-data")[0];
// 切换消息
const clickMessage = (that) => {
  const oldActive = document.getElementsByClassName("active")[0];
  oldActive && oldActive.classList.remove("active");
  that.classList.add("active");
  messageData.innerText = jsonFormat(that.getAttribute("message-data"));
}

const urlList = document.getElementsByClassName("url-list")[0];
const urlTpl = urlList.getElementsByClassName("url-tpl")[0].cloneNode(true);
urlTpl.classList.remove("d-none");
// 获取url列表
const getUrlList = (init = false) => {
  urlList.innerHTML = "";
  fetch("http://127.0.0.1:" + port + "/wssTest/getUrlList")
    .then(res => res.json())
    .then(data => {
      data.forEach(({ title, url, messageFile }) => {
        const newNode = urlTpl.cloneNode(true);
        newNode.getElementsByTagName("span")[0].innerText = title;
        newNode.setAttribute("messageFile", messageFile);
        newNode.setAttribute("url", url);
        urlList.append(newNode);
      });
      data.length && init && (urlInput.value = data[0].url) && getMessageList(data[0].messageFile);
    });
}
getUrlList(true);
setInterval(getUrlList, 5000);
`