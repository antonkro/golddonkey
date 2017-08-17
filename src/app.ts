import * as rimraf from "rimraf";
import * as express from "express";
import * as winston from "winston";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as fs from "fs";
import {Article} from "./data/Article";
import {Database_Connector} from  "./data/Database_Connector";
import {Constants} from "./data/Constants";

/**
 * limiting file access
 */
// require('fs-lock')({
//     'file_accessdir': [__dirname, '/debug'],
//     'open_basedir': ['/usr/local/share/node_modules', __dirname]
// });

/**
 * external modules
 */
// const
//     express = require('express'),
//     path = require('path'),
//     favicon = require('serve-favicon'),
//     cookieParser = require('cookie-parser'),
//     bodyParser = require('body-parser'),
//     fs = require("fs"),
//     rimraf = require("rimraf"),
//     winston = require('winston');

/* ##############  BEGIN DEBUGGING   ############*/
// debug folders
var isCleaning=true;
if (isCleaning) {
    if (fs.existsSync("./debug")) {
        rimraf("./debug", function (err) {
            if (!err) {
                fs.mkdirSync("./debug");
                fs.mkdirSync("./debug/sites");
            }
        })
    } else {
        fs.mkdirSync("./debug");
        fs.mkdirSync("./debug/sites");
    }
}


// logging
winston.level = 'debug'; //info, verbose, debug

/* ##############  END DEBUGGING   ############*/


var index = require('./routes/index');
var users = require('./routes/users');
var filters = require('./routes/filters');

var app = express();

/* ##############  BEGIN TESTING ############*/
var eka = new (require('./scrappers/eka'))("s-multimedia-elektronik", "stuttgart", "c161l9280r30");
// eka.fetchData();
// let article = new Article(1111111);
// article.title="Test Title";
// article.description="Test Description";
// article.location="Test Location";
// article.price =100;
// article.price_negotiable=true;
// article.url="https://www.heise.de";
// article.time="Heute";
//
// article.save();
// let article2 = new Article(article._id);
// article2.load(() => {
//     winston.debug("article 2 loaded");
//     winston.debug(article2.toString());
//
// });
// Constants.get(Constants.eka_ttl_key,function (val){
//     winston.debug(val);
// });
/* ##############  END TESTING ############*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/filters', filters);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    if(res.status=== 404){
    var err = new Error('Not Found');
    next(err);
    }
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export = app;

//app.listen(3000);
