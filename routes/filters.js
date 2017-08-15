var express = require('express');
var router = express.Router();



var eka= new (require('../scrappers/eka'))("s-multimedia-elektronik","stuttgart","c161l9280r20");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(eka.getData());
});

module.exports = router;
