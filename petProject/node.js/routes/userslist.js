var express = require('express');
var router = express.Router();
const db = require('ykt-mongo');
const hc = require('ykt-http-client');
hc.url("127.0.0.1:3001");
/* GET users listing. */
//顾客查询
router.get('/users', function (req, res, next) {
    let page = req.query.page || 1;
    let rows = req.query.rows || 5;
    let value = req.query.value || null;
    let name = req.query.name || null;
    if (value == null) {
        hc.get("/users", { page, rows }).then(function (data) {
            res.send(data);
        })
    } else {
        hc.get("/users", { page, rows, [name]: value }).then(function (data) {
            res.send(data);
        })
    }
})
//后台用户查询
router.get('/storeManagers', function (req, res, next) {
    let page = req.query.page || 1;
    let rows = req.query.rows || 5;
    let value = req.query.value || null;
    let name = req.query.name || null;
    if (value == null) {
        hc.get("/storeManagers", { page, rows }).then(function (data) {
            res.send(data);
        })
    } else if (value == "申请中") {
        hc.get("/storeManagers", { page, rows, userStatus: 0 }).then(function (data) {
            res.send(data);
        })
    } else {
        hc.get("/storeManagers", { page, rows, userName: value }).then(function (data) {
            res.send(data);
        })
    }
})
//后台删除
router.delete('/storeManagers/:id', function (req, res, next) {
    hc.delete("/storeManagers/" + req.params.id).then(function (data) {
        res.send("suc");
    });
});
//顾客删除
router.delete('/users/:id', function (req, res, next) {
    hc.delete("/users/" + req.params.id).then(function (data) {
        res.send("suc");
    });
});
// 修改 put
// router.get('/:id', function(req, res, next){
//     hc.get("/users/"+req.params.id).then(function(data){
//         res.send(data);
//     });
// });
//顾客修改

router.put('/users/:id', function (req, res, next) {
    let memberPwd = req.body.memberPwd || null;
    let memberPhone = req.body.memberPhone || null;
    let memberArea = req.body.memberArea || null;
    let memberAdd = req.body.memberAdd || null;
    let memberPoint = req.body.memberPoint || null;
    let id = req.params.id;
    hc.put("/users/" + id, { memberPhone, memberPwd, memberArea, memberAdd, memberPoint }).then(function () {
        res.send("suc");
    });
});

//后台修改
router.put('/storeManagers/:id', function (req, res, next) {
    let userPhone = req.body.userPhone || null;
    let userPwd = req.body.userPwd || null;
    let userMail = req.body.userMail || null;
    let userStatus = req.body.userStatus;
    let userClass = req.body.userClass || null;
    let id = req.params.id;
    if (userStatus == 0) {
        userClass = "el-icon-time"
    } else if (userStatus == "1") {
        userClass = "el-icon-check"
    } else {
        userClass = "el-icon-close"
    }
    hc.put("/storeManagers/" + id, { userPwd, userPhone, userMail, userStatus, userClass }).then(function () {
        res.send("suc");
    });
});

module.exports = router;
