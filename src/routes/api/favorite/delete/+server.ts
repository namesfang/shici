import { client } from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function POST({ request, locals }) {
  const { id } = await request.json()

  if(!id) {
    return json({
      code: 1,
      msg: '表单数据不完整'
    })
  }

  try {
    await client.userFavorite.delete({
      where: {
        id,
        userId: locals.user!.id
      }
    })
    return json({
      code: 0,
      msg: '已取消收藏',
    })
  } catch (error) {
    return json({
      code: 1,
      msg: '系统异常'
    })
  }
}