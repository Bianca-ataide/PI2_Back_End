import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import { handleZodIssues } from "../helper/handleZodIssues";
import {
  UserCreateRequestSchema,
  UserLoginRequestSchema,
  UserRemoveRequestSchema,
  UserSearchRequestSchema,
  UserUpdateRequestSchema,
} from "../schemas/user.schemas";
import UserService from "../service/user.service";
import { generateSHA256 } from "../utils/generateSHA256";

export class UserController {
  public async login(req: Request, res: Response) {
    const userService = new UserService();

    const result = UserLoginRequestSchema.safeParse(req.query);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    const password = result.data.password;
    const salt = generateSHA256(result.data.username);
    const salted_password = generateSHA256(password + salt);
    
    result.data.password = salted_password;

    try {
      const { data } = result;

      const user = await userService.login(data);

      res.status(200).send({ data: user });
    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res
          .status(error.code)
          .send({ error: error.message, data: result.data });
        return;
      }

      throw error;
    }
  }

  public async register(req: Request, res: Response) {
    const userService = new UserService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    if (req.body.data.password && req.body.data.username) {
      const password = req.body.data.password;
      const salt = generateSHA256(req.body.data.username);
      const salted_password = generateSHA256(password + salt);
      
      req.body.data.salt = salt;
      req.body.data.password = salted_password;
    }

    const result = UserCreateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const user = await userService.register(data);

      res.status(200).send({
        message: "✅ - Success - " + user.username + " added to Usuários",
        data: user,
      });
    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  }

  public async search(req: Request, res: Response) {
    const userService = new UserService();

    const result = UserSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const user = await userService.search(data);

      res.status(200).send({ data: user });
    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res
          .status(error.code)
          .send({ error: error.message, data: result.data });
        return;
      }

      throw error;
    }
  }

  public async update(req: Request, res: Response) {
    const userService = new UserService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
        
    if (req.body.data.password && req.body.data.username) {
      const password = req.body.data.password;
      const salt = generateSHA256(req.body.data.username);
      const salted_password = generateSHA256(password + salt);
      
      req.body.data.password = salted_password;
    }

    const result = UserUpdateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const user = await userService.update(data);

      res.status(200).send({
        message: "✅ - Success - " + user.username + " updated",
        data: user,
      });
    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  }

  public async remove(req: Request, res: Response) {
    const userService = new UserService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = UserRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const user = await userService.remove(data.username);

      res.status(200).send({
        message: "🗑️ - Remotion Completed - " + user.username + " deleted.",
        data: user,
      });
    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  }
}
