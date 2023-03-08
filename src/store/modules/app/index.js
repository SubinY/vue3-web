import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  // 唯一ID
  'app',
  {
    state: () => ({
      title: 'chemistry'
    }),
    getters: {},
    actions: {
      updateSettings(partial) {
        this.$patch(partial)
      }
    }
    // persist: {
    //   key: 'theme',
    //   storage: localStorage,
    //   paths: ['theme'],
    // },
  }
)
