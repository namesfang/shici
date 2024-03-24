import { client } from "$lib/prisma";
import { client as redisClient } from "$lib/redis";
import { redirect } from "@sveltejs/kit";

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

const getAccountControl = async()=> {
  // 登录和注册配置
  const config = await client.configuration.findFirst({
    where: {
      key: 'account_control'
    }
  })

  if(config) {
    return JSON.parse(config.value).data
  }
  return {
    signup_enable: true,
    login_enable: true
  }
}

export async function handle ({ event, resolve }) {
  let sessionid = event.cookies.get('sessionid')
  if(!sessionid) {
    event.cookies.set('sessionid', sessionid = crypto.randomUUID(), {
      path: '/',
      maxAge: 2592000,
      secure: false
    })
  }

  const title = '中华诗词网'
  const dict = await getDict()
  const user = await getUser(sessionid)
  const control = await getAccountControl()

  const { pathname } = event.url;

  event.locals = {
    dict,
    user,
    title,
    sessionid,
    control
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
      throw redirect(302, control.login_enable ? '/login' : '/')
    }
  }

  return resolve(event)
}