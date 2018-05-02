var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const hc = require('ykt-http-client');
// hc.url("127.0.0.1:3001");
hc.url("192.168.43.143:3001");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('services', { title: 'Express' });
});

module.exports = router;
