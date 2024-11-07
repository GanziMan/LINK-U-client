'use server'

import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { CreateCommentRequest, createCommentSchema } from './schema'

export async function createComment(request: CreateCommentRequest) {
  const validated = await createCommentSchema.safeParseAsync(request)

  const prisma = new PrismaClient()

  if (!validated.success) {
    return {
      code: 'VALIDATION ERROR' as const,
      message: validated.error.issues[0].message,
    }
  }

  const createResponse = await prisma.comments.create({
    data: validated.data,
  })

  if (createResponse)
    return {
      status: '200',
      message: '댓글을 생성하였습니다.',
    }
}
