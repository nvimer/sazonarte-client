/**
 * MENU API SERVICE
 * 
 * Servicios relacionados con el menú del restaurante.
 * Endpoints base: /menus/*
 */

import { axiosClient } from './axiosClient';
import type {
  MenuCategory,
  MenuItem,
  CreateMenuCategoryInput,
  UpdateMenuCategoryInput,
  CreateMenuItemInput,
  UpdateMenuItemInput,
  CategorySearchParams,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types';

// ==================== CATEGORÍAS ====================

/**
 * GET /menus/categories
 * 
 * Obtiene lista de categorías del menú con paginación
 * 
 * @param params - Parámetros de paginación
 * @returns Lista paginada de categorías
 */
export const getCategories = async (params?: PaginationParams) => {
  const { data } = await axiosClient.get<
    ApiResponse<PaginatedResponse<MenuCategory>>
  >('/menus/categories', { params });
  return data;
};

/**
 * GET /menus/categories/search
 * 
 * Busca categorías con filtros
 * 
 * @param params - Parámetros de búsqueda y paginación
 * @returns Lista filtrada de categorías
 */
export const searchCategories = async (
  params: PaginationParams & CategorySearchParams
) => {
  const { data } = await axiosClient.get<
    ApiResponse<PaginatedResponse<MenuCategory>>
  >('/menus/categories/search', { params });
  return data;
};

/**
 * GET /menus/categories/:id
 * 
 * Obtiene una categoría por su ID
 * 
 * @param id - ID de la categoría
 * @returns Datos de la categoría
 */
export const getCategoryById = async (id: number) => {
  const { data } = await axiosClient.get<ApiResponse<MenuCategory>>(
    `/menus/categories/${id}`
  );
  return data;
};

/**
 * POST /menus/categories
 * 
 * Crea una nueva categoría del menú
 * 
 * @param categoryData - Datos de la nueva categoría
 * @returns Categoría creada
 */
export const createCategory = async (
  categoryData: CreateMenuCategoryInput
) => {
  const { data } = await axiosClient.post<ApiResponse<MenuCategory>>(
    '/menus/categories',
    categoryData
  );
  return data;
};

/**
 * PATCH /menus/categories/:id
 * 
 * Actualiza una categoría existente
 * 
 * @param id - ID de la categoría
 * @param categoryData - Datos a actualizar
 * @returns Categoría actualizada
 */
export const updateCategory = async (
  id: number,
  categoryData: UpdateMenuCategoryInput
) => {
  const { data } = await axiosClient.patch<ApiResponse<MenuCategory>>(
    `/menus/categories/${id}`,
    categoryData
  );
  return data;
};

/**
 * DELETE /menus/categories/:id
 * 
 * Elimina una categoría (soft delete)
 * 
 * @param id - ID de la categoría
 */
export const deleteCategory = async (id: number) => {
  const { data } = await axiosClient.delete<ApiResponse<null>>(
    `/menus/categories/${id}`
  );
  return data;
};

/**
 * DELETE /menus/categories/bulk
 * 
 * Elimina múltiples categorías (soft delete)
 * 
 * @param ids - Array de IDs de categorías a eliminar
 */
export const bulkDeleteCategories = async (ids: number[]) => {
  const { data } = await axiosClient.delete<ApiResponse<{ deletedCount: number }>>(
    '/menus/categories/bulk',
    { data: { ids } }
  );
  return data;
};

// ==================== ITEMS ====================

/**
 * GET /menus/items
 * 
 * Obtiene lista de items del menú con paginación
 * 
 * @param params - Parámetros de paginación
 * @returns Lista paginada de items
 */
export const getMenuItems = async (params?: PaginationParams) => {
  const { data } = await axiosClient.get<
    ApiResponse<PaginatedResponse<MenuItem>>
  >('/menus/items', { params });
  return data;
};

/**
 * GET /menus/items/:id
 * 
 * Obtiene un item del menú por su ID
 * 
 * @param id - ID del item
 * @returns Datos del item
 */
export const getMenuItemById = async (id: number) => {
  const { data } = await axiosClient.get<ApiResponse<MenuItem>>(
    `/menus/items/${id}`
  );
  return data;
};

/**
 * POST /menus/items
 * 
 * Crea un nuevo item del menú
 * 
 * @param itemData - Datos del nuevo item
 * @returns Item creado
 */
export const createMenuItem = async (itemData: CreateMenuItemInput) => {
  const { data } = await axiosClient.post<ApiResponse<MenuItem>>(
    '/menus/items',
    itemData
  );
  return data;
};

/**
 * PATCH /menus/items/:id
 * 
 * Actualiza un item del menú existente
 * 
 * @param id - ID del item
 * @param itemData - Datos a actualizar
 * @returns Item actualizado
 */
export const updateMenuItem = async (
  id: number,
  itemData: UpdateMenuItemInput
) => {
  const { data } = await axiosClient.patch<ApiResponse<MenuItem>>(
    `/menus/items/${id}`,
    itemData
  );
  return data;
};

/**
 * DELETE /menus/items/:id
 * 
 * Elimina un item del menú (soft delete)
 * 
 * @param id - ID del item
 */
export const deleteMenuItem = async (id: number) => {
  const { data } = await axiosClient.delete<ApiResponse<null>>(
    `/menus/items/${id}`
  );
  return data;
};
