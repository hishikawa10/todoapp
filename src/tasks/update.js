var express = require("express");
var router = express.Router();

const tasks = require("../../src/tasks.js");

// 更新処理
/* タスクを1件更新するルーティング */
router.patch("/tasks/:id", async function (req, res, next) {
  console.log(req.param.id);
  const patchTasksId = await tasks.patchTasksId(req.params.id, req.body);
  res.send(patchTasksId);
});

module.exports = router;
