import * as express from "express"



namespace Overview{
     export var router = express.Router();
     router.get('/', function(req, res, next) {
          // res.send(eka.getData());
          res.send("Hello World");

     });
}

/* GET users listing. */


export {Overview};
