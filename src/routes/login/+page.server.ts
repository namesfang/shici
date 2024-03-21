import { fail, redirect } from "@sveltejs/kit"
import { client as redisClient } from '$lib/redis'
import { client } from "$lib/prisma"
import { compareSync } from 'bcrypt'
import { captchaValidator } from "$lib"

export const actions = {
  async default({ url, request, locals }) {
    const data = await request.formData()

    const keys: {[name: string]: string} = {
      fullname: '用户名',
      password: '密码',
      captcha: '验证码',
    }

    const errors = [];
    for(const key in keys) {
      const length = (data.get(key) as string).length
      if(!data.has(key) || length === 0) {
        errors.push(`${keys[key]}不能为空`)
        continue
      }
      if(length < 1) {
        errors.push(`${keys[key]}至少2位`)
      }
    }

    if(errors.length > 0) {
      return fail(422, {
        errors
      })
    }

    // 校验验证码
    const error = await captchaValidator(locals.sessionid, data.get('captcha') as string)
    if(error) {
      return fail(422, {
        errors: [ error ]
      })
    }

    const info = await client.user.findFirst({
      where: {
        fullname: data.get('fullname') as string,
        frozen: false
      }
    });

    if(null === info) {
      return fail(422, {
        errors: ['系统未找到此账号']
      })
    }
    const password = data.get('password') as string;

    if(!compareSync(password, info.hash)) {
      return fail(422, {
        errors: ['系统未找到此账号']
      })
    }

    const redis = await redisClient()

    await redis.hSet(`user:${locals.sessionid}`, {
      id: info.id,
      fullname: info.fullname,
      adm: info.adm ? 1 : 0,
      createAt: info.createdAt.toString()
    })

    await redis.disconnect();

    const uri = url.searchParams.get('redirectURI') ?? '/user'
    
    return redirect(302, `/login/result?redirectURI=${encodeURIComponent(uri)}`)
  }
}