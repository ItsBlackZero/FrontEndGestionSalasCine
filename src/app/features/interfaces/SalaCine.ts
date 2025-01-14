export interface SalaCine {
  idSalaCine?: number;
  nombre?: string;
  estado?: number;
}

export interface ApiResponse {
    status: string;
    message: string;
    data: SalaCine[];
}
export interface ApiRequestBody {
  body: {
    idSalaCine?:number;
    nombre: string;
    estado: number;
  };
}
