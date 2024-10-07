import AV from 'leancloud-storage'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // 检查是否已经初始化
  if (!AV.applicationId) {
    AV.init({
      appId: config.public.LEANCLOUD_APP_ID,
      appKey: config.public.LEANCLOUD_APP_KEY,
      serverURL: config.public.LEANCLOUD_SERVER_URL
    })
  }
})