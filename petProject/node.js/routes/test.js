var express = require("express");
var router = express.Router();
var fs = require("fs");
const db = require("ykt-mongo");
const hc = require("ykt-http-client");
const multiparty = require("multiparty");
const path = require;
hc.url("127.0.0.1:3001");

hc.url("localhost:3001");

router.get("/", function (req, res, next) {
  console.log("GET 请求")
  console.log(req.query)
  res.send({})
});

router.post("/", function (req, res, next) {
  console.log("POST 请求")
  console.log(req.body)
  res.send({})
});

router.delete("/", function (req, res, next) {
  console.log("delete 请求")
  console.log(req.body)
  res.send({})
});

router.put("/:id", function (req, res, next) {
  console.log("put 请求")
  console.log(req.body)
  console.log("id", req.params)
  res.send({})
});

router.post('/upload', function (req, res, next) {
  // console.log("/test/upload")
  let form = new multiparty.Form({ uploadDir: './public/img' });
  form.parse(req, function (err, fields, files) {
    console.log(fields)
    if (err) {
      res.send(err);
    } else {
      // 图片保存路径
      let str = files.file[0].path.replace('public', '').replace(/\\/g, '/')
      let path = '127.0.0.1:3000' + str
      console.log(path,str)
      // console.log(files.file[0].path)
      // res.send(files.file[0].path);
      res.send(path);
      // hc.post("/storeImg",{path}).then(function(){
      //   res.send("suc");
      // });
    }
  });
});



module.exports = router;
