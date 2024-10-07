<template>
  <div class="reset-password-container">
    <el-card class="reset-password-card">
      <template #header>
        <h2 class="reset-password-title">重置密码</h2>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)" class="submit-btn">重置密码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import AV from 'leancloud-storage'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const formRef = ref<FormInstance>()

const form = reactive({
  password: '',
  confirmPassword: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass, trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { token } = route.query
      if (!token) {
        ElMessage.error('无效的重置密码链接')
        return
      }
      try {
        await AV.User.resetPasswordBySmsCode(token as string, form.password)
        ElMessage.success('密码重置成功，请使用新密码登录')
        router.push('/login')
      } catch (error: any) {
        ElMessage.error(`密码重置失败: ${error.message}`)
      }
    } else {
      console.log('验证失败', fields)
    }
  })
}
</script>

<style scoped>
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-secondary);
}

.reset-password-card {
  width: 100%;
  max-width: 400px;
}

.reset-password-title {
  text-align: center;
  color: var(--color-primary);
}

.submit-btn {
  width: 100%;
}
</style>