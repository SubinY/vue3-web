import { tableProps } from 'ant-design-vue/es/table'
import { isBoolean } from '@/utils/is'

export const dynamicTableProps = {
  ...tableProps(),
  rowKey: {
    type: [String, Function],
    default: 'id'
  },
  /** 是否显示搜索表单 */
  search: {
    type: Boolean,
    default: true
  },
  /** 表单属性配置 */
  formProps: {
    type: Object,
    default: () => ({})
  },
  /** 表格列配置 */
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  /** 表格数据请求函数 */
  dataRequest: {
    // 获取列表数据函数API
    type: Function
  },
  /** 是否显示索引号 */
  showIndex: {
    type: Boolean,
    default: false
  },
  /** 索引列属性配置 */
  indexColumnProps: {
    type: Object,
    default: () => ({})
  },
  /** 是否显示表格工具栏 */
  showToolBar: {
    type: Boolean,
    default: true
  },
  /** 是否显示表格设置 */
  showTableSetting: {
    type: Boolean,
    default: true
  },
  /** 表格标题 */
  headerTitle: String,
  /** 表格标题提示信息 */
  titleTooltip: String,
  /** 表格自适应高度 */
  autoHeight: Boolean,
  // excel导出配置
  /** 导出的文件名 */
  exportFileName: {
    type: String
  },
  /** xlsx的booktype */
  exportBookType: {
    type: String,
    default: 'xlsx'
  },
  /** 自动宽度 */
  exportAutoWidth: {
    type: Boolean,
    default: true
  },
  /** 自定义数据导出格式函数 */
  exportFormatter: {
    type: Function,
    default: null
  },
  /** 编辑行类型
   * @const `single`: 只能同时编辑一行
   * @const `multiple`: 同时编辑多行
   * @const `cell`: 可编辑单元格
   * @defaultValue `single`
   */
  editableType: {
    type: String,
    default: 'single'
  },
  /** 单元格保存编辑回调 */
  onSave: {
    type: Function
  },
  /** 单元格取消编辑回调 */
  onCancel: {
    type: Function
  },
  /** 只能编辑一行的的提示 */
  onlyOneLineEditorAlertMessage: String
}

export const dynamicTableEmits = {
  change: (...rest) => rest.length === 4,
  'toggle-advanced': (isAdvanced) => isBoolean(isAdvanced)
}
