import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pelicula } from '../interfaces/Pelicula';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  totalPeliculas: number = 0;

  private peliculaUrl = 'http://localhost:8080/pelicula';
  private editarPeliculaUrl = 'http://localhost:8080/pelicula/editar';

  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.peliculaUrl);
  }

  cargarDatos() {
    this.obtenerPeliculas().subscribe((data) => {
      this.totalPeliculas = data.length;
    });
  }

  agregarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.peliculaUrl, pelicula);
  }

  editarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    console.log({ pelicula });

    return this.http.put<Pelicula>(
      `${this.editarPeliculaUrl}/${pelicula.idPelicula}`,
      pelicula
    );
  }
}
