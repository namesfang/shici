import { client } from '$lib/prisma.js'
import { json } from '@sveltejs/kit'

export async function POST({ request }) {
  const { postId } = await request.json()

  if(!postId) {
    return json({
      code: 1,
      msg: '表单数据不完整'
    })
  }

  const userId = 1;

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
        msg: '已取消收藏'
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
      msg: '已收藏'
    })
  } catch (error) {
    return json({
      code: 1,
      msg: '系统异常'
    })
  }
}