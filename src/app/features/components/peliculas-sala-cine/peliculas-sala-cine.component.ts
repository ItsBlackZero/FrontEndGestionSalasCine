import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { SalasService } from '../../services/salas.service';
import { Pelicula } from '../../interfaces/Pelicula';
import { SalaCine } from '../../interfaces/SalaCine';
import { PeliculaSalaCine } from '../../interfaces/PeliculaSalaCine';
import { SalasCineService } from '../../services/salas-cine.service';

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
  displayedColumns: string[] = ['pelicula', 'sala'];

  constructor(
    private fb: FormBuilder,
    private peliculasService:PeliculasService,
    private salasService:SalasService,
    private peliculaSalaCine:SalasCineService,
    private peliculasSalasService: SalasCineService
  ) {
    this.asignacionForm = this.fb.group({
      peliculaId: ['', Validators.required],
      salaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
        idSalaCine: asignacion.salaCine.idSalaCine,
        idPelicula: asignacion.pelicula.idPelicula,
        pelicula: asignacion.pelicula,
        salaCine: asignacion.salaCine,
        fechaPublicacion: new Date(asignacion.fechaPublicacion),
        fechaFin: new Date(asignacion.fechaFin),
      }));
      console.log(this.asignaciones);
    });
  }

  asignar(): void {
    if (this.asignacionForm.valid) {
      const asignacion = this.asignacionForm.value;
      this.peliculasSalasService.asignarPeliculaSala(asignacion).subscribe(() => {
        this.cargarAsignaciones();
        this.asignacionForm.reset();
      });
    }
  }
}
