import { captchaValidator } from '$lib'
import { client } from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function POST({ request, locals }) {
  const { postId, type, captcha, content } = await request.json()

  if(!type || !content || !captcha) {
    return json({
      msg: '数据不完整',
      code: 1
    })
  }

  // 校验验证码
  const error = await captchaValidator(locals.sessionid, captcha)
  if(error) {
    return json({
      msg: error,
      code: 1
    })
  }

  try {
    await client.correction.create({
      data: {
        postId,
        userId: locals.user?.id,
        type,
        content,
      }
    })
  
    return json({
      msg: '提交成功',
      code: 0
    })
  } catch (error) {
    return json({
      msg: `提交失败`,
      code: 1
    })
  }
}