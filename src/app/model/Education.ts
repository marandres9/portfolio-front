export class Education {
    public id: number;
    public title: string;
    public period: string;
    public institution: string;
    public location: string;
    public description: string;

    public constructor(id:number, title: string, period: string, institution: string, location: string, description: string) {
        this.id = id;
        this.title = title;
        this.period = period;
        this.institution = institution;
        this.location = location;
        this.description = description;
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

    // public get period() {
    //     return this._period;
    // }

    // public set period(period: string) {
    //     this._period = period;
    // }

    // public get institution() {
    //     return this._institution;
    // }

    // public set institution(institution: string) {
    //     this._institution = institution;
    // }

    // public get location() {
    //     return this._location;
    // }

    // public set location(location: string) {
    //     this._location = location;
    // }

    // public get description() {
    //     return this._description;
    // }

    // public set description(description: string) {
    //     this._description = description;
    // }

}
