"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createCommentSchema } from "./schema";

export type CreateCommentResponse = Awaited<ReturnType<typeof createComment>>;

export async function createComment(
  request: z.input<typeof createCommentSchema>
) {
  const validated = await createCommentSchema.safeParseAsync(request);

  const prisma = new PrismaClient();

  if (!validated.success) {
    return {
      code: "VALIDATION ERROR" as const,
      message: validated.error.issues[0].message,
    };
  }

  const data = await prisma.comments.create({
    data: validated.data,
  });

  if (data)
    return {
      status: "200",
      message: "댓글을 생성하였습니다.",
    };
}
