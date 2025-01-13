import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeliculaSalaCine } from '../interfaces/PeliculaSalaCine';

@Injectable({
  providedIn: 'root',
})
export class SalasCineService {
  private peliculaSalaCineUrl = 'http://localhost:8080/pelicula-sala-cine';

  constructor(private http: HttpClient) {}

  obtenerPeliculasSalaCine(): Observable<PeliculaSalaCine[]> {
    return this.http.get<PeliculaSalaCine[]>(this.peliculaSalaCineUrl);
  }

  asignarPeliculaSala(
    peliculaSalaCine: PeliculaSalaCine
  ): Observable<PeliculaSalaCine> {
    console.log({peliculaSalaCine});

    return this.http.post<PeliculaSalaCine>(this.peliculaSalaCineUrl,peliculaSalaCine);
  }
}
