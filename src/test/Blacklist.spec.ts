import {Blacklist} from "../data/Blacklist"
import * as chai from "chai";
import {DatabaseConnector} from "../data/DatabaseConnector";

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();


describe('Blacklist', () => {
    var username = "testuserBlacklist"
    var BlacklistWord = "usefulBlacklistWord"
    var blacklist: string[];


    it('get', (cb: () => any): void => {
        Blacklist.getBlackList(username, (list) => {
            should.exist(list);
            blacklist = list;
            cb();
        })
    })

    it('add word', (cb: () => any): void => {
        Blacklist.addBlackListWord(username, BlacklistWord, (success) => {
            assert.equal(success, true);
            Blacklist.getBlackList(username, (list) => {
                should.exist(list);
                assert.equal(list.includes(BlacklistWord), true);
                blacklist.forEach((value, index) => {
                    assert.equal(list.includes(value), true);
                    if (index === blacklist.length) {
                        cb();
                    }
                })
                cb();
            })
        })
    })

    it('delete word', (cb: () => any): void => {
        Blacklist.removeBlackListWord(username, BlacklistWord, (success) => {
            assert.equal(success, true);
            Blacklist.getBlackList(username, (list) => {
                should.exist(list);
                assert.equal(list.includes(BlacklistWord), false);
                assert.equal(list.length, 3);
                cb();
            })
        })
    })

    it('dropList', (cb: () => any): void => {
        DatabaseConnector.drop(username + ":blacklist", (success) => {
            assert.equal(success, true);
            cb();
        })
    })

})