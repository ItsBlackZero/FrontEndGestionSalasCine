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
  body: {
    idPelicula?:number;
    nombre: string;
    duracion: number;
    estado: number;
  };
}
