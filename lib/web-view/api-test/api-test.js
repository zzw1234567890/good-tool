module.exports = `const method = document.getElementById("method");
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

// 选择项点击事件
const clickOption = (that) => {
  selectInput.value = that.getElementsByTagName("span")[0].innerText;
  clickSelector();
};

// 显示/隐藏元素
const changeDisplay = (e) => {
  e.style.display = e.style.display !== "block" ? "block" : "none";
};
`;
