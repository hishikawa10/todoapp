// 新規登録処理

const mysql = require("mysql2/promise");
const config = require("../config.js");

/**
 * タスクを新規登録する API
 *
 * @returns レスポンス JSON
 */
postTasks = async function (body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "INSERT INTO todoapp.t_task (task_name, deadline, category_id) VALUES (?,?,?);";
    let d = [body.taskName, body.deadline, body.category];
    const [rows, fields] = await connection.query(sql, d);

    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを一覧取得する API
 *
 * @returns レスポンス JSON
 */
getTasks = async function () {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id;";
    const [rows, fields] = await connection.query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

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

/**
 * タスクを１件取得する API
 *
 * @returns レスポンス JSON
 */
getTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id WHERE t_task.id = ?";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを１件更新する API
 *
 * @returns レスポンス JSON
 */
patchTasksId = async function (id, body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "UPDATE t_task SET task_name=?, deadline=?, category_id=?, task_status=?, updated_at=? WHERE id=?;";
    let d = [
      body.taskName,
      body.deadline,
      body.category,
      body.status,
      new Date(),
      id,
    ];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

//ソート API
getSortedTasks = async function (sort, asc) {
  let connection = null;
  try {
    console.log("here1");
    console.log(sort);
    console.log(asc);
    connection = await mysql.createConnection(config.dbSetting);
    var sql = "";
    switch (sort) {
      case "0":
        if (asc == 0) {
          console.log("here2");
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY t_task.task_name DESC;";
        } else {
          console.log("here3");
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY t_task.task_name ASC;";
        }
        break;
      case "1":
        if (asc == 0) {
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY m_category.category_name DESC;";
        } else {
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY m_category.category_name ASC;";
        }
        break;
      case "2":
        if (asc == 0) {
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY t_task.deadline DESC;";
        } else {
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY t_task.deadline ASC;";
        }
        break;
      case "3":
        if (asc == 0) {
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY t_task.updated_at DESC;";
        } else {
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY t_task.updated_at ASC;";
        }
        break;
      case "4":
        if (asc == 0) {
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY t_task.task_status DESC;";
        } else {
          sql =
            "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.id ORDER BY t_task.task_status ASC;";
        }
        break;
    }
    console.log(sql);
    const [rows, fields] = await connection.query(sql);
    console.log("here5");
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

getTaskcategory_name = async function () {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id WHERE t_task.category_name = ?";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.getTasks = getTasks;
exports.postTasks = postTasks;
exports.deleteTasksId = deleteTasksId;
exports.getTasksId = getTasksId;
exports.patchTasksId = patchTasksId;
exports.getTaskcategory_name = getTaskcategory_name;
exports.getSortedTasks = getSortedTasks;
