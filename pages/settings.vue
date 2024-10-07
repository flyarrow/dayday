<template>
  <div class="settings-container">
    <el-card class="settings-card">
      <template #header>
        <h2 class="settings-title">用户设置</h2>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
      </el-descriptions>
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
  email: ''
})

onMounted(async () => {
  const currentUser = AV.User.current()
  if (currentUser) {
    userInfo.value = {
      username: currentUser.get('username'),
      email: currentUser.get('email')
    }
  } else {
    // 如果用户未登录，重定向到登录页面
    navigateTo('/login')
  }
})

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

.logout-btn {
  margin-top: 20px;
  width: 100%;
}
</style>