import { client } from "$lib/prisma"

export const load = async({ locals })=> {
  // 获取导航
  const list = await client.dynasty.findMany()

  list.unshift({
    id: 0,
    name: '首页'
  })
  
  return {
    list,
    locals
  }
}