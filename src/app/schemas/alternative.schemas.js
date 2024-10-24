"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlternativeRemoveRequestSchema = exports.AlternativeUpdateRequestSchema = exports.AlternativeSearchRequestSchema = exports.AlternativeCreateRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AlternativeCreateRequestSchema = zod_1.default.object({
    text: zod_1.default
        .string({ required_error: "Field text must compose request body." })
        .min(1, { message: "Field text must not be empty." }),
    questionId: zod_1.default
        .string({ required_error: "Field questionId must compose request body." }),
});
exports.AlternativeSearchRequestSchema = zod_1.default.object({
    text: zod_1.default
        .string()
        .optional(),
    questionId: zod_1.default
        .string()
        .optional()
});
exports.AlternativeUpdateRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
    text: zod_1.default
        .string({ required_error: "Field text must compose request body." })
        .min(1, { message: "Field text must not be empty." }),
    questionId: zod_1.default
        .string()
        .optional(),
});
exports.AlternativeRemoveRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});
