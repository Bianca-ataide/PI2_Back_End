import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import { handleZodIssues } from "../helper/handleZodIssues";
import {
  QuizCreateRequestSchema,
  QuizRemoveRequestSchema,
  QuizSearchRequestSchema,
  QuizUpdateRequestSchema,
} from "../schemas/quiz.schemas";
import QuizService from "../service/quiz.service";

export class QuizController {
  public async register(req: Request, res: Response) {
    const quizService = new QuizService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = QuizCreateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const quiz = await quizService.register(data);

      res.status(200).send({
        message: "✅ - Success - " + quiz.id + " added to Quiz",
        data: quiz,
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
    const quizService = new QuizService();

    const result = QuizSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const quiz = await quizService.search(data);

      res.status(200).send({ data: quiz });
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
    const quizService = new QuizService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = QuizUpdateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const quiz = await quizService.update(data);

      res.status(200).send({
        message: "✅ - Success - " + quiz.id + " updated",
        data: quiz,
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
    const quizService = new QuizService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = QuizRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const quiz = await quizService.remove(data.id);

      res.status(200).send({
        message: "🗑️ - Remotion Completed - " + quiz.id + " deleted.",
        data: quiz,
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
