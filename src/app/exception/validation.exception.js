"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionError = void 0;
class ValidationExceptionError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.ValidationExceptionError = ValidationExceptionError;
