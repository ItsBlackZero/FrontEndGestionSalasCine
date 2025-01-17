import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pelicula } from '../../features/interfaces/Pelicula';
import { SalaCine } from '../../features/interfaces/SalaCine';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  totalSalas = 20;
  salasDisponibles = 15;
  totalPeliculas = 50;


  // peliculas: Pelicula[] = [
  //   { nombre: 'Inception', duracion: 148 },
  //   { nombre: 'Interstellar', duracion: 169 },
  //   { nombre: 'The Dark Knight', duracion: 152 },
  //   { nombre: 'The Matrix', duracion: 136 }
  // ];
  // salas: SalaCine[] = [
  //   { nombre: 'Inception', estado: 1 },
  //   { nombre: 'Interstellar', estado: 1 },
  //   { nombre: 'The Dark Knight', estado: 1 },
  //   { nombre: 'The Matrix', estado: 1 }
  // ];


  private logueadoSubject = new BehaviorSubject<boolean>(false);
  logueado$ = this.logueadoSubject.asObservable();

  constructor() {
    const token = localStorage.getItem('token_logueado');
    if (token) {
      this.logueadoSubject.next(true);
    }
  }

  setLogueado(logueado:boolean):void{
    this.logueadoSubject.next(logueado)
    const token = 'token_confirmado';
    localStorage.setItem('token_logueado', token);
  }
  get isLogueado(): boolean {
    return this.logueadoSubject.value;
  }
}
