import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiRequestBody, ApiResponse, SalaCine } from '../interfaces/SalaCine';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SalasService {
  totalSalas: number = 0;

  private salasUrl = environment.API_SALAS;
  private editarSalaCine = `${this.salasUrl}/editar`;

  constructor(private http: HttpClient) {}

  obtenerSalas(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.salasUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener las salas:', error);
        return of({ status: 'error', message: 'Hubo un problema al obtener las salas', data: [] });
      })
    );
  }

  cargarDatos() {
    this.obtenerSalas().subscribe((data) => {
      // this.totalSalas = data.length;

      console.log('Total Salas:', this.totalSalas);
    });
  }

  agregarSalas(salas: ApiRequestBody): Observable<ApiRequestBody> {

    console.log({salas});

    return this.http.post<ApiRequestBody>(this.salasUrl, salas);
  }

  editarSalas(sala: ApiRequestBody, id:number): Observable<ApiRequestBody> {
    console.log({ sala });

    return this.http.put<ApiRequestBody>(
      `${this.editarSalaCine}/${id}`,
      sala
    );
  }
}
