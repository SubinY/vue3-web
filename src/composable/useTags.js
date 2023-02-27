import { api } from 'src/services'
import { ref } from 'vue'

export function useTags() {
  const tags = ref([])

  async function fetchTags() {
    tags.value = []
    tags.value = await api.tags.getTags().then(({ data }) => data.tags)
  }

  return {
    fetchTags,
    tags
  }
}
