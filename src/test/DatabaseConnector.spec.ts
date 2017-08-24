import {DatabaseConnector} from  "../data/DatabaseConnector";
import * as chai from "chai"
import load = DatabaseConnector.load;
var assert = chai.assert;
var expect = chai.expect;

describe('DatabaseConnector', () => {
    var test_key_1: number = 1111111;
    var test_value_1: string = "TestEntry";

    var list_key_1 = "List Key 1";
    var list_values_1 = {
        "value1": "Test Value 1",
        "value2": "Test Value 2",
        "value3": "Test Value 3",

    };

    var array_key_1 = "TestArray1";
    var array_1 = ["test1", "test2", "test3", "test4"];

    it('save load ', (cb: () => any): void => {


        DatabaseConnector.save(test_key_1, test_value_1, (success => {
            expect(success).to.be.equal(true);
            DatabaseConnector.load(test_key_1, (loadedObject) => {
                // expect(loadedObject.).to.be.equal(test_key_1);
                expect(loadedObject).to.be.equal(test_value_1);
                cb();
                // assert.equal(loadedObject.key, "asdasd");
            })
        }));
    });
    it('drop', (cb: () => any): void => {
        DatabaseConnector.drop(test_key_1, (success) => {
            expect(success).to.be.equal(true)
            cb();
        })
    });

    it('saveList, loadList', (cb: () => any): void => {
        DatabaseConnector.saveList(list_key_1, 1000, list_values_1, (success => {
            DatabaseConnector.loadList(list_key_1, (cbv) => {
                expect(cbv.value1).to.be.equal(list_values_1.value1);
                expect(cbv.value2).to.be.equal(list_values_1.value2);
                expect(cbv.value3).to.be.equal(list_values_1.value3);
                cb();
            })
        }));
    });

    it('dropList', (cb: () => any): void => {
        DatabaseConnector.drop(list_key_1, (success) => {
            expect(success).to.be.equal(true);
            cb();
        })
    });

    it('saveArray, loadArray', (cb: () => any): void => {
        DatabaseConnector.saveArray(array_key_1, -1, array_1, (success) => {
            expect(success).to.be.equal(true);
            DatabaseConnector.loadArray(array_key_1, (loadedArray) => {
                expect(Object.prototype.toString.call(loadedArray)).to.be.equal('[object Array]');
                array_1.forEach((value, index) => {
                    expect(loadedArray.includes(value)).to.be.equal(true);
                    if (index === array_1.length) {
                        cb();
                    }
                })
                cb();
            })
        })
    });

    it('dropArray', (cb: () => any): void => {
        DatabaseConnector.drop(array_key_1, (success) => {
            expect(success).to.be.equal(true);
            cb();
        })
    });
});
