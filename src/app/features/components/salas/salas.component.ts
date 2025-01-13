import { Component, OnInit } from '@angular/core';
import { SalaCine } from '../../interfaces/SalaCine';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { FormCrearPeliculaComponent } from '../form-crear-pelicula/form-crear-pelicula.component';
import { FormSalasComponent } from '../form-salas/form-salas.component';
import { SalasService } from '../../services/salas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrl: './salas.component.css'
})
export class SalasComponent implements OnInit{

  salas?:SalaCine[];
  private logueado:boolean;
    constructor(private salasService:SalasService,private modal:MatDialog,private sharedService:SharedService,private router:Router) {
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
      this.salasService.obtenerSalas().subscribe(salas => {
        console.log({salas});
        this.salas = salas;
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
        console.log({salas});
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
