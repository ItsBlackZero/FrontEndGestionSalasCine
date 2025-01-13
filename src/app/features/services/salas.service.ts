import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SalaCine } from '../interfaces/SalaCine';

@Injectable({
  providedIn: 'root',
})
export class SalasService {
  totalSalas: number = 0;

  private salasUrl = 'http://localhost:8080/sala-cine';
  private editarSalaCine = 'http://localhost:8080/sala-cine/editar';

  constructor(private http: HttpClient) {}

  obtenerSalas(): Observable<SalaCine[]> {
    return this.http.get<SalaCine[]>(this.salasUrl);
  }

  cargarDatos() {
    this.obtenerSalas().subscribe((data) => {
      this.totalSalas = data.length;

      console.log('Total Salas:', this.totalSalas);
    });
  }

  agregarSalas(salas: SalaCine): Observable<SalaCine> {
    return this.http.post<SalaCine>(this.salasUrl, salas);
  }

  editarSalas(sala: SalaCine): Observable<SalaCine> {
    console.log({ sala });

    return this.http.put<SalaCine>(
      `${this.editarSalaCine}/${sala.idSalaCine}`,
      sala
    );
  }
}
