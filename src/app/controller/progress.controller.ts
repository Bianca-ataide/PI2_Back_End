import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import { handleZodIssues } from "../helper/handleZodIssues";
import {
  ProgressCreateRequestSchema,
  ProgressRemoveRequestSchema,
  ProgressSearchRequestSchema,
  ProgressUpdateRequestSchema,
} from "../schemas/progress.schemas";
import ProgressService from "../service/progress.service";

export class ProgressController {
  public async register(req: Request, res: Response) {
    const progressService = new ProgressService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = ProgressCreateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const progress = await progressService.register(data);

      res.status(200).send({
        message: "✅ - Success - " + progress.id + " added to Progresso",
        data: progress,
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
    const progressService = new ProgressService();

    const result = ProgressSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const progress = await progressService.search(data);

      res.status(200).send({ data: progress });
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
    const progressService = new ProgressService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = ProgressUpdateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const progress = await progressService.update(data);

      res.status(200).send({
        message: "✅ - Success - " + progress.id + " updated",
        data: progress,
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
    const progressService = new ProgressService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = ProgressRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const progress = await progressService.remove(data.id);

      res.status(200).send({
        message: "🗑️ - Remotion Completed - " + progress.id + " deleted.",
        data: progress,
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
