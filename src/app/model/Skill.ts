export class Skill {
    id: number;
    title: string;
    value: number;
    softSkill: boolean

    public constructor(title: string, value: number, soft: boolean) {
        this.id = 0;
        this.title = title;
        this.value = value;
        this.softSkill = soft;
    }

    // public get id() {
    //     return this._id;
    // }

    // public get title() {
    //     return this._title;
    // }

    // public get value() {
    //     return this._value;
    // }

    // public set title(title: string) {
    //     this._title = title
    // }

    // public set value(value: number) {
    //     this._value = value
    // }

    // public set softSkill(soft: boolean) {
    //     this._softSkill = soft
    // }

    // public get softSkill() {
    //     return this._softSkill
    // }

    public setSkill(title: string, value: number) {
        this.title = title
        this.value = value
    }
}
