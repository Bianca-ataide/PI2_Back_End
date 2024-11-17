import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import {
  ProgressCreateRequestSchema,
  ProgressRemoveRequestSchema,
  ProgressSearchRequestSchema,
  ProgressUpdateRequestSchema,
} from "../schemas/progress.schemas";

export default class ProgressService {
  public async register(progress: Zod.infer<typeof ProgressCreateRequestSchema>) {
    try {
      const requestRef = progress;

      const result = await prisma.progress.create({
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
            "Bad Request: " + progress.section + ":" + progress.username + " - Já Cadastrado"
          );
      }

      throw err;
    }
  }

  public async search(progress: Zod.infer<typeof ProgressSearchRequestSchema>) {
    const requestRef = progress;

    try {
      const progresses = await prisma.progress.findMany({
        where: {
          username: { contains: requestRef.username },
          section: { contains: requestRef.section},
        },
      });

      return {
        progresses,
      };
    } catch (err) {
      throw err;
    }
  }

  public async update(progress: Zod.infer<typeof ProgressUpdateRequestSchema>) {
    const requestRef = progress;

    try {
      const result = await prisma.progress.update({
        where: {
          section: requestRef.section,
          username: requestRef.username
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
            requestRef.section + ":" + requestRef.username + " - Progress not found"
          );
      }

      throw err;
    }
  }

  public async remove(progress: Zod.infer<typeof ProgressRemoveRequestSchema>) {
    const requestRef = progress;

    try {
      const result = await prisma.progress.delete({
        where: {
          section: progress.section,
          username: progress.username
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
            requestRef.section + ":" + requestRef.username + " - Progress not found"
          );
      }

      throw err;
    }
  }
}
