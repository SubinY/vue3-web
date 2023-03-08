<template>
  <div class="data-resource-list">
    <div>
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="query.mineral" placeholder="Mineral" class="handle-input mr10"></el-input
          ></el-col>
          <el-col :span="6">
            <el-input v-model="query.chemistry" placeholder="Chemistry" class="handle-input mr10"></el-input
          ></el-col>
          <el-col :span="6">
            <el-input v-model="query.chemicalFormula" placeholder="ChemicalFormula" class="handle-input mr10"></el-input
          ></el-col>
          <el-col :span="6">
            <el-select v-model="query.source" placeholder="Source" class="handle-select mr10">
              <el-option
                v-for="item in SourceData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> </el-select
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="query.mineral" placeholder="Mineral" class="handle-input mr10"></el-input
          ></el-col>
          <el-col :span="6">
            <el-input v-model="query.chemistry" placeholder="Chemistry" class="handle-input mr10"></el-input
          ></el-col>
          <el-col :span="6">
            <el-input v-model="query.chemicalFormula" placeholder="ChemicalFormula" class="handle-input mr10"></el-input
          ></el-col>
          <el-col :span="6"> <el-button type="primary" :icon="Search" @click="handleSearch">Search</el-button></el-col>
        </el-row>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="mineral" label="Mineral"></el-table-column>
        <el-table-column prop="chemistry" label="Chemistry"></el-table-column>
        <el-table-column prop="chemicalFormula" label="Chemical Formula"></el-table-column>
        <el-table-column prop="source" label="Source"> </el-table-column>
        <el-table-column prop="status" label="Sample Status"></el-table-column>
        <el-table-column prop="edge" label="Edge"></el-table-column>
        <el-table-column label="More Detail" width="100">
          <template #default="scope">
            <el-button text @click="handleCheck(scope.$index, scope.row)" v-permiss="15"> Check </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue'
import { SourceData } from '@/constants/options'
import useListFetch from './useListFetch.js'
// import { fetchData } from '../api/index'

const router = useRouter()
const { tableData, pageTotal, fetch } = useListFetch()
const query = reactive({
  mineral: [],
  chemistry: [],
  chemicalFormula: '',
  source: '',
  status: '',
  edge: '',
  type: '',
  pageIndex: 1,
  pageSize: 10
})

// 查询操作
const handleSearch = () => {
  query.pageIndex = 1
  fetch()
}
// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val
  fetch()
}

// 表格编辑时弹窗和保存
const editVisible = ref(false)
let form = reactive({
  name: '',
  address: ''
})
let idx: number = -1
const handleCheck = (index: number, row: any) => {
  router.push({
    path: '/data-resources/detail',
    query: {
      id: 123,
      name: 'asdf'
    }
  })
}
const saveEdit = () => {
  editVisible.value = false
  ElMessage.success(`修改第 ${idx + 1} 行成功`)
  tableData.value[idx].name = form.name
  tableData.value[idx].address = form.address
}
</script>

<style lang="less" scoped>
.data-resource-list {
  min-height: @page-content-min-height;
  padding: 50px;
  overflow: hidden;
}

.handle-box {
  margin-bottom: 20px;
  .el-row {
    margin-bottom: 20px;
  }
}

.handle-input,
.handle-select {
  width: 100%;
}

.table {
  width: 100%;
  font-size: 14px;
  :deep(table) {
    thead > tr > th {
      background-color: #34349a;
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
  }
}
.red {
  color: #f56c6c;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
