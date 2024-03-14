import type { Prisma } from "@prisma/client";
import { client } from "$lib/prisma";

export async function load({ url, params }) {

  const take = 80
  const page = url.searchParams.get('page');
  const skip = (Number(page ?? 1) - 1) * take;

  const type = params.type ?? 0;
  const keyword = url.searchParams.get('keyword');

  if(!keyword) {
    return {
      take,
      skip,
      posts: [],
    }
  }

  const where = {
    title: {
      contains: keyword
    },
  } as Prisma.PostWhereInput

  const list = await client.post.findMany({
    where,
    take,
    skip,
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
    posts,
    take,
    count,
    keyword,
    type,
  }
}
