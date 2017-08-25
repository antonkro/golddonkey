import * as express from "express"
// import {SessionManagement} from "./Session";
/* GET home page. */
namespace Welcome {
    export var router = express.Router();
    router.get('/', function (req, res, next) {
        res.render('welcome', {title: 'GoldDonkey v.0.1'});
    });

}

export {Welcome}

