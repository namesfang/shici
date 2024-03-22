import { client } from "./prisma"
import { request } from 'node:http'

const messages = {
  '-1': '参数不全',
  '-2': '服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！',
  '0': '短信发送成功',
  '30': '密码错误',
  '40': '账户不存在',
  '41': '余额不足',
  '42': '账户已过期',
  '43': 'IP地址限制',
  '50': '内容含有敏感字'
}

type MessageCode = keyof typeof messages

const send = async (mobile: string | string[], content: string)=> {
  return new Promise((resolve, reject)=> {

    console.log({
      mobile,
      content
    })

    const options = {  
      hostname: 'api.smsbao.com',   
      path:'/sms?'+'content',  
      method:'GET'
    }
  
    const ch = request(options, (res)=> {
      res.setEncoding('utf-8');  
      res.on('data',function(code: MessageCode){
        resolve({
          code: code,
          msg: messages[code]
        })
      });  
      res.on('end',function(){  
      }); 
    })

    ch.on('error', reject)
  })
}

export async function smsbao() {
  const info = await client.configuration.findFirst({
    where: {
      key: 'smsbao',
    },
    select: {
      value: true
    }
  })

  if(!info) {
    return -4;
  }

  const a = await send('', '');

  console.log(a)
}