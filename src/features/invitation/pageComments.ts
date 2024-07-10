"use server";

import { PrismaClient } from "@prisma/client";
// dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { z } from "zod";
import { pageCommentsSchema } from "./schema";

// 플러그인 로드
dayjs.extend(utc);
dayjs.extend(timezone);

export async function pageComments(
  request: z.input<typeof pageCommentsSchema>
) {
  const prisma = new PrismaClient();

  const validated = await pageCommentsSchema.safeParseAsync(request);

  if (validated.error) {
    return {
      code: "VALIDATION ERROR" as const,
      message: validated.error.issues[0].message,
    };
  }
  const { cursor } = validated.data;

  const data = await prisma.comments.findMany({
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    take: 5,
    select: {
      id: true,
      name: true,
      comment: true,
      createdAt: true,
    },
  });

  const totalComments = await prisma.comments.count();
  const totalPages = Math.ceil(totalComments / 5);

  const formattedData = data.map((comment) => {
    return {
      name: comment.name,
      comment: comment.comment,
      date: dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    };
  });

  const nextCursor = data.length > 0 ? data[data.length - 1].id : null;

  if (data)
    return {
      status: "200",
      data: { comments: formattedData, totalPages, nextCursor },
    };
}
