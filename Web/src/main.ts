/// <reference types="@angular/localize" />

import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    provideToastr({timeOut: 1500, positionClass: 'toast-bottom-right'})
  ]
}).then(() => {(<any>window).appBootstrap && (<any>window).appBootstrap();}).catch(err => console.error(err))