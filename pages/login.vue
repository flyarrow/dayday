<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2 class="login-title">用户登录</h2>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名或邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)" class="submit-btn">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="register-link">
        还没有账号？<NuxtLink to="/register">立即注册</NuxtLink>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import AV from 'leancloud-storage'
import { ElMessage } from 'element-plus'

const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        // 尝试使用用户名登录
        let user = await AV.User.logIn(form.username, form.password)
        if (!user) {
          // 如果用户名登录失败,尝试使用邮箱登录
          user = await AV.User.loginWithEmail(form.username, form.password)
        }
        ElMessage.success('登录成功!')
        // 登录成功后跳转到首页
        navigateTo('/')
      } catch (error: any) {
        ElMessage.error(`登录失败: ${error.message}`)
      }
    } else {
      console.log('验证失败', fields)
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-secondary);
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  color: var(--color-primary);
}

.submit-btn {
  width: 100%;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.register-link a {
  color: var(--color-primary);
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>