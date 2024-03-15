import type { Prisma } from "@prisma/client";
import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ url }) {

  const take = 60
  const page = url.searchParams.get('page');
  const skip = (Number(page ?? 1) - 1) * take;

  const keyword = url.searchParams.get('keyword');

  if(!keyword) {
    return error(400, '请输入关键字');
  }

  const where = {
    content: {
      contains: keyword
    },
  } as Prisma.ContentWhereInput

  const list = await client.content.findMany({
    where,
    take,
    skip,
    include: {
      post: true
    }
  })

  const count = await client.content.count({
    where
  })

  const posts = []

  while(list.length > 0) {
    posts.push(list.splice(0, 20))
  }

  return {
    posts,
    take,
    count,
    keyword,
  }
}
