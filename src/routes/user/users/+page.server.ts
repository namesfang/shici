import { client } from "$lib/prisma";
import type { Prisma } from "@prisma/client";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, url }) {
  if(!locals.user?.adm) {
    redirect(302, '/permission')
  }

  const keyword = url.searchParams.get('keyword') ?? ''

  const where = { } as Prisma.UserWhereInput

  if(keyword) {
    where.fullname = {
      contains: keyword
    }
  }

  const count = await client.user.count({
    where
  })

  const list = await client.user.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    keyword,
    count,
    list
  }
}