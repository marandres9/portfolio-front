export class Home {
    private _id: number;
    private _title: string;
    private _description: string;

    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }

    set title(title) {
        this._title = title
    }
    set description(description) {
        this._description = description
    }
}
