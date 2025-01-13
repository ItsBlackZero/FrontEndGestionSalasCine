import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { SalasService } from '../../services/salas.service';
import { Pelicula } from '../../interfaces/Pelicula';
import { SalaCine } from '../../interfaces/SalaCine';
import { PeliculaSalaCine } from '../../interfaces/PeliculaSalaCine';
import { SalasCineService } from '../../services/salas-cine.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
    private dataPipe:DatePipe
  ) {
    this.logueado=this.sharedService.isLogueado
    this.asignacionForm = this.fb.group({
      idPelicula: ['', Validators.required],
      idSalaCine: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    if (!this.logueado) {
      console.log('entro');

      this.router.navigate(['']);
    }
    this.cargarDatosPeliculas();
    this.cargarDatosSalas();
    this.cargarAsignaciones();
  }

  cargarDatosPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(peliculas => {
      console.log({peliculas});
      this.peliculas = peliculas;
    });
  }

  cargarDatosSalas() {
    this.salasService.obtenerSalas().subscribe(salas => {
      console.log({salas});
      this.salas = salas;
    });
  }

  cargarAsignaciones() {
    this.peliculaSalaCine.obtenerPeliculasSalaCine().subscribe((response: PeliculaSalaCine[]) => {
      console.log({ response });
      this.asignaciones = response.map(asignacion => ({
        idPeliculaSala: asignacion.idPeliculaSala,
        idSalaCine: asignacion.salaCine?.idSalaCine,
        idPelicula: asignacion.pelicula?.idPelicula,
        pelicula: asignacion.pelicula,
        salaCine: asignacion.salaCine,
        fechaPublicacion: asignacion.fechaPublicacion,
        fechaFin: asignacion.fechaFin,
      }));
      console.log(this.asignaciones);
    });
  }

  getFechaFormateada(date:Date):string{
    return this.dataPipe.transform(date,'dd-MM-yyyy') || '';
  }

  asignar(): void {
    const fechaActual = new Date() ;
    if (this.asignacionForm.valid) {
      const asignacion = this.asignacionForm.value;
      const peliculaSalaCine: PeliculaSalaCine = {
        pelicula: {
          idPelicula: asignacion.idPelicula,
        },
        salaCine: {
          idSalaCine: asignacion.idSalaCine,
        },
        fechaPublicacion: this.dataPipe.transform(fechaActual, 'yyyy-MM-dd') || '',
        fechaFin: this.dataPipe.transform(fechaActual, 'yyyy-MM-dd') || '',
      };
      console.log('asignacion ',peliculaSalaCine);
      this.peliculasSalasService.asignarPeliculaSala(peliculaSalaCine).subscribe(() => {
        this.cargarAsignaciones();
        this.asignacionForm.reset();
      });
    }
  }
}
