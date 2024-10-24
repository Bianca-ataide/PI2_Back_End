import Zod from "zod";

export const CourseCreateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    });

export const CourseSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .optional(),

});

export const CourseUpdateRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),

    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

});

export const CourseRemoveRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});