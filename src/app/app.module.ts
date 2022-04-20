import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// router
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { EducationExperienceComponent } from './components/education-experience/education-experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        AboutComponent,
        EducationExperienceComponent,
        SkillsComponent,
        ProjectsComponent,
        LandingPageComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: 'home', component: LandingPageComponent },
            {path:'', redirectTo: '/home', pathMatch: 'full'},
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
