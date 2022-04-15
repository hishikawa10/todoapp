const mysql = require("mysql2/promise");
const config = require("../config.js");

/**
 * タスクを１件削除する API
 *
 * @returns レスポンス JSON
 */
deleteTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql = "DELETE from t_task WHERE id = ?;";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);

    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.deleteTasksId = deleteTasksId;
