"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_Connector_1 = require("./DatabaseConnector");
const winston = require("winston");
var Constants;
(function (Constants) {
    Constants.eka_url_key = "eka_url";
    Constants.eka_ttl_key = "eka_ttl";
    Constants.eka_max_sites_key = "eka_max_sites_key";
    var notLoaded = true;
    var consts = new Map();
    var consts_default = new Map();
    consts_default.set(Constants.eka_url_key, " https://www.ebay-kleinanzeigen.de/");
    consts_default.set(Constants.eka_ttl_key, (24 * 60 * 60));
    consts_default.set(Constants.eka_max_sites_key, 50);
    function get(key, cb) {
        if (notLoaded) {
            init(function () {
                notLoaded = false;
                cb(consts.get(key));
            });
        }
        else {
            cb(consts.get(key));
        }
    }
    Constants.get = get;
    function getMulti(keys, cb) {
        var multi = new Map();
        var itemsProcessed = 0;
        keys.forEach(function (key) {
            get(key, function (value) {
                multi.set(key, value);
                winston.debug(value);
                itemsProcessed++;
                if (itemsProcessed === keys.length) {
                    cb(multi);
                }
            });
        });
    }
    Constants.getMulti = getMulti;
    function init(cb) {
        var itemsProcessed = 0;
        consts_default.forEach((entry, index) => {
            load(index, consts_default.get(index), function (loadedConsts) {
                consts.set(index, loadedConsts);
                itemsProcessed++;
                if (itemsProcessed === consts_default.size) {
                    cb();
                }
            });
        });
    }
    function load(key, defaultValue, cb) {
        Database_Connector_1.Database_Connector.load(key, function (loadedConsts) {
            if (loadedConsts === false) {
                Database_Connector_1.Database_Connector.save(key, defaultValue);
                cb(defaultValue);
            }
            else {
                cb(loadedConsts);
            }
        });
    }
    // export function eka_ttl_lazy(cb: (loadedObject: number) => any): void {
    //     DatabaseConnector.load(eka_ttl_name, function (loadedObject) {
    //         if (loadedObject === false) {
    //             DatabaseConnector.save(eka_ttl_name, eka_ttl_default);
    //             cb(eka_ttl_default);
    //         } else {
    //             cb(loadedObject);
    //         }
    //     })
    //
    // }
    //
    // DatabaseConnector.save("eka_ttl",eka_url);
})(Constants || (Constants = {}));
exports.Constants = Constants;
