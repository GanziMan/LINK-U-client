import { commentDataType } from '@/app/schema/mainPageSchea'
import { z } from 'zod'

export const getCountSchema = z.object({
  id: z.string(),
})

export const updateCountSchema = z.object({
  id: z.string(),
})

export const pageCommentsSchema = z.object({
  // take:z.number(),
  cursor: z.number().nullish(),
})

export const createCommentSchema = z.object({
  name: z.string(),
  comment: z.string(),
})

export type GetCountRequest = z.input<typeof getCountSchema>
export type UpdateCountRequest = z.input<typeof updateCountSchema>
export type PageCommentRequest = z.input<typeof pageCommentsSchema>
export type CreateCommentRequest = z.input<typeof createCommentSchema>
export type CreateCommentResponse =
  | {
      status: '400' | '500'
      message: string
    }
  | {
      status: '200'
      message: string
      data: commentDataType
    }
