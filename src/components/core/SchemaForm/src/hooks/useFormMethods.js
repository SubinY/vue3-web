import { unref } from 'vue'
import { set } from 'lodash-es'
import { deepMerge } from '@/utils/'
import { isFunction, isNullOrUnDef, isObject, isArray, isString } from '@/utils/is'
import { dateUtil } from '@/utils/dateUtil'

// type UseFormMethodsContext = FormState;

// export type FormMethods = ReturnType<typeof useFormMethods>;

export const useFormMethods = (formMethodsContext) => {
  const { compRefMap, formModel, formPropsRef, cacheFormModel, defaultFormValues, schemaFormRef, getFormProps } =
    formMethodsContext

  // 将所有的表单组件实例保存起来, 方便外面通过表单组件实例操作
  const setItemRef = (field) => {
    return (el) => {
      if (el) {
        compRefMap.set(field, el)
      }
    }
  }

  // 设置某个字段的值
  const setFormModel = (key, value) => {
    formModel[key] = value
    cacheFormModel[key] = value
    const { validateTrigger } = unref(getFormProps)
    if (!validateTrigger || validateTrigger === 'change') {
      schemaFormRef.value?.validateFields([key])
    }
  }

  // 删除某个字段
  const delFormModel = (key) => {
    return Reflect.deleteProperty(formModel, key)
  }

  const setSchemaFormProps = (formProps) => {
    formPropsRef.value = deepMerge(unref(formPropsRef) || {}, formProps)
  }

  // Processing form values
  function handleFormValues(values) {
    if (!isObject(values)) {
      return {}
    }
    const res = {}
    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue
      }
      const transformDateFunc = unref(getFormProps).transformDateFunc
      if (isObject(value)) {
        value = transformDateFunc?.(value)
      }

      if (isArray(value) && value[0]?.format && value[1]?.format) {
        value = value.map((item) => transformDateFunc?.(item))
      }
      // Remove spaces
      if (isString(value)) {
        value = value.trim()
      }
      set(res, key, value)
    }
    return handleRangeTimeValue(res)
  }

  /**
   * @description: Processing time interval parameters
   */
  function handleRangeTimeValue(values) {
    const fieldMapToTime = unref(getFormProps).fieldMapToTime

    if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
      return values
    }

    for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMapToTime) {
      if (!field || !startTimeKey || !endTimeKey || !values[field]) {
        continue
      }

      const [startTime, endTime] = values[field]

      values[startTimeKey] = dateUtil(startTime).format(format)
      values[endTimeKey] = dateUtil(endTime).format(format)
      Reflect.deleteProperty(values, field)
    }

    return values
  }

  // 初始化数据
  const initFormValues = () => {
    unref(formPropsRef).schemas?.forEach((item) => {
      const { defaultValue } = item
      if (!isNullOrUnDef(defaultValue)) {
        formModel[item.field] = defaultValue
        defaultFormValues[item.field] = defaultValue
        cacheFormModel[item.field] = defaultValue
      }
    })
  }

  return {
    setItemRef,
    initFormValues,
    setFormModel,
    delFormModel,
    setSchemaFormProps,
    handleFormValues
  }
}
