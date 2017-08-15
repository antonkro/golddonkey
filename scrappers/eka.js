var winston = require('winston');
var request = require('request');
var cheerio = require('cheerio');


var data;
// var url = "https://www.ebay-kleinanzeigen.de/"
var basic_url = "https://www.ebay-kleinanzeigen.de/"


function eka_scraper(category, location,range ) {
    winston.log("debug", "inside_eka_scraper");

    for (var i = 0; i < 2; i++) {
        var url = basic_url + "/" + category + "/" + location + "/seite:"+i+"/"+range;

        request(url, function (error, response, html) {
            if (!error) {

                var $ = cheerio.load(html);

                var title, release, rating;
                var json = {title: "", release: "", rating: ""};

                // We'll use the unique header class as a starting point.

                $('#srchrslt-adtable, .adtime, .text-module-begin, .aditem-details').filter(function () {

                    // Let'sstore the data we filter into a variable so we can easily see what's going on.


                    winston.log("debug", $(this).toString());

                    // this.data = $(this);

                    // In examining rthe DOM we notice that the title rests within the first child element of the header tag.
                    // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                    //title = data.children().first();
                    //json.title = title;


                })
                // var $all =$('#home-ads');
                // var $titles= $all.filter('.itemtile-title');


                // winston.log("debug", ""+$bodies);
            }
        })

    }
}


eka_scraper.prototype.getData = function () {
    return this.data.toString();
}


module.exports = eka_scraper;