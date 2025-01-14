import { ApiRequestBodyPelicula  } from './../../interfaces/Pelicula';
import { Component, Inject, numberAttribute } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeliculasService } from '../../services/peliculas.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiRequestBody, ApiResponse } from '../../interfaces/SalaCine';

@Component({
  selector: 'app-form-crear-pelicula',
  templateUrl: './form-crear-pelicula.component.html',
  styleUrl: './form-crear-pelicula.component.css'
})
export class FormCrearPeliculaComponent {

  peliculaForm: FormGroup;
  editMode: boolean;
  pelicula: any;
  peliculaData?:ApiRequestBodyPelicula;
  constructor(
    private fb: FormBuilder,
    private peliculaService:PeliculasService,
    private dialogRef: MatDialogRef<FormCrearPeliculaComponent>,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editMode = data.editMode;
    this.pelicula = data.pelicula;

    this.peliculaForm = this.fb.group({
      idPelicula: [this.pelicula ? this.pelicula.idPelicula : ''],
      estado: [this.pelicula ? this.pelicula.estado : '1'],
      nombre: [this.pelicula ? this.pelicula.nombre : '', [Validators.required, Validators.minLength(3)]],
      duracion: [this.pelicula ? this.pelicula.duracion : '', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }
  updatePeliculaData() {
    this.peliculaData = {
      body: {
        idPelicula:Number(this.peliculaForm.get('idPelicula')?.value),
        nombre: this.peliculaForm.get('nombre')?.value,
        duracion: Number(this.peliculaForm.get('duracion')?.value),
        estado: Number(this.peliculaForm.get('estado')?.value),
      }
    };
  }

  onSubmit(): void {
    this.updatePeliculaData()
    if (this.peliculaForm.valid) {
      if (this.editMode) {
        this.peliculaService.editarPelicula(this.peliculaData!).subscribe(
          respuesta => {
            this.toastr.success('Pelicula editada', 'Success',{
              timeOut: 3000,
              positionClass: 'toast-top-right',
            })

          },
          error =>
            this.toastr.error(error.message, 'Success',{
              timeOut: 3000,
              positionClass: 'toast-top-right',
            })
        )
      } else {
        this.peliculaService.agregarPelicula(this.peliculaData!).subscribe(
          respuesta => {
            this.toastr.success('Registro creado', 'Success',{
              timeOut: 3000,
              positionClass: 'toast-top-right',
            })

          },
          error =>
            this.toastr.error('Error al crear el registro', 'Error',{
              timeOut: 3000,
              positionClass: 'toast-top-right',
            })
        )
      }
      this.dialogRef.close();
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
