import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// router
import { RouterModule } from '@angular/router';
// http modelue
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { EducationExperienceComponent } from './components/education-experience/education-experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';

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
        LoginPageComponent,
        EditButtonComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: 'home', component: LandingPageComponent },
            { path: 'login', component: LoginPageComponent },
            {path:'', redirectTo: '/home', pathMatch: 'full'},
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
