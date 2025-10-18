/**
 * API SERVICES - Exportación centralizada
 *
 * Importa todos los servicios de API desde un solo lugar:
 * import { authApi, tablesApi, menuApi } from '@/api'
 */

// Cliente Axios configurado
export { axiosClient } from "./axiosClient";

// Servicios API por módulo
export * as authApi from "./authApi";
export * as tablesApi from "./tablesApi";
export * as menuApi from "./menuApi";
export * as profileApi from "./profileApi";
