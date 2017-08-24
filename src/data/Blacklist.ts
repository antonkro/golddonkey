import {DatabaseConnector} from  "./DatabaseConnector";
import * as winston from "winston";

namespace Blacklist {

    var loaded: Map<string, boolean> = new Map<string, boolean>();
    var blacklistDefaultKey = "blacklist";
    var blacklists: Map<string, string[]> = new Map<string, string[]>();

    var defaultBlacklist: string[] =
        [
            "defekt",
            "kaputt",
            "bastler"
        ]

    function getUserBlacklistKey(username: string): string {
        return username + ":" + blacklistDefaultKey;
    }

    function init(username: string, cb: () => any): void {
        DatabaseConnector.loadArray(getUserBlacklistKey(username), (loadedList) => {
            if (loadedList === false) {
                DatabaseConnector.saveArray(getUserBlacklistKey(username), -1, defaultBlacklist, (success => {
                    // winston.debug("new blacklist user 3/4");
                    if (success) {
                        // winston.debug("new blacklist user 4/4");
                        loaded.set(username, true);
                        blacklists.set(username, defaultBlacklist);
                        cb();
                    }
                }))
            }
            else {
                blacklists.set(username, loadedList);
                cb();
            }
        })

    }

    function updateBlacklist(username: string, cb: (success) => any): void {
        DatabaseConnector.drop(getUserBlacklistKey(username),(success)=>{
            if(success){
                DatabaseConnector.saveArray(getUserBlacklistKey(username), -1, blacklists.get(username), (success2) => {
                    cb(success2);
                })
            }
            else{
                cb(success);
            }
        })
    }

    export function getBlackList(username: string, cb: (list: any) => any): void {
        if(loaded.has(username) != true){
            // winston.debug("new blacklist user 1/4");
            loaded.set(username,false);
        }

        if (!loaded.get(username)) {
            // winston.debug("new blacklist user 2/4");
            init(username, () => {
                cb(blacklists.get(username));
            })
        } else {
            cb(blacklists.get(username));
        }
    }

    export function addBlackListWord(username: string, word: string, cb: (success: boolean) => any): void {
        if (loaded.get(username)) {
            init(username, () => {
                blacklists.get(username).push(word);
                updateBlacklist(username, (success) => {
                    cb(success);
                })
            })
        } else {
            blacklists.get(username).push(word);
            updateBlacklist(username, (success) => {
                cb(success);
            })
        }

    }

    export function removeBlackListWord(username: string, word: string, cb: (success: boolean) => any): void {
        if (loaded.get(username)) {
            init(username, () => {
                blacklists.get(username).splice(blacklists.get(username).indexOf(word), 1);
                updateBlacklist(username, (success) => {
                    cb(success);
                })
            })
        } else {
            blacklists.get(username).splice(blacklists.get(username).indexOf(word), 1);
            updateBlacklist(username, (success) => {
                cb(success);
            })
        }
    }
}
export {Blacklist};