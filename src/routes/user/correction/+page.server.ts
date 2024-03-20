import { client } from "$lib/prisma";
import type { Prisma } from "@prisma/client";

export async function load({ locals, url }) {

  const keyword = url.searchParams.get('keyword') ?? ''

  const where = {
    userId: locals.user?.id,
  } as Prisma.CorrectionWhereInput

  if(keyword) {
    where.post = {
      title: {
        contains: keyword
      }
    }
  }

  const count = await client.correction.count({
    where
  })

  const list = await client.correction.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      post: {
        select: {
          title: true,
          dynastyId: true
        }
      }
    }
  })

  return {
    keyword,
    count,
    list
  }
}