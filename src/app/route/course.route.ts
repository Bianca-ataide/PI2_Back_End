import { Router } from "express";
import { CourseController } from "../controller/course.controller";

const courseRouter = Router();

const courseController = new CourseController();

courseRouter.post("/", courseController.register);
courseRouter.get("/", courseController.search);
courseRouter.put("/", courseController.update);
courseRouter.delete("/", courseController.remove);

export { courseRouter };

