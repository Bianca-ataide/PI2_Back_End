import { Router } from "express";
import { AlternativeController } from "../controller/alternative.controller";

const alternativeRouter = Router();

const alternativeController = new AlternativeController();

alternativeRouter.post("/", alternativeController.register);
alternativeRouter.get("/", alternativeController.search);
alternativeRouter.put("/", alternativeController.update);
alternativeRouter.delete("/", alternativeController.remove);

export { alternativeRouter };

