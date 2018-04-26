var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require("ykt-http-client");
hc.url("127.0.0.1:3001");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('stores', { title: 'Express' });
// });

router.get("/", function (req, res, next) {//加载
  let page = req.query.page||1
  let rows = req.query.rows || 5
  // console.log(page,rows)
  hc.get("/stores",{page,rows}).then(function (data) {
      res.send(data);
  });
});
// 增加
router.post('/', function (req, res, next) {
  let obj=req.body;
  hc.post("/stores",obj).then(function(){//cinemas集合
      res.send("suc");
  });
});
// 修改
router.get("/:id",function(req, res, next){
  let id=req.params.id;
  hc.get("/stores/"+id).then(function(data){
      res.send(data);//返回对象
  })
});
router.put("/:id",function(req, res, next){
  // console.log(req.body)
  delete req.body._id
  let id=req.params.id;//params获取路径id
  hc.put("/stores/"+id,req.body).then(function(){
      res.send("suc");
  })
});
// 删除
router.delete("/:id",function(req, res, next){//冒号代表路径可变的
  let id=req.params.id;
  hc.delete("/stores/"+id).then(function(){
      res.send("suc");
    })
})
  




module.exports = router;