'use server'

import { PrismaClient } from '@prisma/client'
import {
  CreateCommentRequest,
  CreateCommentResponse,
  createCommentSchema,
} from './schema'
import { commentDataType } from '@/app/schema/mainPageSchea'

export async function createComment(
  request: CreateCommentRequest
): Promise<CreateCommentResponse> {
  const validated = await createCommentSchema.safeParseAsync(request)

  const prisma = new PrismaClient()

  if (!validated.success) {
    return {
      status: '400',
      message: validated.error.issues[0].message,
    }
  }

  const createData = await prisma.comments.create({
    data: validated.data,
  })

  const formattedCreateData: commentDataType = {
    id: createData.id,
    name: createData.name,
    comment: createData.comment,
    date: createData.createdAt.toISOString(),
  }
  if (createData)
    return {
      status: '200',
      message: '댓글을 생성하였습니다.',
      data: formattedCreateData,
    }

  return {
    status: '500',
    message: '댓글 생성에 실패했습니다.',
  }
}
