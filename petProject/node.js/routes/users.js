var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require('ykt-http-client');
// hc.url("192.168.43.202:3001");
hc.url("127.0.0.1:3001");
/* GET home page. */
router.post('/', function (req, res, next) {
  console.log(req.body)
  hc.post("/login",req.body).then(function(data){
    console.log(data)
    if (data.userAcount) {
          req.session.user = data;
          res.send({
            status: 1,
            userStatus:data.userStatus
          });
        } else {
          res.send({
            status: 0
          });
        }
  });
  
});
module.exports = router;
