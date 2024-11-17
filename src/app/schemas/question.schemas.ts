import Zod from "zod";

export const QuestionCreateRequestSchema = Zod.object({
    question: Zod
        .string({ required_error: "Field question must compose request body." })
        .min(1, { message: "Field question must not be empty." }),
    alternatives: Zod
        .string()
        .min(1, { message: "Alternative must not be empty." })
        .array()
        .length(4, {message: "Field alternative must contain a array of 4 strings."}),
    answerText: Zod
        .string({ required_error: "Field answerText must compose request body." })
        .min(1, { message: "Field answerText must not be empty." })
});


export const QuestionSearchRequestSchema = Zod.object({
    question: Zod
        .string()
        .optional()
});

export const QuestionUpdateRequestSchema = Zod.object({
    question: Zod
        .string({ required_error: "Field question must compose request body." })
        .min(1, { message: "Field question must not be empty." }),
    alternatives: Zod
        .string()
        .min(1, { message: "Alternative must not be empty." })
        .array()
        .length(4, {message: "Field alternative must contain a array of 4 strings."})
        .optional(),
    answerText: Zod
        .string({ required_error: "Field answerText must compose request body." })
        .optional()

});

export const QuestionRemoveRequestSchema = Zod.object({
    question: Zod
        .string({ required_error: "Field question must compose request body." })
        .min(1, { message: "Field question must not be empty." }),
});