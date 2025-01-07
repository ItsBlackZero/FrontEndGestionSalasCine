import { Component } from '@angular/core';
import { Usuario } from '../../../shared/interfaces/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})
export class AutenticacionComponent {

  USUARIO_DEFECTO:Usuario = { usuario: 'admin', clave: '0404' };

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedService:SharedService,private dialogRef:MatDialogRef<AutenticacionComponent>) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Usuario:', username);
      console.log('Contraseña:', password);
      const logueado = true;
      this.sharedService.setLogueado(logueado)
      this.dialogRef.close();
    }
  }
}
