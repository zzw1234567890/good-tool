## Good Tool 简介

> 前端开发小工具。主要功能：API 模拟、 API 转发、action 代码生成器、antd 提示文档。目前支持 get、post、put、delete 请求，支持文件下载，文件上传还未测试

> 环境要求：node^14.17.4，vscode^1.59.0

<video src="https://img.amazing-w.top/plugin/good-tool/1.mp4" width="800px" height="500px" controls="controls"></video>

## Good Tool 快速开始

> 通过下面三个步骤即可使用模拟数据功能。

#### 第一步 修改你的项目配置

> package.json 文件中设置代理，端口号为本插件的监听端口，默认 21818

```json
"proxy":"http://127.0.0.1:21818"
```

#### 第二步 添加 API 配置文件

> 在/.vscode/good-tool/目录下随意新建一个 json 文件(文件名没有要求并且可以有多个，但必须是 json 后缀，文件名不能是 proxy.json，该文件会被插件的其他模块读取)

![](https://img.amazing-w.top/plugin/good-tool/2.png)

#### 第三步 自定义你的配置

> 你可以在配置文件中输入 <kbd>rc</kbd> 快速生成配置模板

```json
[
  {
    "url": "请求的url地址",
    "method": "请求方式",
    "data": "请求返回的数据"
  }
]
```
> 也可以在 <kbd>define</kbd> 目录下创建模拟数据定义文件，配置好后在文件编辑区右击->点击生成模拟数据文件，即可根据定义的规则快速生成你想要的数据，<kbd>.json</kbd> 定义文件格式如下所示：
```json
[
  {
    "url": "/test",
    "method": "get",
    "total": 2,     // 生成数据的数量,如果不传或者设置为0，则result返回对象，否则返回数组
    "columns": {    // 定义每条数据的key和value的类型，value支持：key | number | string | enum | timestamp | boolean | array
      "id": "key",  // 无需参数，生成uuid，保证唯一
      "name": "string",   // string: 随机生成长度0-128的字符串；string(10): 长度0-10；string(10, 100): 长度10-100
      "age": "number(0, 100)",  // number: 随机生成长度11的数字；number(5): 长度5；number(0, 100): 随机生成0-100的数字
      "sex": "enum(男,女)",   // 随机生成枚举值，该类型参数不能为空
      "time": "timestamp(hour)",   // 递增生成时间戳，参数支持: second | minute | hour | day | month | year | array，可不传默认为day
      "arr": "array(string(1,10),10)",  // 生成一个大小为10的字符串数组，字符串长度1-10(array类型两个参数都是必须的，第一个参数支持上述value的类型，但是不包括array)
      "company": {
        "total": 2,
        "columns": {
          "name": "string(10)",
          "age": "number"
        }
      }
    }
  }
]
```

## 扩展功能

#### 一、API 转发

##### 在 good-tool 插件配置中设置 proxy 为后台服务器地址即可

![](https://img.amazing-w.top/plugin/good-tool/11.png)

#### 二、多个代理

##### 注意：如果在一个 vscode 窗口中打开了多个项目，插件会在每个项目下创建配置目录，并会读取每个项目下的配置文件，如果存在相同的配置，后面项目中的配置会覆盖掉前面的配置，日志统一写入到第一个项目中的 log.txt 中

> 你可能注意到配置中有个 `useFileConfigProxy` 配置项，该配置默认关闭，如果开启这项配置，`proxy` 配置项将会失效，但会在/.vscode/good-tool/目录下创建一个 `proxy.json` 文件，在该文件中输入 `pc` 即可出现配置模板。你可以配置多个项目不同的 `source` 对应不同的 `target` ，也可以配置同一个 `source` 对应不同的 `target`，但最后只会转发给最后一个配置的 `target`

![](https://img.amazing-w.top/plugin/good-tool/4.png)

```json
[
  {
    // 本地服务url
    "source": "http://127.0.0.1:3000",
    // API服务器url
    "target": "https://10.182.226.48"
  }
]
```

#### 三、条件查询

##### 在配置文件中只需配置路由，不需要配置请求参数，目前只支持模糊查询

![](https://img.amazing-w.top/plugin/good-tool/5.png)

##### 请求时带上请求参数 `query` 即可，query 的值必须是 json 字符串，按照 antd 表格查询格式

![](https://img.amazing-w.top/plugin/good-tool/6.png)

#### 四、 手动更新配置文件

> 默认会自动更新，每隔两秒检测配置文件是否更新，如果需要使配置立即生效点击编辑标题区右上角的的小按钮，如果配置成功，右下角会弹出提示信息

![](https://img.amazing-w.top/plugin/good-tool/3.png)

#### 五、统计新增代码行数

> 该功能在配置了 svn 仓库时才能使用，通过调用 svn.patchAll 命令生成 patch 文件，并且自动保存，然后进行统计。如图，点击右上角按钮，之后会在右下角显示新增的代码行数

![](https://img.amazing-w.top/plugin/good-tool/7.png)

#### 六、根据路由配置文件自动生成 action 文件功能

> 支持自定义 action 模板文件，模板文件位置：/.vscode/good-tool/action.tpl，通过{{}}可以插入 js 表达式，并且要求表达式的值为字符串，生成器在执行时会将该语句的执行结果字符串替换{{}}中的内容。路由配置存储在 routeData 中，该变量可直接使用.

##### 1.右击路由配置文件，选择生成 action 文件

![](https://img.amazing-w.top/plugin/good-tool/8.png)

##### 2.选择保存路径

![](https://img.amazing-w.top/plugin/good-tool/9.png)

##### 3.自动生成 action 文件

![](https://img.amazing-w.top/plugin/good-tool/10.png)

#### 七、antd 组件悬停提示

> 支持常用的 antd 组件，二级组件的提示需要重命名，如 Form.Item 重命名为 FormItem；Radio.Group 重命名为 RadioGroup

![](https://img.amazing-w.top/plugin/good-tool/13.png)

#### 八、WebSocket 测试

> 浏览器中输入 http://127.0.0.1:21818/wssTest (注：端口号用插件实际启动的端口号，在日志文件中可以看到服务启动监听的端口号，默认为21818)。或者点击编辑器右上角的 wssTest 菜单在vscode中打开

![](https://img.amazing-w.top/plugin/good-tool/12.png)

> 需要配置 项目目录/.vscode/good-tool/wss-test/urls.json 文件,配置示例：

![](https://img.amazing-w.top/plugin/good-tool/14.png)

![](https://img.amazing-w.top/plugin/good-tool/15.png)

