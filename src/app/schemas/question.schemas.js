"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRemoveRequestSchema = exports.QuestionUpdateRequestSchema = exports.QuestionSearchRequestSchema = exports.QuestionCreateRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.QuestionCreateRequestSchema = zod_1.default.object({
    question: zod_1.default
        .string({ required_error: "Field question must compose request body." })
        .min(1, { message: "Field question must not be empty." }),
    quizIDs: zod_1.default
        .string({ required_error: "Field quizIDs must compose request body." })
        .min(1, { message: "Field quizIDs must not be empty." })
        .array(),
    answerId: zod_1.default
        .string({ required_error: "Field answerId must compose request body." })
        .min(1, { message: "Field answerId must not be empty." }),
});
exports.QuestionSearchRequestSchema = zod_1.default.object({
    question: zod_1.default
        .string()
        .optional(),
    quizIDs: zod_1.default
        .string()
        .optional(),
    answerId: zod_1.default
        .string()
        .optional(),
});
exports.QuestionUpdateRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
    question: zod_1.default
        .string({ required_error: "Field question must compose request body." })
        .min(1, { message: "Field question must not be empty." }),
    quizIDs: zod_1.default
        .string()
        .array()
        .optional(),
    answerId: zod_1.default
        .string()
        .optional()
});
exports.QuestionRemoveRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});
