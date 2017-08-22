import * as express from "express"


/* GET home page. */
namespace Index{
    export var router = express.Router();
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'GoldDonkey v.0.1' });
    });

}

export {Index}

