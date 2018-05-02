var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require('ykt-http-client');
// hc.url("127.0.0.1:3001");
hc.url("192.168.43.143:3001");
//增加
router.post('/', function (req, res, next) {
  let ID = req.body.ids
  let item = req.body.item;
  const { photo, variety, name, color, gender, money, age } = item
  hc.post("/pets", { photo, variety, name, color, gender, money, age, "storeManagers": JSON.stringify({ $ref: "storeManagers", $id: ID }) }).then(function () {//cinemas集合
      res.send("suc");
  });
});
//渲染
router.get('/', function (req, res, next) {
  let page = req.query.page || 1;
  let rows = req.query.rows || 5;
  let type = req.query.type;
  let value = req.query.value || '';
  let obj = {};
  if (type) {
    obj[type] = value;
  }
  hc.get("/pets", { page, rows, ...obj }).then(function (data) {
      res.send(data);
  })
});
//修改
router.put('/:id', function (req, res, next) {
  let id = req.params.id;
  let pet = req.body.pet;
  hc.put("/pets/" + id, pet).then(function () {
      res.send("suc");
  })
}),
//删除
router.delete('/:id', function (req, res, next) {
  let id = req.params.id;
  hc.delete("/pets/" + id).then(function (data) {
      hc.delete("/petImages", { "pets.$id": id }).then(function (data) {
          console.log("suc")
          res.send("suc");
      })
  })

})
module.exports = router;
