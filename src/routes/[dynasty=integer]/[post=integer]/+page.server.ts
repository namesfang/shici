import { client } from '$lib/prisma'
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
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

  const contents = []

  // 诗词内容分页
  while(detail.contents.length > 0) {
    contents.push(detail.contents.splice(0, 2))
  }

  // 是否已收藏
  let favCount = 0;
  if(locals.user) {
    favCount = await client.userFavorite.count({
      where: {
        userId: locals.user.id,
        postId: id,
      }
    })
  }

  return {
    detail,
    contents,
    favCount
  }
}