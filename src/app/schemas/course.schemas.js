"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRemoveRequestSchema = exports.CourseUpdateRequestSchema = exports.CourseSearchRequestSchema = exports.CourseCreateRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CourseCreateRequestSchema = zod_1.default.object({
    name: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
});
exports.CourseSearchRequestSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .optional(),
});
exports.CourseUpdateRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
    name: zod_1.default
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),
});
exports.CourseRemoveRequestSchema = zod_1.default.object({
    id: zod_1.default
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." }),
});
