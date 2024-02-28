import { client } from '$lib/prisma'

export async function load() {
  const detail = await client.post.findFirst({
    where: {
      title: {
        contains: '望庐山'
      }
    }
  })
  console.log('de', detail)
  return {
    detail
  }
}