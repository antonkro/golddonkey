const winston = require('winston'),
    request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    htmlparser2 = require('htmlparser2');

var category = "";
var location = "";
var range = "";
const basic_url = "https://www.ebay-kleinanzeigen.de/"
var url = "";
var site_counter = 0;
var site = "";

function eka_scraper(category, location, range) {
    this.category = category;
    this.location = location;
    this.range = range;
    winston.log("debug", "eka scraper initialized!");
}


eka_scraper.prototype.fetchData = function () {
    for (var i = 0; i < 1; i++) {
        url = basic_url + "/" + this.category + "/" + this.location + "/seite:" + i + "/" + this.range;
        winston.log("debug", url);

        request(url, function (error, response, html) {
            if (!error) {

                var $ = cheerio.load(html);
                var items = $('article')
                // winston.log('debug',items.toString());
                var parser = new htmlparser2.Parser({
                    onopentag: function(name, attribs){
                        if(attribs.class === "aditem"){
                            console.log(attribs);
                        }
                    },
                    ontext: function(text){
                        // console.log("-->", text);
                    },
                    onclosetag: function(tagname){
                        // if(tagname === "script"){
                        //     console.log("That's it?!");
                        // }
                    }
                }, {decodeEntities: true});

                parser.write(items.toString());
                parser.end();
                // items.each(function (i, elem) {
                //     if (i == 3) {
                //
                //         console.log(elem.attribs['data-adid']);
                //         console.log(elem.parent);
                //         return false;
                //     }
                //     //    data-adid="687727753"
                // });
                // winston.log("debug",items('h2'));
                //
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


module.exports = eka_scraper;