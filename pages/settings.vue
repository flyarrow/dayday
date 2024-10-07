<template>
  <div class="settings-container">
    <el-card class="settings-card">
      <template #header>
        <h2 class="settings-title">用户设置</h2>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ userInfo.email }}
          <el-tag v-if="userInfo.emailVerified" type="success" size="small">已验证</el-tag>
          <el-tag v-else type="warning" size="small">未验证</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-button v-if="!userInfo.emailVerified" type="primary" @click="sendVerificationEmail" class="verify-email-btn">验证邮箱</el-button>
      <el-button type="primary" @click="sendResetPasswordEmail" class="reset-password-btn">重置密码</el-button>
      <el-button type="danger" @click="logout" class="logout-btn">退出登录</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AV from 'leancloud-storage'
import { ElMessage } from 'element-plus'

const userInfo = ref({
  username: '',
  email: '',
  emailVerified: false
})

onMounted(async () => {
  const currentUser = AV.User.current()
  if (currentUser) {
    userInfo.value = {
      username: currentUser.get('username'),
      email: currentUser.get('email'),
      emailVerified: currentUser.get('emailVerified')
    }
  } else {
    // 如果用户未登录，重定向到登录页面
    navigateTo('/login')
  }
})

const sendVerificationEmail = async () => {
  try {
    await AV.User.requestEmailVerify(userInfo.value.email)
    ElMessage.success('验证邮件已发送，请查看您的邮箱')
  } catch (error: any) {
    ElMessage.error(`发送验证邮件失败: ${error.message}`)
  }
}

const sendResetPasswordEmail = async () => {
  try {
    await AV.User.requestPasswordReset(userInfo.value.email)
    ElMessage.success('重置密码邮件已发送，请查看您的邮箱')
  } catch (error: any) {
    ElMessage.error(`发送重置密码邮件失败: ${error.message}`)
  }
}

const logout = async () => {
  try {
    await AV.User.logOut()
    ElMessage.success('退出登录成功')
    navigateTo('/login')
  } catch (error: any) {
    ElMessage.error(`退出登录失败: ${error.message}`)
  }
}
</script>

<style scoped>
.settings-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-secondary);
  padding: 20px;
}

.settings-card {
  width: 100%;
  max-width: 500px;
}

.settings-title {
  text-align: center;
  color: var(--color-primary);
}

.verify-email-btn,
.reset-password-btn,
.logout-btn {
  margin-top: 20px;
  width: 100%;
}

.verify-email-btn {
  margin-bottom: 10px;
}

.reset-password-btn {
  margin-bottom: 10px;
}
</style>