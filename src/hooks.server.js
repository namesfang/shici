import { redirect } from '@sveltejs/kit'

export const handle = async ({ event, resolve })=> {
  const pathname = event.url.pathname
  const session = event.cookies.get('session')
  console.log('event.url.pathname', pathname)
  if(['/login', '/signup'].includes(pathname) && session) {
    return redirect(304, '/')
  }
  return await resolve(event)
}