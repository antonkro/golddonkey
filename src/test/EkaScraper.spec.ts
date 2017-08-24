import {EkaScraper} from "../scrappers/EkaScraper";
import {Article} from "../data/Article";
import * as chai from "chai";
import {DatabaseConnector} from "../data/DatabaseConnector";

import has = Reflect.has;
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe("eka scraper", function () {
    this.timeout(0);
    let eka = new EkaScraper("s-multimedia-elektronik", "stuttgart", "c161l9280r30");
    // let article = new Article($(this).attr('data-adid'),this.getPreKey(username,taskNumber));
    var username = "TestUserEKA";
    var taskID = "1";
    it('fetchData and dropData', (cb: () => any): void => {
        eka.fetchData(username, taskID, (finished) => {
            assert.equal(finished, true);
            DatabaseConnector.getRegExKeys(eka.getPreKey(username, taskID) + ":*", (list) => {
                should.exist(list);
                list.forEach((val, index) => {
                    DatabaseConnector.drop(val, (success => {
                        assert.equal(success, true);
                        if (index === val.length) {
                            DatabaseConnector.getRegExKeys(eka.getPreKey(username, taskID) + ":*", (emptylist) => {
                                assert.equal(emptylist.length, 0);
                                DatabaseConnector.drop(username + ":blacklist", (success) => {
                                    assert.equal(success, true);
                                    cb();
                                });
                            })
                        }
                    }))
                })
            })
        })
    })
})