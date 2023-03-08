export const schemaFormItemProps = {
  formModel: {
    type: Object,
    default: () => ({})
  },
  schema: {
    type: Object,
    default: () => ({})
  },
  // 动态表格实例
  tableInstance: {
    type: Object
  },
  // 动态表格rowKey
  tableRowKey: {
    type: [String, Number]
  }
}
