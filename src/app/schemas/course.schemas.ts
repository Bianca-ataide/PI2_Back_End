import Zod from "zod";

export const CourseCreateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    sections: Zod
        .string()
        .min(1, { message: "Sections must not be empty." })
        .array()
        .length(4, {message: "Field sections must contain a array of 4 strings."}),
});

export const CourseSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .optional(),
});

export const CourseUpdateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    sections: Zod
        .string()
        .min(1, { message: "Sections must not be empty." })
        .array()
        .length(4, {message: "Field sections must contain a array of 4 strings."})
        .optional(),
});

export const CourseRemoveRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
});