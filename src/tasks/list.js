var express = require("express");
var router = express.Router();

const tasks = require("../../src/tasks.js");

// 一覧取得の処理
/* タスク一覧を取得するルーティング*/
router.get("/tasks", async function (req, res, next) {
  const getTasks = await tasks.getTasks();
  res.send(getTasks);
});

module.exports = router;
