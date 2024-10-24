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
exports.QuestionController = void 0;
const validation_exception_1 = require("../exception/validation.exception");
const handleZodIssues_1 = require("../helper/handleZodIssues");
const question_schemas_1 = require("../schemas/question.schemas");
const question_service_1 = __importDefault(require("../service/question.service"));
class QuestionController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const questionService = new question_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = question_schemas_1.QuestionCreateRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const question = yield questionService.register(data);
                res.status(200).send({
                    message: "✅ - Success - " + question.question + " added to Questões",
                    data: question,
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
            const questionService = new question_service_1.default();
            const result = question_schemas_1.QuestionSearchRequestSchema.safeParse(req.query);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const question = yield questionService.search(data);
                res.status(200).send({ data: question });
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
            const questionService = new question_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = question_schemas_1.QuestionUpdateRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const question = yield questionService.update(data);
                res.status(200).send({
                    message: "✅ - Success - " + question.question + " updated",
                    data: question,
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
            const questionService = new question_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = question_schemas_1.QuestionRemoveRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const question = yield questionService.remove(data.id);
                res.status(200).send({
                    message: "🗑️ - Remotion Completed - " + question.question + " deleted.",
                    data: question,
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
exports.QuestionController = QuestionController;
