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
        <el-select v-model="ruleForm.mineral" multiple placeholder="Mineral">
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
        </el-select>
      </el-form-item>
      <el-form-item label="Element" prop="element">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="ChemicalFormula" prop="chemicalFormula">
        <el-input v-model.number="ruleForm.age" />
      </el-form-item>
      <el-form-item label="Source" prop="source">
        <el-input v-model.number="ruleForm.age" />
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
    <p class="tips center-block">
      Welcome to the MEELS GIG Project websiteWelcome to the MEELS GIG Project
      websiteWelcome to the MEELS GIG Project websiteWelcome to the MEELS GIG
      Project websiteWelcome to the MEELS GIG Project websiteWelcome to the
      MEELS GIG Project website
    </p>
    <div class="card-wrap center-block">
      <div>
        <p class="card-title">EELS Data Base</p>
        <p class="card-subtitle">(相关网站，支持跳转)</p>
      </div>
      <div>
        <p class="card-title">EELS Data Base</p>
      </div>
      <div>
        <p class="card-title">EELS Data Base</p>
      </div>
    </div>
  </div>
</template>

<script setup name="HomePage">
import { reactive, ref } from 'vue'
import { getCurrentInstance, onMounted } from 'vue'
import { MineralData } from './data'

// const { proxy } = getCurrentInstance() //获取上下文实例，ctx=vue2的this

const mineralData = ref(MineralData)
const ruleFormRef = ref()

const ruleForm = reactive({
  mineral: '',
  element: '',
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

function handleSubmit() {}

function handleReset() {}
</script>

<style lang="less" scoped>
/* 整体盒子 */
.home-page {
  background-color: @color-secondary;
  min-height: @page-content-min-height;
  padding: 30px 0;
  overflow: hidden;
  color: @color-text-gray;
}
h4 {
  margin-bottom: 30px;
}
.second-h4 {
  margin-bottom: 25px;
}
.form {
  max-width: 600px;
  :deep(.el-select) {
    width: 100%;
  }
  :deep(.el-form-item) {
    margin-bottom: 6px;
    > label {
      visibility: hidden;
    }
  }
  .form-footer {
    :deep(.el-form-item__content) {
      justify-content: center;
      padding: 5px 0;
      .el-button {
        width: 110px;
      }
    }
  }
}

.card-wrap {
  max-width: 730px;
  display: flex;
  border: 1px solid #eee;
  background-color: #fff;
  color: #000;
  margin-top: 25px;
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #aaa;
    padding: 15px 0;
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
  max-width: 600px;
  font-size: 12px;
}
</style>

