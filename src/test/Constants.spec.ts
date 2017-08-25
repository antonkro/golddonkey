import {Constants} from "../data/Constants";
import * as chai from "chai";
import {DatabaseConnector} from "../data/DatabaseConnector";
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Constants', () => {
    var username = "TestUser"
    it('get ', (cb: () => any): void => {
        var iterator = Constants.getKeys();
        var hasNext: boolean = true;
        while (hasNext) {
            var key = iterator.next().value;
            if (key) {
                Constants.get(username, key, (value) => {
                    should.exist(value);
                })
            } else {
                hasNext = false;
                cb();
            }
        }
    })
    it('getMulti', (cb: () => any): void => {
        var array =
            [
                Constants.eka_url_key,
                Constants.eka_max_sites_key,
                Constants.eka_ttl_key
            ];

        Constants.getMulti(username, array, (multi) => {
            should.exist(multi);
            assert.equal(multi.size, array.length);
            cb();
        })
    })
})