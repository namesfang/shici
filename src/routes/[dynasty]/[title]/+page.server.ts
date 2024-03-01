import { client } from '$lib/prisma'
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const dynasty = await client.dynasty.findFirst({
    where: {
      name: params.dynasty
    }
  })

  if(!dynasty) {
    throw error(404, 'Not Found');
  }

  const detail = await client.post.findFirst({
    include: {
      contents: true,
      author: true,
      dynasty: true,
    },
    where: {
      dynastyId: dynasty?.id,
      title: params.title
    },
  })
  console.log('de', detail)
  return {
    detail
  }
}