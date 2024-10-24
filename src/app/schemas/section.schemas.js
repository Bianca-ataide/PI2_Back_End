"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionRemoveRequestSchema = exports.SectionUpdateRequestSchema = exports.SectionSearchRequestSchema = exports.SectionCreateRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SectionCreateRequestSchema = zod_1.default.object({
    name: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    text: zod_1.default
        .string({ required_error: "Field text must compose request body." })
        .min(1, { message: "Field text must not be empty." }),
    quizId: zod_1.default
        .string({ required_error: "Field quizId must compose request body." })
        .min(1, { message: "Field quizId must not be empty." }),
    courseId: zod_1.default
        .string({ required_error: "Field courseId must compose request body." })
});
exports.SectionSearchRequestSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .optional(),
    text: zod_1.default
        .string()
        .optional(),
    quizId: zod_1.default
        .string()
        .optional(),
    courseId: zod_1.default
        .string()
        .optional(),
});
exports.SectionUpdateRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
    name: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
    text: zod_1.default
        .string()
        .optional(),
    quizId: zod_1.default
        .string()
        .optional(),
    courseId: zod_1.default
        .string()
        .optional(),
});
exports.SectionRemoveRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});
