"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_Connector_1 = require("./Database_Connector");
var Constants;
(function (Constants) {
    Constants.eka_url_key = "eka_url";
    Constants.eka_ttl_key = "eka_ttl";
    var notLoaded = true;
    var consts = new Map();
    var consts_default = new Map();
    consts_default.set(Constants.eka_url_key, " https://www.ebay-kleinanzeigen.de/");
    consts_default.set(Constants.eka_ttl_key, (24 * 60 * 60));
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
    function init(cb) {
        consts_default.forEach((entry, index) => {
            load(index, consts_default.get(index), function (loadedConsts) {
                consts.set(index, loadedConsts);
            });
        }, cb());
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
    //     Database_Connector.load(eka_ttl_name, function (loadedObject) {
    //         if (loadedObject === false) {
    //             Database_Connector.save(eka_ttl_name, eka_ttl_default);
    //             cb(eka_ttl_default);
    //         } else {
    //             cb(loadedObject);
    //         }
    //     })
    //
    // }
    //
    // Database_Connector.save("eka_ttl",eka_url);
})(Constants || (Constants = {}));
exports.Constants = Constants;
