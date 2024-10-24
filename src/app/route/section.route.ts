import { Router } from "express";
import { SectionController } from "../controller/section.controller";

const sectionRouter = Router();

const sectionController = new SectionController();

sectionRouter.post("/", sectionController.register);
sectionRouter.get("/", sectionController.search);
sectionRouter.put("/", sectionController.update);
sectionRouter.delete("/", sectionController.remove);

export { sectionRouter };

