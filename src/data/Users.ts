
class User {
    private _name:string;
    private _password:string;
    private _admin:boolean;

    constructor(){}

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get admin(): boolean {
        return this._admin;
    }

    set admin(value: boolean) {
        this._admin = value;
    }
}

namespace Users{


}
export{Users};