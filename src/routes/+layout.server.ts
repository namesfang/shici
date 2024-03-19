import { client } from "$lib/prisma"

export const load = async({ locals })=> {

  // 诗人总量
  const authorCount = await client.author.count()
  // 诗词总量
  const postCount = await client.post.count()
  // 获取导航
  const links = await client.dynasty.findMany()

  links.unshift({
    id: 0,
    name: '首页'
  })
  
  return {
    links,
    authorCount,
    postCount,
    locals
  }
}