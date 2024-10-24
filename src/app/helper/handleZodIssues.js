"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodIssues = void 0;
const handleZodIssues = (issue) => {
    return ({
        code: issue.code,
        message: issue.message
    });
};
exports.handleZodIssues = handleZodIssues;
