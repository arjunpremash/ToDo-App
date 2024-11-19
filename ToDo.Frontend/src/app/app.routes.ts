import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectDetailedViewComponent } from './project-detailed-view/project-detailed-view.component';
import { AuthGuard } from './Services/guards/auth.guard';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'project/:id', component: ProjectDetailedViewComponent, canActivate: [AuthGuard] },
    { path: 'register', component: SignupComponent }
    //{ path: '**', component: HomeComponent }
];
