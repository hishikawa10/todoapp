var express = require("express");
var router = express.Router();

const tasks = require("../../src/tasks.js");

// 1件のデータ削除処理
/* タスク一覧を削除するルーティング */
router.delete("/tasks/:id", async function (req, res, next) {
  const deleteTasksId = await tasks.deleteTasksId(req.params.id);
  res.send(deleteTasksId);
});

module.exports = router;
