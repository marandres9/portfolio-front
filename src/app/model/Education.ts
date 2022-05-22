export class Education {
    public id: number;
    public title: string;
    public period: string;
    public institution: string;
    public location: string;
    public description: string;

    public constructor(id: number, title: string, period: string, institution: string, location: string, description: string) {
        this.id = id;
        this.title = title;
        this.period = period;
        this.institution = institution;
        this.location = location;
        this.description = description;
    }
}
