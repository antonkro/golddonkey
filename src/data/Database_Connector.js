"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const winston = require("winston");
var Database_Connector;
(function (Database_Connector) {
    var client = redis.createClient();
    client.on("error", function (err) {
        winston.error('error', "Error" + err);
    });
    client.on('connect', function () {
        winston.info("Database connection established");
    });
    // export function saveKey(key: number, value: any) {
    // winston.log(client.set("key", "val", redis.print));
    // winston.debug(client.set(key, value, redis.print));
    //        client.end();
    //     }
    function saveList(key, list) {
        winston.debug(client.HMSET(key, list, redis.print));
    }
    Database_Connector.saveList = saveList;
    function load(key, cb) {
        client.hgetall(key, function (err, obj) {
            if (err) {
                winston.err("Error " + err);
            }
            else {
                winston.debug("Object with ID " + key + " was loaded from DB");
                cb(obj);
            }
        });
    }
    Database_Connector.load = load;
})(Database_Connector || (Database_Connector = {}));
exports.Database_Connector = Database_Connector;
