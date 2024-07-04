"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { updateCountSchema } from "./schema";

export type UpdateCountResponse = Awaited<ReturnType<typeof updateCount>>;

export async function updateCount(request: z.input<typeof updateCountSchema>) {
  const validated = await updateCountSchema.safeParseAsync(request);
  const prisma = new PrismaClient();
  if (!validated.success) {
    return {
      code: "VALIDATION ERROR" as const,
      message: validated.error.issues[0].message,
    };
  }

  const data = await prisma.counts.update({
    where: {
      id: "1",
    },
    data: {
      like_count: {
        increment: 1,
      },
    },
  });

  if (data)
    return {
      status: "200",
    };
}
