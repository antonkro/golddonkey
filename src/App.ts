import * as rimraf from "rimraf";
import * as express from "express"
import * as https from "https"
import * as winston from "winston";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as fs from "fs";
import * as hbs from "express-handlebars";
import * as session from "cookie-session";
// import * as index from "./routes/index"
// import * as filters from "./routes/filters"
import {Article} from "./data/Article";
import {DatabaseConnector} from  "./data/DatabaseConnector";
import {Constants} from "./data/Constants";
import {Welcome} from "./routes/Welcome"
import {Overview} from "./routes/Overview"
import {Login} from "./routes/Login"
import {User, UserManagement} from "./data/User"

class App {
    public express
    public https
    public winston = winston;
    constructor() {



        var privateKey = fs.readFileSync(__dirname+ '/../certs/key.pem');
        var certificate = fs.readFileSync(__dirname+ '/../certs/cert.pem');

        var credentials = {key: privateKey, cert: certificate};

        this.express = express();
        this.https= https.createServer(credentials,this.express);
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
        this.express.use('/login', Login.router);
        this.express.use('/', Welcome.router);
        this.express.use('/overview', Overview.router);

    }

    private configureApp(): void {
        /**
         * debugging
         */
        this.winston.level = 'debug'; //info, verbose, debug

        /**
         * session
         */
        this.express.set('trust proxy', 1) // trust first proxy
        this.express.use(session({
            name: 'session',
            keys: ['QcsjH', 'mQGUBh'],
            secret: 'QcsjH7mQGUBh',
            maxAge: '60000',
            secure: false
            // Cookie Options
        }))




        /**
         * routes and views
         */
        this.express.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: path.join(__dirname, '../src/views/layouts')
        }))
        this.express.set('views', path.join(__dirname, '../src/views'));
        // view engine setup
        this.express.set('view engine', 'hbs');
        this.express.use("/public", express.static(path.join(__dirname, '../src/public')))


    }
}

export default new App().express
