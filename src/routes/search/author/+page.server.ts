import type { Prisma } from "@prisma/client";
import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ url }) {

  const take = 20
  const page = Number(url.searchParams.get('page') ?? 1);
  const skip = (Number(page ?? 1) - 1) * take;

  const keyword = url.searchParams.get('keyword');

  if(!keyword) {
    return error(400, '请输入关键字');
  }

  const where = {
    fullname: {
      contains: keyword
    },
  } as Prisma.AuthorWhereInput

  const list = await client.author.findMany({
    where,
    take,
    skip,
  })

  const count = await client.author.count({
    where
  })

  return {
    page,
    list,
    take,
    count,
    keyword,
  }
}
