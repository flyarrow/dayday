<template>
  <div class="verify-email-container">
    <el-card class="verify-email-card">
      <template #header>
        <h2 class="verify-email-title">邮箱验证</h2>
      </template>
      <p v-if="verificationStatus === 'verifying'">正在验证您的邮箱，请稍候...</p>
      <p v-else-if="verificationStatus === 'success'">邮箱验证成功！</p>
      <p v-else-if="verificationStatus === 'error'">邮箱验证失败: {{ errorMessage }}</p>
      <el-button v-if="verificationStatus === 'success'" @click="goToSettings" type="primary">
        返回设置页面
      </el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AV from 'leancloud-storage'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const verificationStatus = ref('verifying')
const errorMessage = ref('')

onMounted(async () => {
  const { token } = route.query
  if (token) {
    try {
      // 使用类型断言来避免 TypeScript 错误
      await (AV.User as any).verifyEmail(token as string)
      
      // 获取当前用户并更新 emailVerified 字段
      const currentUser = AV.User.current()
      if (currentUser) {
        currentUser.set('emailVerified', true)
        await currentUser.save()
      }
      
      verificationStatus.value = 'success'
      ElMessage.success('邮箱验证成功')
    } catch (error: any) {
      verificationStatus.value = 'error'
      errorMessage.value = error.message
      ElMessage.error(`邮箱验证失败: ${error.message}`)
    }
  } else {
    verificationStatus.value = 'error'
    errorMessage.value = '无效的验证链接'
    ElMessage.error('无效的验证链接')
  }
})

const goToSettings = () => {
  router.push('/settings')
}
</script>

<style scoped>
.verify-email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-secondary);
}

.verify-email-card {
  width: 100%;
  max-width: 400px;
}

.verify-email-title {
  text-align: center;
  color: var(--color-primary);
}
</style>