import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// router
import { RouterModule } from '@angular/router';
// http modelue
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './sections/home/home.component';
import { AboutComponent } from './sections/about/about.component';
import { EducationExperienceComponent } from './sections/education-experience/education-experience.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { LandingPageComponent } from './portfolio-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';
import { AuthenticationService } from './service/authentication.service';
import { HttpService } from './service/http.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { EducationItemComponent } from './components/education-item/education-item.component';
import { ExperienceItemComponent } from './components/experience-item/experience-item.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeFormComponent } from './forms/home-form/home-form.component';
import { AboutFormComponent } from './forms/about-form/about-form.component';
import { SkillsFormComponent } from './forms/skills-form/skills-form.component';
import { EducationFormComponent } from './forms/education-form/education-form.component';
import { ExperienceFormComponent } from './forms/experience-form/experience-form.component';
import { ProjectsFormComponent } from './forms/projects-form/projects-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeContentComponent } from './content/home-content/home-content.component';
import { AboutContentComponent } from './content/about-content/about-content.component';
import { SkillsContentComponent } from './content/skills-content/skills-content.component';
import { EducationContentComponent } from './content/education-content/education-content.component';
import { ExperienceContentComponent } from './content/experience-content/experience-content.component';
import { ProjectsContentComponent } from './content/projects-content/projects-content.component';
import { SocialsComponent } from './components/socials/socials.component';
import { AuthInterceptor } from './service/authentication.interceptor';

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
        HomeFormComponent,
        AboutFormComponent,
        SkillsFormComponent,
        EducationFormComponent,
        ExperienceFormComponent,
        ProjectsFormComponent,
        FooterComponent,
        HomeContentComponent,
        AboutContentComponent,
        SkillsContentComponent,
        EducationContentComponent,
        ExperienceContentComponent,
        ProjectsContentComponent,
        SocialsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: 'home', component: LandingPageComponent },
            { path: 'login', component: LoginPageComponent },
            { path:'', redirectTo: '/home', pathMatch: 'full' }
        ])
    ],
    providers: [
        AuthenticationService,
        HttpService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
