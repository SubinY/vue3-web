<template>
  <div class="register-page text-center">
    <h4>Register</h4>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="0"
      class="form center-block"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model.number="ruleForm.name" />
      </el-form-item>
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
      <el-form-item class="form-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Login</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup name="Register">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

const ruleFormRef = ref()

const checkAge = (rule, value, callback) => {
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

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: ''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }]
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

