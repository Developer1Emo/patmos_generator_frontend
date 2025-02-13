import { UsuarioDTO } from "./usuario-dto";

export interface PaginacionRespuestaDTO {
  count: number;           // Total de usuarios en la base de datos
  next: string | null;     // URL para la siguiente página
  previous: string | null; // URL para la página anterior
  results: UsuarioDTO[];     // Array de usuarios de la página actual
}
