export class PortfolioDTO {

    private _home_title: string;
    private _home_description: string;
    private _about_description: string;

    public get home_title() {
        return this._home_title;
    }

    public get home_description() {
        return this._home_description;
    }

    public get about_description() {
        return this._about_description;
    }

}
