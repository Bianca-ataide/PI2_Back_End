import Zod from "zod";

export const QuizCreateRequestSchema = Zod.object({
    questionsIDs: Zod
        .string({ required_error: "Field questionsIDs must compose request body." })
        //.min(1, { message: "Field questionsIDs must not be empty." })
        .array()
        .optional(),

    sectionId: Zod
        .string({ required_error: "Field sectionId must compose request body." })
        .min(1, { message: "Field sectionId must not be empty." }),

    });

export const QuizSearchRequestSchema = Zod.object({
    questionsIDs: Zod
        .string()
        .optional(),

    sectionId: Zod
        .string()
        .optional()
});

export const QuizUpdateRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),

    questionsIDs: Zod
        .string({ required_error: "Field questionsIDs must compose request body." })
        .min(1, { message: "Field questionsIDs must not be empty." }),

    sectionId: Zod
        .string()
        .optional(),

});

export const QuizRemoveRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});