import { Component, OnInit } from '@angular/core';
import { SalasService } from '../../services/salas.service';
import { ApiResponse, SalaCine } from '../../interfaces/SalaCine';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../interfaces/Pelicula';
import { ToastrService } from 'ngx-toastr';

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


  constructor(private salasService: SalasService,private toastr:ToastrService,private peliculasService:PeliculasService) {}

  ngOnInit(): void {
    this.cargarDatosSalas();
    this.cargarDatosPeliculas();
  }

  cargarDatosSalas() {
    this.salasService.obtenerSalas().subscribe((response: ApiResponse) => {
      if (response.status === 'success') {
        const data = response.data;
        this.salas = data;
        this.totalSalas = this.salas.length;
        this.salasDisponibles = this.salas.filter(sala => sala.estado === 1).length;
        this.toastr.success(response.message, 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      } else {
        this.toastr.error(response.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    });
  }
  cargarDatosPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(response => {
      if (response.status === 'success') {
        const data = response.data;
        this.peliculas = data;
        this.totalPeliculas = this.peliculas.length;
        this.toastr.success(response.message, 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      } else {
        this.toastr.error(response.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    });
  }
}
