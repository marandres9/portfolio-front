export class Skill {
    id: number;
    title: string;
    value: number;
    softSkill: boolean

    public constructor(id: number, title: string, value: number, soft: boolean) {
        this.id = id;
        this.title = title;
        this.value = value;
        this.softSkill = soft;
    }

    public setSkill(title: string, value: number) {
        this.title = title
        this.value = value
    }
}
