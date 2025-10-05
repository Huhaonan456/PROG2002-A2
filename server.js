const express = require('express');
const cors = require('cors');
const pool = require('./event_db.js'); // 引入数据库连接

const app = express();
const port = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 全局数据库连接测试（启动时执行一次，验证连接配置）
async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 数据库连接成功！');
    connection.release(); // 释放连接
  } catch (err) {
    console.error('❌ 数据库连接失败：', err.message);
    console.error('请检查event_db.js中的连接配置（host、user、password、database）');
  }
}
testDbConnection(); // 启动时测试连接


// 🔹 接口1：首页活动列表
app.get('/api/events/home', async (req, res) => {
  console.log('\n--- 收到首页活动列表请求 ---');
  try {
    const sql = `
      SELECT 
        e.event_id, 
        e.event_name, 
        e.event_date, 
        e.event_location, 
        e.event_ticket_price, 
        c.category_name 
      FROM events e
      JOIN categories c ON e.category_id = c.category_id
      WHERE 
        e.event_is_suspended = 0 
        AND e.event_status = 'Upcoming' 
      ORDER BY e.event_date ASC
    `;
    console.log('执行SQL：', sql); // 打印SQL语句

    const [rows] = await pool.query(sql);
    console.log('首页活动查询结果：', rows.length, '条数据'); // 打印结果数量

    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: '获取首页活动失败' });
    console.error('首页接口错误详情：', err); // 打印完整错误
  }
});


// 🔹 接口2：活动分类列表
app.get('/api/categories', async (req, res) => {
  console.log('\n--- 收到活动分类列表请求 ---');
  try {
    const sql = `
      SELECT category_id, category_name 
      FROM categories 
      ORDER BY category_name ASC
    `;
    console.log('执行SQL：', sql);

    const [rows] = await pool.query(sql);
    console.log('分类查询结果：', rows.length, '条数据');

    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: '获取活动分类失败' });
    console.error('分类接口错误详情：', err);
  }
});


// 🔹 接口3：活动搜索
app.get('/api/events/search', async (req, res) => {
  console.log('\n--- 收到活动搜索请求 ---');
  const { date, location, category_id } = req.query;
  console.log('搜索参数：', { date, location, category_id }); // 打印前端传递的筛选条件

  let sql = `
    SELECT 
      e.event_id, 
      e.event_name, 
      e.event_date, 
      e.event_location, 
      e.event_ticket_price, 
      c.category_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.event_is_suspended = 0
  `;
  const sqlParams = [];

  if (date) {
    sql += ` AND e.event_date LIKE ?`;
    sqlParams.push(`${date}%`);
  }
  if (location) {
    sql += ` AND e.event_location LIKE ?`;
    sqlParams.push(`%${location}%`);
  }
  if (category_id) {
    sql += ` AND e.category_id = ?`;
    sqlParams.push(parseInt(category_id));
  }

  try {
    console.log('执行SQL：', sql);
    console.log('SQL参数：', sqlParams); // 打印动态参数

    const [rows] = await pool.query(sql, sqlParams);
    console.log('搜索结果：', rows.length, '条数据');

    res.status(200).json({ success: true, data: rows, total: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: '活动搜索失败' });
    console.error('搜索接口错误详情：', err);
  }
});


// 🔹 接口4：活动详情（重点调试）
app.get('/api/events/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  console.log('\n--- 收到活动详情请求 ---');
  console.log('接收的eventId：', eventId, '类型：', typeof eventId); // 打印ID及类型

  try {
    const sql = `
      SELECT 
        e.*, 
        c.category_name, 
        o.org_name, o.org_mission, o.org_contact_email, o.org_phone 
      FROM events e
      JOIN categories c ON e.category_id = c.category_id
      JOIN organizations o ON e.org_id = o.org_id
      WHERE 
        e.event_id = ? 
        AND e.event_is_suspended = 0
    `;
    const params = [parseInt(eventId)]; // 显式转换为数字
    console.log('执行SQL：', sql);
    console.log('SQL参数：', params); // 打印最终传递给SQL的参数

    const [rows] = await pool.query(sql, params);
    console.log('详情查询结果行数：', rows.length); // 打印结果数量

    if (rows.length === 0) {
      console.log('活动不存在或已暂停：eventId=', eventId);
      return res.status(404).json({ 
        success: false, 
        message: '活动不存在或已被暂停' 
      });
    }

    console.log('返回活动详情：', rows[0].event_name); // 打印活动名称（验证数据）
    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: '获取活动详情失败' });
    console.error('详情接口错误详情：', err); // 打印完整错误堆栈
  }
});


app.listen(port, () => {
  console.log(`\nAPI服务已启动：http://localhost:${port}`);
  console.log('请访问详情接口测试：http://localhost:3000/api/events/4'); // 提示测试链接
});