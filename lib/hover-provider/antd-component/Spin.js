const Spin = [
  {
    field: "delay",
    desc: "延迟显示加载效果的时间（防止闪烁）",
    type: "number (毫秒)",
    default: "-",
  },
  {
    field: "indicator",
    desc: "加载指示符",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "size",
    desc: "组件大小",
    type: "`small` \\| `default` \\| `large`",
    default: "default",
  },
  {
    field: "spinning",
    desc: "是否为加载中状态",
    type: "boolean",
    default: "true",
  },
  {
    field: "tip",
    desc: "当作为包裹元素时，可以自定义描述文案",
    type: "string",
    default: "-",
  },
  {
    field: "wrapperClassName",
    desc: "包装器的类属性",
    type: "string",
    default: "-",
  },
];

module.exports = Spin;
