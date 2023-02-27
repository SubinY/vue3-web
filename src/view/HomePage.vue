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
      <el-form-item label="Password" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="Age" prop="age">
        <el-input v-model.number="ruleForm.age" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)"
          >Search</el-button
        >
        <el-button @click="handleReset(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup name="HomePage">
import { reactive, ref } from 'vue'
import { getCurrentInstance, onMounted } from 'vue'

// const { proxy } = getCurrentInstance() //获取上下文实例，ctx=vue2的this

const ruleFormRef = ref()

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: ''
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
  padding: 50px 0;
  overflow: hidden;
  color: @color-text-gray;
}
h4 {
  margin-bottom: 50px;
}
.second-h4 {
  margin-bottom: 40px;
}
.form {
  max-width: 700px;
  /deep/ .el-form-item {
    > label {
      visibility: hidden;
    }
  }
}
</style>

