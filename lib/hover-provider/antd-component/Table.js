const Table = [
  {
    field: "bordered",
    desc: "是否展示外边框和列边框",
    type: "boolean",
    default: "false",
  },
  {
    field: "columns",
    desc: "表格列的配置描述",
    type: "ColumnsType[]",
    default: "-",
  },
  {
    field: "components",
    desc: "覆盖默认的 table 元素",
    type: "TableComponents",
    default: "-",
  },
  {
    field: "dataSource",
    desc: "数据数组",
    type: "object[]",
    default: "-",
  },
  {
    field: "expandable",
    desc: "配置展开属性",
    type: "expandable",
    default: "-",
  },
  {
    field: "footer",
    desc: "表格尾部",
    type: "function(currentPageData)",
    default: "-",
  },
  {
    field: "getPopupContainer",
    desc: "设置表格内各类浮层的渲染节点，如筛选菜单",
    type: "(triggerNode) => HTMLElement",
    default: "() => TableHtmlElement",
  },
  {
    field: "loading",
    desc: "页面是否加载中",
    type: "boolean \\| Spin Props",
    default: "false",
  },
  {
    field: "locale",
    desc: "默认文案设置，目前包括排序、过滤、空数据文案",
    type: "object",
    default: "-",
  },
  {
    field: "pagination",
    desc: "分页器，设为 false 时不展示和进行分页",
    type: "object",
    default: "-",
  },
  {
    field: "rowClassName",
    desc: "表格行的类名",
    type: "function(record, index): string",
    default: "-",
  },
  {
    field: "rowKey",
    desc: "表格行 key 的取值，可以是字符串或一个函数",
    type: "string \\| function(record): string",
    default: "key",
  },
  {
    field: "rowSelection",
    desc: "表格行是否可选择",
    type: "object",
    default: "-",
  },
  {
    field: "scroll",
    desc: "表格是否可滚动，也可以指定滚动区域的宽、高",
    type: "object",
    default: "-",
  },
  {
    field: "showHeader",
    desc: "是否显示表头",
    type: "boolean",
    default: "true",
  },
  {
    field: "showSorterTooltip",
    desc: "表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性",
    type: "boolean \\| Tooltip props",
    default: "true",
  },
  {
    field: "size",
    desc: "表格大小",
    type: "`default` \\| `middle` \\| `small`",
    default: "onChange",
  },
  {
    field: "sortDirections",
    desc: "支持的排序方式，取值为 ascend descend",
    type: "Array",
    default: "[ascend, descend]",
  },
  {
    field: "sticky",
    desc: "置粘性头部和滚动条",
    type: "boolean \\| {offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}",
    default: "-",
  },
  {
    field: "summary",
    desc: "总结栏",
    type: "(currentData) => ReactNode",
    default: "-",
  },
  {
    field: "tableLayout",
    desc: "表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局",
    type: "`-` \\| `auto` \\| `fixed`",
    default: "-",
  },
  {
    field: "title",
    desc: "表格标题",
    type: "function(currentPageData)",
    default: "-",
  },
  {
    field: "onChange",
    desc: "分页、排序、筛选变化时触发",
    type: "function(pagination, filters, sorter, extra: { currentDataSource: [], action: paginate | sort | filter })",
    default: "-",
  },
  {
    field: "onHeaderRow",
    desc: "设置头部行属性",
    type: "function(columns, index)",
    default: "-",
  },
  {
    field: "onRow",
    desc: "设置行属性",
    type: "function(record, index)",
    default: "-",
  },
];

module.exports = Table;