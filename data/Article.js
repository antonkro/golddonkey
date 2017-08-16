"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Article {
    constructor(
        // title: string,
        // description: string,
        // location: string,
        // price: number,
        // price_negotiable: boolean,
        // nearness: number,
        // time: Date,
        id) {
        this._id = id;
        // this._title = title;
        // this._description = description;
        // this._location = location;
        // this._price = price;
        // this._price_negotiable = price_negotiable;
        // this._nearness = nearness;
        // this._time = time;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get location() {
        return this._location;
    }
    set location(value) {
        this._location = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get price_negotiable() {
        return this._price_negotiable;
    }
    set price_negotiable(value) {
        this._price_negotiable = value;
    }
    get nearness() {
        return this._nearness;
    }
    set nearness(value) {
        this._nearness = value;
    }
    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
    }
    get url() {
        return this._url;
    }
    set url(value) {
        this._url = value;
    }
}
exports.Article = Article;
