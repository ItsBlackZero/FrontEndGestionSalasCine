import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { SalasService } from '../../services/salas.service';
import { ApiRequestBodyPelicula, ApiResponsePelicula, Pelicula } from '../../interfaces/Pelicula';
import { ApiResponse, SalaCine } from '../../interfaces/SalaCine';
import { ApiRequestBodyPeliculaSalas, ApiResponseSalasPeliculas, PeliculaSalaCine } from '../../interfaces/PeliculaSalaCine';
import { SalasCineService } from '../../services/salas-cine.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-peliculas-sala-cine',
  templateUrl: './peliculas-sala-cine.component.html',
  styleUrl: './peliculas-sala-cine.component.css'
})
export class PeliculasSalaCineComponent {

  asignacionForm: FormGroup;
  peliculas: Pelicula[] = [];
  salas: SalaCine[] = [];
  asignaciones :PeliculaSalaCine[]= [];
  displayedColumns: string[] = ['pelicula', 'sala','fechaPublicacion','fechaFin'];
  logueado:boolean;

  constructor(
    private fb: FormBuilder,
    private peliculasService:PeliculasService,
    private salasService:SalasService,
    private peliculaSalaCine:SalasCineService,
    private peliculasSalasService: SalasCineService,
    private sharedService:SharedService,
    private router:Router,
    private dataPipe:DatePipe,
    private toastr:ToastrService
  ) {
    this.logueado=this.sharedService.isLogueado
    this.asignacionForm = this.fb.group({
      idPelicula: ['', Validators.required],
      idSalaCine: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    if (!this.logueado) {
      this.router.navigate(['']);
    }
    this.cargarDatosPeliculas();
    this.cargarDatosSalas();
    this.cargarAsignaciones();
  }

  cargarDatosPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe((response:ApiResponsePelicula) => {
      // console.log({response});
      const data = response.data;
      if(response.status === 'success'){
        this.peliculas = data;
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

  cargarDatosSalas() {
    this.salasService.obtenerSalas().subscribe((response:ApiResponse) => {
      // this.salas = salas;
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

  cargarAsignaciones() {
    this.peliculaSalaCine.obtenerPeliculasSalaCine().subscribe((response: ApiResponseSalasPeliculas) => {

      console.log({response});

      if(response.status === 'success'){
        this.asignaciones = response.data.map(asignacion => ({


          idPeliculaSala: asignacion.idPeliculaSala,
          idSalaCine: asignacion.salaCine?.idSalaCine,
          idPelicula: asignacion.pelicula?.idPelicula,
          nombrePelicula: asignacion.pelicula?.nombre,
          duracionPelicula: asignacion.pelicula?.duracion,
          estadoPelicula: asignacion.pelicula?.estado,
          nombreSalaCine: asignacion.salaCine?.nombre,
          estadoSalaCine: asignacion.salaCine?.estado,
          fechaPublicacion: asignacion.fechaPublicacion,
          fechaFin: asignacion.fechaFin
        })
        );
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

  getFechaFormateada(date:Date):string{
    return this.dataPipe.transform(date,'dd-MM-yyyy') || '';
  }

  asignar(): void {
    const fechaActual = new Date() ;
    if (this.asignacionForm.valid) {
      const asignacion = this.asignacionForm.value;
      const peliculaSalaCine: ApiRequestBodyPeliculaSalas = {
        body: {
          pelicula: {
            idPelicula: asignacion.idPelicula,
          },
          salaCine: {
            idSalaCine: asignacion.idSalaCine,
          },
          fechaPublicacion: this.dataPipe.transform(fechaActual, 'yyyy-MM-dd') || '',
          fechaFin: this.dataPipe.transform(fechaActual, 'yyyy-MM-dd') || '',
        }
      };
      this.peliculasSalasService.asignarPeliculaSala(peliculaSalaCine).subscribe(() => {
        this.cargarAsignaciones();
        this.asignacionForm.reset();
      });
    }
  }
}
