import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalasService } from '../../services/salas.service';

@Component({
  selector: 'app-form-salas',
  templateUrl: './form-salas.component.html',
  styleUrl: './form-salas.component.css'
})
export class FormSalasComponent {
  salasForm: FormGroup;
  editMode: boolean;
  sala: any;

  constructor(
    private fb: FormBuilder,
    private salasService:SalasService,
    private dialogRef: MatDialogRef<FormSalasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editMode = data.editMode;
    this.sala = data.sala;

    this.salasForm = this.fb.group({
      idSalaCine: [this.sala ? this.sala.idSalaCine : ''],
      nombre: [this.sala ? this.sala.nombre : '', [Validators.required]],
      estado: [this.sala ? this.sala.estado : '1']
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      console.log('Actualizando Salas', this.salasForm.value);
      this.salasService.editarSalas(this.salasForm.value).subscribe(
        respuesta => {
          console.log("Sala Editada");

        },
        error =>
          console.error('Error al editar la sala', error)
      )
    } else {
      console.log(this.editMode);

      console.log(this.salasForm.value)
      this.salasService.agregarSalas(this.salasForm.value).subscribe(
        respuesta => {
          console.log("Sala Agregada");

        },
        error =>
          console.error('Error al agregar la sala', error)
      )
    }
    this.dialogRef.close();
  }


  cancelar(): void {
    this.dialogRef.close();
  }
}
