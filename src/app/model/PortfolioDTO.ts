import { Education } from "./Education";
import { Skill } from "./Skill";

export class PortfolioDTO {

    public home_title: string;
    public home_description: string;
    public about_description: string;
    public skills: Skill[]
    public education: Education[]

    // public get home_title() {
    //     return this._home_title;
    // }

    // public get home_description() {
    //     return this._home_description;
    // }

    // public get about_description() {
    //     return this._about_description;
    // }

    // public get skills() {
    //     return this._skills
    // }

    // public get educations() {
    //     return this._educations
    // }

}
