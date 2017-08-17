import {Database_Connector} from  "./Database_Connector";
import * as winston from "winston";
namespace Constants {

    export const eka_url_key="eka_url";
    export const eka_ttl_key="eka_ttl";
    var notLoaded = true;
    var consts: Map<string, string> = new Map<string, string>();
    var consts_default: Map<string, any> = new Map<string, any>();
    consts_default.set(eka_url_key, " https://www.ebay-kleinanzeigen.de/");
    consts_default.set(eka_ttl_key, (24 * 60 * 60));


    export function get(key: string, cb: (cbv: any) => any): void {
        if (notLoaded) {
            init(function () {
                notLoaded = false;
                cb(consts.get(key));
            })
        }
        else {
            cb(consts.get(key));
        }
    }

    function init(cb: () => any): void {
            consts_default.forEach((entry, index) => {
                load(index, consts_default.get(index), function (loadedConsts) {
                    consts.set(index, loadedConsts);

                })
            },cb());


    }

    function load(key: string, defaultValue: string, cb: (loadedConsts: string) => any): void {
        Database_Connector.load(key, function (loadedConsts) {
            if (loadedConsts === false) {
                Database_Connector.save(key, defaultValue);
                cb(defaultValue);
            } else {
                cb(loadedConsts);
            }
        })

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


}
export {Constants};