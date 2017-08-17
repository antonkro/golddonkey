import * as redis from "redis";
import * as winston from "winston";

namespace Database_Connector {
    var client = redis.createClient();
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

    export function save(key: any, value: any) {
        client.set(key, value, function (err) {
            if (err) {
                winston.error("Redis save: " + err);
            }
        })
    }


    export function saveList(key: number, ttl, list: any) {
        client.HMSET(key, list, function (err) {
            if (err) {
                winston.error('Redis: ' + err);
            }
            else {
                client.send_command('EXPIRE', [key, ttl], function (err) {
                    if (err) {
                        winston.error('Redis saveList: ' + err);
                    }
                });
            }
        })
        //
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


    export function loadList(key: number, cb: (loadedObjectList: any) => any): void {
        client.hgetall(key, function (err, obj) {
            if (err) {
                winston.err("Redis: loadList" + err)

            } else {
                winston.debug("Object with ID " + key + " was loaded from DB");
                cb(obj);

            }
        });
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
export {Database_Connector};