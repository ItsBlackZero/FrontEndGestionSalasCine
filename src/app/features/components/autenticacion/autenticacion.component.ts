import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../shared/interfaces/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})
export class AutenticacionComponent{

  USUARIO_DEFECTO= environment.USUARIO_DEFECTO;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private sharedService: SharedService, private dialogRef: MatDialogRef<AutenticacionComponent>) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === this.USUARIO_DEFECTO.usuario && password === this.USUARIO_DEFECTO.clave) {
        const logueado = true;
        this.sharedService.setLogueado(logueado);
        this.dialogRef.close();
        this.toastr.success('Inicio de sesión exitoso', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      } else {
        this.toastr.error('Usuario o contraseña incorrectos', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    } else {
      this.toastr.warning('Por favor, completa todos los campos', 'Advertencia', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    }
  }
}
