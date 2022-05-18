import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-socials',
    templateUrl: './socials.component.html',
    styleUrls: ['./socials.component.css'],
})
export class SocialsComponent implements OnInit {

    facebook = 'https://facebook.com'
    instagram = 'https://instagram.com'
    twitter = 'https://twitter.com'
    github = 'https://github.com'

    constructor() {}

    ngOnInit(): void {}
}
