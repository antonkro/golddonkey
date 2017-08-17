"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_Connector_1 = require("./Database_Connector");
class Article {
    constructor(id) {
        this._id = id;
    }
    save() {
        Database_Connector_1.Database_Connector.saveList(this._id, {
            "title": this._title,
            "description": this._description,
            "location": this._location,
            "price": this._price,
            "price_negotiable": this._price_negotiable,
            "time": this._time
        });
    }
    load(cb) {
        Database_Connector_1.Database_Connector.load(this.id, function (loadedArticle) {
            this.title = loadedArticle.title.toString();
            this.description = loadedArticle.description;
            this.location = loadedArticle.location;
            this.price = loadedArticle.price;
            this.price_negotiable = loadedArticle.price_negotiable;
            this.time = loadedArticle.time;
            cb();
        }.bind(this));
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
    // get nearness(): number {
    //     return this._nearness;
    // }
    //
    // set nearness(value: number) {
    //     this._nearness = value;
    // }
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
    toString() {
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
exports.Article = Article;
