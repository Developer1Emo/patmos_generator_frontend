import { RegistroDTO } from "./registro-dto";

export interface PaginacionRegistroDTO {
    count: number;           // Total de usuarios en la base de datos
      next: string | null;     // URL para la siguiente página
      previous: string | null; // URL para la página anterior
      results: RegistroDTO[];     // Array de usuarios de la página actual
}
