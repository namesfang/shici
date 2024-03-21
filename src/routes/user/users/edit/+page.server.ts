import { hashPassword, notBlank } from "$lib";
import { client } from "$lib/prisma";
import type { Prisma } from "@prisma/client";
import { error, fail, redirect } from "@sveltejs/kit";

export async function load({ url }) {
  const id = url.searchParams.get('id')

  if(!id) {
    error(404)
  }

  const info = await client.user.findFirst({
    where: {
      id: Number(id)
    }
  })

  if(!info) {
    error(404)
  }

  return {
    info
  }
}

export const actions = {
  async default({ url, request }) {
    const paramId = url.searchParams.get('id')

    if(!paramId) {
      return fail(404)
    }

    const id = Number(paramId)

    const data = await request.formData()

    const errors = notBlank(data, {
      fullname: '用户名',
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


    // 是否有重名的
    const info = await client.user.findFirst({ 
      where: {
        id
      }
    })

    if (info && info.id !== id) {
      return fail(422, {
        errors: ['账号已存在'],
      })
    }

    const update = {
      adm: adm === 'true',
      fullname: data.get('fullname') as string,
    } as Prisma.UserUpdateInput

    const password = data.get('password') as string
    if(password) {
      update.hash = hashPassword(password)
    }

    await client.user.update({
      where: {
        id,
      },
      data: update
    })

    return redirect(302, '/user/users')
  }
}