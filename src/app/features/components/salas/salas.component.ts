import { Component, OnInit } from '@angular/core';
import { SalaCine } from '../../interfaces/SalaCine';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { FormCrearPeliculaComponent } from '../form-crear-pelicula/form-crear-pelicula.component';
import { FormSalasComponent } from '../form-salas/form-salas.component';
import { SalasService } from '../../services/salas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrl: './salas.component.css'
})
export class SalasComponent implements OnInit{

  salas?:SalaCine[];
  private logueado:boolean;
    constructor(private salasService:SalasService,private toastr:ToastrService,private modal:MatDialog,private sharedService:SharedService,private router:Router) {
      this.logueado = this.sharedService.isLogueado
    }
    ngOnInit(): void {
      if (!this.logueado) {
        console.log('entro');

        this.router.navigate(['']);
      }
      this.cargarDatosSalas();
    }
    cargarDatosSalas() {
      this.salasService.obtenerSalas().subscribe(response => {
        const data = response.data;

        if(response.status === 'success'){
          this.salas = data;
          this.toastr.success(response.message, 'Success',{
            timeOut: 3000,
            positionClass: 'toast-top-right',
          })
        }else{
          this.toastr.error(response.message, 'Error',{
            timeOut: 3000,
            positionClass: 'toast-top-right',
          })
        }
      });
    }
    crearSala():void{
      const dialogRef = this.modal.open(FormSalasComponent, {
        data: {
          editMode: false,
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.cargarDatosSalas();
      });
    }
    editarSala(salas:SalaCine):void{
        const dialogRef = this.modal.open(FormSalasComponent, {
          data: {
            editMode: true,
            sala:salas
          }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.cargarDatosSalas();
        });

      }

}
