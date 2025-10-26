/**
 * TABLES API SERVICE
 *
 * Servicios relacionados con mesas del restaurante.
 * Endpoints base: /tables/*
 */

import { axiosClient } from "./axiosClient";
import type {
  Table,
  CreateTableInput,
  UpdateTableInput,
  UpdateTableStatusInput,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "@/types";

/**
 * GET /tables
 *
 * Obtiene lista de mesas con paginación
 *
 * @param params - Parámetros de paginación
 * @returns Lista paginada de mesas
 */
export const getTables = async (params?: PaginationParams) => {
  const { data } = await axiosClient.get<PaginatedResponse<Table>>("/tables", {
    params,
  });
  return data;
};

/**
 * GET /tables/:id
 *
 * Obtiene una mesa por su ID
 *
 * @param id - ID de la mesa
 * @returns Datos de la mesa
 */
export const getTableById = async (id: number) => {
  const { data } = await axiosClient.get<ApiResponse<Table>>(`/tables/${id}`);
  return data;
};

/**
 * POST /tables
 *
 * Crea una nueva mesa
 *
 * @param tableData - Datos de la nueva mesa
 * @returns Mesa creada
 */
export const createTable = async (tableData: CreateTableInput) => {
  const { data } = await axiosClient.post<ApiResponse<Table>>(
    "/tables",
    tableData,
  );
  return data;
};

/**
 * PUT /tables/:id
 *
 * Actualiza una mesa existente
 *
 * @param id - ID de la mesa
 * @param tableData - Datos a actualizar
 * @returns Mesa actualizada
 */
export const updateTable = async (id: number, tableData: UpdateTableInput) => {
  const { data } = await axiosClient.patch<ApiResponse<Table>>(
    `/tables/${id}`,
    tableData,
  );
  return data;
};

/**
 * DELETE /tables/:id
 *
 * Elimina una mesa (soft delete)
 *
 * @param id - ID de la mesa
 */
export const deleteTable = async (id: number) => {
  const { data } = await axiosClient.delete<ApiResponse<null>>(`/tables/${id}`);
  return data;
};

/**
 * PATCH /tables/:id/status
 *
 * Actualiza solo el estado de una mesa
 *
 * @param id - ID de la mesa
 * @param statusData - Nuevo estado
 * @returns Mesa actualizada
 */
export const updateTableStatus = async (
  id: number,
  statusData: UpdateTableStatusInput,
) => {
  const { data } = await axiosClient.patch<ApiResponse<Table>>(
    `/tables/${id}/status`,
    statusData,
  );
  return data;
};
