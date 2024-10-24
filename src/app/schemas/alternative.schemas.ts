import Zod from "zod";

export const AlternativeCreateRequestSchema = Zod.object({
    text: Zod
        .string({ required_error: "Field text must compose request body." })
        .min(1, { message: "Field text must not be empty." }),

    questionId: Zod
        .string({ required_error: "Field questionId must compose request body." }),
    });

export const AlternativeSearchRequestSchema = Zod.object({
    text: Zod
        .string()
        .optional(),

    questionId: Zod
        .string()
        .optional()
});

export const AlternativeUpdateRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),

    text: Zod
        .string({ required_error: "Field text must compose request body." })
        .min(1, { message: "Field text must not be empty." }),

    questionId: Zod
        .string()
        .optional(),

});

export const AlternativeRemoveRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});