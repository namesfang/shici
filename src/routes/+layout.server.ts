import { client } from "$lib/prisma"

export const load = async()=> {
  const list = await client.dynasty.findMany()
  return {
    list
  }
}