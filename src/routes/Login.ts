import * as express from "express"

/* GET home page. */
namespace Login {
    export var router = express.Router();
    router.get('/login', function (req, res, next) {
        res.render('login', {title: 'GoldDonkey v.0.1'});
    });

}

export {Login}

