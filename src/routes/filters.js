var express = require('express');
var router = express.Router();





/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send(eka.getData());
     res.send("Hello World");

});

module.exports = router;
