"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRemoveRequestSchema = exports.QuizUpdateRequestSchema = exports.QuizSearchRequestSchema = exports.QuizCreateRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.QuizCreateRequestSchema = zod_1.default.object({
    questionsIDs: zod_1.default
        .string({ required_error: "Field questionsIDs must compose request body." })
        .min(1, { message: "Field questionsIDs must not be empty." })
        .array(),
    sectionId: zod_1.default
        .string({ required_error: "Field sectionId must compose request body." })
        .min(1, { message: "Field sectionId must not be empty." }),
});
exports.QuizSearchRequestSchema = zod_1.default.object({
    questionsIDs: zod_1.default
        .string()
        .optional(),
    sectionId: zod_1.default
        .string()
        .optional()
});
exports.QuizUpdateRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
    questionsIDs: zod_1.default
        .string({ required_error: "Field questionsIDs must compose request body." })
        .min(1, { message: "Field questionsIDs must not be empty." }),
    sectionId: zod_1.default
        .string()
        .optional(),
});
exports.QuizRemoveRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});
