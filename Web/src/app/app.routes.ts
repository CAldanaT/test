import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistroComponent } from './auth/registro/registro.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./auth/registro/registro.component').then(c => c.RegistroComponent)
    },
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
