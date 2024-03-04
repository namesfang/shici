import type { Prisma } from "@prisma/client";
import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params, url }) {

  const keyword = url.searchParams.get('keyword');

  const dynastyId = Number(params.dynasty);

  const dynasty = await client.dynasty.findFirst({
    where: {
      id: dynastyId
    }
  })

  if(!dynasty) {
    return error(404, 'Not Found')
  }

  const pageParam = url.searchParams.get('page');

  const take = 20
  const skip = Number(pageParam ?? 0);

  const where = {
    dynastyId,
  } as Prisma.PostWhereInput

  if(keyword) {
    where.title = {
      contains: keyword
    }
  }

  const list = await client.post.findMany({
    where,
    skip: skip,
    take: take
  })

  const count = await client.post.count({
    where
  })

  // console.log(dynasty)

  const pages = Math.ceil(count / take)

  return {
    list,
    take,
    count,
    pages,
    dynasty
  }
}
