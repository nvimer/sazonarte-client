/**
 * MENU API SERVICE
 *
 * Servicios relacionados con el menú del restaurante.
 * Endpoints base: /menus/*
 */

import { axiosClient } from "./axiosClient";
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
} from "@/types";

// ==================== CATEGORIES ====================

/**
 * GET /menus/categories
 *
 * Get list of all menu categories with pagination
 *
 * @param params - Params of pagination
 * @returns Paginated listed of Menu Categories
 */
export const getCategories = async (params?: PaginationParams) => {
  const { data } = await axiosClient.get<
    ApiResponse<PaginatedResponse<MenuCategory>>
  >("/menus/categories", { params });
  return data;
};

/**
 * GET /menus/categories/search
 *
 * Search a menu categories with filters
 *
 * @param params - Params of search and pagination
 * @returns Paginated filted listed of menu categories
 */
export const searchCategories = async (
  params: PaginationParams & CategorySearchParams,
) => {
  const { data } = await axiosClient.get<
    ApiResponse<PaginatedResponse<MenuCategory>>
  >("/menus/categories/search", { params });
  return data;
};

/**
 * GET /menus/categories/:id
 *
 * Get menu category by ID
 *
 * @param id - Menu Category ID
 * @returns Menu Category selected with Data
 */
export const getCategoryById = async (id: number) => {
  const { data } = await axiosClient.get<ApiResponse<MenuCategory>>(
    `/menus/categories/${id}`,
  );
  return data;
};

/**
 * POST /menus/categories
 *
 * Create a new Category of Menu
 *
 * @param categoryData - Datos de la nueva categoría
 * @returns Categoría creada
 */
export const createCategory = async (categoryData: CreateMenuCategoryInput) => {
  const { data } = await axiosClient.post<ApiResponse<MenuCategory>>(
    "/menus/categories",
    categoryData,
  );
  return data;
};

/**
 * PATCH /menus/categories/:id
 *
 * Update a existing menu category
 *
 * @param id - ID de la categoría
 * @param categoryData - Datos a actualizar
 * @returns Categoría actualizada
 */
export const updateCategory = async (
  id: number,
  categoryData: UpdateMenuCategoryInput,
) => {
  const { data } = await axiosClient.patch<ApiResponse<MenuCategory>>(
    `/menus/categories/${id}`,
    categoryData,
  );
  return data;
};

/**
 * DELETE /menus/categories/:id
 *
 * Delete a menu category (request is soft delete)
 *
 * @param id - ID de la categoría
 */
export const deleteCategory = async (id: number) => {
  const { data } = await axiosClient.delete<ApiResponse<null>>(
    `/menus/categories/${id}`,
  );
  return data;
};

/**
 * DELETE /menus/categories/bulk
 *
 * Delete multiple categories
 *
 * @param ids - Menu Categories array of IDs to delete
 */
export const bulkDeleteCategories = async (ids: number[]) => {
  const { data } = await axiosClient.delete<
    ApiResponse<{ deletedCount: number }>
  >("/menus/categories/bulk", { data: { ids } });
  return data;
};

// ==================== ITEMS ====================

/**
 * GET /menus/items
 *
 * Get paginated listed of menu items
 *
 * @param params - Params of pagination
 * @returns Paginated list of menu items
 */
export const getMenuItems = async (params?: PaginationParams) => {
  const { data } = await axiosClient.get<
    ApiResponse<PaginatedResponse<MenuItem>>
  >("/menus/items", { params });
  return data;
};

/**
 * GET /menus/items/:id
 *
 * Get a menu item by ID
 *
 * @param id - Menu Item ID
 * @returns Data of Menu Item
 */
export const getMenuItemById = async (id: number) => {
  const { data } = await axiosClient.get<ApiResponse<MenuItem>>(
    `/menus/items/${id}`,
  );
  return data;
};

/**
 * POST /menus/items
 *
 * Create a new menu item
 *
 * @param itemData - New Menu Item Data
 * @returns create Menu Item
 */
export const createMenuItem = async (itemData: CreateMenuItemInput) => {
  const { data } = await axiosClient.post<ApiResponse<MenuItem>>(
    "/menus/items",
    itemData,
  );
  return data;
};

/**
 * PATCH /menus/items/:id
 *
 * Update a exiting Menu Item
 *
 * @param id - Menu Item ID
 * @param itemData - Data to update
 * @returns Updated Menu Item
 */
export const updateMenuItem = async (
  id: number,
  itemData: UpdateMenuItemInput,
) => {
  const { data } = await axiosClient.patch<ApiResponse<MenuItem>>(
    `/menus/items/${id}`,
    itemData,
  );
  return data;
};

/**
 * DELETE /menus/items/:id
 *
 * Delete a Menu Item
 *
 * @param id - Menu Item ID
 */
export const deleteMenuItem = async (id: number) => {
  const { data } = await axiosClient.delete<ApiResponse<null>>(
    `/menus/items/${id}`,
  );
  return data;
};
