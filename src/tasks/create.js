// 新規登録処理

const mysql = require("mysql2/promise");
const config = require("../../config.js");

/**
 * タスクを追加する　API
 *
 * @returns レスポンス　JSON
 */
postCreateTasks = async function (body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    //ここにSQLを記述する
    const sql =
      "INSERT INTO `todoapp`,`t_task` (`task_name`,`deadline`,`category_id`) VALUSES (?,?,?);";
    let d = [body, taskName, body.deadline, body.category];
    const [rows, fields] = await connection.query(sql, d);

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};
