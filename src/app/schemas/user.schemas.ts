import Zod from "zod";

export const UserCreateRequestSchema = Zod.object({
    username: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    nickname: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    password: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    salt: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    });

export const UserSearchRequestSchema = Zod.object({
    username: Zod
        .string()
        .optional(),

    nickname: Zod
        .string()
        .optional()
});

export const UserUpdateRequestSchema = Zod.object({
    username: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    nickname: Zod
        .string()
        .optional(),

    password: Zod
        .string()
        .optional()
});

export const UserRemoveRequestSchema = Zod.object({
    username: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
});