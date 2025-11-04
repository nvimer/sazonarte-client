/**
 * MENU API SERVICE
 *
 * Services related with menu of restaurant
 * Base Endpoint: /menu/*
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
 * GET /menu/categories
 *
 * Get list of all menu categories with pagination
 *
 * @param params - Params of pagination
 * @returns Paginated listed of Menu Categories
 */
export const getCategories = async (params?: PaginationParams) => {
  const { data } = await axiosClient.get<PaginatedResponse<MenuCategory>>(
    "/menu/categories",
    { params },
  );
  return data;
};

/**
 * GET /menu/categories/search
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
  >("/menu/categories/search", { params });
  return data;
};

/**
 * GET /menu/categories/:id
 *
 * Get menu category by ID
 *
 * @param id - Menu Category ID
 * @returns Menu Category selected with Data
 */
export const getCategoryById = async (id: number) => {
  const { data } = await axiosClient.get<ApiResponse<MenuCategory>>(
    `/menu/categories/${id}`,
  );
  return data;
};

/**
 * POST /menu/categories
 *
 * Create a new Category of Menu
 *
 * @param categoryData - Datos de la nueva categoría
 * @returns Categoría creada
 */
export const createCategory = async (categoryData: CreateMenuCategoryInput) => {
  const { data } = await axiosClient.post<ApiResponse<MenuCategory>>(
    "/menu/categories",
    categoryData,
  );
  return data;
};

/**
 * PATCH /menu/categories/:id
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
    `/menu/categories/${id}`,
    categoryData,
  );
  return data;
};

/**
 * DELETE /menu/categories/:id
 *
 * Delete a menu category (request is soft delete)
 *
 * @param id - ID de la categoría
 */
export const deleteCategory = async (id: number) => {
  const { data } = await axiosClient.delete<ApiResponse<null>>(
    `/menu/categories/${id}`,
  );
  return data;
};

/**
 * DELETE /menu/categories/bulk
 *
 * Delete multiple categories
 *
 * @param ids - Menu Categories array of IDs to delete
 */
export const bulkDeleteCategories = async (ids: number[]) => {
  const { data } = await axiosClient.delete<
    ApiResponse<{ deletedCount: number }>
  >("/menu/categories/bulk", { data: { ids } });
  return data;
};

// ==================== ITEMS ====================

/**
 * GET /menu/items
 *
 * Get paginated listed of menu items
 *
 * @param params - Params of pagination
 * @returns Paginated list of menu items
 */
export const getMenuItems = async (params?: PaginationParams) => {
  const { data } = await axiosClient.get<PaginatedResponse<MenuItem>>(
    "/menu/items",
    { params },
  );
  return data;
};

/**
 * GET /menu/items/:id
 *
 * Get a menu item by ID
 *
 * @param id - Menu Item ID
 * @returns Data of Menu Item
 */
export const getMenuItemById = async (id: number) => {
  const { data } = await axiosClient.get<ApiResponse<MenuItem>>(
    `/menu/items/${id}`,
  );
  return data;
};

/**
 * POST /menu/items
 *
 * Create a new menu item
 *
 * @param itemData - New Menu Item Data
 * @returns create Menu Item
 */
export const createMenuItem = async (itemData: CreateMenuItemInput) => {
  const { data } = await axiosClient.post<ApiResponse<MenuItem>>(
    "/menu/items",
    itemData,
  );
  return data;
};

/**
 * PATCH /menu/items/:id
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
    `/menu/items/${id}`,
    itemData,
  );
  return data;
};

/**
 * DELETE /menu/items/:id
 *
 * Delete a Menu Item
 *
 * @param id - Menu Item ID
 */
export const deleteMenuItem = async (id: number) => {
  const { data } = await axiosClient.delete<ApiResponse<null>>(
    `/menu/items/${id}`,
  );
  return data;
};
