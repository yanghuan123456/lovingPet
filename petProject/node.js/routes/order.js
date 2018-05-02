var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require("ykt-http-client");

// hc.url("127.0.0.1:3001");
hc.url("192.168.43.143:3001");


// 获取
router.get('/', function (req, res, next) {
    let page = req.query.page || 1;
    let rows = req.query.rows || 5;
    let storeManagerId = req. query.storeManagerId||null;
    console.log(storeManagerId)
        hc.get("/orders",{storeManagerId,page,rows,submitType: "findJoin", ref: ["pets", "items","services","stores", "users"]}).then(function(data){
            for(let i =0 ; i<data.rows.length;i++){
                if(data.rows[i].state==1){
                    data.rows[i].state="派送中"
                }else{
                    data.rows[i].state="出货中"
                }
                if(data.rows[i].pets.name){
                    data.rows[i].goods=data.rows[i].pets
                }else if(data.rows[i].items.name){
                    data.rows[i].goods=data.rows[i].items
                }else if(data.rows[i].services.name){
                    data.rows[i].goods=data.rows[i].services
                }else{
                    data.rows[i].goods={}
                }
            }
            res.send(data);
        });
});


//增加
router.post("/", function (req, res, next) {
    let petsId = req.body.petsId ||"5ae026c7380ae55643ea237d";
    let storesId=req.body.storesId ||"5ae02f57380ae55643ea25d7";
    let usersId = req.body.usersId ||"5ae02844380ae55643ea23c1";
    let servicesId = req.body.servicesId ||"";
    let itemsId=req.body.itemsId ||"";
    let date = req.body.date ||"今天";
    let quantity= req.body.quantity ||3;
    let dress= req.body.dress||"";
    let storeManagerId=req.body.storeManagerId||"" 
    
    
    hc.post("/orders", {storeManagerId, quantity,state:"1",dress, goods:{}, date,"pets": JSON.stringify({ $ref: "pets", $id: petsId }),"items": JSON.stringify({ $ref: "items", $id: itemsId }),"stores": JSON.stringify({ $ref: "stores", $id: storesId }),"services": JSON.stringify({ $ref: "services", $id: servicesId }),"users": JSON.stringify({ $ref: "users", $id: usersId }) }).then(function (data) {
      res.send(data);
    })
  })
  router.delete("/:id", function (req, res, next) {
    let id =  req.params.id;
    hc.delete("/orders/"+id).then(function () {
        res.send('suc');
      
    })
  }),
  router.put("/", function (req, res, next) {
    let quantity =  req.body.formLabelAlign.quantity;
    let dress =  req.body.formLabelAlign.dress;
    let state =  req.body.formLabelAlign.state;
    let id = req.body.formLabelAlign.id;
    hc.put("/orders/" + id, { quantity, dress, state }).then(function () {
        res.send("suc");
      })
  })
module.exports = router;