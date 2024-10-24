import { Router } from "express";
import { QuizController } from "../controller/quiz.controller";

const quizRouter = Router();

const quizController = new QuizController();

quizRouter.post("/", quizController.register);
quizRouter.get("/", quizController.search);
quizRouter.put("/", quizController.update);
quizRouter.delete("/", quizController.remove);

export { quizRouter };

