class Article {
    readonly _id: number;
    private _title: string;
    private _description: string;
    private _location: string;
    private _price: number;
    private _price_negotiable: boolean;
    private _nearness: number;
    private _time: Date;
    private _url: string;


    constructor(
                // title: string,
                // description: string,
                // location: string,
                // price: number,
                // price_negotiable: boolean,
                // nearness: number,
                // time: Date,
                id?: number) {
        this._id = id;
        // this._title = title;
        // this._description = description;
        // this._location = location;
        // this._price = price;
        // this._price_negotiable = price_negotiable;
        // this._nearness = nearness;
        // this._time = time;
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

    get nearness(): number {
        return this._nearness;
    }

    set nearness(value: number) {
        this._nearness = value;
    }

    get time(): Date {
        return this._time;
    }

    set time(value: Date) {
        this._time = value;
    }
    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
}

export {Article};