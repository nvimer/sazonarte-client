export interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  order: number;
  items?: MenuItem[];
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt?: string;
}

export interface CreateMenuCategoryInput {
  name: string;
  description?: string;
  order: number;
}

export interface UpdateMenuCategoryInput {
  name?: string;
  description?: string;
  order?: number;
}

export interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  description?: string;
  price: string;
  isExtra: boolean;
  isAvailable: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt?: string;
}

export interface CreateMenuItemInput {
  categoryId: number;
  name: string;
  description?: string;
  price: string;
  isAvailable?: boolean;
  isExtra?: boolean;
  imageUrl?: string;
}

export interface UpdateMenuItemInput {
  categoryId?: number;
  name?: string;
  description?: string;
  price?: string;
  isAvailable?: boolean;
  isExtra?: boolean;
  imageUrl?: string;
}
