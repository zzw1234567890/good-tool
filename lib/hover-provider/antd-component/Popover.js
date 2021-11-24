const Popover = [
  {
    field: "content	",
    desc: "卡片内容",
    type: "ReactNode | () => ReactNode",
    default: "-",
  },
  {
    field: "title",
    desc: "卡片标题",
    type: "ReactNode | () => ReactNode",
    default: "-",
  },
  {
    field: "align",
    desc: "该值将合并到 placement 的配置中",
    type: "object",
    default: "-",
  },
  {
    field: "arrowPointAtCenter",
    desc: "箭头是否指向目标元素中心",
    type: "boolean",
    default: "false",
  },
  {
    field: "autoAdjustOverflow",
    desc: "气泡被遮挡时自动调整位置",
    type: "boolean",
    default: "true",
  },
  {
    field: "color",
    desc: "背景颜色",
    type: "string",
    default: "-",
  },
  {
    field: "defaultVisible",
    desc: "默认是否显隐",
    type: "boolean",
    default: "false",
  },
  {
    field: "destroyTooltipOnHide",
    desc: "关闭后是否销毁 Tooltip，当 keepParent 为 false 时销毁父容器",
    type: "boolean \\| { keepParent?: boolean }",
    default: "false",
  },
  {
    field: "getPopupContainer",
    desc: "浮层渲染父节点，默认渲染到 body 上",
    type: "function(triggerNode)",
    default: "() => document.body",
  },
  {
    field: "mouseEnterDelay",
    desc: "鼠标移入后延时多少才显示 Tooltip，单位：秒",
    type: "number",
    default: "0.1",
  },
  {
    field: "mouseLeaveDelay",
    desc: "鼠标移出后延时多少才隐藏 Tooltip，单位：秒",
    type: "number",
    default: "0.1",
  },
  {
    field: "overlayClassName",
    desc: "卡片类名",
    type: "string",
    default: "-",
  },
  {
    field: "overlayStyle",
    desc: "卡片样式",
    type: "object",
    default: "-",
  },
  {
    field: "overlayInnerStyle",
    desc: "卡片内容区域的样式对象",
    type: "object",
    default: "-",
  },
  {
    field: "placement",
    desc: "气泡框位置",
    type: "`top` \\| `left` \\| `right` \\| `bottom` \\| `topLeft` \\| `topRight` \\| `bottomLeft` \\| `bottomRight` \\| `leftTop` \\| `leftBottom` \\| `rightTop` \\| `rightBottom`",
    default: "top",
  },
  {
    field: "trigger",
    desc: "触发行为，可使用数组设置多个触发行为",
    type: "`hover` \\| `focus` \\| `click` \\| `contextMenu`",
    default: "hover",
  },
  {
    field: "visible",
    desc: "用于手动控制浮层显隐",
    type: "boolean",
    default: "false",
  },
  {
    field: "zIndex",
    desc: "设置 Tooltip 的 z-index",
    type: "number",
    default: "-",
  },
  {
    field: "onVisibleChange",
    desc: "显示隐藏的回调",
    type: "(visible) => void",
    default: "-",
  },
];

module.exports = Popover;
