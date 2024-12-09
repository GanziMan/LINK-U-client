'use server'

import { PrismaClient } from '@prisma/client'
import { GetCountRequest, getCountSchema } from './schema'

export type GetCountResponse = Awaited<ReturnType<typeof getCount>>

export async function getCount(request: GetCountRequest) {
  const validated = await getCountSchema.safeParseAsync(request)
  const prisma = new PrismaClient()
  if (!validated.success) {
    return {
      code: 'VALIDATION ERROR' as const,
      message: validated.error.issues[0].message,
    }
  }

  const data = await prisma.counts.findUnique({
    where: {
      id: '1',
    },
    select: {
      like_count: true,
    },
  })

  if (data)
    return {
      status: '200',
      data: data,
    }
}
