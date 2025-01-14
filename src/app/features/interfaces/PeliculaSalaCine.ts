import { Pelicula } from "./Pelicula";
import { SalaCine } from "./SalaCine";

export interface PeliculaSalaCine{
  idPeliculaSala?: number;
  pelicula?: Pelicula;
  salaCine?: SalaCine;
  fechaPublicacion: String;
  fechaFin: String;
}

export interface ApiResponseSalasPeliculas {
  status: string;
  message: string;
  data: Asignacion[];
}
export interface Asignacion {
  idPeliculaSala: number;
  idSalaCine: number;
  idPelicula: number;
  pelicula: Pelicula;
  salaCine: SalaCine;
  fechaPublicacion: string;
  fechaFin: string;
}

export interface ApiRequestBodyPeliculaSalas {
  body: {
    pelicula: {
      idPelicula: number;
    };
    salaCine: {
      idSalaCine: number;
    };
    fechaPublicacion: string;
    fechaFin: string;  
  };
}
