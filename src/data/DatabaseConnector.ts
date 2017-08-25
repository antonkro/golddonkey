import * as redis from "redis";
import * as winston from "winston";
import * as fs from "fs"

namespace DatabaseConnector {

    var client = redis.createClient();
    client.auth(fs.readFileSync(__dirname +'/../../password.txt', 'utf8').replace(/\r?\n|\r/g, " ").replace(" ",""));
    client.on("error", function (err) {
        winston.error('error', "Error" + err);
    })
    client.on('connect', function () {
        winston.info("Database connection established")
    })
    // export function saveKey(key: number, value: any) {
    // winston.log(client.set("key", "val", redis.print));
    // winston.debug(client.set(key, value, redis.print));
//        client.end();
//     }

    export function save(key: any, ttl: number, value: any, cb: (success: boolean) => any): void {
        client.set(key, value, function (err) {
            if (err) {
                winston.error("Redis save: " + err);
                cb(false);
            }
            else {
                if (ttl === -1) {
                    cb(true);
                } else {
                    client.send_command('EXPIRE', [key, ttl], (err) => {
                        if (err) {
                            winston.error('Redis saveArray: ' + err)
                            cb(false);
                        } else {
                            cb(true);
                        }
                    })
                }
            }
        })
    }


    export function saveList(key: string, ttl: number, list: any, cb: (success: boolean) => any): void {
        client.HMSET(key, list, function (err) {
            if (err) {
                winston.error('Redis saveList: ' + err);
                cb(false);
            }
            else {
                if (ttl === -1) {
                    cb(true);
                } else {
                    client.send_command('EXPIRE', [key, ttl], (err) => {
                        if (err) {
                            winston.error('Redis saveList: ' + err)
                            cb(false);
                        } else {
                            cb(true);
                        }
                    })
                }
            }
        })
        //
    }

    export function saveArray(key: any, ttl: number, array: string[], cb: (success: boolean) => any): void {

        client.sadd(key, array, (err) => {
            if (err) {
                winston.error('Redis saveArray: ' + err)
                cb(false);
            } else {
                if (ttl === -1) {
                    cb(true);
                } else {
                    client.send_command('EXPIRE', [key, ttl], (err) => {
                        if (err) {
                            winston.error('Redis saveArray: ' + err)
                            cb(false);
                        } else {
                            cb(true);
                        }
                    })
                }
            }
        });
    }

    export function load(key: any, cb: (loadedObject: any) => any): void {
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
        })
    }


    export function loadList(key: any, cb: (loadedObjectList: any) => any): void {
        client.hgetall(key, function (err, obj) {
            if (err) {
                winston.err("Redis: loadList" + err)
                cb(false);

            } else if (obj) {
                // winston.debug("Object with ID " + key + " was loaded from DB");
                cb(obj);

            } else {
                cb(false);
            }
        });
    }

    export function loadArray(key: any, cb: (loadedArray: any) => any): void {
        client.send_command('SMEMBERS', [key], (err, array) => {
            if (err) {
                winston.err("Redis: loadArray" + err)
                cb(false);
            } else if (array.length === 0) {
                cb(false);
            } else {
                cb(array);
            }
        })
    }

    export function drop(key: any, cb: (success: boolean) => any): void {
        client.send_command('DEL', [key], function (err, result) {
            if (err) {
                winston.error('Redis del: ' + err);
            }
            else if (result === 1) {
                cb(true);
            }
            else {
                cb(false);
            }
        });
    }

    export function getRegExKeys(regex: string, cb: (keys) => any): void {
        client.keys(regex, (err, replies) => {
            if (err) {
                cb(false);
            }
            cb(replies);
        })
    }

    export function exit() {
        client.end();
    }

    // export function exists(key: any, cb: (exist: any) => any): void {
    //     winston.debug(client.send_command('EXISTS', [key], function (err, reply) {
    //         if (err) {
    //             winston.error('Redis :exists ' + err);
    //         } else {
    //             cb(reply);
    //         }
    //     }));
    // }

}
export {DatabaseConnector};