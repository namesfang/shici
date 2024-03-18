import { client } from '$lib/prisma'
import { client as redisClient } from '$lib/redis'
import { json } from '@sveltejs/kit'

export async function POST({ request, cookies }) {
  const { postId, type, captcha, content } = await request.json()

  if(!type || !content || !captcha) {
    return json({
      msg: '数据不完整',
      code: 1
    })
  }

  const sessionid = cookies.get('sessionid')

  const text = await (await redisClient()).get(`captcha:${sessionid}`)

  if(!text) {
    return json({
      msg: '验证码异常',
      code: 1,
    })
  }
  
  if(text.toLowerCase() !== captcha.toLowerCase()) {
    return json({
      msg: '验证码不正确',
      code: 1,
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