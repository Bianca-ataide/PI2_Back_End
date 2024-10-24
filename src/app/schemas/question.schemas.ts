import Zod from "zod";

export const QuestionCreateRequestSchema = Zod.object({
    question: Zod
        .string({ required_error: "Field question must compose request body." })
        .min(1, { message: "Field question must not be empty." }),

    quizIDs: Zod
        .string({ required_error: "Field quizIDs must compose request body." })
        .min(1, { message: "Field quizIDs must not be empty." })
        .array(),

    answerId: Zod
        .string({ required_error: "Field answerId must compose request body." })
        .min(1, { message: "Field answerId must not be empty." }),

    });

export const QuestionSearchRequestSchema = Zod.object({
    question: Zod
        .string()
        .optional(),

    quizIDs: Zod
        .string()
        .optional(),

    answerId: Zod
        .string()
        .optional(),
});

export const QuestionUpdateRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),

    question: Zod
        .string({ required_error: "Field question must compose request body." })
        .min(1, { message: "Field question must not be empty." }),

    quizIDs: Zod
        .string()
        .array()
        .optional(),

    answerId: Zod
        .string()
        .optional()
});

export const QuestionRemoveRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});