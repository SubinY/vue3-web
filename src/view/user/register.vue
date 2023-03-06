<template>
  <div class="register-page text-center">
    <h3>Register</h3>
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
      <el-form-item label="Organization" prop="organization">
        <el-input v-model="ruleForm.organization" />
      </el-form-item>
      <el-form-item label="Position/Ttile" prop="position">
        <el-input v-model="ruleForm.position" />
      </el-form-item>
      <el-form-item label="ResearchField" prop="naresearchFieldme">
        <el-input v-model="ruleForm.researchField" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input v-model="ruleForm.address" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="PasswordCheck" prop="checkPassword">
        <el-input
          v-model="ruleForm.checkPassword"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button
          style="margin-right: 160px"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
      </el-form-item>
    </el-form>
    <p class="tips center-block">
      Lorem ipsum dolor sit amet, consectetur adipiscing edit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar sic tempor.
    </p>
  </div>
</template>
<script setup name="Register">
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
  name: '',
  organization: '',
  position: '',
  researchField: '',
  email: '',
  address: '',
  password: '',
  checkPassword: ''
})

const rules = reactive({
  name: [{ validator: validateName, trigger: 'blur' }],
  email: [
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPassword: [{ validator: validatePass2, trigger: 'blur' }]
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
.register-page {
  .page-container;

  h3 {
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
  .tips {
    max-width: 750px;
    line-height: 30px;
  }
}
</style>

