import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-content',
    templateUrl: './home-content.component.html',
    styleUrls: ['./home-content.component.css'],
})
export class HomeContentComponent implements OnInit {
    @Input() title: string;
    @Input() description: string;

    constructor() {}

    ngOnInit(): void {}
}
