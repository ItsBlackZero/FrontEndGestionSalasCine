import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-form-crear-pelicula',
  templateUrl: './form-crear-pelicula.component.html',
  styleUrl: './form-crear-pelicula.component.css'
})
export class FormCrearPeliculaComponent {

  peliculaForm: FormGroup;
  editMode: boolean;
  pelicula: any;

  constructor(
    private fb: FormBuilder,
    private peliculaService:PeliculasService,
    private dialogRef: MatDialogRef<FormCrearPeliculaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editMode = data.editMode;
    this.pelicula = data.pelicula;

    this.peliculaForm = this.fb.group({
      idPelicula: [this.pelicula ? this.pelicula.idPelicula : ''],
      estado: [this.pelicula ? this.pelicula.estado : ''],
      nombre: [this.pelicula ? this.pelicula.nombre : '', [Validators.required, Validators.minLength(3)]],
      duracion: [this.pelicula ? this.pelicula.duracion : '', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit(): void {
    if (this.peliculaForm.valid) {
      if (this.editMode) {
        console.log('Actualizando película', this.peliculaForm.value);
        this.peliculaService.editarPelicula(this.peliculaForm.value).subscribe(
          respuesta => {
            console.log("Pelicula Editada");

          },
          error =>
            console.error('Error al editar la pelicula', error)
        )
      } else {
        console.log(this.editMode);

        console.log(this.peliculaForm.value)
        this.peliculaService.agregarPelicula(this.peliculaForm.value).subscribe(
          respuesta => {
            console.log("Pelicula Agregada");

          },
          error =>
            console.error('Error al agregar la pelicula', error)
        )
      }
      this.dialogRef.close();
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
