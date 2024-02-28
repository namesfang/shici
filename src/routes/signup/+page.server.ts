import { fail } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions = {
  async default({ request }) {
    const data = await request.formData()

    const keys: {[name: string]: string} = {
      username: '用户名',
      nickname: '昵称',
      password: '密码'
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
    return fail(400, {
      errors
    })
  }
} satisfies Actions