import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import {
  UserCreateRequestSchema,
  UserSearchRequestSchema,
  UserUpdateRequestSchema,
} from "../schemas/user.schemas";

export default class UserService {
  public async register(user: Zod.infer<typeof UserCreateRequestSchema>) {
    try {
      const requestRef = user;

      const result = await prisma.user.create({
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
            "Bad Request: " + user.nickname + " - Já Cadastrado"
          );
      }

      throw err;
    }
  }

  public async search(user: Zod.infer<typeof UserSearchRequestSchema>) {
    const requestRef = user;

    try {
      const users = await prisma.user.findMany({
        where: {
          nickname: { contains: requestRef.nickname },
          username: { contains: requestRef.username },
        },
      });

      return {
        users,
      };
    } catch (err) {
      throw err;
    }
  }

  public async update(user: Zod.infer<typeof UserUpdateRequestSchema>) {
    const requestRef = user;

    try {
      const result = await prisma.user.update({
        where: {
          username: requestRef.username,
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
            requestRef.username + " - User not found"
          );
      }

      throw err;
    }
  }

  public async remove(username: string) {
    const requestRef = { username: username };

    try {
      const result = await prisma.user.delete({
        where: {
          username: requestRef.username,
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
            requestRef.username + " - User not found"
          );
      }

      throw err;
    }
  }
}
