import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import {
  SectionCreateRequestSchema,
  SectionSearchRequestSchema,
  SectionUpdateRequestSchema,
} from "../schemas/section.schemas";

export default class sectionService {
  public async register(section: Zod.infer<typeof SectionCreateRequestSchema>) {
    try {
      const requestRef = section;

      const result = await prisma.section.create({
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
            "Bad Request: " + section.name + " - Já Cadastrado"
          );
      }

      throw err;
    }
  }

  public async search(section: Zod.infer<typeof SectionSearchRequestSchema>) {
    const requestRef = section;

    try {
      const sections = await prisma.section.findMany({
        where: {
          name: { contains: requestRef.name },
        },
      });

      return {
        sections,
      };
    } catch (err) {
      throw err;
    }
  }

  public async update(section: Zod.infer<typeof SectionUpdateRequestSchema>) {
    const requestRef = section;

    try {
      const result = await prisma.section.update({
        where: {
          id: requestRef.id,
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
            requestRef.name + " - Section not found"
          );
      }

      throw err;
    }
  }

  public async remove(id: string) {
    const requestRef = { id: id };

    try {
      const result = await prisma.section.delete({
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
            requestRef.id + " - Section not found"
          );
      }

      throw err;
    }
  }
}
