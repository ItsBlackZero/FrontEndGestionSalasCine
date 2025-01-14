import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestBodyPeliculaSalas, ApiResponseSalasPeliculas, PeliculaSalaCine } from '../interfaces/PeliculaSalaCine';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SalasCineService {
  private peliculaSalaCineUrl = environment.API_SALA_CINE_PELICULA;

  constructor(private http: HttpClient) {}

  obtenerPeliculasSalaCine(): Observable<ApiResponseSalasPeliculas> {
    return this.http.get<ApiResponseSalasPeliculas>(this.peliculaSalaCineUrl);
  }

  asignarPeliculaSala(
    peliculaSalaCine: ApiRequestBodyPeliculaSalas
  ): Observable<ApiRequestBodyPeliculaSalas> {
    console.log({peliculaSalaCine});

    return this.http.post<ApiRequestBodyPeliculaSalas>(this.peliculaSalaCineUrl,peliculaSalaCine);
  }
}
