import { Router } from "express";
import { ProgressController } from "../controller/progress.controller";

const progressRouter = Router();

const progressController = new ProgressController();

progressRouter.post("/", progressController.register);
progressRouter.get("/", progressController.search);
progressRouter.put("/", progressController.update);
progressRouter.delete("/", progressController.remove);

export { progressRouter };

