import { client } from '$lib/prisma.js'
import { json } from '@sveltejs/kit'

export async function POST({ request }) {
  const { postId, type, content } = await request.json()

  if(!type || !content) {
    return json({
      msg: '数据不完整',
      code: 1
    })
  }

  await client.correction.create({
    data: {
      postId,
      userId: null,
      type,
      content,
    }
  })

  return json({
    msg: '提交成功',
    code: 0
  })
}