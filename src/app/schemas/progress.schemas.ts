import Zod from "zod";

export const ProgressCreateRequestSchema = Zod.object({
    username: Zod
        .string()
        .min(1, {message: "Field username must not be empty"}),

    section: Zod
        .string()
        .min(1, {message: "Field section must not be empty"}),

    completed: Zod
        .boolean()
    });

export const ProgressSearchRequestSchema = Zod.object({
    username: Zod
        .string()
        .optional(),

    section: Zod
        .string()
        .optional(),

    completed: Zod
        .boolean()
        .optional()
});

export const ProgressUpdateRequestSchema = Zod.object({
    username: Zod
        .string()
        .optional(),

    section: Zod
        .string()
        .optional(),

    completed: Zod
        .boolean()
        .optional()
});

export const ProgressRemoveRequestSchema = Zod.object({
    username: Zod
        .string()
        .min(1, {message: "Field username must not be empty"}),

    section: Zod
        .string()
        .min(1, {message: "Field section must not be empty"})
});