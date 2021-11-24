const Pagination = [
  {
    field: "current",
    desc: "当前页数",
    type: "number",
    default: "-",
  },
  {
    field: "defaultCurrent",
    desc: "默认的当前页数",
    type: "number",
    default: "1",
  },
  {
    field: "defaultPageSize	",
    desc: "默认的每页条数",
    type: "number",
    default: "10",
  },
  {
    field: "disabled",
    desc: "禁用分页",
    type: "boolean",
    default: "-",
  },
  {
    field: "hideOnSinglePage",
    desc: "只有一页时是否隐藏分页器",
    type: "boolean",
    default: "false",
  },
  {
    field: "itemRender",
    desc: "用于自定义页码的结构，可用于优化 SEO",
    type: "(page, type: 'page' \\| 'prev' \\| 'next', originalElement) => React.ReactNode",
    default: "-",
  },
  {
    field: "pageSize",
    desc: "每页条数",
    type: "number",
    default: "-",
  },
  {
    field: "pageSizeOptions	",
    desc: "指定每页可以显示多少条",
    type: "string[]",
    default: "[10, 20, 50, 100]",
  },
  {
    field: "responsive",
    desc: "当 size 未指定时，根据屏幕宽度自动调整尺寸",
    type: "boolean",
    default: "-",
  },
  {
    field: "showLessItems",
    desc: "是否显示较少页面内容",
    type: "boolean",
    default: "false",
  },
  {
    field: "showQuickJumper",
    desc: "是否可以快速跳转至某页",
    type: "boolean \\| { goButton: ReactNode }",
    default: "false",
  },
  {
    field: "showSizeChanger",
    desc: "是否展示 pageSize 切换器，当 total 大于 50 时默认为 true",
    type: "boolean",
    default: "-",
  },
  {
    field: "showTitle",
    desc: "是否显示原生 tooltip 页码提示",
    type: "boolean",
    default: "true",
  },
  {
    field: "showTotal",
    desc: "用于显示数据总量和当前数据顺序",
    type: "function(total, range)",
    default: "-",
  },
  {
    field: "simple",
    desc: "当添加该属性时，显示为简单分页",
    type: "boolean",
    default: "-",
  },
  {
    field: "size",
    desc: "当为 small 时，是小尺寸分页",
    type: "`default` \\| `small`",
    default: "default",
  },
  {
    field: "total",
    desc: "数据总数",
    type: "number",
    default: "0",
  },
  {
    field: "onChange",
    desc: "页码或 pageSize 改变的回调，参数是改变后的页码及每页条数",
    type: "function(page, pageSize)",
    default: "-",
  },
  {
    field: "onShowSizeChange",
    desc: "pageSize 变化的回调",
    type: "function(current, size)",
    default: "-",
  },
];

module.exports = Pagination;
