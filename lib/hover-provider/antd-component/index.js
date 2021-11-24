const Button = require("./Button");
const Form = require("./Form");
const Table = require("./Table");
const Pagination = require("./Pagination");
const PageHeader = require("./PageHeader");
const Menu = require("./Menu");
const Input = require("./Input");
const Select = require("./Select");
const Radio = require("./Radio");
const Switch = require("./Switch");
const Spin = require("./Spin");
const Modal = require("./Modal");
const Tabs = require("./Tabs");
const Progress = require("./Progress");
const Tooltip = require("./Tooltip");
const Popover = require("./Popover");
const Popconfirm = require("./Popconfirm");

const urlPre = "https://ant.design/components/";

const docLink = {
  Button: `${urlPre}button-cn/#API`,
  Icon: `${urlPre}icon-cn/#API`,
  Typography: `${urlPre}typography-cn/#API`,
  Divider: `${urlPre}divider-cn/#API`,
  Grid: `${urlPre}grid-cn/#API`,
  Layout: `${urlPre}layout-cn/#API`,
  Space: `${urlPre}space-cn/#API`,
  Affix: `${urlPre}affix-cn/#API`,
  Breadcrumb: `${urlPre}breadcrumb-cn/#API`,
  Dropdown: `${urlPre}dropdown-cn/#API`,
  Steps: `${urlPre}steps-cn/#API`,
  AutoComplete: `${urlPre}auto-complete-cn/#API`,
  Cascader: `${urlPre}cascader-cn/#API`,
  Checkbox: `${urlPre}checkbox-cn/#API`,
  DatePicker: `${urlPre}date-picker-cn/#API`,
  InputNumber: `${urlPre}input-number-cn/#API`,
  Mentions: `${urlPre}mentions-cn/#API`,
  Rate: `${urlPre}rate-cn/#API`,
  Slider: `${urlPre}slider-cn/#API`,
  TimePicker: `${urlPre}time-picker-cn/#API`,
  Transfer: `${urlPre}transfer-cn/#API`,
  TreeSelect: `${urlPre}tree-select-cn/#API`,
  Upload: `${urlPre}upload-cn/#API`,
  Avatar: `${urlPre}avatar-cn/#API`,
  Badge: `${urlPre}badge-cn/#API`,
  Calendar: `${urlPre}calendar-cn/#API`,
  Card: `${urlPre}card-cn/#API`,
  Carousel: `${urlPre}carousel-cn/#API`,
  Collapse: `${urlPre}collapse-cn/#API`,
  Comment: `${urlPre}comment-cn/#API`,
  Descriptions: `${urlPre}descriptions-cn/#API`,
  Empty: `${urlPre}empty-cn/#API`,
  Image: `${urlPre}image-cn/#API`,
  List: `${urlPre}list-cn/#API`,
  Statistic: `${urlPre}statistic-cn/#API`,
  Tag: `${urlPre}tag-cn/#API`,
  Timeline: `${urlPre}timeline-cn/#API`,
  Tree: `${urlPre}tree-cn/#API`,
  Alert: `${urlPre}alert-cn/#API`,
  Drawer: `${urlPre}drawer-cn/#API`,
  Message: `${urlPre}message-cn/#API`,
  Notification: `${urlPre}notification-cn/#API`,
  Result: `${urlPre}result-cn/#API`,
  Skeleton: `${urlPre}skeleton-cn/#API`,
  Anchor: `${urlPre}anchor-cn/#API`,
  BackTop: `${urlPre}back-top-cn/#API`,
  ConfigProvider: `${urlPre}config-provider-cn/#API`,
  Form: `${urlPre}form-cn/#API`,
  FormItem: `${urlPre}form-cn/#Form.Item`,
  Table: `${urlPre}table-cn/#API`,
  Pagination: `${urlPre}pagination-cn/#API`,
  PageHeader: `${urlPre}page-header-cn/#API`,
  Menu: `${urlPre}menu-cn/#API`,
  MenuItem: `${urlPre}menu-cn/#Menu.Item`,
  MenuSubMenu: `${urlPre}menu-cn/#Menu.SubMenu`,
  MenuItemGroup: `${urlPre}menu-cn/#Menu.ItemGroup`,
  MenuDivider: `${urlPre}menu-cn/#Menu.Divider`,
  Input: `${urlPre}input-cn/#API`,
  InputTextArea: `${urlPre}input-cn/#Input.TextArea`,
  InputSearch: `${urlPre}input-cn/#Input.Search`,
  InputGroup: `${urlPre}input-cn/#Input.Group`,
  InputPassword: `${urlPre}input-cn/#Input.Password`,
  Select: `${urlPre}select-cn/#API`,
  Radio: `${urlPre}select-cn/#API`,
  RadioButton: `${urlPre}select-cn/#API`,
  RadioGroup: `${urlPre}radio-cn/#RadioGroup`,
  Switch: `${urlPre}switch-cn/#API`,
  Spin: `${urlPre}spin-cn/#API`,
  Modal: `${urlPre}modal-cn/#API`,
  Tabs: `${urlPre}tabs-cn/#API`,
  TabsTabPane: `${urlPre}tabs-cn/#Tabs.TabPane`,
  Progress: `${urlPre}progress-cn/#API`,
  Tooltip: `${urlPre}tooltip-cn/#API`,
  Popover: `${urlPre}popover-cn/#API`,
  Popconfirm: `${urlPre}popconfirm-cn/#API`,
};

module.exports = {
  docLink,
  ...Form,
  ...Menu,
  ...Input,
  ...Radio,
  ...Tabs,
  Select,
  Switch,
  Button,
  Table,
  Pagination,
  PageHeader,
  Spin,
  Modal,
  Progress,
  Tooltip,
  Popover,
  Popconfirm,
};
