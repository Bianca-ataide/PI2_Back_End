import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import {
  AlternativeCreateRequestSchema,
  AlternativeSearchRequestSchema,
  AlternativeUpdateRequestSchema,
} from "../schemas/alternative.schemas";

export default class AlternativeService {
  public async register(alternative: Zod.infer<typeof AlternativeCreateRequestSchema>) {
    try {
      const requestRef = alternative;

      const result = await prisma.alternative.create({
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
            "Bad Request: " + alternative.text + " - Já Cadastrado"
          );
      }

      throw err;
    }
  }

  public async search(alternative: Zod.infer<typeof AlternativeSearchRequestSchema>) {
    const requestRef = alternative;

    try {
      const alternatives = await prisma.alternative.findMany({
        where: {
          text: { contains: requestRef.text },
          questionId: { contains: requestRef.questionId },
        },
      });

      return {
        alternatives,
      };
    } catch (err) {
      throw err;
    }
  }

  public async update(alternative: Zod.infer<typeof AlternativeUpdateRequestSchema>) {
    const requestRef = alternative;

    try {
      const result = await prisma.alternative.update({
        where: {
          id: requestRef.id,
          text: requestRef.text,
          questionId: requestRef.questionId,
          
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
            requestRef.id + " - Alternative not found"
          );
      }

      throw err;
    }
  }

  public async remove(id: string) {
    const requestRef = { id: id };

    try {
      const result = await prisma.alternative.delete({
        where: {
          id: requestRef.id,
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
            requestRef.id + " - Alternative not found"
          );
      }

      throw err;
    }
  }
}
