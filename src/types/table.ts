/**
 * TIPOS DE MESA
 * Basados en el modelo Table de Prisma
 */

import { TableStatus } from './enums';

/**
 * Mesa
 * Sincronizado con: model Table en Prisma
 */
export interface Table {
  id: number;
  number: string; // Número de mesa (ej: "1", "A1", "VIP-1")
  status: TableStatus;
  location?: string; // Ubicación (ej: "Terraza", "Salón principal")
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt?: string;
}

/**
 * Datos para crear una mesa
 * Usado en POST /tables
 */
export interface CreateTableInput {
  number: string;
  status?: TableStatus; // Opcional, default AVAILABLE
  location?: string;
}

/**
 * Datos para actualizar una mesa
 * Usado en PUT /tables/:id
 */
export interface UpdateTableInput {
  number?: string;
  status?: TableStatus;
  location?: string;
}

/**
 * Datos para actualizar solo el estado de una mesa
 * Usado en PATCH /tables/:id/status
 */
export interface UpdateTableStatusInput {
  status: TableStatus;
}
