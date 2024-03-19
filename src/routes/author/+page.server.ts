import type { Prisma } from "@prisma/client";
import { client } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ url }) {

  const take = 20
  const page = Number(url.searchParams.get('page') ?? 1);
  const skip = (Number(page ?? 1) - 1) * take;

  const dynastyId = Number(url.searchParams.get('dynasty') ?? 0);

  if(!dynastyId || isNaN(dynastyId)) {
    return error(404, '数据异常')
  }

  const keyword = url.searchParams.get('keyword');

  const countAll = await client.author.count({
    where: {
      dynastyId
    }
  })

  const dynasty = await client.dynasty.findFirst({
    where: {
      id: dynastyId
    }
  })  

  const where = {} as Prisma.AuthorWhereInput

  if(keyword) {
    where.fullname = {
      contains: keyword
    }
  }

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
    dynasty,
    countAll,
  }
}
