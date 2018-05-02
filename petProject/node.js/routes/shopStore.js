var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require("ykt-http-client");
// hc.url("127.0.0.1:3001");
hc.url("192.168.43.143:3001");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('stores', { title: 'Express' });
// });

router.get("/", function (req, res, next) {//加载
  let page = req.query.page||1
  let rows = req.query.rows || 5
  
  let name = req.query.type;
  let value = req.query.value;
  let relatedId = req.query.relatedId
  console.log(relatedId)
  let obj={};
  if(name){
      obj[name]=value;
  }  
  let related={}
  if (relatedId) {
    related={submitType: "findJoin", ref: "users","storeAdministorId.$id":relatedId}
  }
  hc.get("/stores", {page , rows , ...obj,...related}).then(function (data) {
      res.send(data);
  });
});
// 增加
router.post('/', function (req, res, next) {
  let obj = req.body;
  console.log(obj)
  let relatedId=obj.relatedId
  delete obj.relatedId
  let related={}
  if (relatedId) {
    related={storeAdministorId: JSON.stringify({ $ref: "users", $id: relatedId })}
  }
  hc.post("/stores",{...related,...obj}).then(function(){//cinemas集合
      res.send("suc");
  });
});
// 修改
router.get("/:id",function(req, res, next){
   let id = req.params.id;
    // let relatedId = req.query.relatedId
    hc.get("/stores/" + id).then(function(data){
      res.send(data);//返回对象
  })
  
  
});
router.put("/",function(req, res, next){
  console.log(req.body)
  let id=req.body._id
  delete req.body._id
  // let id = req.params.id;//params获取路径id
  console.log(req.body,id)
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
        let path = str
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