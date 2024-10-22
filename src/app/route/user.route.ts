import { Router } from "express";
import { UserController } from "../controller/user.controller";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/", userController.register);
userRouter.get("/", userController.search);
userRouter.put("/", userController.update);
userRouter.delete("/", userController.remove);

export { userRouter };

