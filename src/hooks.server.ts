import { client } from "$lib/prisma";
import { client as redisClient } from "$lib/redis";
import { redirect, type Handle, type RequestEvent } from "@sveltejs/kit";
// import { building } from "$app/environment";
// import { PUBLIC_STATIC_URL } from "$env/static/public";

type replaceStack = [string, (event: RequestEvent)=> string]

/**
 * 替换HTML
 * @param html 页面内容
 * @param event 事件
 * @returns 
 */
const replaceAll = (html: string, event: RequestEvent)=> {
  const stacks: replaceStack[] = [
    // CDN资源
    [
      '%cdn.assets%',
      (event: RequestEvent)=> {
        return event.url.origin;
      }
    ]
  ];

  // 遍历替换
  stacks.forEach(([name, callback])=> {
    html = html.replaceAll(name, callback(event))
  })

  return html
}

const getDict = async()=> {
  //
  // 获取字典
  //
  const result = await client.dict.findMany({
    where: {
      enabled: true
    },
    orderBy: [
      {
        id: 'asc',
      },
      {
        orderNumber: 'asc' 
      }
    ]
  })

  const dict: DictMap = {};

  result.forEach(({key, parentId})=> {
    if(null === parentId) {
      dict[key] = []
    }
  })

  result.forEach(({key, value, label, parentId})=> {
    if(dict[key] && null !== parentId) {
      dict[key].push({
        value,
        label
      })
    }
  })

  return dict;
}

const getUser = async (sessionid: string)=> {
  const redis = await redisClient()
  const [id, fullname, adm, createAt] = await redis.hmGet(`user:${sessionid}`, ['id', 'fullname', 'adm', 'createAt'])

  redis.disconnect()

  if(null === id) {
    return null
  }
  return {
    id: Number(id),
    fullname,
    adm: adm === '1',
    createAt
  }
}

export const handle: Handle = async ({ event, resolve })=> {
  let sessionid = event.cookies.get('sessionid')
  if(!sessionid) {
    event.cookies.set('sessionid', sessionid = crypto.randomUUID(), {
      path: '/'
    })
  }

  const title = '中华诗词网'
  const dict = await getDict()
  const user = await getUser(sessionid)
  const { pathname } = event.url;

  event.locals = {
    dict,
    user,
    title,
    sessionid
  }

  // "/[fallback]" 是sveltekit内部build时需要
  // console.log('event.url.pathname', event.url.pathname)
  // if(event.url.pathname.includes('/[fallback]')) {
  //   return resolve(event)
  // }

  // 鉴权
  
  if(user) {
    // 登录后不允许再访问登录和注册页面
    if(['/login', '/signup'].includes(pathname)) {
      throw redirect(302, '/');
    }
  } else {
    if(pathname.indexOf('/user') === 0) {
      throw redirect(302, '/login')
    }
  }

  return resolve(event)

  // 替换
  return resolve(event, {
    transformPageChunk: ({ html })=> replaceAll(html, event),
  });
}