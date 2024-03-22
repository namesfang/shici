import { fail, redirect } from "@sveltejs/kit"
import { client } from "$lib/prisma"
import { captchaValidator, hashPassword, notBlank } from "$lib"

export const actions = {
  async default({ request, locals }) {
    const data = await request.formData()

    const errors = notBlank(data, {
      fullname: '用户名',
      password: '密码',
      captcha: '验证码',
    })

    if (errors.length > 0) {
      return fail(422, {
        errors,
      })
    }

    // 校验验证码
    const error = await captchaValidator(locals.sessionid, data.get('captcha') as string)
    if (error) {
      return fail(422, {
        errors: [error],
      })
    }

    const fullname = data.get('fullname') as string;

    // 是否有重名的
    const where = {
      fullname,
    }
    if (await client.user.count({ where })) {
      return fail(422, {
        errors: ['账号已存在'],
      })
    }

    // 第1个用户为管理员
    let adm = false
    if(!await client.user.count()) {
      adm = true
    }

    await client.user.create({
      data: {
        adm,
        fullname,
        hash: hashPassword(data.get('password') as string),
      }
    })

    return redirect(302, '/signup/result')
  }
}