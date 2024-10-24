"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRemoveRequestSchema = exports.UserUpdateRequestSchema = exports.UserSearchRequestSchema = exports.UserCreateRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserCreateRequestSchema = zod_1.default.object({
    username: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    nickname: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    password: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    salt: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
});
exports.UserSearchRequestSchema = zod_1.default.object({
    username: zod_1.default
        .string()
        .optional(),
    nickname: zod_1.default
        .string()
        .optional()
});
exports.UserUpdateRequestSchema = zod_1.default.object({
    username: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    nickname: zod_1.default
        .string()
        .optional(),
    password: zod_1.default
        .string()
        .optional()
});
exports.UserRemoveRequestSchema = zod_1.default.object({
    username: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
});
