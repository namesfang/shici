/**
 * 消息提示
 * @param message 提示的消息
 * @param fail 默认为错误提示
 */
export function toast(message: string, fail=true) {
  const full = document.createElement('div')
  const inner = document.createElement('div')

  inner.textContent = message

  full.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 10px 0 auto 0;
    z-index: 9999;
  `

  inner.style.cssText = `
    line-height: 46px;
    font-size: 14px;
    color: var(--${fail?'white':'black'});
    border: 1px solid rgba(0,0,0,.3);
    padding: 0 24px;
    background-color: var(--${fail ? 'primary' : 'success'}-900);
    box-shadow: 0 0 12px var(--${fail ? 'primary' : 'success'}-900);
    border-radius: 23px;
  `

  full.appendChild(inner)

  document.body.appendChild(full)

  setTimeout(()=> {
    document.body.removeChild(full)
  }, 3000)
}