const Menu = [
  {
    field: "defaultOpenKeys",
    desc: "初始展开的 SubMenu 菜单项 key 数组",
    type: "string[]",
    default: "-",
  },
  {
    field: "defaultSelectedKeys",
    desc: "初始选中的菜单项 key 数组",
    type: "string[]",
    default: "-",
  },
  {
    field: "expandIcon",
    desc: "自定义展开图标",
    type: "ReactNode \\| (props: SubMenuProps & { isSubMenu: boolean }) => ReactNode",
    default: "-",
  },
  {
    field: "forceSubMenuRender",
    desc: "在子菜单展示之前就渲染进 DOM",
    type: "boolean",
    default: "false",
  },
  {
    field: "inlineCollapsed",
    desc: "inline 时菜单是否收起状态",
    type: "boolean",
    default: "-",
  },
  {
    field: "inlineIndent",
    desc: "inline 模式的菜单缩进宽度",
    type: "number",
    default: "24",
  },
  {
    field: "mode",
    desc: "菜单类型，现在支持垂直、水平、和内嵌模式三种",
    type: "`vertical` \\| `horizontal` \\| `inline`",
    default: "vertical",
  },
  {
    field: "multiple",
    desc: "是否允许多选",
    type: "boolean",
    default: "false",
  },
  {
    field: "openKeys",
    desc: "当前展开的 SubMenu 菜单项 key 数组",
    type: "string[]",
    default: "-",
  },
  {
    field: "overflowedIndicator",
    desc: "自定义 Menu 折叠时的图标",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "selectable",
    desc: "是否允许选中",
    type: "boolean",
    default: "true",
  },
  {
    field: "selectedKeys",
    desc: "当前选中的菜单项 key 数组",
    type: "string[]",
    default: "-",
  },
  {
    field: "style",
    desc: "根节点样式",
    type: "CSSProperties",
    default: "-",
  },
  {
    field: "subMenuCloseDelay",
    desc: "用户鼠标离开子菜单后关闭延时，单位：秒",
    type: "number",
    default: "0.1",
  },
  {
    field: "subMenuOpenDelay",
    desc: "用户鼠标进入子菜单后开启延时，单位：秒",
    type: "number",
    default: "0",
  },
  {
    field: "theme",
    desc: "主题颜色",
    type: "`light` \\| `dark`",
    default: "light",
  },
  {
    field: "triggerSubMenuAction",
    desc: "SubMenu 展开/关闭的触发行为",
    type: "`hover` \\| `click`",
    default: "hover",
  },
  {
    field: "onClick",
    desc: "点击 MenuItem 调用此函数",
    type: "function({ item, key, keyPath, domEvent })",
    default: "-",
  },
  {
    field: "onDeselect",
    desc: "取消选中时调用，仅在 multiple 生效",
    type: "function({ item, key, keyPath, selectedKeys, domEvent })",
    default: "-",
  },
  {
    field: "onOpenChange",
    desc: "SubMenu 展开/关闭的回调",
    type: "function(openKeys: string[])",
    default: "-",
  },
  {
    field: "onSelect",
    desc: "被选中时调用",
    type: "function({ item, key, keyPath, selectedKeys, domEvent })",
    default: "-",
  },
];

const MenuItem = [
  {
    field: "danger",
    desc: "展示错误状态样式",
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
    field: "icon",
    desc: "菜单图标",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "key",
    desc: "item 的唯一标志",
    type: "string",
    default: "-",
  },
  {
    field: "title",
    desc: "设置收缩时展示的悬浮标题",
    type: "string",
    default: "-",
  },
];

const MenuSubMenu = [
  {
    field: "children",
    desc: "子菜单的菜单项",
    type: "Array<MenuItem \\| SubMenu>",
    default: "-",
  },
  {
    field: "disabled",
    desc: "是否禁用",
    type: "boolean",
    default: "false",
  },
  {
    field: "icon",
    desc: "菜单图标",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "key",
    desc: "唯一标志",
    type: "string",
    default: "-",
  },
  {
    field: "popupClassName",
    desc: '子菜单样式，mode="inline" 时无效',
    type: "string",
    default: "-",
  },
  {
    field: "popupOffset",
    desc: '子菜单偏移量，mode="inline" 时无效',
    type: "[number, number]",
    default: "-",
  },
  {
    field: "title",
    desc: "子菜单项值",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "onTitleClick",
    desc: "点击子菜单标题",
    type: "function({ key, domEvent })",
    default: "-",
  },
];

const MenuItemGroup = [
  {
    field: "children",
    desc: "分组的菜单项",
    type: "MenuItem[]",
    default: "-",
  },
  {
    field: "title",
    desc: "分组标题",
    type: "ReactNode",
    default: "-",
  },
];

const MenuDivider = [
  {
    field: "dashed",
    desc: "是否虚线",
    type: "boolean",
    default: "false",
  },
];

module.exports = { Menu, MenuItem, MenuSubMenu, MenuItemGroup, MenuDivider };
