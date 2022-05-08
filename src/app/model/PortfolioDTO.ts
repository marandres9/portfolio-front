import { Education } from "./Education";
import { Project } from "./Project";
import { Skill } from "./Skill";

export class PortfolioDTO {

    home_title: string;
    home_description: string;
    about_description: string;
    softSkills: Skill[]
    hardSkills: Skill[]
    educations: Education[]
    projects: Project[]

    // public get home_title() {
    //     return this._home_title;
    // }

    // public get home_description() {
    //     return this._home_description;
    // }

    // public get about_description() {
    //     return this._about_description;
    // }

    // public get softSkills() {
    //     return this._soft_skills
    // }

    // public get hardSkills() {
    //     return this._hard_skills
    // }

    // public get educations() {
    //     return this._educations
    // }

    // public get projects() {
    //     return this._projects
    // }

}
