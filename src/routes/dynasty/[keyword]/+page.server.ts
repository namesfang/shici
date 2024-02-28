import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params }) {

  const detail = await client.dynasty.findFirst({
    where: {
      name: params.keyword
    }
  })

  if(!detail) {
    return error(404, 'Not Found')
  }

  const list = await client.post.findMany({
    where: {
      // dynastyId: detail.id
    },
    skip: 0,
    take: 20
  })
  console.log(list)
  return {
    list
  }
}