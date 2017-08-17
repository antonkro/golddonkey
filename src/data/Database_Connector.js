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
    function save(key, value) {
        client.set(key, value, function (err) {
            if (err) {
                winston.error("Redis save: " + err);
            }
        });
    }
    Database_Connector.save = save;
    function saveList(key, list, ttl) {
        winston.debug(client.HMSET(key, list, redis.print, function (err) {
            if (err) {
                winston.error('Redis: ' + err);
            }
            else {
                winston.debug(client.send_command('EXPIRE', [key, ttl], function (err) {
                    if (err) {
                        winston.error('Redis saveList: ' + err);
                    }
                }));
            }
        }));
        //
    }
    Database_Connector.saveList = saveList;
    function load(key, cb) {
        client.get(key, function (err, reply) {
            if (err) {
                winston.error("Redis load: " + err);
            }
            else if (reply) {
                cb(reply);
            }
            else {
                cb(false);
            }
        });
    }
    Database_Connector.load = load;
    function loadList(key, cb) {
        client.hgetall(key, function (err, obj) {
            if (err) {
                winston.err("Redis: loadList" + err);
            }
            else {
                winston.debug("Object with ID " + key + " was loaded from DB");
                cb(obj);
            }
        });
    }
    Database_Connector.loadList = loadList;
    // export function exists(key: any, cb: (exist: any) => any): void {
    //     winston.debug(client.send_command('EXISTS', [key], function (err, reply) {
    //         if (err) {
    //             winston.error('Redis :exists ' + err);
    //         } else {
    //             cb(reply);
    //         }
    //     }));
    // }
})(Database_Connector || (Database_Connector = {}));
exports.Database_Connector = Database_Connector;
