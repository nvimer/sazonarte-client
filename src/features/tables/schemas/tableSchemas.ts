import { TableStatus } from "@/types";
import { z } from "zod";

export const createTableSchema = z.object({
    number: z.coerce
        .string({
            error: (iss) =>
                iss.input === undefined ? "Field is required." : "Invalid input.",
        })
        .min(1, "Minimum is 1")
        .max(999, "Maximum is 999"),

    location: z
        .string({
            error: (iss) =>
                iss.input === undefined ? "Field is required." : "Invalid input.",
        })
        .min(2, "Minimum 2 characters long")
        .max(100, "Maximum 100 characters long")
        .optional()
        .or(z.literal("")),
});

/**
 * Update Table Schema
 *
 * Same as create but all fields optional.
 */
export const updateTableSchema = createTableSchema.partial();

/**
 * Update Table Status Schema
 */
export const updateTableStatusSchema = z.object({
    status: z.enum(TableStatus, {
        error: (iss) =>
            iss.input === undefined ? "Status is required" : "Invalid status",
    }),
});

/**
 * TypeScript Types from Zod Schemas
 *
 * Extract TypeScript types from Zod Schemas
 */
export type CreateTableInput = z.infer<typeof createTableSchema>;
export type UpdateTableInput = z.infer<typeof updateTableSchema>;
export type UpdateTableStatusInput = z.infer<typeof updateTableStatusSchema>;
