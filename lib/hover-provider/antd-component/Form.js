const Form = [
  {
    field: "colon",
    desc: "配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)",
    type: "boolean",
    default: "true",
  },
  {
    field: "component",
    desc: "设置 Form 渲染元素，为 false 则不创建 DOM 节点",
    type: "ComponentType \\| `false`",
    default: "form",
  },
  {
    field: "fields",
    desc: "通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。",
    type: "FieldData[]",
    default: "-",
  },
  {
    field: "form",
    desc: "经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建",
    type: "FormInstance",
    default: "-",
  },
  {
    field: "initialValues",
    desc: "表单默认值，只有初始化以及重置时生效",
    type: "object",
    default: "-",
  },
  {
    field: "labelAlign",
    desc: "label 标签的文本对齐方式",
    type: "`left` \\| `right`",
    default: "right",
  },
  {
    field: "labelCol",
    desc: "label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}",
    type: "object",
    default: "-",
  },
  {
    field: "layout",
    desc: "表单布局",
    type: "`horizontal` \\| `vertical` \\| `inline`",
    default: "horizontal",
  },
  {
    field: "name",
    desc: "表单名称，会作为表单字段 id 前缀使用",
    type: "string",
    default: "-",
  },
  {
    field: "preserve",
    desc: "当字段被删除时保留字段值",
    type: "boolean",
    default: "true",
  },
  {
    field: "requiredMark",
    desc: "必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置",
    type: "boolean \\| optional",
    default: "true",
  },
  {
    field: "scrollToFirstError",
    desc: "提交失败自动滚动到第一个错误字段",
    type: "boolean \\| Options",
    default: "false",
  },
  {
    field: "size",
    desc: "设置字段组件的尺寸（仅限 antd 组件）",
    type: "`small` \\| `middle` \\| `large`",
    default: "-",
  },
  {
    field: "validateMessages",
    desc: "验证提示模板",
    type: "ValidateMessages",
    default: "-",
  },
  {
    field: "validateTrigger",
    desc: "统一设置字段触发验证的时机",
    type: "string \\| string[]",
    default: "false",
  },
  {
    field: "wrapperCol",
    desc: "需要为输入控件设置布局样式时，使用该属性，用法同 labelCol",
    type: "object",
    default: "-",
  },
  {
    field: "onFieldsChange",
    desc: "字段更新时触发回调事件",
    type: "function(changedFields, allFields)",
    default: "-",
  },
  {
    field: "onFinish",
    desc: "提交表单且数据验证成功后回调事件",
    type: "function(values)",
    default: "-",
  },
  {
    field: "onFinishFailed",
    desc: "提交表单且数据验证失败后回调事件",
    type: "function({ values, errorFields, outOfDate })",
    default: "-",
  },
  {
    field: "onValuesChange",
    desc: "字段值更新时触发回调事件",
    type: "function(changedValues, allValues)",
    default: "-",
  },
];

const FormItem = [
  {
    field: "colon",
    desc: "配合 label 属性使用，表示是否显示 label 后面的冒号",
    type: "boolean",
    default: "true",
  },
  {
    field: "dependencies",
    desc: "设置依赖字段",
    type: "NamePath[]",
    default: "-",
  },
  {
    field: "extra",
    desc: "额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "getValueFromEvent",
    desc: "设置如何将 event 的值转换成字段值",
    type: "(..args: any[]) => any",
    default: "-",
  },
  {
    field: "getValueProps",
    desc: "为子元素添加额外的属性",
    type: "(value: any) => any",
    default: "-",
  },
  {
    field: "hasFeedback",
    desc: "配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用",
    type: "boolean",
    default: "false",
  },
  {
    field: "help",
    desc: "提示信息，如不设置，则会根据校验规则自动生成",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "hidden",
    desc: "是否隐藏字段（依然会收集和校验字段）",
    type: "boolean",
    default: "false",
  },
  {
    field: "htmlFor",
    desc: "设置子元素 label htmlFor 属性",
    type: "string",
    default: "-",
  },
  {
    field: "initialValue",
    desc: "设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准",
    type: "string",
    default: "-",
  },
  {
    field: "label",
    desc: "label 标签的文本",
    type: "ReactNode",
    default: "-",
  },
  {
    field: "labelAlign",
    desc: "标签文本对齐方式",
    type: "`left` \\| `right`",
    default: "right",
  },
  {
    field: "labelCol",
    desc: "label 标签布局，同 <Col> 组件，如 {span: 3, offset: 12}。当和 Form 同时设置时，以 Item 为准",
    type: "object",
    default: "-",
  },
  {
    field: "messageVariables",
    desc: "默认验证字段的信息",
    type: "Record<string, string>",
    default: "-",
  },
  {
    field: "name",
    desc: "字段名，支持数组",
    type: "string \\| number \\| (string \\| number)[]",
    default: "-",
  },
  {
    field: "normalize",
    desc: "组件获取值后进行转换，再放入 Form 中。不支持异步",
    type: "(value, prevValue, prevValues) => any",
    default: "-",
  },
  {
    field: "noStyle",
    desc: "为 true 时不带样式，作为纯字段控件使用",
    type: "boolean",
    default: "false",
  },
  {
    field: "preserve",
    desc: "当字段被删除时保留字段值",
    type: "boolean",
    default: "true",
  },
  {
    field: "required",
    desc: "必填样式设置。如不设置，则会根据校验规则自动生成",
    type: "boolean",
    default: "false",
  },
  {
    field: "rules",
    desc: "校验规则，设置字段的校验逻辑",
    type: "Rule[]",
    default: "-",
  },
  {
    field: "shouldUpdate",
    desc: "自定义字段更新逻辑",
    type: "boolean \\| (prevValue, curValue) => boolean",
    default: "false",
  },
  {
    field: "tooltip",
    desc: "配置提示信息",
    type: "ReactNode \\| TooltipProps & { icon: ReactNode }",
    default: "-",
  },
  {
    field: "trigger",
    desc: "设置收集字段值变更的时机",
    type: "string",
    default: "onChange",
  },
  {
    field: "validateFirst",
    desc: "当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验",
    type: "boolean \\| `parallel`",
    default: "parallel: 4.5.0",
  },
  {
    field: "validateStatus",
    desc: "校验状态，如不设置，则会根据校验规则自动生成",
    type: "`success`\\|`warning`\\|`error`\\|`validating`",
    default: "-",
  },
  {
    field: "validateTrigger",
    desc: "设置字段校验的时机",
    type: "string | string[]",
    default: "onChange",
  },
  {
    field: "valuePropName",
    desc: "子节点的值的属性，如 Switch 的是 'checked'。该属性为 getValueProps 的封装，自定义 getValueProps 后会失效",
    type: "string",
    default: "value",
  },
  {
    field: "wrapperCol",
    desc: "用法同 labelCol。当和 Form 同时设置时，以 Item 为准",
    type: "object",
    default: "-",
  },
];

module.exports = { Form, FormItem };
