import { unref, computed, watchEffect } from 'vue'
import { ColumnKeyFlag } from '../enum'

// export type UseTableFormContext = {
//   tableState: TableState;
//   tableMethods: TableMethods;
//   slots: Slots;
// };

export function useTableForm({ tableState, slots, tableMethods }) {
  const { getProps, loadingRef } = tableState
  const { getColumnKey, getQueryFormRef } = tableMethods

  const getFormProps = computed(() => {
    const { formProps } = unref(getProps)
    const { submitButtonOptions } = formProps || {}
    return {
      showAdvancedButton: true,
      layout: 'horizontal',
      labelWidth: 100,
      ...formProps,
      schemas: formProps.schemas || unref(formSchemas),
      submitButtonOptions: { loading: unref(loadingRef), ...submitButtonOptions },
      compact: true
    }
  })

  const formSchemas = computed(() => {
    const columnKeyFlags = Object.keys(ColumnKeyFlag)
    return unref(getProps)
      .columns.filter((n) => {
        const field = getColumnKey(n)
        return !n.hideInSearch && !!field && !columnKeyFlags.includes(field)
      })
      .map((n) => {
        return {
          field: n.searchField || getColumnKey(n),
          component: 'Input',
          label: n.title,
          colProps: {
            span: 8
          },
          ...n.formItemProps
        }
      })
      .sort((a, b) => Number(a?.order) - Number(b?.order))
  })

  // 同步外部对props的修改
  watchEffect(() => getQueryFormRef()?.setSchemaFormProps(unref(getFormProps)), {
    flush: 'post'
  })

  const getFormSlotKeys = computed(() => {
    const keys = Object.keys(slots)
    return keys.map((item) => (item.startsWith('form-') ? item : null)).filter((item) => !!item)
  })

  function replaceFormSlotKey(key: string) {
    if (!key) return ''
    return key?.replace?.(/form-/, '') || ''
  }

  return {
    getFormProps,
    replaceFormSlotKey,
    getFormSlotKeys
  }
}
