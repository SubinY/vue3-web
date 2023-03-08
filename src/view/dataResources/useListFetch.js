import { ref, reactive, onMounted } from 'vue'
import * as API from '@/apis/data-resources'

export default function useListFetch() {
  const tableData = ref([])
  const pageTotal = ref(0)

  const fetch = async (params = {}) => {
    const { list } = await API.list({})
    tableData.value = list
    pageTotal.value = list?.length
  }

  onMounted(() => {
    fetch()
  })

  return {
    tableData,
    pageTotal,
    fetch
  }
}
