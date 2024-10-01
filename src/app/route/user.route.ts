import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authReq } from "../middleware";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/", authReq(['admin']), userController.register);
userRouter.get("/", userController.search);
userRouter.put("/", authReq(['admin']), userController.update);
userRouter.delete("/", authReq(['admin']), userController.remove);

export { userRouter };

