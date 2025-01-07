import { Component, OnInit } from '@angular/core';
import { SalaCine } from '../../interfaces/SalaCine';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { FormCrearPeliculaComponent } from '../form-crear-pelicula/form-crear-pelicula.component';
import { FormSalasComponent } from '../form-salas/form-salas.component';
import { SalasService } from '../../services/salas.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrl: './salas.component.css'
})
export class SalasComponent implements OnInit{

  salas?:SalaCine[];

    constructor(private salasService:SalasService,private modal:MatDialog) {
    }
    ngOnInit(): void {
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
