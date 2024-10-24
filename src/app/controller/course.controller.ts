import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import { handleZodIssues } from "../helper/handleZodIssues";
import {
  CourseCreateRequestSchema,
  CourseRemoveRequestSchema,
  CourseSearchRequestSchema,
  CourseUpdateRequestSchema,
} from "../schemas/course.schemas";
import CourseService from "../service/course.service";

export class CourseController {
  public async register(req: Request, res: Response) {
    const courseService = new CourseService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = CourseCreateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const course = await courseService.register(data);

      res.status(200).send({
        message: "✅ - Success - " + course.name + " added to Cursos",
        data: course,
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
    const courseService = new CourseService();

    const result = CourseSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const course = await courseService.search(data);

      res.status(200).send({ data: course });
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
    const courseService = new CourseService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = CourseUpdateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const course = await courseService.update(data);

      res.status(200).send({
        message: "✅ - Success - " + course.name + " updated",
        data: course,
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
    const courseService = new CourseService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = CourseRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res
        .status(422)
        .send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const course = await courseService.remove(data.id);

      res.status(200).send({
        message: "🗑️ - Remotion Completed - " + course.name + " deleted.",
        data: course,
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
