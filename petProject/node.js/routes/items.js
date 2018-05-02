var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require("ykt-http-client");
// hc.url("127.0.0.1:3001");
hc.url("192.168.43.143:3001");

/* GET home page. */


//渲染列表
router.get('/', function (req, res, next) {
  let page = req.query.page || 1;
  let rows = req.query.rows || 7;
  let type = req.query.type;
  let value = req.query.value || '';
  let id=req.query.id;
  let obj = {};
  if (type) {
    obj[type] = value;
  }
  if (type == "img") {
    hc.get("/itemimages", { "moviesID.$id": id, page, rows, submitType: "findJoin", ref: "items" }).then(function (data) {
      // console.log("datadatdatd111111111111111111111111111atdtadta1", data);
      res.send(data);
    })
  }else{
    hc.get("/items", { page, rows, ...obj }).then(function (data) {
      res.send(data);
    })
  }
})
//新增
router.post('/', function (req, res, next) {
  let name = req.body.name;
  let money = req.body.money;
  let number = req.body.number;
  let qualit = req.body.qualit;
  let weight = req.body.weight;
  hc.post("/items", { name, money, number, qualit, weight}).then(function (data){
    res.send(data);
  })
})
//新增图片
router.post("/upload", function (req, res, next) {
  let form = new multiparty.Form({ uploadDir: './public/img' });
  form.parse(req, function (err, fiwlds, files) {
    if (err) {
      res.send(err);
    }else{
      const id=fiwlds.id[0]
      res.send(files.file[0].path.replace("public", "").replace("/\\/g", "/"));
      const path=files.file[0].path.replace("public", "").replace("/\\/g", "/");     
      hc.post("/itemimages",{path,"moviesID": JSON.stringify({ $ref: "items", $id: id })}).then(function(data){
        res.send("suc")
      })
    }
  })
})
//修改图片
router.post("/uploader", function (req, res, next) {
  let form = new multiparty.Form({ uploadDir: './public/img' });
  form.parse(req, function (err, fiwlds, files) {
    if (err) {
      res.send(err);
    } else {
      const imgid=fiwlds.imgid[0]
      const shopid=fiwlds.shopid[0]
      res.send(files.file[0].path.replace("public", "").replace("/\\/g", "/"));
      const path=files.file[0].path.replace("public", "").replace("/\\/g", "/");
      
      hc.delete("/itemimages/"+imgid).then(function(data){
        // console.log("idididi6666666666666666666666dididididid",imgid);
        res.send("suc")
        
      })
      hc.post("/itemimages",{path,"moviesID": JSON.stringify({ $ref: "items", $id: shopid })}).then(function(data){
        res.send("suc")
      })
    }
  })
})
//删除
router.delete('/:id', function (req, res, next) {
  let id = req.params.id;
  hc.delete("/items/" + id).then(function (data) {
    res.send(data);
      hc.delete("/itemimages", { "moviesID.$id":id }).then(function (data) {
        res.send("suc");
      })
  })

})
//修改  
router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  // console.log("返回当前数据id返回当前数据id返回当前数据id返回当前数据id返回当前数据ID",id)
  hc.get("/movies/" + id).then(function (data) {
    // console.log("返回当前数据返回当前数据返回当前数据返回当前数据返回当前数据",data)
    res.send(data);
  })
})
router.put('/:id', function (req, res, next) {
  let id = req.params.id;
  let name = req.body.name;
  let money = req.body.money;
  let number = req.body.number;
  let qualit = req.body.qualit;
  let weight = req.body.weight;
  hc.put("/items/" + id, { name, money, number, qualit, weight }).then(function (data) {
    res.send(data);
    // hc.delete("/itemimages", { "moviesID.$id":id }).then(function (data) {
    //   res.send("suc");
    // })
  })
})
module.exports = router;
