import { nextTick, ref, unref, watch } from 'vue'
import { isEmpty } from 'lodash-es'
import DynamicTable from '../../index'

export function useTable(props) {
  const dynamicTableRef = ref({})

  async function getTableInstance() {
    await nextTick()
    const table = unref(dynamicTableRef)
    if (isEmpty(table)) {
      console.error('未获取表格实例!')
    }
    return table
  }
  watch(
    () => props,
    async () => {
      if (props) {
        // console.log('table onMounted');
        await nextTick()
        const tableInstance = await getTableInstance()
        tableInstance?.setProps?.(props)
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  const methods = new Proxy()(dynamicTableRef, {
    get(target, key) {
      if (Reflect.has(target, key)) {
        return unref(target)
      }
      if (target.value && Reflect.has(target.value, key)) {
        return Reflect.get(target.value, key)
      }
      return async (...rest) => {
        const table = await getTableInstance()
        return table?.[key]?.(...rest)
      }
    }
  })

  const DynamicTableRender = (compProps, { attrs, slots }) => {
    return <DynamicTable ref={dynamicTableRef} {...{ ...attrs, ...props, ...compProps }} v-slots={slots}></DynamicTable>
  }

  return [DynamicTableRender, unref(methods)]
}
