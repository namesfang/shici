import { client } from '$lib/prisma.js'
import { json } from '@sveltejs/kit'

export async function POST({ request, locals }) {

  if(!locals.user?.adm) {
    return json({
      code: 1,
      msg: '您无权操作此功能',
    })
  }

  const { id } = await request.json()

  if(!id) {
    return json({
      code: 1,
      msg: '表单数据不完整'
    })
  }

  try {

    const info = await client.user.findFirst({
      where: {
        id
      },
      select: {
        frozen: true
      }
    })
  
    if(!info) {
      return json({
        code: 1,
        msg: '用户未找到'
      })
    }

    // 禁用账号时统计启用的账号是否
    if(!info.frozen) {
      const count = await client.user.count({
        where: {
          frozen: false
        }
      })

      if(count < 2) {
        return json({
          code: 1,
          msg: '系统必须有1个可用账号'
        })
      }
    }

    await client.user.update({
      where: {
        id,
      },
      data: {
        frozen: !info.frozen
      }
    })

    return json({
      code: 0,
      msg: `账号已${info.frozen ? '启用' : '禁用'}`,
    })
  } catch (error) {
    return json({
      code: 1,
      msg: '系统异常' + JSON.stringify(error)
    })
  }
}