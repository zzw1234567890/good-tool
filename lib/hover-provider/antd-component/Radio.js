const Radio = [
  {
    field: "autoFocus",
    desc: "自动获取焦点",
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
    field: "defaultChecked",
    desc: "初始是否选中",
    type: "boolean",
    default: "false",
  },
  {
    field: "disabled",
    desc: "禁用 Radio",
    type: "boolean",
    default: "false",
  },
  {
    field: "value",
    desc: "根据 value 进行比较，判断是否选中",
    type: "any",
    default: "-",
  },
];

const RadioButton = Radio;

const RadioGroup = [
  {
    field: "buttonStyle",
    desc: "RadioButton 的风格样式，目前有描边和填色两种风格",
    type: "`outline` \\| `solid`",
    default: "outline",
  },
  {
    field: "defaultValue",
    desc: "默认选中的值",
    type: "any",
    default: "-",
  },
  {
    field: "disabled",
    desc: "禁选所有子单选器",
    type: "boolean",
    default: "false",
  },
  {
    field: "name",
    desc: 'RadioGroup 下所有 input[type="radio"] 的 name 属性',
    type: "string",
    default: "-",
  },
  {
    field: "options",
    desc: "以配置形式设置子元素",
    type: "string[] \\| Array<{ label: string value: string disabled?: boolean }>",
    default: "-",
  },
  {
    field: "optionType",
    desc: "用于设置 Radio options 类型",
    type: "`default` \\| `button`",
    default: "default",
  },
  {
    field: "size",
    desc: "大小，只对按钮样式生效",
    type: "`large` \\| `middle` \\| `small`",
    default: "false",
  },
  {
    field: "value",
    desc: "用于设置当前选中的值",
    type: "any",
    default: "-",
  },
  {
    field: "onChange",
    desc: "选项变化时的回调函数",
    type: "function(e:Event)",
    default: "-",
  },
];

module.exports = { Radio, RadioButton, RadioGroup };
