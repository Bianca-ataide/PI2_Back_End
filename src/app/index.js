"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./route/user.route");
const alternative_route_1 = require("./route/alternative.route");
const question_route_1 = require("./route/question.route");
const quiz_route_1 = require("./route/quiz.route");
const section_route_1 = require("./route/section.route");
const course_route_1 = require("./route/course.route");
const progress_route_1 = require("./route/progress.route");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.middleware();
        this.route();
    }
    middleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use((0, cors_1.default)());
    }
    route() {
        this.app.use("/user", user_route_1.userRouter);
        this.app.use("/alternative", alternative_route_1.alternativeRouter);
        this.app.use("/question", question_route_1.questionRouter);
        this.app.use("/quiz", quiz_route_1.quizRouter);
        this.app.use("/section", section_route_1.sectionRouter);
        this.app.use("/course", course_route_1.courseRouter);
        this.app.use("/progress", progress_route_1.progressRouter);
    }
}
exports.default = new App().app;
