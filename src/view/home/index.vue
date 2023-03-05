<template>
  <div class="home-page text-center">
    <h4>Welcome to the MEELS GIG Project website</h4>
    <h4 class="second-h4">Search MEELS GIG Data</h4>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="0"
      class="form center-block"
    >
      <el-form-item label="Mineral" prop="mineral">
        <MineralSelect v-model="ruleForm.mineral" />
        <!-- <el-select v-model="ruleForm.mineral" multiple placeholder="Mineral">
          <el-option-group
            v-for="group in mineralData"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select> -->
      </el-form-item>
      <el-form-item label="Chemistry" prop="chemistry">
        <el-input
          v-model="ruleForm.chemistry"
          placeholder="Chemistry"
          readonly
        />
        <el-button
          class="chemistrys-select"
          type="primary"
          @click="isPeriodicShow = !isPeriodicShow"
          >Select</el-button
        >
      </el-form-item>
      <el-form-item label="ChemicalFormula" prop="chemicalFormula">
        <el-input
          v-model="ruleForm.chemicalFormula"
          placeholder="ChemicalFormula"
        />
      </el-form-item>
      <el-form-item label="Source" prop="source">
        <el-input v-model="ruleForm.source" placeholder="Source" />
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button
          style="margin-right: 160px"
          type="primary"
          @click="handleSubmit(ruleFormRef)"
          >Search</el-button
        >
        <el-button
          style="background-color: #ddd; color: #888"
          @click="handleReset(ruleFormRef)"
          >Reset</el-button
        >
      </el-form-item>
    </el-form>
    <PeriodicTable v-if="isPeriodicShow" v-model="ruleForm.chemistry" />
    <p class="tips center-block">
      查询条件：Lorem ipsum dolor sit amet, consectetur adipiscing edit. Aenean
      euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et
      viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque
      penatibus et magnis dis partuient montes, nascetur ridiculus mus. Nam
      fermentum, nulla Ictus pharetra vulputate, felis tellus mollis orci, sed
      rhoncus pronin sapien nunc accuan eget.
    </p>
    <div class="card-wrap center-block">
      <a target="_blank" href="https://rruff.info/#"
        ><img src="/src/assets/img/EELS1.gif"
      /></a>
      <a target="_blank" href="https://eelsdb.eu/"
        ><img src="/src/assets/img/EELS2.png"
      /></a>
      <a target="_blank" href="https://eels.info/"
        ><img src="/src/assets/img/EELS3.png"
      /></a>
    </div>
  </div>
</template>

<script setup name="HomePage">
import { reactive, ref } from 'vue'
import { getCurrentInstance, onMounted } from 'vue'
import PeriodicTable from '@/components/PeriodicTable/index.vue'
import MineralSelect from './components/MineralSelect/index.vue'

// const { proxy } = getCurrentInstance() //获取上下文实例，ctx=vue2的this

const mineralModalVisible = ref(false)
const isPeriodicShow = ref(false)
const ruleFormRef = ref()

const ruleForm = reactive({
  mineral: [],
  chemistry: [],
  chemicalFormula: '',
  source: ''
})

const rules = reactive({
  age: [{ validator: checkAge, trigger: 'blur' }]
})

onMounted(() => {})

function checkAge(rule, value, callback) {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

function handleSubmit() {
  console.log(ruleForm, 'ruleForm')
}

function handleReset(formEl) {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
/* 整体盒子 */
.home-page {
  background-color: @color-secondary;
  min-height: @page-content-min-height;
  padding: 50px 0;
  overflow: hidden;
  color: @color-text-gray;
}
h4 {
  margin-bottom: 40px;
}
.second-h4 {
  margin-bottom: 35px;
}
.form {
  max-width: 600px;
  :deep(.el-select) {
    width: 100%;
  }
  :deep(.el-form-item) {
    margin-bottom: 10px;
    position: relative;
    > label {
      visibility: hidden;
    }
  }
  .form-footer {
    :deep(.el-form-item__content) {
      justify-content: center;
      padding: 15px 0;
      // margin-bottom: 20px;
      .el-button {
        width: 110px;
        font-size: 16px;
      }
    }
  }

  .chemistrys-select {
    position: absolute;
    right: -80px;
    top: 5px;
    height: 28px;
  }
}

.card-wrap {
  max-width: 730px;
  display: flex;
  background-color: #fff;
  color: #000;
  margin-top: 25px;
  > a {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #aaa;
    cursor: pointer;
    &:last-child {
      border: none;
    }
    > p {
      margin-bottom: 0;
    }
    .card-title {
      font-size: 18px;
    }
    .card-subtitle {
      font-size: 12px;
    }
  }
}

.tips {
  text-align: left;
  max-width: 625px;
  font-size: 12px;
  margin-bottom: 20px;
}
</style>

