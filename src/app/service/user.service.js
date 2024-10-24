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
class UserService {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestRef = user;
                const result = yield prisma_1.prisma.user.create({
                    data: Object.assign({}, requestRef),
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2002")
                        throw new validation_exception_1.ValidationExceptionError(400, "Bad Request: " + user.nickname + " - Já Cadastrado");
                }
                throw err;
            }
        });
    }
    search(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = user;
            try {
                const users = yield prisma_1.prisma.user.findMany({
                    where: {
                        nickname: { contains: requestRef.nickname },
                        username: { contains: requestRef.username },
                    },
                });
                return {
                    users,
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = user;
            try {
                const result = yield prisma_1.prisma.user.update({
                    where: {
                        username: requestRef.username,
                    },
                    data: Object.assign({}, requestRef),
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2025")
                        throw new validation_exception_1.ValidationExceptionError(404, requestRef.username + " - User not found");
                }
                throw err;
            }
        });
    }
    remove(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRef = { username: username };
            try {
                const result = yield prisma_1.prisma.user.delete({
                    where: {
                        username: requestRef.username,
                    },
                });
                return Object.assign({}, result);
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code == "P2025")
                        throw new validation_exception_1.ValidationExceptionError(404, requestRef.username + " - User not found");
                }
                throw err;
            }
        });
    }
}
exports.default = UserService;
