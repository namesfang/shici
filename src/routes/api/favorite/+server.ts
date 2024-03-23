import { client } from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function POST({ request, locals }) {
  const { postId } = await request.json()

  if(!postId) {
    return json({
      code: 1,
      msg: '表单数据不完整'
    })
  }

  const userId = locals.user?.id ?? 0;

  try {
    const info = await client.userFavorite.findFirst({
      where: {
        userId,
        postId
      }
    })

    if(info) {
      await client.userFavorite.delete({
        where: {
          id: info.id,
        }
      })
      return json({
        code: 0,
        msg: '已取消收藏',
        isStarred: false
      })
    }

    await client.userFavorite.create({
      data: {
        postId,
        userId,
      }
    })

    return json({
      code: 0,
      msg: '已收藏',
      isStarred: true
    })
  } catch (error) {
    return json({
      code: 1,
      msg: '系统异常'
    })
  }
}