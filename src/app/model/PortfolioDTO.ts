import { Education } from "./Education";
import { Project } from "./Project";
import { Skill } from "./Skill";

export class PortfolioDTO {

    private _home_title: string;
    private _home_description: string;
    private _about_description: string;
    private _soft_skills: Skill[]
    private _hard_skills: Skill[]
    private _educations: Education[]
    private _projects: Project[]

    public get home_title() {
        return this._home_title;
    }

    public get home_description() {
        return this._home_description;
    }

    public get about_description() {
        return this._about_description;
    }

    public get softSkills() {
        return this._soft_skills
    }

    public get hardSkills() {
        return this._hard_skills
    }

    public get educations() {
        return this._educations
    }

    public get projects() {
        return this._projects
    }

}
