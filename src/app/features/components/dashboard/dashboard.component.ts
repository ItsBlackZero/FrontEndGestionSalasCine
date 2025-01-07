import { Component, OnInit } from '@angular/core';
import { SalasService } from '../../services/salas.service';
import { SalaCine } from '../../interfaces/SalaCine';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../interfaces/Pelicula';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  totalSalas = 0;
  salasDisponibles = 0;
  totalPeliculas = 0; 
  salas: SalaCine[] = [];
  peliculas: Pelicula[] = [];


  constructor(private salasService: SalasService,private peliculasService:PeliculasService) {}

  ngOnInit(): void {
    this.cargarDatosSalas();
    this.cargarDatosPeliculas();
  }

  cargarDatosSalas() {
    this.salasService.obtenerSalas().subscribe(salas => {
      this.salas = salas;
      this.totalSalas = salas.length;
      this.salasDisponibles = salas.filter(sala => sala.estado === 1).length;
      console.log('Total Salas:', this.totalSalas);
      console.log('Salas Disponibles:', this.salasDisponibles);
    });
  }
  cargarDatosPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
      this.totalPeliculas = peliculas.length;
      console.log('response', peliculas);
    });
  }
}
