import { client } from '$lib/redis.js';
import { redirect } from '@sveltejs/kit';

export async function GET({ locals }) {
  const redis = await client()

  await redis.hDel(`user:${locals.sessionid}`, ['id', 'fullname', 'adm', 'createAt'])

  await redis.disconnect()

  return redirect(304, '/')
}