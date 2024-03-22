import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";
import { hashPassword, notBlank } from "$lib"
import { fail, redirect } from "@sveltejs/kit"
import { createHash } from "crypto"

export async function load({ url }) {
  const key = url.searchParams.get('key') ?? 'default_password'

  const list = await client.configuration.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  const item = list.find((item)=> key === item.key)

  if(!item) {
    return error(404)
  }

  const parsed = JSON.parse(item.value).data

  return {
    key,
    list,
    item,
    parsed,
  }
}

export const actions = {
  async default({ request }) {
    const form = await request.formData()
    const key = form.get('key') as string

    if(!key) {
      return fail(422, {
        errors: ['提交数据不完整'],
      })
    }

    let errors: string[] = [];
    if(key === 'default_password') {
      errors = notBlank(form, {
        default_password: '重置密码',
      })
    } else if(key === 'adm_wechat_contact') {
      errors = notBlank(form, {
        id: '微信号',
        qrl: '微信二维码链接',
      })
    } else if(key === 'smsbao') {
      errors = notBlank(form, {
        u: '用户名',
        p: '密码',
      })
    }

    if (errors.length > 0) {
      return fail(422, {
        errors,
      })
    }

    const info = await client.configuration.findFirst({
      where: {
        key
      },
    })

    if(!info) {
      return fail(422, {
        errors: ['配置项不存在'],
      })
    }

    const data: ScalarObject = { }

    // type Ser = {
    //   default_password: string
    // } | {
    //   id: string;
    //   qrl: string;
    // } | {
    //   u: string;
    //   p: string;
    //   g: string
    // }

    if(key === 'default_password') {
      data.default_password = hashPassword(form.get('default_password') as string)
    } else if(key === 'adm_wechat_contact') {
      data.id = form.get('id') as string
      data.qrl = form.get('qrl') as string
    } else if(key === 'smsbao') {
      data.u = form.get('u') as string
      data.p = createHash('md5').update(form.get('p') as string).digest('hex')
      data.g = form.get('g') as string
    } else if(key === 'account_control') {
      data.signup_enable = String(form.get('signup_enable') ?? 'false') === 'true'
      data.login_enable = String(form.get('login_enable') ?? 'false') === 'true'
    }

    await client.configuration.update({
      where: {
        id: info.id,
      },
      data: {
        value: JSON.stringify({
          data
        })
      }
    })

    return redirect(302, `/user/configuration?key=${key}`)
  }
}