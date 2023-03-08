// import Modal from 'ant-design-vue/lib/modal' // 加载 JS
// import 'ant-design-vue/lib/modal/style/css' // 加载 CSS

let globalTipsInstance = null

function globalTips(opts) {
  const { tipsType, type = 'error', title = '温馨提示', message, goLogin, reload } = opts

  if (globalTipsInstance) {
    globalTipsInstance.destroy()
  }

  // globalTipsInstance = Modal[type]({
  //   title,
  //   content: message,
  //   onOk: () => {
  //     if (goLogin) {
  //       localStorage.clear()
  //     } else if (reload) {
  //       window.location.reload()
  //     }
  //   }
  // })

  console.log(globalTipsInstance, 'globalTipsInstance')
}

export default globalTips
