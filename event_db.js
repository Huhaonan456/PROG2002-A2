const mysql = require('mysql2/promise');

// 数据库配置
const dbConfig = {
  host: 'localhost', // 本地数据库地址（默认localhost）
  user: 'root', // 如root（需替换为你的实际用户名）
  password: '123456', // 需替换为你的实际密码
  database: 'charityevents_db' // 文档1-52章节要求的固定库名
};

// 创建连接池（文档隐含要求：避免频繁创建连接，提升性能）
const pool = mysql.createPool(dbConfig);

// 测试连接（可选，用于验证是否能正常连接数据库）
async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('数据库连接成功！测试结果：', rows[0].solution); // 输出2则连接正常
  } catch (err) {
    console.error('数据库连接失败（请检查配置）：', err); // 若报错，需排查用户名/密码/库名
  }
}
testConnection();

module.exports = pool; // 导出连接池，供API接口调用