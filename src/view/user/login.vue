<template>
  <div class="login-page text-center">
    <h4>Login</h4>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="0"
      class="form center-block"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Login</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup name="Login">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

const ruleFormRef = ref()

const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Name is required'))
  }
  callback()
}

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Password is required'))
  }
  callback()
}

const ruleForm = reactive({
  name: '',
  password: ''
})

const rules = reactive({
  name: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const router = useRouter()

function ServiceClick(id) {
  router.push({
    name: 'serviceDetail',
    state: {
      id
    }
  })
}
</script>
<style lang="less" scoped>
.login-page {
  .page-container;

  h4 {
    margin-bottom: 40px;
  }
  .form {
    max-width: 600px;
    :deep(.el-form-item__label) {
      color: @color-text-gray;
    }
    .form-footer {
      .page-form-footer;
    }
  }
}
</style>

