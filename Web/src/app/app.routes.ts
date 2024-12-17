import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent)
    },
    { 
        path: 'login', 
        component: LoginComponent },
    {
        path: '',
        redirectTo: '',
        pathMatch:'full'
    },
    {
        path: '**',
        redirectTo: 'error/404'
    }
];
