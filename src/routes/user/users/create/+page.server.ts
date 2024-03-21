import { hashPassword, notBlank } from "$lib";
import { client } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  async default({ request }) {
    const data = await request.formData()

    const errors = notBlank(data, {
      fullname: '用户名',
      password: '密码',
    })

    if (errors.length > 0) {
      return fail(422, {
        errors,
      })
    }
    
    let adm = data.get('adm') ?? 'false'

    if(!['true', 'false'].includes(adm as string)) {
      adm = 'false'
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

    await client.user.create({
      data: {
        adm: adm === 'true',
        fullname,
        hash: hashPassword(data.get('password') as string),
      }
    })

    return redirect(302, '/user/users')
  }
}