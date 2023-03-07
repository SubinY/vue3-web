import { ElMessageBox } from 'element-plus'

let globalTipsInstance = null

function globalTips(opts) {

  const {
    tipsType,
    type = 'error',
    title = '温馨提示',
    message,
    goLogin,
    reload
  } = opts

  if (globalTipsInstance) {
    globalTipsInstance.destroy()
  }

  globalTipsInstance = ElMessageBox[type](title, message, {
    confirmButtonText: 'ok',
    callback: () => {
      // if (goLogin) {
      //   localStorage.clear()
      //   // history.push('/login')
      // } else if (reload) {
      //   window.location.reload()
      // }
    }
  })
}

export default globalTips
