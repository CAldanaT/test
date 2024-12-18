import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-error-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule
    ],
    template: `
      <h2 mat-dialog-title>Se encontraron los siguientes errores en sus datos de contacto</h2>
      <mat-dialog-content>
        <div *ngIf="errors?.['nombre']?.['errors']?.['required']">
          <p>El nombre es obligatorio.</p>
        </div>
        <div *ngIf="errors?.['email']?.['errors']?.['required']">
          <p>El email es obligatorio.</p>
        </div>
        <div *ngIf="errors?.['email']?.['errors']?.['email']">
          <p>El email debe ser válido.</p>
        </div>
        <div *ngIf="errors?.['telefono']?.['errors']?.['required']">
          <p>El teléfono es obligatorio.</p>
        </div>
        <div *ngIf="errors?.['telefono']?.['errors']?.['pattern']">
          <p>El teléfono debe ser un número de 10 dígitos.</p>
        </div>
        <div *ngIf="errors?.['fecha']?.['errors']?.['required']">
          <p>La fecha de nacimiento es obligatoria.</p>
        </div>
        <div *ngIf="errors?.['fecha']?.['errors']?.['fechaFueraDeRango']"> 
          <p>La fecha debe estar entre hoy y hace 100 años.</p>
        </div>
        <div *ngIf="errors?.['fecha']?.['errors']?.['fechaInvalida']"> 
          <p>La fecha no tiene un formato valido.</p>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="close()">Ok</button>
      </mat-dialog-actions>
    `,
  })
  export class ErrorDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public errors: any, public dialogRef: MatDialogRef<ErrorDialogComponent>) {}
  
    close(): void {
      this.dialogRef.close();
    }
  }