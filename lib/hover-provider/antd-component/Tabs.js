const Tabs = [
  {
    field: "activeKey",
    desc: "当前激活 tab 面板的 key",
    type: "string",
    default: "-",
  },
  {
    field: "addIcon",
    desc: "自定义添加按钮",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "animated",
    desc: '是否使用动画切换 Tabs, 仅生效于 tabPosition="top"',
    type: "boolean \\| { inkBar: boolean, tabPane: boolean }",
    default: "{ inkBar: true, tabPane: false }",
  },
  {
    field: "centered",
    desc: "标签居中展示",
    type: "boolean",
    default: "false",
  },
  {
    field: "defaultActiveKey",
    desc: "初始化选中面板的 key，如果没有设置 activeKey",
    type: "string",
    default: "第一个面板",
  },
  {
    field: "hideAdd",
    desc: '是否隐藏加号图标，在 type="editable-card" 时有效',
    type: "boolean",
    default: "false",
  },
  {
    field: "moreIcon",
    desc: "自定义折叠 icon",
    type: "ReactNode",
    default: "<EllipsisOutlined />",
  },
  {
    field: "renderTabBar",
    desc: "替换 TabBar，用于二次封装标签头",
    type: "(props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement",
    default: "-",
  },
  {
    field: "size",
    desc: "大小",
    type: "`large` \\| `default` \\| `small`",
    default: "default",
  },
  {
    field: "tabBarExtraContent",
    desc: "tab bar 上额外的元素",
    type: "ReactNode \\| {left?: ReactNode, right?: ReactNode}",
    default: "-",
  },
  {
    field: "tabBarGutter",
    desc: "tabs 之间的间隙",
    type: "number",
    default: "-",
  },
  {
    field: "tabBarStyle",
    desc: "tab bar 的样式对象",
    type: "object",
    default: "-",
  },
  {
    field: "tabPosition",
    desc: "页签位置",
    type: "ReactNode",
    default: "取消",
  },
  {
    field: "cancelText",
    desc: "取消按钮文字",
    type: "`top` \\| `right` \\| `bottom` \\| `left`",
    default: "top",
  },
  {
    field: "destroyInactiveTabPane",
    desc: "被隐藏时是否销毁 DOM 结构",
    type: "boolean",
    default: "false",
  },
  {
    field: "type",
    desc: "页签的基本样式",
    type: "`line` \\| `card` \\| `editable-card`",
    default: "line",
  },
  {
    field: "onChange",
    desc: "切换面板的回调",
    type: "function(activeKey) {}",
    default: "-",
  },
  {
    field: "onEdit",
    desc: '新增和删除页签的回调，在 type="editable-card" 时有效',
    type: "(targetKey, action): void",
    default: "-",
  },
  {
    field: "onTabClick",
    desc: "tab 被点击的回调",
    type: "function(key: string, event: MouseEvent)",
    default: "-",
  },
  {
    field: "onTabScroll",
    desc: "tab 滚动时触发",
    type: "function({ direction: left \\| right \\| top \\| bottom })",
    default: "-",
  },
];

const TabsTabPane = [
  {
    field: "closeIcon",
    desc: '自定义关闭图标，在 type="editable-card"时有效',
    type: "ReactNode",
    default: "-",
  },
  {
    field: "forceRender",
    desc: "被隐藏时是否渲染 DOM 结构",
    type: "boolean",
    default: "false",
  },
  {
    field: "key",
    desc: "对应 activeKey",
    type: "string",
    default: "-",
  },
  {
    field: "tab",
    desc: "选项卡头显示文字",
    type: "ReactNode",
    default: "-",
  },
];

module.exports = { Tabs, TabsTabPane };
