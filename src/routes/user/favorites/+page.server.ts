import { client } from "$lib/prisma";
import type { Prisma } from "@prisma/client";

export async function load({ locals, url }) {

  const keyword = url.searchParams.get('keyword') ?? ''

  const where = {
    userId: locals.user?.id,
  } as Prisma.UserFavoriteWhereInput

  if(keyword) {
    where.post = {
      title: {
        contains: keyword
      }
    }
  }

  const count = await client.userFavorite.count({
    where
  })

  const list = await client.userFavorite.findMany({
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