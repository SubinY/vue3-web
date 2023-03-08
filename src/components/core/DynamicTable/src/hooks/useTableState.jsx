import { computed, ref, unref, watch } from 'vue'
import { omit } from 'lodash-es'
import { useScroll } from './useScroll'

// export type Pagination = TableProps['pagination'];
// export type TableState = ReturnType<typeof useTableState>;

// export type UseTableStateParams = {
//   props: DynamicTableProps;
//   slots: Slots;
// };

export const useTableState = ({ props, slots }) => {
  const { scroll } = useScroll({ props })
  /** 表格实例 */
  const tableRef = ref()
  /** 查询表单实例 */
  const queryFormRef = ref()
  /** 编辑表格的表单实例 */
  const editTableFormRef = ref()
  /** 表格数据 */
  const tableData = ref([])
  /** 内部属性 */
  const innerPropsRef = ref()
  /** 分页配置参数 */
  const paginationRef = ref(false)
  /** 表格加载 */
  const loadingRef = ref(!!props.loading)
  /** 编辑表单model */
  const editFormModel = ref({})
  /** 所有验证不通过的表单项 */
  const editFormErrorMsgs = ref(new Map())
  /** 当前所有正在被编辑的行key的格式为：`${recordKey}`  */
  const editableRowKeys = ref(new Set())
  /** 当前所有正在被编辑的单元格key的格式为：`${recordKey}.${dataIndex}`，仅`editableType`为`cell`时有效  */
  const editableCellKeys = ref(new Set())

  if (!Object.is(props.pagination, false)) {
    paginationRef.value = {
      current: 1,
      pageSize: 10,
      total: 0,
      pageSizeOptions: ['10', '20', '50', '100'],
      showQuickJumper: true,
      showSizeChanger: true, // 显示可改变每页数量
      showTotal: (total) => `共 ${total} 条数据`, // 显示总数
      // onChange: (current, pageSize) => pageOption?.pageChange?.(current, pageSize),
      // onShowSizeChange: (current, pageSize) => pageOption?.pageChange?.(current, pageSize),
      ...props.pagination
    }
  }

  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) }
  })

  const getBindValues = computed(() => {
    const props = unref(getProps)

    let propsData = {
      ...props,
      rowKey: props.rowKey ?? 'id',
      loading: props.loading ?? unref(loadingRef),
      pagination: unref(paginationRef),
      tableLayout: props.tableLayout ?? 'fixed',
      scroll: unref(scroll)
    }
    if (slots.expandedRowRender) {
      propsData = omit(propsData, 'scroll')
    }

    propsData = omit(propsData, ['class', 'onChange', 'columns'])
    return propsData
  })

  // 如果外界设置了dataSource，那就直接用外界提供的数据
  watch(
    () => props.dataSource,
    (val) => {
      if (val) {
        tableData.value = val
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  watch(
    () => props.columns,
    (val) => {
      if (val) {
        innerPropsRef.value = {
          ...innerPropsRef.value,
          columns: val
        }
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  return {
    tableRef,
    editTableFormRef,
    loadingRef,
    tableData,
    queryFormRef,
    innerPropsRef,
    getProps,
    getBindValues,
    paginationRef,
    editFormModel,
    editFormErrorMsgs,
    editableCellKeys,
    editableRowKeys
  }
}
