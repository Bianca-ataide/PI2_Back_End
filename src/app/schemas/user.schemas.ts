import Zod from "zod";

export const UserLoginRequestSchema = Zod.object({
    username: Zod
        .string({ required_error: "Field username must compose request body." })
        .min(1, { message: "Field username must not be empty." }),
    password: Zod
        .string({ required_error: "Field password must compose request body." })
        .min(1, { message: "Field password must not be empty." }),
    });

export const UserCreateRequestSchema = Zod.object({
    username: Zod
        .string({ required_error: "Field username must compose request body." })
        .min(1, { message: "Field username must not be empty." }),

    nickname: Zod
        .string({ required_error: "Field nickname must compose request body." })
        .min(1, { message: "Field nickname must not be empty." }),

    password: Zod
        .string({ required_error: "Field password must compose request body." })
        .min(1, { message: "Field password must not be empty." }),

    salt: Zod
        .string({ required_error: "Field salt must compose request body." })
        .min(1, { message: "Field salt must not be empty." }),
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
        .string({ required_error: "Field username must compose request body." })
        .min(1, { message: "Field username must not be empty." }),

    nickname: Zod
        .string()
        .optional(),

    password: Zod
        .string()
        .optional()
});

export const UserRemoveRequestSchema = Zod.object({
    username: Zod
        .string({ required_error: "Field username must compose request body." })
        .min(1, { message: "Field username must not be empty." }),
});