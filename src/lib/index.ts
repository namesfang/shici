import { client } from "./redis";

/**
 * 后端校验验证码
 * @param captcha string 验证码
 * @returns 
 */
export async function captchaValidator(sessionid: string, captcha: string) {

  const key = `captcha:${sessionid}`
  const redis = await client()
  
  const text = await redis.get(key)

  await redis.del(key)

  await redis.disconnect();

  if(!text) {
    return '验证码已过期'
  }

  if(text.toLowerCase() === captcha.toLowerCase()) {
    return null
  }
  
  return '验证码不正确'
}

type Labels = {
  [key: string]: string;
}

/**
 * 校验表单非空字段
 * @param data 
 * @param labels 
 * @returns 
 */
export function notBlank(data: FormData, labels: Labels) {

  type Name = keyof typeof labels

  const messages = [];

  let name: Name;
  for(name in labels) {
    if(!data.has(name) || !data.get(name)) {
      messages.push(labels[name])
    }
  }

  if(messages.length === 0) {
    if('captcha' in data) {
      if((data.captcha as string).length != 4) {
        messages.push('验证码输入错误')        
      }
    }
  } else {
    messages.splice(0, 3, messages.join(',') + '不能为空')
  }

  return messages
}

type SerializeFormDataScalar = string | number | boolean
type SerializeFormDataArray = SerializeFormDataScalar[]

type SerializeFormData = object & {
  [key: string]: SerializeFormDataScalar | SerializeFormDataArray
}

/**
 * 将表单数据转为普通对象数据
 * @param form 
 * @returns 
 */
export function serializeFormData(form: FormData): SerializeFormData {
  const data = {} as SerializeFormData

  for( const pair of form.entries()) {
    const [name, value] = pair;
    if(Object.hasOwn(data, name)) {
      if(Array.isArray(data[name])) {
        data[name] = [
          ...data[name] as SerializeFormDataArray,
          value as SerializeFormDataScalar
       ]
      } else {
        data[name] = [
          data[name] as SerializeFormDataScalar,
          value as SerializeFormDataScalar
        ]
      }
    } else {
      data[name] = value as SerializeFormDataScalar
    }
  }

  return data;
}