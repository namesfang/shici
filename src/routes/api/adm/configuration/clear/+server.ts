import { client } from '$lib/prisma.js';
import { json } from '@sveltejs/kit'

export async function POST({ request, locals }) {

  if(!locals.user?.adm) {
    return json({
      code: 1,
      msg: '您无权操作此功能',
    })
  }

  const { key } = await request.json()

  if(!key) {
    return json({
      code: 1,
      msg: '提交数据不完整',
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

  let data: ScalarObject = {}
  if(key === 'default_password') {
    data = {
      default_password: ''
    }
  } else if(key === 'adm_wechat_contact') {
    data = {
      id: '',
      qrl: ''
    }
  } else if(key === 'smsbao') {
    data = {
      u: '',
      p: '',
      g: ''
    }
  } else if(key === 'account_control') {
    data = {
      signup_enable: true,
      login_enable: true
    }
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

  return json({
    code: 0,
    msg: '配置项已保存',
  })
}