const PageHeader = [
  {
    field: "avatar",
    desc: "标题栏旁的头像",
    type: "[AvatarProps](https://ant.design/components/avatar-cn/)",
    default: "-",
  },
  {
    field: "backIcon",
    desc: "自定义 back icon ，如果为 false 不渲染 back icon",
    type: "ReactNode \\| boolean",
    default: "<ArrowLeft />",
  },
  {
    field: "breadcrumb",
    desc: "面包屑的配置",
    type: "[Breadcrumb](https://ant.design/components/breadcrumb-cn/)",
    default: "-",
  },
  {
    field: "breadcrumbRender",
    desc: "自定义面包屑区域的内容",
    type: "(props, originBreadcrumb) => ReactNode",
    default: "-",
  },
  {
    field: "extra",
    desc: "操作区，位于 title 行的行尾",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "footer",
    desc: "PageHeader 的页脚，一般用于渲染 TabBar",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "ghost",
    desc: "pageHeader 的类型，将会改变背景颜色",
    type: "boolean",
    default: "true",
  },
  {
    field: "subTitle",
    desc: "自定义的二级标题文字",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "tags",
    desc: "title 旁的 tag 列表",
    type: "[Tag[] | Tag](https://ant.design/components/tag-cn/)",
    default: "-",
  },
  {
    field: "title",
    desc: "自定义标题文字",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "onBack",
    desc: "返回按钮的点击事件",
    type: "() => void",
    default: "-",
  },
];

module.exports = PageHeader;
