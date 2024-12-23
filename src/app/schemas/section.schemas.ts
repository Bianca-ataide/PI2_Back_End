import Zod from "zod";

export const SectionCreateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    text: Zod
        .string()
        .min(1, { message: "Field text must not be empty." }),

    quiz: Zod
        .string()
        .min(1, { message: "Field quiz must not be empty." }),
    });

export const SectionSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .optional(),

    text: Zod
        .string()
        .optional(),

    quiz: Zod
        .string()
        .optional(),
});

export const SectionUpdateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    quiz: Zod
        .string()
        .optional(),

    text: Zod
        .string()
        .optional(),
});

export const SectionRemoveRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
});