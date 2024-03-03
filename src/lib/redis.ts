import { createClient } from 'redis';
import { REDIS_URL } from '$env/static/private'

export async function client()  {
  const redis = createClient({
    url: REDIS_URL
  })

  return await redis.on('error', err => console.log('Redis Client Error', err)).connect();

  // await client.set('key', 'value');
  // const value = await client.get('key');
  // await client.disconnect();
  // console.log('value', value)
}