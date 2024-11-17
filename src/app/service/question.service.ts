import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import {
  QuestionCreateRequestSchema,
  QuestionSearchRequestSchema,
  QuestionUpdateRequestSchema,
} from "../schemas/question.schemas";

export default class QuestionService {
  public async register(question: Zod.infer<typeof QuestionCreateRequestSchema>) {
    try {
      const requestRef = question;

      const result = await prisma.question.create({
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
            "Bad Request: " + question.question + " - Já Cadastrado"
          );
      }

      throw err;
    }
  }

  public async search(question: Zod.infer<typeof QuestionSearchRequestSchema>) {
    const requestRef = question;

    try {
      const questions = await prisma.question.findMany({
        where: {
          question: { contains: requestRef.question },
        },
      });

      return {
        questions,
      };
    } catch (err) {
      throw err;
    }
  }

  public async update(question: Zod.infer<typeof QuestionUpdateRequestSchema>) {
    const requestRef = question;

    try {
      const result = await prisma.question.update({
        where: {
          question: requestRef.question,
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
            requestRef.question + " - Question not found"
          );
      }

      throw err;
    }
  }

  public async remove(question: string) {
    const requestRef = { question: question };

    try {
      const result = await prisma.question.delete({
        where: {
          question: requestRef.question,
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
            requestRef.question + " - Question not found"
          );
      }

      throw err;
    }
  }
}
