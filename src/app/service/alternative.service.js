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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_1 = require("../database/prisma");
const validation_exception_1 = require("../exception/validation.exception");
class AlternativeService {
    register(alternative) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestRef = alternative;
                const result = yield prisma_1.prisma.alternative.create({
                    data: Object.assign({}, requestRef),
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2002")
                        throw new validation_exception_1.ValidationExceptionError(400, "Bad Request: " + alternative.text + " - Já Cadastrado");
                }
                throw err;
            }
        });
    }
    search(alternative) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = alternative;
            try {
                const alternatives = yield prisma_1.prisma.alternative.findMany({
                    where: {
                        text: { contains: requestRef.text },
                        questionId: { contains: requestRef.questionId },
                    },
                });
                return {
                    alternatives,
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
    update(alternative) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = alternative;
            try {
                const result = yield prisma_1.prisma.alternative.update({
                    where: {
                        id: requestRef.id,
                        text: requestRef.text,
                        questionId: requestRef.questionId,
                    },
                    data: Object.assign({}, requestRef),
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2025")
                        throw new validation_exception_1.ValidationExceptionError(404, requestRef.id + " - Alternative not found");
                }
                throw err;
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = { id: id };
            try {
                const result = yield prisma_1.prisma.alternative.delete({
                    where: {
                        id: requestRef.id,
                    },
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2025")
                        throw new validation_exception_1.ValidationExceptionError(404, requestRef.id + " - Alternative not found");
                }
                throw err;
            }
        });
    }
}
exports.default = AlternativeService;
