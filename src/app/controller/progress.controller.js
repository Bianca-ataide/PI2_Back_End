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
exports.ProgressController = void 0;
const validation_exception_1 = require("../exception/validation.exception");
const handleZodIssues_1 = require("../helper/handleZodIssues");
const progress_schemas_1 = require("../schemas/progress.schemas");
const progress_service_1 = __importDefault(require("../service/progress.service"));
class ProgressController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const progressService = new progress_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = progress_schemas_1.ProgressCreateRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const progress = yield progressService.register(data);
                res.status(200).send({
                    message: "✅ - Success - " + progress.id + " added to Progresso",
                    data: progress,
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
            const progressService = new progress_service_1.default();
            const result = progress_schemas_1.ProgressSearchRequestSchema.safeParse(req.query);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const progress = yield progressService.search(data);
                res.status(200).send({ data: progress });
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
            const progressService = new progress_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = progress_schemas_1.ProgressUpdateRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const progress = yield progressService.update(data);
                res.status(200).send({
                    message: "✅ - Success - " + progress.id + " updated",
                    data: progress,
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
            const progressService = new progress_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = progress_schemas_1.ProgressRemoveRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const progress = yield progressService.remove(data.id);
                res.status(200).send({
                    message: "🗑️ - Remotion Completed - " + progress.id + " deleted.",
                    data: progress,
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
exports.ProgressController = ProgressController;
