import captcha from 'svg-captcha'
import { client } from '$lib/redis'

export async function GET() {

  const { text , data } = captcha.create({
    noise: 10
  })

  await (await client()).set('captcha', text)

  console.log('text', text)
  
  return {
    svg: data,
    list: []
  }
}