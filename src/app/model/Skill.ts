export class Skill {
    private _id: number;
    private _title: string;
    private _value: number;

    public constructor(title: string, value: number) {
        this._id = 0;
        this._title = title;
        this._value = value;
    }

    public get title() {
        return this._title;
    }

    public get value() {
        return this._value;
    }

    public set title(title: string) {
        this._title = title
    }

    public set value(value: number) {
        this._value = value
    }
}
