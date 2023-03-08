<template>
  <div class="login-page text-center">
    <h3>Login</h3>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="0" class="form center-block">
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" placeholder="admin" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="123456" />
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button style="margin-right: 160px" type="primary" @click="submitForm(ruleFormRef)">Login</el-button>
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
      </el-form-item>
    </el-form>
    <p class="tips center-block">
      Lorem ipsum dolor sit amet, consectetur adipiscing edit. Aenean euismod bibendum laoreet. Proin gravida dolor sit
      amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
    </p>
  </div>
</template>
<script setup name="Login">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { to } from '@/utils/awaitTo'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
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
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      const [err] = await to(userStore.login())
      if (err) {
        console.log(err, 'err')
      } else {
        ElMessage.success('登录成功！')
        setTimeout(() => router.replace('/'))
      }
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
