"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const Article_1 = require("../data/Article");
const Constants_1 = require("../data/Constants");
// const winston = require('winston'),
//     request = require('request'),
//     cheerio = require('cheerio'),
//     fs = require('fs');
// parse5 = require('parse5');
if (winston.level === 'debug') {
    var site_counter = 0, site = "";
}
class eka_scraper {
    constructor(category, location, range) {
        this.category = category;
        this.location = location;
        this.range = range;
        // winston.log("debug", "eka scraper initialized!");
    }
    fetchData() {
        for (var i = 0; i < 1; i++) {
            this._url = Constants_1.Constants.eka_url + "/" + this.category + "/" + this.location + "/seite:" + i + "/" + this.range;
            winston.log("debug", this._url);
            request(this._url, function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);
                    var items = $('article');
                    // winston.log('debug',items.toString());
                    //
                    // const document = parse5.parseFragment(items.toString());
                    //
                    // // for(var i=0;i<document.childNodes[0].childNodes[1].childNodes.length;i++){
                    // for(var i=0;i<1;i++){
                    //     var item = document.childNodes[0].childNodes[1].childNodes[i];
                    //
                    //     winston.log('debug', i +" - > "+item);
                    //
                    // }
                    // $ = cheerio.load(items.toString()); //only sections
                    $('article').filter(function (i, elem) {
                        if (i == 3) {
                            let article = new Article_1.Article($(this).attr('data-adid'));
                            $ = cheerio.load($(this).html());
                            article.title = $('.text-module-begin').text();
                            article.description = $('p').text();
                            article.url = Constants_1.Constants.eka_url + $('a').prop('href');
                            article.price = $('strong').text().replace("VB", "").replace("€", "").replace(" ", "");
                            article.price_negotiable = $('strong').text().includes("VB");
                            article.location = $('.aditem-details').text()
                                .replace($('strong').text(), "")
                                .replace(" ", "").replace(/(?:\r\n|\r|\n)/g, "");
                            article.time = $('.aditem-addon').text().replace(" ", "").replace(/(?:\r\n|\r|\n)/g, "");
                        }
                    });
                    // items.each(function (i, elem) {
                    //     if (i == 3) {
                    //         // elem
                    //        id=elem.attribs["data-adid"];
                    //
                    //         // winston.log('debug',elem);
                    //         winston.log('debug',$('article').data('data-adid'));
                    //
                    // //
                    // //
                    //         return false;
                    //     }
                    // //     //    data-adid="687727753"
                    // });
                    // winston.log("debug",items('h2'));
                    // fs.writeFile("./debug/firstitem.html", items, function (err) {
                    //     if (err) {
                    //         return console.log(err);
                    //     }
                    //     winston.log("debug", "debug html file was saved!");
                    // });
                    if (winston.level === 'debug' && typeof site_counter !== 'undefined') {
                        site = site + items;
                        fs.writeFile("./debug/sites/site_" + site_counter + ".html", items, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            winston.log("debug", "debug html file was saved!");
                        });
                        site_counter++;
                    }
                }
            });
        }
    }
    get url() {
        return this._url;
    }
}
module.exports = eka_scraper;