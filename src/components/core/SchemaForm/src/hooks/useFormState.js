import { computed, reactive, ref, unref, watchEffect } from 'vue'
import { cloneDeep } from 'lodash-es'
import { isFunction } from '@/utils/is'

// export type FormState = ReturnType<typeof useFormState>;

// export type useFormStateParams = {
//   props: SchemaFormProps;
//   attrs: SetupContext['attrs'];
// };

export const useFormState = ({ props, attrs }) => {
  // TODO 将formSchema克隆一份，避免修改原有的formSchema
  const formPropsRef = ref(cloneDeep(props))
  /** 表单项数据 */
  const formModel = reactive({ ...props.initialValues })
  // 表单默认数据
  const defaultFormValues = reactive({ ...props.initialValues })
  // 表单实例
  const schemaFormRef = ref()
  // 缓存的表单值，用于恢复form-item v-if为true后的值
  const cacheFormModel = { ...props.initialValues }
  // 将所有的表单组件实例保存起来
  const compRefMap = new Map()
  // 初始时的componentProps，用于updateSchema更新时不覆盖componentProps为函数时的值
  const originComponentPropsFnMap = new Map()

  const advanceState = reactive({
    isAdvanced: true,
    hideAdvanceBtn: false,
    isLoad: false,
    actionSpan: 6
  })

  // 获取表单所有属性
  const getFormProps = computed(() => {
    return {
      ...attrs,
      ...formPropsRef.value
    }
  })

  // 获取栅栏Row配置
  const getRowConfig = computed(() => {
    const { baseRowStyle = {}, rowProps } = unref(getFormProps)
    return {
      style: baseRowStyle,
      ...rowProps
    }
  })

  const getFormActionBindProps = computed(() => ({ ...getFormProps.value, ...advanceState }))

  watchEffect(() => {
    formPropsRef.value.schemas?.forEach((item) => {
      if (!originComponentPropsFnMap.has(item.field) && isFunction(item.componentProps)) {
        originComponentPropsFnMap.set(item.field, item.componentProps)
      }
    })
  })

  return {
    formModel,
    defaultFormValues,
    schemaFormRef,
    formPropsRef,
    cacheFormModel,
    compRefMap,
    getFormProps,
    advanceState,
    getRowConfig,
    getFormActionBindProps,
    originComponentPropsFnMap,
    formSchemasRef: computed(() => unref(formPropsRef).schemas || [])
  }
}
