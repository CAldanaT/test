import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export default [
  { 
  	path: '', 
  	component: AuthComponent 
  },
  {
  	path: 'login',
  	component: LoginComponent
  }
  //{path: 'register', component:RegisterComponent}
] as Route [];