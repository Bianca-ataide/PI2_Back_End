import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { userRouter } from "./route/user.route";
import { alternativeRouter } from "./route/alternative.route";
import { questionRouter } from "./route/question.route";
import { quizRouter } from "./route/quiz.route";
import { sectionRouter } from "./route/section.route";
import { courseRouter } from "./route/course.route";
import { progressRouter } from "./route/progress.route";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.route();
  }

  middleware() {
    this.app.use(bodyParser.json());
    this.app.use(express.json({limit: '50mb'}));
    this.app.use(cors());
  }

  route() {
    this.app.use("/user", userRouter);
    this.app.use("/alternative", alternativeRouter);
    this.app.use("/question", questionRouter);
    this.app.use("/quiz", quizRouter);
    this.app.use("/section", sectionRouter);
    this.app.use("/course", courseRouter);
    this.app.use("/progress", progressRouter);
  }
}

export default new App().app;
