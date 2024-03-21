/**
 * 消息提示
 * @param message 提示的消息
 * @param fail 默认为错误提示
 */
export function toast(message: string | string[], fail=true) {
  const id = `toast_${Math.random().toString().substring(2)}`
  const full = document.createElement('div')
  const inner = document.createElement('div')

  // 移除
  document.querySelectorAll('.toast-message').forEach((el)=> {
    document.body.removeChild(el)
  })
  
  if(Array.isArray(message)) {
    const pieces: string[] = []
    message.forEach((text)=> {
      pieces.push(`<p>${text}</p>`)
    })
    inner.innerHTML = pieces.join('')
  } else {
    inner.textContent = message
  }

  inner.style.cssText = `
    min-width: 200px;
    height: auto;
    overflow: hidden;
    line-height: 26px;
    text-align: center;
    font-size: 14px;
    color: var(--${fail?'white':'black'});
    border: 1px solid rgba(0, 0, 0, .1);
    padding: 12px 24px;
    background-color: var(--${fail ? 'warning' : 'success'}-900);
    box-shadow: 0 0 12px var(--${fail ? 'warning' : 'success'}-900);
    border-radius: 23px;
    position: fixed;
    top: 7px;
    left: 50%;
    translate: -50%;
  `

  full.setAttribute('id', id)
  full.setAttribute('class', 'toast-message')
  full.appendChild(inner)

  document.body.appendChild(full)

  setTimeout(()=> {
    const element = document.querySelector(`#${id}`)
    if(element) {
      document.body.removeChild(element)
    }
  }, 3000)
}

type Data = object & {
  [key: string]: unknown;
}

type Labels = {
  [key: string]: string;
}

export function notBlank(event: SubmitEvent, data: Data, labels: Labels) {
  type Name = keyof typeof labels

  const messages = [];

  let name: Name;
  for(name in labels) {
    if(null === data[name] || '' === data[name] || typeof data[name] === 'undefined') {
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

  if(messages.length > 0) {
    event.preventDefault()
    toast(messages);
    return
  }
}
