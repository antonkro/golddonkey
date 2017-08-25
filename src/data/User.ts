import * as bcrypt from "bcrypt"
import {DatabaseConnector} from "./DatabaseConnector";
import * as winston from "winston";

class User {
    private _name: string;
    private _hashedPassword: string;
    private _admin: boolean;


    constructor(name: string, password: string, admin: boolean) {
        this._name = name;
        this._hashedPassword = password;
        this._admin = admin;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get hashedPassword(): string {
        return this._hashedPassword;
    }

    set hashedPassword(value: string) {
        this._hashedPassword = value;
    }

    get admin(): boolean {
        return this._admin;
    }

    set admin(value: boolean) {
        this._admin = value;
    }

}

namespace UserManagement {
    function save(user: User
        , cb: (success: boolean) => any): void {
        DatabaseConnector.saveList(name, -1, {
            "password": user.hashedPassword,
            "admin": user.admin
        }, (success2) => {
            cb(success2);
        })

    }

    export function createUser(name: string, password: string, admin: boolean, cb: (success: boolean) => any): void {
        var saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                let user = new User(name, hash, admin);
                save(user, (success2 => {
                    cb(success2);
                }));
            });
        });
    }

    export function authenticate(name: string, password: string, cb: (authenticated: boolean) => any): void {
        DatabaseConnector.load(name, (loadedObject => {
            bcrypt.compare(password, loadedObject.hashedPassword, (err, res) => {
                if (err) {
                    winston.error("User authenticate Error: "+err)
                    cb(false);
                } else {
                    cb(res);
                }
            })
        }))

    }

    export function updateUser(oldUsername: string, oldPassword: string, oldAdmin: boolean,
                               newUsername: string, newPassword: string, newAdmin: boolean,
                               cb: (success: boolean) => any): void {
        authenticate(oldUsername, oldUsername, (authenticated => {
            if (!authenticated) cb(false);
        //     else {
        //         if (oldUsername === newUsername) {
        //             let user = new User(oldUsername, newPassword, newAdmin)
        //         }
        //     }
        }))
    }
}

export {User, UserManagement};