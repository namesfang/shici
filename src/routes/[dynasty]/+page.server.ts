import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params, url }) {

  const detail = await client.dynasty.findFirst({
    where: {
      name: params.dynasty
    }
  })

  if(!detail) {
    return error(404, 'Not Found')
  }

  const pageParam = url.searchParams.get('page');

  const take = 20
  const skip = Number(pageParam ?? 0);

  const list = await client.post.findMany({
    where: {
      dynastyId: detail.id
    },
    skip: skip,
    take: take
  })

  const count = await client.post.count()

  console.log(list)

  const pages = Math.ceil(count / take)

  return {
    list,
    take,
    count,
    pages,
    dynasty: params.dynasty
  }
}