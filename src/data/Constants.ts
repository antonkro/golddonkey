import {DatabaseConnector} from  "./DatabaseConnector";
import * as winston from "winston";
namespace Constants {

    export const eka_url_key = "eka_url";
    export const eka_ttl_key = "eka_ttl";
    export const eka_max_sites_key = "eka_max_sites_key";

    var notLoaded = true;
    var consts: Map<string, string> = new Map<string, string>();

    var consts_default: Map<string, any> = new Map<string, any>();
    consts_default.set(eka_url_key, " https://www.ebay-kleinanzeigen.de/");
    consts_default.set(eka_ttl_key, (24 * 60 * 60));
    consts_default.set(eka_max_sites_key, 50);

    export function getKeys():any{
        return consts_default.keys()
    }

    export function get(username:string,key: string, cb: (cbv: string) => any): void {
        if (notLoaded) {
            init(username,function () {
                notLoaded = false;
                cb(consts.get(key));
            })
        }
        else {
            cb(consts.get(key));
        }
    }

    export function getMulti(username:string,keys: string[], cb: (cbv: any) => any): void {
        var multi: Map<string, any> = new Map<string, any>();
        var itemsProcessed = 0;
        keys.forEach(function (key) {
            get(username,key, function (value) {
                multi.set(key, value);
                // winston.debug(value);
                itemsProcessed++;
                if (itemsProcessed === keys.length) {
                    cb(multi);
                }
            })
        });
    }

    function init(username:string,cb: () => any): void {
        var itemsProcessed = 0;
        consts_default.forEach((entry, index) => {
            load(username,index, consts_default.get(index), function (loadedConsts) {
                consts.set(index, loadedConsts);
                itemsProcessed++;
                if (itemsProcessed === consts_default.size) {
                    cb();
                }
            })
        });


    }

    function load(username:string,key: string, defaultValue: string, cb: (loadedConsts: string) => any): void {
        DatabaseConnector.load(key, function (loadedConsts) {
            if (loadedConsts === false) {
                DatabaseConnector.save(username+":"+key, -1,defaultValue, success => {
                    if(success) cb(defaultValue);
                });
            } else {
                cb(loadedConsts);
            }
        })

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


}
export {Constants};