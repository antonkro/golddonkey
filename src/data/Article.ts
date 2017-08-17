import * as winston from "winston";
import {Database_Connector} from  "./Database_Connector";

class Article {
    readonly _id: number;
    private _title: string;
    private _description: string;
    private _location: string;
    private _price: number;
    private _price_negotiable: boolean;
    // private _nearness: number;
    private _time: string;
    private _url: string;


    constructor(id?: number) {
        this._id = id;
    }


    public save() {
        Database_Connector.saveList(this._id, {
            "title": this._title,
            "description": this._description,
            "location": this._location,
            "price": this._price,
            "price_negotiable": this._price_negotiable,
            "time": this._time
        })
    }

    public load(cb: () => any): void {
        Database_Connector.load(this.id, function (loadedArticle) {
            this.title= loadedArticle.title.toString();
            this.description = loadedArticle.description;
            this.location = loadedArticle.location;
            this.price = loadedArticle.price;
            this.price_negotiable = loadedArticle.price_negotiable;
            this.time = loadedArticle.time;
            cb();

        }.bind(this));
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get location(): string {
        return this._location;
    }

    set location(value: string) {
        this._location = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get price_negotiable(): boolean {
        return this._price_negotiable;
    }

    set price_negotiable(value: boolean) {
        this._price_negotiable = value;
    }

    // get nearness(): number {
    //     return this._nearness;
    // }
    //
    // set nearness(value: number) {
    //     this._nearness = value;
    // }

    get time(): string {
        return this._time;
    }

    set time(value: string) {
        this._time = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    public toString(): string {
        return this._id + '\n'
            + this._title + '\n '
            + this._description + '\n'
            + this._location + '\n'
            + this._price + '\n'
            + this._price_negotiable + '\n'
            + this._time + '\n'
            + this._url;
    }
}

export {Article};