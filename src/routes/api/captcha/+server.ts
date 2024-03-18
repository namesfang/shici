import captcha from 'svg-captcha'
import { client } from '$lib/redis'

export async function GET({ cookies }) {

  const { text , data } = captcha.create({
    width: 150,
    height: 32,
    noise: 10
  })

  const sessionid = cookies.get('sessionid')
  if(!sessionid) {
    cookies.set('sessionid', crypto.randomUUID(), {
      path: '/'
    })
  }

  await (await client()).set(`captcha:${sessionid}`, text, {
    EX: 300
  })

  return new Response(data)
}