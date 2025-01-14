import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponsePelicula, Pelicula } from '../interfaces/Pelicula';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiRequestBodyPelicula } from '../interfaces/Pelicula';
import { ApiRequestBody } from '../interfaces/SalaCine';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  totalPeliculas: number = 0;

  private peliculaUrl = environment.API_PELICULAS;
  private editarPeliculaUrl = `${this.peliculaUrl}/editar`;

  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<ApiResponsePelicula> {
    return this.http.get<ApiResponsePelicula>(this.peliculaUrl).pipe(
      catchError((error) => {
              console.error('Error al obtener las salas:', error);
              return of({ status: 'error', message: 'Hubo un problema al obtener las salas', data: [] });
            })
    );
  }


  cargarDatos() {
    this.obtenerPeliculas().subscribe((data) => {
      // this.totalPeliculas = data.length;
    });
  }

  agregarPelicula(pelicula: ApiRequestBodyPelicula): Observable<ApiRequestBodyPelicula> {
    console.log('Pelicula', pelicula);

    return this.http.post<ApiRequestBodyPelicula>(this.peliculaUrl, pelicula);
  }

  editarPelicula(pelicula: ApiRequestBodyPelicula): Observable<ApiRequestBodyPelicula> {
    return this.http.put<ApiRequestBodyPelicula>(
      `${this.editarPeliculaUrl}/${pelicula.body.idPelicula}`,
      pelicula
    );
  }
}
