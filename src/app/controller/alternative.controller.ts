import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import { handleZodIssues } from "../helper/handleZodIssues";
import {
  AlternativeCreateRequestSchema,
  AlternativeRemoveRequestSchema,
  AlternativeSearchRequestSchema,
  AlternativeUpdateRequestSchema,
} from "../schemas/alternative.schemas";
import AlternativeService from "../service/alternative.service";

export class AlternativeController {
  public async register(req: Request, res: Response) {
    const alternativeService = new AlternativeService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = AlternativeCreateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const alternative = await alternativeService.register(data);

      res.status(200).send({
        message: "✅ - Success - " + alternative.text + " added to Alternativas",
        data: alternative,
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
    const alternativeService = new AlternativeService();

    const result = AlternativeSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const alternative = await alternativeService.search(data);

      res.status(200).send({ data: alternative });
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
    const alternativeService = new AlternativeService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = AlternativeUpdateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const alternative = await alternativeService.update(data);

      res.status(200).send({
        message: "✅ - Success - " + alternative.text + " updated",
        data: alternative,
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
    const alternativeService = new AlternativeService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = AlternativeRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const alternative = await alternativeService.remove(data.id);

      res.status(200).send({
        message: "🗑️ - Remotion Completed - " + alternative.id + " deleted.",
        data: alternative,
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
