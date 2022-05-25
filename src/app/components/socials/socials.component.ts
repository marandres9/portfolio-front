import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-socials',
    templateUrl: './socials.component.html',
    styleUrls: ['./socials.component.css'],
})
export class SocialsComponent implements OnInit {

    facebook = 'https://www.facebook.com/marianoandres.perez.1/'
    instagram = 'https://www.instagram.com/mariano.perez9/'
    // twitter = 'https://twitter.com'
    github = 'https://github.com/marandres9'

    constructor() {}

    ngOnInit(): void {}
}
