import type { Prisma } from "@prisma/client";
import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ url, params }) {

  const take = 80
  const page = url.searchParams.get('page');
  const keyword = url.searchParams.get('keyword');
  const skip = (Number(page ?? 1) - 1) * take;

  if(!params.id) {
    error(404, '未找到作者信息')
  }

  const id = Number(params.id)

  const author = await client.author.findFirst({
    where: {
      id
    }
  })

  if(!author) {
    error(404, '未找到作者信息')
  }

  const where = {
    authorId: id,
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
    author,
    posts,
    take,
    count,
    keyword
  }
}
