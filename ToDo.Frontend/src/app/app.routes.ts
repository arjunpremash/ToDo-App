import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectDetailedViewComponent } from './project-detailed-view/project-detailed-view.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'project/:id', component: ProjectDetailedViewComponent },
];
