const Input = [
  {
    field: "addonAfter",
    desc: "带标签的 input，设置后置标签",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "addonBefore",
    desc: "带标签的 input，设置前置标签",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "allowClear",
    desc: "可以点击清除图标删除内容",
    type: "boolean",
    default: "-",
  },
  {
    field: "bordered",
    desc: "是否有边框",
    type: "boolean",
    default: "true",
  },
  {
    field: "defaultValue",
    desc: "输入框默认内容",
    type: "string",
    default: "-",
  },
  {
    field: "disabled",
    desc: "是否禁用状态，默认为 false",
    type: "boolean",
    default: "false",
  },
  {
    field: "id",
    desc: "输入框的 id",
    type: "string",
    default: "-",
  },
  {
    field: "maxLength",
    desc: "最大长度",
    type: "number",
    default: "-",
  },
  {
    field: "prefix",
    desc: "带有前缀图标的 input",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "size",
    desc: "控件大小。注：标准表单内的输入框大小限制为 large",
    type: "`large` \\| `middle` \\| `small`",
    default: "-",
  },
  {
    field: "suffix",
    desc: "带有后缀图标的 input",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "type",
    desc: '声明 input 类型，同原生 input 标签的 type 属性(请直接使用 Input.TextArea 代替 type="textarea")',
    type: "string",
    default: "text",
  },
  {
    field: "value",
    desc: "输入框内容",
    type: "string",
    default: "-",
  },
  {
    field: "onChange",
    desc: "输入框内容变化时的回调",
    type: "function(e)",
    default: "-",
  },
  {
    field: "onPressEnter",
    desc: "按下回车的回调",
    type: "function(e)",
    default: "-",
  },
  {
    field: "dashed",
    desc: "是否虚线",
    type: "boolean",
    default: "false",
  },
];

const InputTextArea = [
  {
    field: "allowClear",
    desc: "可以点击清除图标删除内容",
    type: "boolean",
    default: "false",
  },
  {
    field: "autoSize",
    desc: "自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }",
    type: "boolean \\| object",
    default: "false",
  },
  {
    field: "bordered",
    desc: "是否有边框",
    type: "boolean",
    default: "true",
  },
  {
    field: "defaultValue",
    desc: "输入框默认内容",
    type: "string",
    default: "-",
  },
  {
    field: "maxLength",
    desc: "内容最大长度",
    type: "number",
    default: "-",
  },
  {
    field: "showCount",
    desc: "是否展示字数",
    type: "boolean \\| { formatter: ({ count: number, maxLength?: number }) => string }",
    default: "false",
  },
  {
    field: "value",
    desc: "输入框内容",
    type: "string",
    default: "-",
  },
  {
    field: "onPressEnter",
    desc: "按下回车的回调",
    type: "function(e)",
    default: "-",
  },
  {
    field: "onResize",
    desc: "resize 回调",
    type: "function({ width, height })",
    default: "-",
  },
];

const InputSearch = [
  {
    field: "enterButton",
    desc: "是否有确认按钮，可设为按钮文字。该属性会与 addonAfter 冲突。",
    type: "boolean \\| ReactNode",
    default: "false",
  },
  {
    field: "loading",
    desc: "搜索 loading",
    type: "boolean",
    default: "false",
  },
  {
    field: "onSearch",
    desc: "点击搜索图标、清除图标，或按下回车键时的回调",
    type: "function(value, event)",
    default: "-",
  },
];

const InputGroup = [
  {
    field: "compact",
    desc: "是否用紧凑模式",
    type: "boolean",
    default: "false",
  },
  {
    field: "size",
    desc: "Input.Group 中所有的 Input 的大小，可选 large default small",
    type: "string",
    default: "default",
  },
];

const InputPassword = [
  {
    field: "iconRender",
    desc: "自定义切换按钮",
    type: "(visible) => ReactNode",
    default:
      "(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)",
  },
  {
    field: "visibilityToggle",
    desc: "是否显示切换按钮",
    type: "boolean",
    default: "true",
  },
];

module.exports = {
  Input,
  InputTextArea,
  InputSearch,
  InputGroup,
  InputPassword,
};
