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
router.post('/', function (req, res, next) {
  hc.post("/login",req.body).then(function(data){
    console.log(data)
    if (data.userAcount) {
          req.session.user = data;
          res.send({
            status: 1,
            userStatus: data.userStatus,
            users: data._id,
            userType: data.userType
          });
        } else {
          res.send({
            status: 0
          });
        }
  });
  
});

router.post('/up/', function (req, res, next) {
  console.log(req.body)
  let obj = { ...req.body, userType: "门店管理员", userStatus: 0 }
  hc.post('/users', obj).then(function (data) {
    res.send('suc')
  })
});
module.exports = router;
