const Button = [
  {
    field: "block",
    desc: "将按钮宽度调整为其父宽度的选项",
    type: "boolean",
    default: "false",
  },
  {
    field: "danger",
    desc: "设置危险按钮",
    type: "boolean",
    default: "false",
  },
  {
    field: "disabled",
    desc: "按钮失效状态",
    type: "boolean",
    default: "false",
  },
  {
    field: "ghost",
    desc: "幽灵属性，使按钮背景透明",
    type: "boolean",
    default: "false",
  },
  {
    field: "href",
    desc: "点击跳转的地址，指定此属性 button 的行为和 a 链接一致",
    type: "string",
    default: "-",
  },
  {
    field: "htmlType",
    desc: "设置 button 原生的 type 值",
    type: "`button`\\|`submit`\\|`value`",
    default: "button",
  },
  {
    field: "icon",
    desc: "设置按钮的图标组件",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "loading",
    desc: "设置按钮载入状态",
    type: "boolean\\| { delay: number }",
    default: "false",
  },
  {
    field: "shape",
    desc: "设置按钮形状",
    type: "`circle` \\| `round`",
    default: "-",
  },
  {
    field: "size",
    desc: "设置按钮大小",
    type: "`large` \\| `middle` \\| `small`",
    default: "middle",
  },
  {
    field: "target",
    desc: "相当于 a 链接的 target 属性，href 存在时生效",
    type: "string",
    default: "-",
  },
  {
    field: "type",
    desc: "设置按钮类型",
    type: "`primary` \\| `ghost` \\| `dashed` \\| `link` \\| `text` \\| `default`",
    default: "default",
  },
  {
    field: "onClick",
    desc: "点击按钮时的回调",
    type: "(event) => void",
    default: "-",
  },
];

module.exports = Button;
