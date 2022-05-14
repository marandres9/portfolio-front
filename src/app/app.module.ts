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
import { AuthenticationService } from './service/authentication.service';
import { HttpService } from './service/http.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { EducationItemComponent } from './components/education-item/education-item.component';
import { ExperienceItemComponent } from './components/experience-item/experience-item.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { EditingPageComponent } from './editing-page/editing-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeFormComponent } from './editing-page/home-form/home-form.component';
import { AboutFormComponent } from './editing-page/about-form/about-form.component';
import { SkillsFormComponent } from './editing-page/skills-form/skills-form.component';
import { EducationFormComponent } from './editing-page/education-form/education-form.component';
import { ExperienceFormComponent } from './editing-page/experience-form/experience-form.component';
import { ProjectsFormComponent } from './editing-page/projects-form/projects-form.component';
import { FooterComponent } from './components/footer/footer.component';

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
        ProgressBarComponent,
        EducationItemComponent,
        ExperienceItemComponent,
        ProjectCardComponent,
        EditingPageComponent,
        HomeFormComponent,
        AboutFormComponent,
        SkillsFormComponent,
        EducationFormComponent,
        ExperienceFormComponent,
        ProjectsFormComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: 'home', component: LandingPageComponent },
            { path: 'login', component: LoginPageComponent },
            { path: 'edit', component: EditingPageComponent },
            { path:'', redirectTo: '/home', pathMatch: 'full' }
        ])
    ],
    providers: [
        AuthenticationService,
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
