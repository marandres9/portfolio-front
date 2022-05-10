export class Experience {
    public id: number;
    public title: string;
    public period: string;
    public institution: string;
    public location: string;
    public description: string;

    public constructor(title: string, period: string, institution: string, location: string, description: string) {
        this.id = 0;
        this.title = title;
        this.period = period;
        this.institution = institution;
        this.location = location;
        this.description = description;
    }
}
