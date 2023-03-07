import { ref, reactive, onMounted } from 'vue'
import * as API from '@/apis/data-resources'

export default function useListFetch() {
  const list = reactive([])

  const fetch = async (params = {}) => {
    console.log(await API.list({}))
  }

  onMounted(() => {
    fetch()
    console.log('onMounted')
  })

  return {
    list,
    fetch
  }
}
