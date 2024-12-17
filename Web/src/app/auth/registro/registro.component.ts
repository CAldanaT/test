import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SettingsService } from '../../core/settings/settings.service';
import { MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule, 
    CommonModule, 
    RouterLink, 
    MatIconModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistroComponent implements OnInit, OnDestroy {
   authMsg: string | undefined;
   loginForm: any;
   isLoading$: any;
   returnUrl: string | undefined;
   private unsubscribe: Subscription[] = [];

  constructor(public settings:SettingsService, private fb: FormBuilder, private toaster: ToastrService, private route: ActivatedRoute, private router: Router){
    this.loginForm = FormGroup<any>; 
    this.isLoading$ = Observable<boolean>;
    /*this.isLoading$ = this.authService.isLoading$;
     if(this.authService.isLogued()){
       this.router.navigate(['/app.plans']);
    }*/
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

   initForm(){
    this.loginForm = this.fb.group({
      email:[
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(1)
        ]),
      ],
      password:[
        null, 
        Validators.compose([
          Validators.required,
          Validators.minLength(1)
        ])
      ]
    });
  }


  get f(){
       return  this.loginForm?.controls;
  }
  
  login($event: any, value: any){
    $event.preventDefault();

  }
}
