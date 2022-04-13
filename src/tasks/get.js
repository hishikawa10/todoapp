var express = require("express");
var router = express.Router();

const tasks = require("../../src/tasks.js");

// 1件の情報取得処理
/* タスクを1件取するルーティング */
router.get("/tasks/:id", async function (req, res, next) {
  const getTasksId = await tasks.getTasksId(req.params.id);
  res.send(getTasksId);
});

module.exports = router;
