"use strict";
const rimraf = require("rimraf");
const express = require("express");
const winston = require("winston");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require("fs");
const Article_1 = require("./data/Article");
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
var isCleaning = true;
if (isCleaning) {
    if (fs.existsSync("./debug")) {
        rimraf("./debug", function (err) {
            if (!err) {
                fs.mkdirSync("./debug");
                fs.mkdirSync("./debug/sites");
            }
        });
    }
    else {
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
var eka = new (require('./scrappers/eka'))("s-multimedia-elektronik", "stuttgart", "c161l9280r30");
// eka.fetchData();
let article = new Article_1.Article(1111111);
article.title = "Test Title";
article.description = "Test Description";
article.location = "Test Location";
article.price = 100;
article.price_negotiable = true;
article.url = "https://www.heise.de";
article.time = "Heute";
article.save();
let article2 = new Article_1.Article(article._id);
article2.load(() => {
    winston.debug("article 2 loaded");
    winston.debug(article2.toString());
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
// app.use('/users', users);
app.use('/filters', filters);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    if (res.status === 404) {
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
module.exports = app;
//app.listen(3000);
