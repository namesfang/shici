import { client } from '$lib/redis.js';
export async function load({ locals }) {
  const redis = await client()

  await redis.hDel(`user:${locals.sessionid}`, ['id', 'fullname', 'adm', 'createAt'])

  await redis.disconnect()
}