import Zod from "zod";

export const ProgressCreateRequestSchema = Zod.object({
    userId: Zod
        .string({ required_error: "Field userId must compose request body." })
        .min(1, { message: "Field userId must not be empty." }),

    sectionId: Zod
        .string({ required_error: "Field sectionId must compose request body." })
        .min(1, { message: "Field sectionId must not be empty." }),

    courseId: Zod
        .string({ required_error: "Field courseId must compose request body." })
        .min(1, { message: "Field courseId must not be empty." }),

    completed: Zod
        .boolean({ required_error: "Field completed must compose request body." }),
    });

export const ProgressSearchRequestSchema = Zod.object({
    userId: Zod
        .string()
        .optional(),

    sectionId: Zod
        .string()
        .optional(),

    courseId: Zod
        .string()
        .optional(),

    completed: Zod
        .boolean()
        .optional()
    
});

export const ProgressUpdateRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),

    courseId: Zod
        .string({ required_error: "Field courseId must compose request body." })
        .min(1, { message: "Field courseId must not be empty." }),

    sectionId: Zod
        .string()
        .optional(),

    completed: Zod
        .boolean()
        .optional()
});

export const ProgressRemoveRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});