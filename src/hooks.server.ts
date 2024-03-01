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

export const handle: Handle = async ({ event, resolve })=> {
  // "/[fallback]" 是sveltekit内部build时需要
  if(!event.url.pathname.includes('/[fallback]')) {
    // 鉴权
    const path = event.url.pathname;
    const token = event.cookies.get('session');
    const passport = ['/login', '/signup'];
    if(token) {
      // 登录后不允许再访问登录和注册页面
      if(passport.includes(path)) {
        throw redirect(302, '/');
      }
      const success = true;
      if(success) {
        event.locals = {
          user: {},
        };
      }
    }
  }

  // 替换
  return resolve(event, {
    transformPageChunk: ({ html })=> replaceAll(html, event),
  });
}