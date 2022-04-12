// 1件のデータ削除処理
// 削除ボタン押下時
$(".delete").on("click", function () {
  const taskName = $(this).data("delete");
  alert(`下記の内容を削除します。\n ${taskName}`);
});
