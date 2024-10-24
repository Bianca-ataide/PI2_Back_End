"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authReq = void 0;
const authReq = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (!permissions.includes(userRole))
            return res.status(401).send({ error: "Unauthorized Access" });
        next();
    };
};
exports.authReq = authReq;
