import { defineStore } from 'pinia'
// import {
//   login as userLogin,
//   logout as userLogout,
//   getUserProfile,
//   LoginData
// } from '@/api/user/index'
import { Storage } from '@/utils/storage'
import { ACCESS_TOKEN_KEY } from '@/constants/storage'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    userInfo: {
      userName: undefined,
      avatar: undefined,
      organization: undefined,
      location: undefined,
      email: undefined,
      blogJuejin: undefined,
      blogZhihu: undefined,
      blogGithub: undefined,
      profileBio: undefined,
      devLanguages: undefined,
      role: '',
      userId: ''
    }
  }),
  getters: {
    userProfile(state) {
      return { ...state }
    }
  },
  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'user' : 'admin'
        resolve(this.role)
      })
    },
    // 设置用户的信息
    setInfo(partial) {
      this.$patch(partial)
    },
    // 重置用户信息
    resetInfo() {
      this.$reset()
    },
    // 获取用户信息
    async getUserInfo() {
      const token = Storage.get(ACCESS_TOKEN_KEY)
      if (token) {
        // const userInfo = await getUserProfile()
        const userInfo = {
          userName: 'admin',
          userId: 1
        }
        return (this.userInfo = userInfo)
      }
      this.resetInfo()
    },
    // 异步登录并存储token
    async login(loginForm) {
      const ex = 7 * 24 * 60 * 60 * 1000
      Storage.set(ACCESS_TOKEN_KEY, 'Bearer token', ex)
      // const result = await userLogin(loginForm)
      // const token = result?.token
      // if (token) {
      //   setToken(token)
      // }
      // return result
    },
    // Logout
    async logout() {
      // await userLogout()
      this.resetInfo()
      Storage.remove(ACCESS_TOKEN_KEY)
      // 路由表重置
      // location.reload();
    }
  }
})
