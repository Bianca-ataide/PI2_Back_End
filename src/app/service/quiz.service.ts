import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import {
  QuizCreateRequestSchema,
  QuizSearchRequestSchema,
  QuizUpdateRequestSchema,
} from "../schemas/quiz.schemas";

export default class QuizService {
  public async register(quiz: Zod.infer<typeof QuizCreateRequestSchema>) {
    try {
      const requestRef = quiz;

      const result = await prisma.quiz.create({
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
            "Bad Request: "  + " - Já Cadastrado"
          );
      }

      throw err;
    }
  }

  public async search(quiz: Zod.infer<typeof QuizSearchRequestSchema>) {
    const requestRef = quiz;

    try {
      const quizes = await prisma.quiz.findMany({
        where: {
          name: { contains: requestRef.name },
        },
      });

      return {
        quizes,
      };
    } catch (err) {
      throw err;
    }
  }

  public async update(quiz: Zod.infer<typeof QuizUpdateRequestSchema>) {
    const requestRef = quiz;

    try {
      const result = await prisma.quiz.update({
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
            requestRef.name + " - Quiz not found"
          );
      }

      throw err;
    }
  }

  public async remove(name: string) {
    const requestRef = { name: name };

    try {
      const result = await prisma.quiz.delete({
        where: {
          name: requestRef.name,
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
            requestRef.name + " - Quiz not found"
          );
      }

      throw err;
    }
  }
}
