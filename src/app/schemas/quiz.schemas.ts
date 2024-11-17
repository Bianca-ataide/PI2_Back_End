import Zod from "zod";

export const QuizCreateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    questions: Zod
        .string()
        .min(1, { message: "Questions must not be empty." })
        .array()
        .length(4, {message: "Field questions must contain a array of 4 strings."}),
});


export const QuizSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .optional()
});

export const QuizUpdateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    questions: Zod
        .string()
        .min(1, { message: "Questions must not be empty." })
        .array()
        .length(4, {message: "Field questions must contain a array of 4 strings."}),
});

export const QuizRemoveRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
});