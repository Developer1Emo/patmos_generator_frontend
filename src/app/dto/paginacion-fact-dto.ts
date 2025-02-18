import { FacturaDTO } from "./factura-dto";

export interface PaginacionFactDTO {
     count: number;           // Total de usuarios en la base de datos
      next: string | null;     // URL para la siguiente página
      previous: string | null; // URL para la página anterior
      results: FacturaDTO[];     // Array de usuarios de la página actual
}
