var express = require('express');
var router = express.Router();

//Get Homepage
router.get('*', function(req, res){
    res.sendfile('./public/biz2credit-panel/dist/biz2credit-panel/index.html');
}); 

module.exports = router;
