<template>
  <el-container direction="vertical" class="app-container">
    <el-header height="60px">
      <div class="nav-container">
        <div class="logo">
          <img src="/images/logo/logo.png" alt="Logo" class="logo-image">
          <span class="logo-text">您的网站名称</span>
        </div>
        <el-menu 
          mode="horizontal" 
          :ellipsis="false" 
          class="nav-menu" 
          router 
          :default-active="activeIndex"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item v-if="!isLoggedIn" index="/login">登录</el-menu-item>
          <el-menu-item v-if="!isLoggedIn" index="/register">注册</el-menu-item>
          <el-menu-item v-if="isLoggedIn" index="/settings">设置</el-menu-item>
          <el-menu-item index="/color">颜色示例</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
          <el-menu-item index="/contact">联系我们</el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <el-main>
      <NuxtPage @login="updateLoginStatus" @logout="updateLoginStatus" />
    </el-main>

    <el-footer height="60px">
      <div class="footer-content">
        <p class="copyright">&copy; 2024 Nuxt 3 与 Element Plus 示例. 保留所有权利.</p>
        <div class="footer-links">
          <a href="#">隐私政策</a>
          <a href="#">使用条款</a>
          <a href="#">联系我们</a>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AV from 'leancloud-storage'

const route = useRoute()
const activeIndex = ref(route.path)
const isLoggedIn = ref(false)

watch(() => route.path, (newPath) => {
  activeIndex.value = newPath
})

onMounted(() => {
  checkLoginStatus()
})

const checkLoginStatus = () => {
  const currentUser = AV.User.current()
  isLoggedIn.value = !!currentUser
}

const updateLoginStatus = () => {
  checkLoginStatus()
}
</script>

<style>
:root {
  --color-primary: #FF885B;
  --color-secondary: #FFE5CF;
  --color-accent: #557C56;
  --color-dark: #33372C;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  min-height: 100vh;
}

.el-header {
  background-color: var(--color-primary);
  padding: 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  color: white;
  font-size: 1.2em;
  font-weight: bold;
}

.nav-menu {
  background-color: transparent;
}

.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item {
  color: white;
}

.el-menu--horizontal > .el-menu-item:hover,
.el-menu--horizontal > .el-menu-item:focus {
  background-color: rgba(255, 255, 255, 0.2);
}

.el-main {
  padding: 20px;
  background-color: var(--color-secondary);
}

.el-footer {
  background-color: var(--color-dark);
  color: white;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.copyright {
  margin: 0;
}

.footer-links {
  display: flex;
}

.footer-links a {
  color: var(--color-secondary);
  text-decoration: none;
  margin-left: 20px;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
