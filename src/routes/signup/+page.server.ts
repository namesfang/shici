import { fail, redirect } from "@sveltejs/kit"
import { client as redisClient } from '$lib/redis'
import { client } from "$lib/prisma"
import { hashSync } from 'bcrypt'

export const actions = {
  async default({ request, locals }) {
    try {
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

      const captcha = data.get('captcha') as string;

      const redis = await redisClient()
      const text = await redis.get(`captcha:${locals.sessionid}`)

      if(!text) {
        return fail(422, {
          errors: ['验证码异常']
        })
      }

      if(text.toLowerCase() !== captcha.toLowerCase()) {
        return fail(422, {
          errors: ['验证码不正确']
        })
      }

      await redis.disconnect()

      const fullname = data.get('fullname') as string;

      // 是否有重名的
      const where = {
        fullname,
        frozen: false
      }
      if(await client.user.count({ where })) {
        return fail(422, {
          errors: ['账号已存在']
        })
      }

      await client.user.create({
        data: {
          fullname,
          hash: hashSync(data.get('password') as string, 5),
        }
      })
      return redirect(302, '/login')
    } catch (error) {
      return fail(422, {
        errors: ['系统异常']
      })
    }
  }
}