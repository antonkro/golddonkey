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
    export function saveList(key: number, list: any) {
        winston.debug(client.HMSET(key, list, redis.print));
    }

    export function load(key: number, cb: (loadedObject:any) => any): void {
        client.hgetall(key, function (err, obj ) {
            if (err) {
                winston.err("Error "+ err)

            } else {
                winston.debug("Object with ID " + key+" was loaded from DB");
                cb(obj);

            }
        });
    }

}
export {Database_Connector};