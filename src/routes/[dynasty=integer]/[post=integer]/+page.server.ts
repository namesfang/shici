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

  console.log(detail.contents, '‘ddd')

  const contents = []

  // 诗词内容分页
  while(detail.contents.length > 0) {
    contents.push(detail.contents.splice(0, 2))
  }

  return {
    detail,
    contents
  }
}