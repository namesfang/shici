import { client } from '$lib/prisma.js';
import { json } from '@sveltejs/kit'

export async function GET({ params }) {
  const key = params.key;

  const allowKeys = ['adm_wechat_contact']

  if(!allowKeys.includes(key)) {
    return json({
      code: 1,
      msg: '此配置项未放开',
    })
  }

  const info = await client.configuration.findFirst({
    where: {
      key
    }
  })

  if(!info) {
    return json({
      code: 1,
      msg: '此配置项异常',
    })
  }

  const { data } = JSON.parse(info.value)

  return json({
    code: 0,
    msg: 'ok',
    data
  })
}