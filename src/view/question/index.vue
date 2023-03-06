<template>
  <div class="question-page text-center">
    <h3>We look forward to your suggestions to make us better</h3>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="0"
      class="form center-block"
    >
      <el-form-item label="About You" prop="aboutYou">
        <el-input v-model="ruleForm.aboutYou" />
      </el-form-item>
      <el-form-item label="Question Category" prop="questionCategory">
        <el-select v-model="ruleForm.questionCategory" placeholder="Select">
          <el-option
            v-for="item in quesCategory"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Question Description" prop="questionDescription">
        <el-input
          type="textarea"
          :rows="5"
          v-model="ruleForm.questionDescription"
          resize="none"
        />
      </el-form-item>
      <el-form-item label="Your Email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button
          style="margin-right: 160px"
          type="primary"
          @click="submitForm(ruleFormRef)"
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

const quesCategory = [
  {
    label: 'a',
    value: 'a'
  },
  {
    label: 'b',
    value: 'b'
  }
]

const ruleFormRef = ref()

const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Name is required'))
  }
  callback()
}

const ruleForm = reactive({
  aboutYou: '',
  questionCategory: '',
  questionDescription: '',
  email: ''
})

const rules = reactive({
  name: [{ validator: validateName, trigger: 'blur' }],
  email: [
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ]
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
.question-page {
  .page-container;

  h3 {
    margin-bottom: 40px;
  }
  .form {
    max-width: 600px;
    :deep(.el-form-item) {
      position: relative;
    }
    :deep(.el-form-item__label) {
      color: @color-text-gray;
      position: absolute;
      min-width: 160px;
      left: -160px;
      text-align: right;
    }
    :deep(.el-select) {
      width: 100%;
    }
    .form-footer {
      .page-form-footer;
    }
  }
}
</style>

