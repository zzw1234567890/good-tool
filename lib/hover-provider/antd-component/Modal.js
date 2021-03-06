const Modal = [
  {
    field:
      "[Modal.method()](https://ant.design/components/modal-cn/#Modal.method())",
    desc: "Modal方法API点击左边查看官方文档",
    type: "`Modal.info` \\| `Modal.success` \\| `Modal.error` \\| `Modal.warning` \\| `Modal.confirm`",
    default: "-",
  },
  {
    field: "afterClose",
    desc: "Modal 完全关闭后的回调",
    type: "function",
    default: "-",
  },
  {
    field: "bodyStyle",
    desc: "Modal body 样式",
    type: "CSSProperties",
    default: "-",
  },
  {
    field: "cancelButtonProps",
    desc: "cancel 按钮 props",
    type: "[ButtonProps](https://ant.design/components/button-cn/#API)",
    default: "-",
  },
  {
    field: "cancelText",
    desc: "取消按钮文字",
    type: "ReactNode",
    default: "取消",
  },
  {
    field: "centered",
    desc: "垂直居中展示 Modal",
    type: "boolean",
    default: "false",
  },
  {
    field: "closable",
    desc: "是否显示右上角的关闭按钮",
    type: "boolean",
    default: "true",
  },
  {
    field: "closeIcon",
    desc: "自定义关闭图标",
    type: "ReactNode",
    default: "<CloseOutlined />",
  },
  {
    field: "confirmLoading",
    desc: "确定按钮 loading",
    type: "boolean",
    default: "false",
  },
  {
    field: "destroyOnClose",
    desc: "关闭时销毁 Modal 里的子元素",
    type: "boolean",
    default: "false",
  },
  {
    field: "focusTriggerAfterClose",
    desc: "对话框关闭后是否需要聚焦触发元素",
    type: "boolean",
    default: "true",
  },
  {
    field: "footer",
    desc: "底部内容，当不需要默认底部按钮时，可以设为 footer={null}",
    type: "ReactNode",
    default: "(确定取消按钮)",
  },
  {
    field: "forceRender",
    desc: "强制渲染 Modal",
    type: "boolean",
    default: "false",
  },
  {
    field: "getContainer",
    desc: "指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom",
    type: "HTMLElement \\| () => HTMLElement \\| Selectors \\| false",
    default: "document.body",
  },
  {
    field: "keyboard",
    desc: "是否支持键盘 esc 关闭",
    type: "boolean",
    default: "true",
  },
  {
    field: "mask",
    desc: "是否展示遮罩",
    type: "boolean",
    default: "true",
  },
  {
    field: "maskClosable",
    desc: "点击蒙层是否允许关闭",
    type: "boolean",
    default: "true",
  },
  {
    field: "maskStyle",
    desc: "遮罩样式",
    type: "CSSProperties",
    default: "-",
  },
  {
    field: "modalRender",
    desc: "自定义渲染对话框",
    type: "(node: ReactNode) => ReactNode",
    default: "-",
  },
  {
    field: "okButtonProps",
    desc: "ok 按钮 props",
    type: "[ButtonProps](https://ant.design/components/button-cn/#API)",
    default: "-",
  },
  {
    field: "okText",
    desc: "确认按钮文字",
    type: "ReactNode",
    default: "确定",
  },
  {
    field: "okType",
    desc: "确认按钮类型",
    type: "string",
    default: "primary",
  },
  {
    field: "style",
    desc: "可用于设置浮层的样式，调整浮层位置等",
    type: "CSSProperties",
    default: "-",
  },
  {
    field: "title",
    desc: "标题",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "visible",
    desc: "对话框是否可见",
    type: "boolean",
    default: "-",
  },
  {
    field: "width",
    desc: "宽度",
    type: "`string` \\| `number`",
    default: "520",
  },
  {
    field: "wrapClassName",
    desc: "对话框外层容器的类名",
    type: "string",
    default: "-",
  },
  {
    field: "zIndex",
    desc: "设置 Modal 的 z-index",
    type: "number",
    default: "1000",
  },
  {
    field: "onCancel",
    desc: "点击遮罩层或右上角叉或取消按钮的回调",
    type: "function(e)",
    default: "-",
  },
  {
    field: "onOk",
    desc: "点击确定回调",
    type: "function(e)",
    default: "-",
  },
];

module.exports = Modal;
