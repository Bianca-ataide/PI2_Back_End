import Zod from "zod";

export const SectionCreateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    text: Zod
        .string({ required_error: "Field text must compose request body." })
        .min(1, { message: "Field text must not be empty." }),

    quizId: Zod
        .string({ required_error: "Field quizId must compose request body." })
        .optional(),
        //.min(1, { message: "Field quizId must not be empty." }),

    courseId: Zod
        .string({ required_error: "Field courseId must compose request body." })
    });

export const SectionSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .optional(),

    text: Zod
        .string()
        .optional(),

    quizId: Zod
        .string()
        .optional(),

    courseId: Zod
        .string()
        .optional(),
});

export const SectionUpdateRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
        
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    text: Zod
        .string()
        .optional(),

    quizId: Zod
        .string()
        .optional(),

    courseId: Zod
        .string()
        .optional(),
});

export const SectionRemoveRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});