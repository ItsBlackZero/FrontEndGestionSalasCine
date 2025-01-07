import { Pelicula } from "./Pelicula";
import { SalaCine } from "./SalaCine";

export interface PeliculaSalaCine{
  idPeliculaSala:   number;
  pelicula:Pelicula;
  salaCine:SalaCine;
  fechaPublicacion:Date;
  fechaFin:Date;
}
