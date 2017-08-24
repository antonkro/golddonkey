import {Constants} from "../data/Constants";
import * as chai from "chai";
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Constants', () => {
    it('get ', (cb: () => any): void => {
        var iterator = Constants.getKeys();
        var hasNext: boolean = true;
        while (hasNext) {
            var key = iterator.next().value;
            if (key) {
                Constants.get(key, (value) => {
                    should.exist(value);
                    assert.typeOf(value, 'string');
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

        Constants.getMulti(array, (multi) => {
            should.exist(multi);
            assert.equal(multi.size, array.length);
            cb();
        })
    })
})