import z from "zod";

/**
 * Create Category Schema
 *
 * Schema for validate data for create new Menu Category
 */
export const createCategorySchema = z.object({
    name: z
        .string({
            error: (iss) =>
                iss.input === undefined ? "Campo Obligatorio" : "Entrada Inválida",
        })
        .min(4, "Mínimo 4 caracteres de longitud.")
        .max(500, "Máximo 500 caracteres de longitud."),

    description: z
        .string()
        .min(4, "Mínimo 4 caracteres de longitud.")
        .max(500, "Máximo 500 caracteres de longitud.")
        .or(z.literal("")),

    order: z.number({
        error: (iss) =>
            iss.input === undefined ? "Campo Obligatorio" : "Entrada Inválida",
    }),
});

export const updateCategorySchema = createCategorySchema.partial();

// Extract Typescript types from schema
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
