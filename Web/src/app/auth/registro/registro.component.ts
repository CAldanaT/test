import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SettingsService } from '../../core/settings/settings.service';
import { MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error.dialog.componnet';
import { fechaValidator } from './validators/fechaValidator';
import { UbicacionesService } from '../../_services/UbicacionesService';
import { Ciudad } from '../../_modules/Ciudad.model';
import { Usuario } from '../../_modules/Usuario.model';
import { UsuariosService } from '../../_services/UsuariosService';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatIconModule
],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistroComponent implements OnInit, OnDestroy {
   authMsg: string | undefined;
   registroForm: any;
   isLoading$: any;
   returnUrl: string | undefined;
   private unsubscribe: Subscription[] = [];
    selectedCity: any;
    ciudades: Ciudad[] = [];

  constructor(public settings:SettingsService, private fb: FormBuilder, private toaster: ToastrService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private ubicacionesService: UbicacionesService, private usuarioService: UsuariosService){
    this.registroForm = FormGroup<any>; 
    this.isLoading$ = Observable<boolean>;
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
    this.registroForm = this.fb.group({
      email:[
        null,
          Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(1),
          Validators.maxLength(250)
        ]),
      ],
      nombre:[
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250)
        ])
      ],
      telefono:[
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]{10}$/),
        ])
      ],
      fecha:[
        null,
        Validators.compose([
          Validators.required,
          fechaValidator
        ])
      ],
      ciudad:[
        null,
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }


  get f(){
    return  this.registroForm?.controls;
  }

  get nombre() {
    return this.registroForm.get('nombre');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get telefono() {
    return this.registroForm.get('telefono');
  }

  get fecha() {
    return this.registroForm.get('fecha');
  }

  get ciudad() {
    return this.registroForm.get('ciudad');
  }
  
  registrarUsuario($event: any, value: any){
    if(this.registroForm.invalid){
        this.openErrorDialog();
    } else {
      const usuario: Usuario = this.registroForm.value;

      const ciudadnombre = this.registroForm.value.ciudad;

      if(ciudadnombre){
        const ciudadesFiltradas  = this.ciudades.filter(ciudad =>
          ciudad.nombreLargo.toLowerCase().includes(ciudadnombre.toLowerCase())
        );

        if (ciudadesFiltradas.length > 0) {
          const ciudadSeleccionada = ciudadesFiltradas[0]; 

          usuario.ciudad = ciudadSeleccionada.nombre;
          usuario.estado = ciudadSeleccionada.estaado;
          usuario.pais = ciudadSeleccionada.pais;
        }
      }

      this.usuarioService.nuevoUsuario(usuario).subscribe(
        response => {
          alert('Usuario creado exitosamente');
          this.sendConfirmationEmail(response.email);
        },
        error => {
          alert('Error al guardar datos del usuario');
        }
      );
    }
  }
  
  openErrorDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';

    this.dialog.open(ErrorDialogComponent, {
      data: this.registroForm?.controls,
    });
  }

  buscarCiudad(query: string): void {
    if (query.length >= 3) {
      this.ubicacionesService.buscarUbicaciones(query).subscribe({
        next: (data) => {
          this.ciudades = data;
        },
        error: (err) => {
          alert('Error al obtener ciudades');
        },
      });
    }
  }

  sendConfirmationEmail(usuario: Usuario): void {
    this.usuarioService.sendConfirmationEmail(usuario).subscribe(
      response => {
        alert('Correo de confirmación enviado');
      },
      error => {
        alert('Error al enviar el correo');
      }
    );
  }
}
