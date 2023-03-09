import { computed, getCurrentInstance, ref, onBeforeUnmount } from 'vue'
import debounce from 'lodash/debounce'

export const useResize = (callback, waitTime = 100) => {
  
  const debounceFn = debounce(callback, waitTime)

  window.addEventListener('resize', debounceFn)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debounceFn)
  })
}
