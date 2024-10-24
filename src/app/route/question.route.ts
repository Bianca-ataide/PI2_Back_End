import { Router } from "express";
import { QuestionController } from "../controller/question.controller";

const questionRouter = Router();

const questionController = new QuestionController();

questionRouter.post("/", questionController.register);
questionRouter.get("/", questionController.search);
questionRouter.put("/", questionController.update);
questionRouter.delete("/", questionController.remove);

export { questionRouter };

