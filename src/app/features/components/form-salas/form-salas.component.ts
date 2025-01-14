import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalasService } from '../../services/salas.service';
import { ApiRequestBody } from '../../interfaces/SalaCine';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-salas',
  templateUrl: './form-salas.component.html',
  styleUrl: './form-salas.component.css'
})
export class FormSalasComponent {
  salasForm: FormGroup;
  editMode: boolean;
  sala: any;
  salaCineData?:ApiRequestBody

  constructor(
    private fb: FormBuilder,
    private salasService:SalasService,
    private dialogRef: MatDialogRef<FormSalasComponent>,
    private toastr:ToastrService,
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

  updateSalaCine() {
    this.salaCineData = {
      body: {
        idSalaCine:Number(this.salasForm.get('idSalaCine')?.value),
        nombre: this.salasForm.get('nombre')?.value,
        estado: Number(this.salasForm.get('estado')?.value),
      }
    };
  }

  onSubmit(): void {
    this.updateSalaCine();
    if (this.editMode) {
      this.salasService.editarSalas(this.salaCineData!).subscribe(
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
      this.salasService.agregarSalas(this.salaCineData!).subscribe(
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


  cancelar(): void {
    this.dialogRef.close();
  }
}
