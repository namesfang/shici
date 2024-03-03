import { client } from '$lib/prisma'
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const id = Number(params.post)
  const dynastyId = Number(params.dynasty)

  const detail = await client.post.findFirst({
    include: {
      contents: true,
      author: true,
      dynasty: true,
    },
    where: {
      id,
      dynastyId
    },
  })

  if(!detail) {
    throw error(404, 'Not Found');
  }
  // console.log('de', detail)
  return {
    detail
  }
}