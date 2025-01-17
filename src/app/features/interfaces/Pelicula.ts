export interface Pelicula {
  idPelicula?:number;
  nombre?: string;
  duracion?: number;
  estado?:number;
}

export interface ApiResponsePelicula {
    status: string;
    message: string;
    data: Pelicula[];
}

export interface ApiRequestBodyPelicula {
    nombre: string;
    duracion: number;
    estado: number;

}
