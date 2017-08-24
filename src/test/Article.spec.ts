import {Article} from  "../data/Article";
import {DatabaseConnector} from  "../data/DatabaseConnector";
import * as chai from "chai"
var assert = chai.assert;
var expect = chai.expect;

describe('Article', () => {
    var username="TestUser"
    var article_id = 22222222;
    var prekey="test"
    let article = new Article(article_id,prekey);
    article.title = "Test Title";
    article.description = "Test Description";
    article.location = "Test Location";
    article.price = 100;
    article.price_negotiable = true;
    article.url = "https://www.heise.de";
    article.time = "Heute";

    it('save load', (cb: () => any): void => {
        article.save(username,(success) => {
            expect(success).to.be.equal(true);

            let article_2 = new Article(article_id,prekey);
            article_2.load(() => {

                expect(article_2.title).to.be.equal(article.title);
                expect(article_2.description).to.be.equal(article.description);
                expect(article_2.location).to.be.equal(article.location);
                expect(article_2.price).to.be.equal(article.price);
                expect(article_2.price_negotiable).to.be.equal(article.price_negotiable);
                expect(article_2.url).to.be.equal(article.url);
                expect(article_2.time).to.be.equal(article.time);

                DatabaseConnector.drop(article_2.key, (success2) => {
                    expect(success2).to.be.equal(true);
                    cb();
                })
            })
        })
    })
})


//
// article.save();
// let article2 = new Article(article._id);
// article2.load(() => {
//     winston.debug("article 2 loaded");
//     winston.debug(article2.toString());
//
// });