"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const validation_exception_1 = require("../exception/validation.exception");
const handleZodIssues_1 = require("../helper/handleZodIssues");
const course_schemas_1 = require("../schemas/course.schemas");
const course_service_1 = __importDefault(require("../service/course.service"));
class CourseController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseService = new course_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = course_schemas_1.CourseCreateRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const course = yield courseService.register(data);
                res.status(200).send({
                    message: "✅ - Success - " + course.name + " added to Cursos",
                    data: course,
                });
            }
            catch (error) {
                if (error instanceof validation_exception_1.ValidationExceptionError) {
                    res.status(error.code).send({ error: error.message });
                    return;
                }
                throw error;
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseService = new course_service_1.default();
            const result = course_schemas_1.CourseSearchRequestSchema.safeParse(req.query);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const course = yield courseService.search(data);
                res.status(200).send({ data: course });
            }
            catch (error) {
                if (error instanceof validation_exception_1.ValidationExceptionError) {
                    res
                        .status(error.code)
                        .send({ error: error.message, data: result.data });
                    return;
                }
                throw error;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseService = new course_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = course_schemas_1.CourseUpdateRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const course = yield courseService.update(data);
                res.status(200).send({
                    message: "✅ - Success - " + course.name + " updated",
                    data: course,
                });
            }
            catch (error) {
                if (error instanceof validation_exception_1.ValidationExceptionError) {
                    res.status(error.code).send({ error: error.message });
                    return;
                }
                throw error;
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseService = new course_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = course_schemas_1.CourseRemoveRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const course = yield courseService.remove(data.id);
                res.status(200).send({
                    message: "🗑️ - Remotion Completed - " + course.name + " deleted.",
                    data: course,
                });
            }
            catch (error) {
                if (error instanceof validation_exception_1.ValidationExceptionError) {
                    res.status(error.code).send({ error: error.message });
                    return;
                }
                throw error;
            }
        });
    }
}
exports.CourseController = CourseController;
