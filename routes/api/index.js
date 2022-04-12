var express = require("express");
const items = require("../../src/items");

var router = express.Router();

/* タスクを登録するルーティング */
router.post("/tasks", function (req, res, next) {
  console.log(req.body);
  const createTask = create.postCreateTasks(req.body);
});

/* 商品一覧を取得するルーティング */
router.get("/items", function (req, res, next) {
  const itemsList = items.getListItem();
  res.send(itemsList);
});

/*１件の商品情報を取得するルーティング */
router.get("/items/:id", function (req, res, next) {
  const item = items.getItem(req.params.id);
  res.send(item);
});

module.exports = router;
