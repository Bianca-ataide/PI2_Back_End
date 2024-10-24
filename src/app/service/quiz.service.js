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
class QuizService {
    register(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestRef = quiz;
                const result = yield prisma_1.prisma.quiz.create({
                    data: Object.assign({}, requestRef),
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2002")
                        throw new validation_exception_1.ValidationExceptionError(400, "Bad Request: " + " - Já Cadastrado");
                }
                throw err;
            }
        });
    }
    search(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = quiz;
            try {
                const quizes = yield prisma_1.prisma.quiz.findMany({
                    where: {
                        sectionId: { contains: requestRef.sectionId },
                    },
                });
                return {
                    quizes,
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
    update(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = quiz;
            try {
                const result = yield prisma_1.prisma.quiz.update({
                    where: {
                        id: requestRef.id,
                    },
                    data: Object.assign({}, requestRef),
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2025")
                        throw new validation_exception_1.ValidationExceptionError(404, requestRef.id + " - Quiz not found");
                }
                throw err;
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = { id: id };
            try {
                const result = yield prisma_1.prisma.quiz.delete({
                    where: {
                        id: requestRef.id,
                    },
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2025")
                        throw new validation_exception_1.ValidationExceptionError(404, requestRef.id + " - Quiz not found");
                }
                throw err;
            }
        });
    }
}
exports.default = QuizService;
