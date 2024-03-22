import captcha from 'svg-captcha'
import { client } from '$lib/redis'

export async function GET({ locals }) {

  const { text , data } = captcha.create({
    width: 150,
    height: 46,
    noise: 4,
    color: true,
    ignoreChars: '1,i,l,o'
  })

  const redis = await client()
  
  await redis.set(`captcha:${locals.sessionid}`, text, {
    EX: 300
  })

  await redis.disconnect();

  return new Response(data)
}