import { client } from "$lib/prisma"

export const prerender = false;

export const load = async()=> {
  const list = await client.dynasty.findMany()

  list.unshift({
    id: 0,
    name: '首页'
  })
  
  return {
    list
  }
}