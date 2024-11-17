import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import {
  CourseCreateRequestSchema,
  CourseSearchRequestSchema,
  CourseUpdateRequestSchema,
} from "../schemas/course.schemas";

export default class CourseService {
  public async register(course: Zod.infer<typeof CourseCreateRequestSchema>) {
    try {
      const requestRef = course;

      const result = await prisma.course.create({
        data: {
          ...requestRef,
        },
      });

      return {
        ...result,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code == "P2002")
          throw new ValidationExceptionError(
            400,
            "Bad Request: " + course.name + " - Já Cadastrado"
          );
      }

      throw err;
    }
  }

  public async search(course: Zod.infer<typeof CourseSearchRequestSchema>) {
    const requestRef = course;

    try {
      const courses = await prisma.course.findMany({
        where: {
          name: { contains: requestRef.name }
        },
      });

      return {
        courses,
      };
    } catch (err) {
      throw err;
    }
  }

  public async update(course: Zod.infer<typeof CourseUpdateRequestSchema>) {
    const requestRef = course;

    try {
      const result = await prisma.course.update({
        where: {
          name: requestRef.name,
        },
        data: {
          ...requestRef,
        },
      });

      return {
        ...result,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code == "P2025")
          throw new ValidationExceptionError(
            404,
            requestRef.name + " - Course not found"
          );
      }

      throw err;
    }
  }

  public async remove(id: string) {
    const requestRef = { id: id };

    try {
      const result = await prisma.course.delete({
        where: {
          id: requestRef.id
        },
      });

      return {
        ...result,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code == "P2025")
          throw new ValidationExceptionError(
            404,
            requestRef.id + " - Course not found"
          );
      }

      throw err;
    }
  }
}
