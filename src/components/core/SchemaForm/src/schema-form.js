import { formProps } from 'ant-design-vue/es/form'
import { isObject } from '@/utils/is'

export const aFormPropKeys = Object.keys(formProps())

export const schemaFormProps = {
  ...formProps(),
  layout: {
    type: String,
    default: 'horizontal'
  },
  /** 预置字段默认值 */
  initialValues: {
    type: Object,
    default: () => ({})
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String],
    default: 0
  },
  fieldMapToTime: {
    type: Array,
    default: () => []
  },
  compact: { type: Boolean },
  /** 表单配置规则 */
  schemas: {
    type: [Array],
    default: () => []
  },
  mergeDynamicData: {
    type: Object,
    default: null
  },
  baseRowStyle: {
    type: Object
  },
  baseColProps: {
    type: Object
  },
  autoSetPlaceHolder: { type: Boolean, default: true },
  /** 在INPUT组件上单击回车时，是否自动提交 */
  autoSubmitOnEnter: { type: Boolean, default: false },
  submitOnReset: { type: Boolean },
  submitOnChange: { type: Boolean },
  /** 禁用表单 */
  disabled: { type: Boolean },
  emptySpan: {
    type: [Number, Object],
    default: 0
  },
  /** 是否显示收起展开按钮 */
  showAdvancedButton: { type: Boolean },
  /** 转化时间 */
  transformDateFunc: {
    type: Function,
    default: (date) => {
      return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date
    }
  },
  rulesMessageJoinLabel: { type: Boolean, default: true },
  /** 超过3行自动折叠 */
  autoAdvancedLine: {
    type: Number,
    default: 3
  },
  /** 不受折叠影响的行数 */
  alwaysShowLines: {
    type: Number,
    default: 1
  },

  /** 是否显示操作按钮 */
  showActionButtonGroup: { type: Boolean, default: true },
  /** 操作列Col配置 */
  actionColOptions: Object,
  /** 显示重置按钮 */
  showResetButton: { type: Boolean, default: true },
  /** 是否聚焦第一个输入框，只在第一个表单项为input的时候作用 */
  autoFocusFirstItem: { type: Boolean },
  /** 重置按钮配置 */
  resetButtonOptions: Object,

  /** 显示确认按钮 */
  showSubmitButton: { type: Boolean, default: true },
  /** 确认按钮配置 */
  submitButtonOptions: Object,

  /** 自定义重置函数 */
  resetFunc: Function,
  submitFunc: Function,
  /** 动态表格实例 */
  tableInstance: {
    type: Object
  },

  rowProps: Object
}

export const schemaFormEmits = {
  register: (exposed) => isObject(exposed),
  reset: (formModel) => isObject(formModel),
  submit: (formModel) => isObject(formModel),
  'advanced-change': () => true
}
