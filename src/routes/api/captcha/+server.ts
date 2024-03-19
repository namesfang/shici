import captcha from 'svg-captcha'
import { client } from '$lib/redis'

export async function GET({ locals }) {

  const { text , data } = captcha.create({
    width: 150,
    height: 32,
    noise: 10
  })

  await (await client()).set(`captcha:${locals.sessionid}`, text, {
    EX: 300
  })

  return new Response(data)
}