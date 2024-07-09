'use server'

import { PrismaClient } from '@prisma/client'
// dayjs
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { z } from 'zod'
import { getCommentSchema } from './schema'

// 플러그인 로드
dayjs.extend(utc)
dayjs.extend(timezone)

export async function getComments(request: z.input<typeof getCommentSchema>) {
  const prisma = new PrismaClient()

  const validated = await getCommentSchema.safeParseAsync(request)

  if (validated.error) {
    return {
      code: 'VALIDATION ERROR' as const,
      message: validated.error.issues[0].message,
    }
  }
  const { cursor } = validated.data

  const data = await prisma.comments.findMany({
    take: 5,
    skip: cursor ? 1 : 0, // 커서가 있으면 커서 이후의 데이터를 가져오도록 skip 설정
    cursor: cursor ? { id: cursor } : undefined,
    select: {
      id: true,
      name: true,
      comment: true,
      createdAt: true,
    },
  })

  const formattedData = data.map((comment) => {
    return {
      name: comment.name,
      comment: comment.comment,
      date: dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    }
  })

  const nextCursor = data.length > 0 ? data[data.length - 1].id : null

  if (data)
    return {
      status: '200',
      data: { formattedData, nextCursor },
    }
}
