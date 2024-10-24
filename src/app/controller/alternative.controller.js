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
exports.AlternativeController = void 0;
const validation_exception_1 = require("../exception/validation.exception");
const handleZodIssues_1 = require("../helper/handleZodIssues");
const alternative_schemas_1 = require("../schemas/alternative.schemas");
const alternative_service_1 = __importDefault(require("../service/alternative.service"));
class AlternativeController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const alternativeService = new alternative_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = alternative_schemas_1.AlternativeCreateRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const alternative = yield alternativeService.register(data);
                res.status(200).send({
                    message: "✅ - Success - " + alternative.text + " added to Alternativas",
                    data: alternative,
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
            const alternativeService = new alternative_service_1.default();
            const result = alternative_schemas_1.AlternativeSearchRequestSchema.safeParse(req.query);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const alternative = yield alternativeService.search(data);
                res.status(200).send({ data: alternative });
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
            const alternativeService = new alternative_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = alternative_schemas_1.AlternativeUpdateRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const alternative = yield alternativeService.update(data);
                res.status(200).send({
                    message: "✅ - Success - " + alternative.text + " updated",
                    data: alternative,
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
            const alternativeService = new alternative_service_1.default();
            if (!req.body.data) {
                res.status(422).send({ error: "Missing some fields." });
                return;
            }
            const result = alternative_schemas_1.AlternativeRemoveRequestSchema.safeParse(req.body.data);
            if (!result.success) {
                res
                    .status(422)
                    .send({ errors: result.error.issues.map(handleZodIssues_1.handleZodIssues) });
                return;
            }
            try {
                const { data } = result;
                const alternative = yield alternativeService.remove(data.id);
                res.status(200).send({
                    message: "🗑️ - Remotion Completed - " + alternative.id + " deleted.",
                    data: alternative,
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
exports.AlternativeController = AlternativeController;
