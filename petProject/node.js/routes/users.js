var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require('ykt-http-client');
// hc.url("192.168.43.202:3001");
hc.url("127.0.0.1:3001");
/* GET home page. */
// router.get('/', function (req, res, next) {
//   const {username,type}=req.query
//   hc.get('/users', {username,type}).then(function (data) {
//     res.send(data)
//   })
// });
// 门店登录
router.post('/', function (req, res, next) {
  let userPhone = req.body.userAcount-0
  let obj=req.body
  console.log(obj)
  hc.post("/login",req.body).then(function(data){
    // console.log(data)
    if (data.userAcount) {
          req.session.user = data;
          res.send({
            status: 1,
            userStatus: data.userStatus,
            users: data._id,
            userType: data.userType,
            userAcount:data.userAcount
          });
    }
    else {
      delete obj.userAcount
      let newObj = { ...obj, userPhone: userPhone }
      // console.log(userPhone,newObj)
      hc.post("/login", newObj).then(function (data) {
        // console.log(data)
        if (data.userPhone) {
          req.session.user = data;
          res.send({
            status: 1,
            userStatus: data.userStatus,
            users: data._id,
            userType: data.userType,
            userAcount:data.userAcount
          });
        }
        else {
          res.send({
            status: 0
          });
        }
      })
    }
  });
  
});
// 门店注册
router.post('/up/', function (req, res, next) {
  let obj = { ...req.body, userType: "门店管理员", userStatus: 0 }
  hc.post('/users', obj).then(function (data) {
    res.send('suc')
  })
});

// 注册数据验证
router.post('/queryType', function (req, res, next) {
  hc.post("/login", req.body).then(function (data) {
    console.log(data)
    if (data.userAcount) {
      res.send({
        type:1
      })
    }
    res.send({
      type:0
    })
  })
})

module.exports = router;
