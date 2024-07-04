"use server";

import { PrismaClient } from "@prisma/client";
// dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// 플러그인 로드
dayjs.extend(utc);
dayjs.extend(timezone);

export async function getComments() {
  const prisma = new PrismaClient();

  const data = await prisma.comments.findMany({
    select: {
      name: true,
      comment: true,
      createdAt: true,
    },
  });

  const formattedData = data.map((comment) => {
    return {
      name: comment.name,
      comment: comment.comment,
      date: dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    };
  });
  if (data)
    return {
      status: "200",
      data: formattedData,
    };
}
