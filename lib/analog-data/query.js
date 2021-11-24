const { writeLog } = require("../log");

// 条件查询
const query = (req, res, data) => {
  try {
    // 拷贝数据对象，不修改原始对象
    data = JSON.parse(JSON.stringify(data));
    // 查询条件为 'query=(json字符串)'
    const queryObj = JSON.parse(req.query.query);
    const { start = 0, limit = 100, conditions = [] } = queryObj;
    const result = [];
    data.result.map((v) => {
      const vString = JSON.stringify(v);
      let f = true;
      conditions.map(({ field, value }) => {
        try {
          const pattern = new RegExp(`${field}".*?"(.*?)"`);
          const matchRes = vString.match(pattern)[1];
          // 模糊查询
          if (!matchRes.includes(value)) {
            f = false;
            return;
          }
        } catch (err) {}
      });
      f && result.push(v);
    });
    data.result = result.splice(start, limit);
    res.send(data);
  } catch (err) {
    writeLog("查询参数错误");
    res.send(data);
  }
};

module.exports = { query };
