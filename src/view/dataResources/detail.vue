<template>
  <div class="data-resource-detail text-center">
    <h3 class="text-center">Data Resources Detail</h3>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="chart-card">
            <p class="chart-title">Hematite_EELS _Fe LL Spectrum</p>
            <div class="chart"><ZoomLineChart /></div>
            <div class="download-wrap">
              <a href="">Hematite_EELS _Fe LL Spectrum.msa</a>
              <a href="">Hematite_EELS _Fe LL Spectrum.dm4</a>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chart-card">
            <p class="chart-title">Hematite_EELS _Fe HL Spectrum</p>
            <div class="chart"><ZoomLineChart /></div>
            <div class="download-wrap">
              <a href="">Hematite_EELS _Fe HL Spectrum.msa</a>
              <a href="">Hematite_EELS _Fe HL Spectrum.dm4</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content-table-wrap">
      <div class="content-table">
        <el-table :data="tableGeneralData" style="width: 100%" align="center">
          <el-table-column label="General">
            <el-table-column prop="element" label="Element" />
            <el-table-column prop="formula" label="Formula" />
            <el-table-column prop="mineralName" label="Mineral Name" />
          </el-table-column>
        </el-table>
      </div>
      <div class="content-table">
        <el-table :data="tableGeneralData2" style="width: 100%">
          <el-table-column label="Specimen Information">
            <el-table-column prop="specimenType" label="Specimen Type" />
            <el-table-column prop="relativeThickness" label="Relative Thickness(t/)" />
          </el-table-column>
          <el-table-column label="Data">
            <el-table-column prop="bandgapEnergy" label="Bandgap Energy(eV)" />
            <el-table-column prop="plasmonEnergy" label="Plasmon Energy(eV)" />
          </el-table-column>
        </el-table>
      </div>
      <div class="content-table text-center">
        <el-table :data="tableGeneralData3" style="width: 100%">
          <el-table-column label="Equipment Information">
            <el-table-column prop="microscopeName" label="Microscope Name/Model" />
            <el-table-column prop="gunType" label="Gun Type" />
            <el-table-column prop="detector" label="Detector" />
            <el-table-column prop="acquisitionMode" label="Acquisition Mode" />
            <el-table-column prop="convergence" label="Convergence Semi-angle" />
            <el-table-column prop="collection" label="Collection Semi-angle" />
            <el-table-column prop="probeSize" label="Probe Size(nm)" />
          </el-table-column>
        </el-table>
      </div>
      <div class="content-table text-center">
        <el-table :data="tableGeneralData4" style="width: 100%">
          <el-table-column label="Spectrum Information">
            <el-table-column prop="microscopeName" label="Microscope Name/Model" />
            <el-table-column prop="gunType" label="Gun Type" />
            <el-table-column prop="detector" label="Detector" />
            <el-table-column prop="acquisitionMode" label="Acquisition Mode" />
            <el-table-column prop="convergence" label="Convergence Semi-angle" />
            <el-table-column prop="collection" label="Collection Semi-angle" />
            <el-table-column prop="probeSize" label="Probe Size(nm)" />
          </el-table-column>
        </el-table>
      </div>
      <div class="content-table text-center">
        <el-table :data="tableGeneralData5" style="width: 100%">
          <el-table-column label="citation">
            <el-table-column prop="microscopeName" label="Microscope Name/Model" />
            <el-table-column prop="gunType" label="Gun Type" />
            <el-table-column prop="detector" label="Detector" />
            <el-table-column prop="acquisitionMode" label="Acquisition Mode" />
            <el-table-column prop="convergence" label="Convergence Semi-angle" />
            <el-table-column prop="collection" label="Collection Semi-angle" />
            <el-table-column prop="probeSize" label="Probe Size(nm)" />
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ZoomLineChart from './components/ZoomLineChart.vue'
import { SourceData } from '@/constants/options'
import { tableGeneralData, tableGeneralData2, tableGeneralData3, tableGeneralData4, tableGeneralData5 } from './lineData'
// import { fetchData } from '../api/index'

const query = reactive({
  mineral: [],
  chemistry: [],
  chemicalFormula: '',
  source: '',
  name: '',
  status: '',
  edge: '',
  type: '',
  pageIndex: 1,
  pageSize: 10
})
const tableData = ref([])
const pageTotal = ref(0)
// 获取表格数据
const getData = () => {
  // fetchData().then((res) => {
  //   tableData.value = res.data.list
  //   pageTotal.value = res.data.pageTotal || 50
  // })
}
getData()

// 查询操作
const handleSearch = () => {
  query.pageIndex = 1
  getData()
}
// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val
  getData()
}

// 删除操作
const handleDelete = (index: number) => {
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      ElMessage.success('删除成功')
      tableData.value.splice(index, 1)
    })
    .catch(() => {})
}

// 表格编辑时弹窗和保存
const editVisible = ref(false)
let form = reactive({
  name: '',
  address: ''
})
let idx: number = -1
const handleEdit = (index: number, row: any) => {
  idx = index
  form.name = row.name
  form.address = row.address
  editVisible.value = true
}
const saveEdit = () => {
  editVisible.value = false
  ElMessage.success(`修改第 ${idx + 1} 行成功`)
  tableData.value[idx].name = form.name
  tableData.value[idx].address = form.address
}
</script>

<style lang="less" scoped>
.data-resource-detail {
  min-height: @page-content-min-height;
  padding: 20px;
  overflow: hidden;
}

h3 {
  color: @color-secondary;
}

.content {
  padding: 20px 0;
  margin-bottom: 20px;
  .chart-card {
    .chart-title {
      color: @color-secondary;
      font-weight: bold;
      font-size: 16px;
    }
    .chart {
      border: 1px solid #ccc;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .download-wrap {
      display: flex;
      a {
        color: #12c2ff;
        flex: 1;
        font-weight: bold;
      }
    }
  }
}
.content-table-wrap {
  margin-bottom: 50px;
  .content-table {
    margin-bottom: 10px;
    :deep(table) {
      thead {
        tr:first-child {
          th {
            background-color: @color-secondary;
            color: #fff;
          }
        }
      }
      th,
      td {
        padding: 0;
        text-align: center;
        color: #000;
      }
    }
  }
}
</style>
