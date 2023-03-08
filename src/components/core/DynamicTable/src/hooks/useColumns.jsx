import { ref, watchEffect, unref, useSlots } from 'vue'
import { cloneDeep, isFunction, mergeWith } from 'lodash-es'
import { EditableCell } from '../components'
import { isBoolean } from '@/utils/is'
import { TableAction } from '../components'
import { ColumnKeyFlag } from '../enum'

// export type UseTableColumnsContext = {
//   state: TableState
//   props: DynamicTableProps
//   methods: TableMethods
//   tableAction: TableActionType
//   slots: Slots
// }

export const useColumns = ({ state, methods, props, tableAction }) => {
  const slots = useSlots()
  const innerColumns = ref(props.columns)
  const { getColumnKey } = methods
  const { getProps } = state
  const { isEditable } = tableAction

  watchEffect(() => {
    const innerProps = { ...unref(getProps) }
    const ColumnKeyFlags = Object.keys(ColumnKeyFlag)
    const columns = cloneDeep(innerProps?.columns?.filter((n) => !n.hideInTable))

    // 是否添加序号列
    if (innerProps?.showIndex) {
      columns.unshift({
        dataIndex: 'ACTION',
        title: '序号',
        width: 60,
        align: 'center',
        fixed: 'left',
        ...innerProps?.indexColumnProps,
        customRender: ({ index }) => {
          const getPagination = unref(state.paginationRef)
          if (isBoolean(getPagination)) {
            return index + 1
          }
          const { current = 1, pageSize = 10 } = getPagination
          return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1
        }
      })
    }

    innerColumns.value = columns.map((item) => {
      const customRender = item.customRender

      const rowKey = props.rowKey
      const columnKey = getColumnKey(item)

      item.customRender = (options) => {
        const { record, index, text } = options
        /** 当前行是否开启了编辑行模式 */
        const isEditableRow = isEditable(record[rowKey])
        /** 是否开启了单元格编辑模式 */
        const isEditableCell = innerProps.editableType === 'cell'
        /** 当前单元格是否允许被编辑 */
        const isCellEditable = isBoolean(item.editable) ? item.editable : item.editable?.(options) ?? true
        /** 是否允许被编辑 */
        const isShowEditable =
          (isEditableRow || isEditableCell) && isCellEditable && !ColumnKeyFlags.includes(columnKey)

        return isShowEditable ? (
          <EditableCell
            schema={getColumnFormSchema(item, record)}
            rowKey={record[rowKey] ?? index}
            editableType={innerProps.editableType}
            column={options}
            v-slots={slots}
          >
            {customRender?.(options) ?? text}
          </EditableCell>
        ) : (
          customRender?.(options)
        )
      }

      // 操作列
      if (item.actions && columnKey === ColumnKeyFlag.ACTION) {
        item.customRender = (options) => {
          const { record, index } = options
          return (
            <TableAction
              actions={item.actions(options, tableAction)}
              rowKey={record[rowKey] ?? index}
              columnParams={options}
            />
          )
        }
      }
      return {
        key: item.key ?? item.dataIndex,
        dataIndex: item.dataIndex ?? item.key,
        ...item
      }
    })
  })

  function mergeCustomizer(objValue, srcValue, key) {
    /** 这里着重处理 `componentProps` 为函数时的合并处理 */
    if (key === 'componentProps') {
      return (...rest) => {
        return {
          ...(isFunction(objValue) ? objValue(...rest) : objValue),
          ...(isFunction(srcValue) ? srcValue(...rest) : srcValue)
        }
      }
    }
  }

  /** 获取当前行的form schema */
  const getColumnFormSchema = (item, record) => {
    const key = getColumnKey(item)
    /** 是否继承搜索表单的属性 */
    const isExtendSearchFormProps = !Object.is(item.editFormItemProps?.extendSearchFormProps, false)

    return {
      field: `${record[props.rowKey]}.${item.searchField ?? key}`,
      component: 'Input',
      defaultValue: record[key],
      colProps: {
        span: unref(getProps).editableType === 'cell' ? 20 : 24
      },
      formItemProps: {
        help: ''
      },
      ...(isExtendSearchFormProps
        ? mergeWith(cloneDeep(item.formItemProps), item.editFormItemProps, mergeCustomizer)
        : item.editFormItemProps)
    }
  }

  return {
    innerColumns
  }
}
