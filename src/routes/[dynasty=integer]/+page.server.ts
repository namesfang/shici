import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params, url }) {

  const keyword = url.searchParams.get('keyword');

  const dynastyId = Number(params.dynasty);

  const where = {
    id: dynastyId,
    name: {
      contains: ''
    }
  }

  if(keyword) {
    where.name = {
      contains: keyword
    }
  }

  const detail = await client.dynasty.findFirst({
    where
  })

  if(!detail) {
    return error(404, 'Not Found')
  }

  const pageParam = url.searchParams.get('page');

  const take = 20
  const skip = Number(pageParam ?? 0);

  const list = await client.post.findMany({
    where: {
      dynastyId
    },
    skip: skip,
    take: take
  })

  const count = await client.post.count({
    where: {
      dynastyId
    }
  })

  // console.log(list)

  const pages = Math.ceil(count / take)

  return {
    list,
    take,
    count,
    pages,
    dynasty: params.dynasty
  }
}

export const actions = {
  async search(e) {
    console.log(e)
  }
}