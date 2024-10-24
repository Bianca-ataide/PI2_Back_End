"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressRemoveRequestSchema = exports.ProgressUpdateRequestSchema = exports.ProgressSearchRequestSchema = exports.ProgressCreateRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ProgressCreateRequestSchema = zod_1.default.object({
    userId: zod_1.default
        .string({ required_error: "Field userId must compose request body." })
        .min(1, { message: "Field userId must not be empty." }),
    sectionId: zod_1.default
        .string({ required_error: "Field sectionId must compose request body." })
        .min(1, { message: "Field sectionId must not be empty." }),
    courseId: zod_1.default
        .string({ required_error: "Field courseId must compose request body." })
        .min(1, { message: "Field courseId must not be empty." }),
    completed: zod_1.default
        .boolean({ required_error: "Field completed must compose request body." }),
});
exports.ProgressSearchRequestSchema = zod_1.default.object({
    userId: zod_1.default
        .string()
        .optional(),
    sectionId: zod_1.default
        .string()
        .optional(),
    courseId: zod_1.default
        .string()
        .optional(),
    completed: zod_1.default
        .boolean()
        .optional()
});
exports.ProgressUpdateRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
    courseId: zod_1.default
        .string({ required_error: "Field courseId must compose request body." })
        .min(1, { message: "Field courseId must not be empty." }),
    sectionId: zod_1.default
        .string()
        .optional(),
    completed: zod_1.default
        .boolean()
        .optional()
});
exports.ProgressRemoveRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});
