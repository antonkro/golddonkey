import * as rimraf from "rimraf";
import * as express from "express"
import * as winston from "winston";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as fs from "fs";
import * as hbs from "express-handlebars";
// import * as index from "./routes/index"
// import * as filters from "./routes/filters"
import {Article} from "./data/Article";
import {DatabaseConnector} from  "./data/DatabaseConnector";
import {Constants} from "./data/Constants";
import {Index} from "./routes/Index"
import {Overview} from "./routes/Overview"


class App {
    public express
    public winston = winston;

    constructor() {
        this.express = express()
        this.mountRoutes()
        this.configureApp()
    }

    private mountRoutes(): void {
        // const index = express.Router();
        // const filters = express.Router();

        // index.get('/', function(req, res, next) {
        //     res.render('index', { title: 'GoldDonkey v.0.1' });
        // });
        // filters.get('/', function(req, res, next) {
        //     // res.send(eka.getData());
        //     res.send("Hello World");
        //
        // });


        this.express.use('/', Index.router);
        this.express.use('/overview', Overview.router);

    }

    private configureApp(): void {
        this.winston.level = 'debug'; //info, verbose, debug
        this.express.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: path.join(__dirname, '../src/views/layouts')
        }))
        this.express.set('views', path.join(__dirname, '../src/views'));
        // view engine setup
        this.express.set('view engine', 'hbs');
        this.express.use("/public",express.static(path.join(__dirname, '../src/public')))

    }
}

export default new App().express
