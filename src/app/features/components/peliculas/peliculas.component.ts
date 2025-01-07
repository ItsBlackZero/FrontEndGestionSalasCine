import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pelicula } from '../../interfaces/Pelicula';
import { SharedService } from '../../../shared/services/shared.service';
import { share } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormCrearPeliculaComponent } from '../form-crear-pelicula/form-crear-pelicula.component';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit {

  peliculas?:Pelicula[];

  constructor(private peliculasService:PeliculasService,private modal:MatDialog) {
  }


  ngOnInit(): void {
    this.cargarDatosPeliculas();
  }

  cargarDatosPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(peliculas => {
      console.log({peliculas});

      this.peliculas = peliculas;
    });
  }

  crearPelicula():void{
    const dialogRef = this.modal.open(FormCrearPeliculaComponent, {
      data: {
        editMode: false,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cargarDatosPeliculas();
    });
  }
  editarPelicula(pelicula:Pelicula):void{
    console.log({pelicula});
    const dialogRef = this.modal.open(FormCrearPeliculaComponent, {
      data: {
        editMode: true,
        pelicula:pelicula
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cargarDatosPeliculas();
    });

  }

}
