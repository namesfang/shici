import type { Prisma } from "@prisma/client";
import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ url }) {

  const take = 80
  const page = url.searchParams.get('page');
  const skip = (Number(page ?? 1) - 1) * take;

  const keyword = url.searchParams.get('keyword');

  if(!keyword) {
    return error(400, '请输入关键字');
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
    posts,
    take,
    count,
    keyword,
  }
}
