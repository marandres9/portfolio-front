export class Project {
    private _id: number;
    private _title: string;
    private _description: string;

    public constructor(title: string, description: string) {
        this._id = 0;
        this._title = title
        this._description = description
    }

    public get id() {
        return this._id;
    }

    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get description() {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

}
