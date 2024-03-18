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

  const page = url.searchParams.get('page');

  const take = 80
  const skip = (Number(page ?? 1) - 1) * take;

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
    take,
    skip,
    include: {
      author: true
    }
  })

  const count = await client.post.count({
    where
  })

  const posts = []

  while(list.length > 0) {
    posts.push(list.splice(0, 20))
  }
  // console.log(dynasty)

  return {
    page,
    posts,
    take,
    count,
    dynasty
  }
}
