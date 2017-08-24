import * as winston from "winston";
import * as request from "request";
import * as cheerio from "cheerio";
import * as fs from "fs";

import {Blacklist} from "../data/Blacklist";
import {Article} from "../data/Article";
import {Constants} from "../data/Constants";

// const winston = require('winston'),
//     request = require('request'),
//     cheerio = require('cheerio'),
//     fs = require('fs');
// parse5 = require('parse5');


class EkaScraper {


    private category: string;
    private location: string;
    private range: string;
    private _url: string;

    constructor(category: string, location: string, range: string) {
        this.category = category;
        this.location = location;
        this.range = range;

        // winston.log("debug", "eka scraper initialized!");
    }

    public getPreKey(username: string, taskID: string): string {
        return username + ":" + taskID;
    }

    public fetchData(username: string, taskID: string, cb: (finished: boolean) => any): void {


        // if (winston.level === 'debug') {
        //     var debug = true, site_counter = 0, site = "";
        // }

        Constants.getMulti([Constants.eka_url_key, Constants.eka_max_sites_key], (multi) => {
            var counter = 0;
            for (var i = 0; i < (Number(multi.get(Constants.eka_max_sites_key)) + 1); i++) {

                this._url = multi.get(Constants.eka_url_key) + "/" + this.category + "/" + this.location + "/seite:" + i + "/" + this.range;
                // winston.debug(this._url);
                winston.log(this._url);

                request(this._url, (error, response, html) => {
                    if (error) {
                        winston.error("request Error: " + error);
                    }


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
                    var prekey = this.getPreKey(username, taskID);
                    $('article').filter(function (i, elem) {
                        let article = new Article($(this).attr('data-adid'), prekey);


                        $ = cheerio.load($(this).html());
                        article.title = $('.text-module-begin').text();
                        article.description = $('p').text();
                        article.url = multi.get(Constants.eka_url_key) + $('a').prop('href');
                        article.price = $('strong').text().replace("VB", "").replace("€", "").replace(" ", "");
                        article.price_negotiable = $('strong').text().includes("VB");
                        article.location = $('.aditem-details').text()
                            .replace($('strong').text(), "")
                            .replace(" ", "").replace(/(?:\r\n|\r|\n)/g, "");
                        article.time = $('.aditem-addon').text().replace(" ", "").replace(/(?:\r\n|\r|\n)/g, "");
                        var valid = true;
                        Blacklist.getBlackList(username,(blacklist)=>{
                            for(var val in blacklist){
                                if(article.title.includes(val) || article.description.includes(val)){
                                    valid=false;
                                    break;
                                }

                            }
                        })

                        if (valid) {
                            article.save(success => {
                                if (!success) winston.error("Error saving article in eka");
                            });
                        }


                    // if (debug && typeof site_counter !== 'undefined' && i === 0) {
                    //     site = site + items;
                    //     fs.writeFile("./debug/sites/site_" + site_counter + ".html", items, function (err) {
                    //         if (err) {
                    //             return console.log(err);
                    //         }
                    //         winston.log("debug", "debug html file was saved!");
                    //     });
                    //     site_counter++;
                    // }
                });

                winston.debug("scrape site: "+ counter +"/"+Number(multi.get(Constants.eka_max_sites_key)));
                // winston.debug();
                if (Number(counter) === Number(multi.get(Constants.eka_max_sites_key))) {
                    cb(true);
                }
                counter++;
            }
            )
    }
}
)
}

get
url()
:
string
{
    return this._url;
}
}
export {EkaScraper};