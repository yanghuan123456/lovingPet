var express = require('express');
var router = express.Router();
const db = require('ykt-mongo');
const hc = require("ykt-http-client");
const multiparty = require('multiparty');
// hc.url("192.168.43.202:3001");
hc.url("127.0.0.1:3001");

/* GET users listing. */ //二级路由
router.get('/', function (req, res, next) {
  let page=req.query.page||1;
  let rows=req.query.rows||5;
  let value=req.query.value;
  let id=req.query.id;
  if(value!=null){
    hc.get("/services/",{"stores":value,page,rows,"users.$id":id}).then(function (data) {
        res.send(data);
    });
  }if(value==null){
    hc.get("/services/",{page,rows,"users.$id":id}).then(function (data) {
      res.send(data);
  });
  }
});
//post提交
router.post('/', function (req, res, next) {
  let stores = req.body.stores; //post是body提交
  let name=req.body.name;
  let king=req.body.king;
  let money=req.body.money;
  let time= req.body.time;
  let img=req.body.img;
  let id=req.body.id
  hc.post("/services",{stores,name,king,money,time,img,"users":JSON.stringify({$ref:"users",$id:id})}).then(function(data){
    res.send("suc");
  });
});

//删除
router.delete("/:id", function(req, res, next){
  hc.delete("/services/"+req.params.id).then(function(data){
      res.send("suc");
  });
});

// 上传图片
router.post("/upload",function(req,res,next){
  let form=new multiparty.Form({uploadDir:'./public/img'});
  form.parse(req,function(err,fiwlds,files){
    if(err){
      res.send(err);
    }else{
      res.send(files.file[0].path.replace("public","").replace("/\\/g","/"));   
    }
  })
})

// 修改
router.put('/:id', function (req, res, next){
  let stores=req.body.stores;
  let name=req.body.name;
  let king=req.body.king;
  let money=req.body.money;
  let time=req.body.time;
  let img=req.body.img
  hc.put("/services/"+req.params.id,{stores,name,money,king,time,img}).then(function(data){
    res.send("suc");
  });
})
module.exports = router;
