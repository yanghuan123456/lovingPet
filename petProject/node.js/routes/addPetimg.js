var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require("ykt-http-client");
// hc.url("127.0.0.1:3001");
hc.url("192.168.43.143:3001");
//获取数据
router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  hc.get("/petImages", { "pets.$id": id, submitType: "findJoin", ref: "pets" }).then(function (data) {
    res.send(data);
  })
});
// 增加
router.post("/", function (req, res, next) {
  let petImage = req.body.petImage;
  let petId = req.body.id;
  hc.post("/petImages", { petImage, "pets": JSON.stringify({ $ref: "pets", $id: petId }) }).then(function (data) {
    hc.put("/pets/" + petId, { photo: petImage }).then(function () {
      res.send("suc");
    })
  })
})
// 上传图片
router.post("/upload", function (req, res, next) {
  console.log(111)
  let form = new multiparty.Form({ uploadDir: './public/petImage' });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    } else {
      res.send(files.file[0].path.replace("public", "").replace("/\\/g", "/"));
    }
  })
})
module.exports = router;