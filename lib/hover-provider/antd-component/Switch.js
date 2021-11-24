const Switch = [
  {
    field: "autoFocus",
    desc: "组件自动获取焦点",
    type: "boolean",
    default: "false",
  },
  {
    field: "checked",
    desc: "指定当前是否选中",
    type: "boolean",
    default: "false",
  },
  {
    field: "checkedChildren",
    desc: "选中时的内容",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "className",
    desc: "Switch 器类名",
    type: "string",
    default: "-",
  },
  {
    field: "defaultChecked",
    desc: "初始是否选中",
    type: "boolean",
    default: "false",
  },
  {
    field: "disabled",
    desc: "是否禁用",
    type: "boolean",
    default: "false",
  },
  {
    field: "loading",
    desc: "加载中的开关",
    type: "boolean",
    default: "false",
  },
  {
    field: "size",
    desc: "开关大小",
    type: "`default` \\| `small`",
    default: "default",
  },
  {
    field: "unCheckedChildren",
    desc: "非选中时的内容",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "onChange",
    desc: "变化时回调函数",
    type: "function(checked: boolean, event: Event)",
    default: "-",
  },
  {
    field: "onClick",
    desc: "点击时回调函数",
    type: "function(checked: boolean, event: Event)",
    default: "-",
  },
];

module.exports = Switch;
