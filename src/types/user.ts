/**
 * TIPOS DE USUARIO
 * Basados en el modelo User de Prisma
 */

import { RoleName } from './enums';

/**
 * Perfil de usuario
 * Sincronizado con: model Profile en Prisma
 */
export interface Profile {
  id: string;
  userId: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt?: string;
}

/**
 * Rol con información básica
 * Sincronizado con: model Role en Prisma
 */
export interface Role {
  id: number;
  name: RoleName;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt?: string;
}

/**
 * Permiso
 * Sincronizado con: model Permission en Prisma
 */
export interface Permission {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt?: string;
}

/**
 * Usuario completo
 * Sincronizado con: model User en Prisma
 * 
 * NOTA: El password NUNCA debe venir del backend en las respuestas.
 * El backend debe excluirlo siempre.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  // password: string; ← NUNCA incluir esto
  profile?: Profile;
  roles?: Role[]; // Opcional, depende del endpoint
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt?: string;
}

/**
 * Usuario con roles y permisos (respuesta de /users/:id/roles-permissions)
 */
export interface UserWithRolesAndPermissions extends User {
  roles: (Role & {
    permissions: Permission[];
  })[];
}

/**
 * Datos para registro de usuario
 * Usado en POST /auth/register
 */
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  roleIds?: number[]; // IDs de roles a asignar
}

/**
 * Datos para login
 * Usado en POST /auth/login
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Respuesta del login
 * Lo que devuelve POST /auth/login (estructura real de tu API)
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}

/**
 * Datos para actualizar usuario
 * Usado en PATCH /users/:id
 */
export interface UpdateUserInput {
  name?: string;
  email?: string;
  phone?: string;
  roleIds?: number[];
}
