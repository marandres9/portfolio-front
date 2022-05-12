export class Project {
    id: number;
    title: string;
    description: string;
    url: string;

    public constructor(id: number, title: string, description: string, url: string) {
        this.id = id;
        this.title = title
        this.description = description
        this.url = url
    }

    // public get id() {
    //     return this._id;
    // }

    // public get title() {
    //     return this._title;
    // }

    // public set title(title: string) {
    //     this._title = title;
    // }

    // public get description() {
    //     return this._description;
    // }

    // public set description(description: string) {
    //     this._description = description;
    // }

}
