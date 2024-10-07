<template>
  <div class="page-container">
    <el-container>
      <el-header>
        <h1>Nuxt 3 与 Element Plus 示例</h1>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="color-card primary">
              <h3>#FF885B</h3>
              <p>主要颜色</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="color-card secondary">
              <h3>#FFE5CF</h3>
              <p>次要颜色</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="color-card accent">
              <h3>#557C56</h3>
              <p>强调颜色</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="color-card dark">
              <h3>#33372C</h3>
              <p>深色</p>
            </el-card>
          </el-col>
        </el-row>

        <el-divider />

        <h2>按钮示例</h2>
        <el-row class="mb-4">
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-row>

        <h2>表单示例</h2>
        <el-form :model="form" label-width="120px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-col>
            <el-col :span="2" class="text-center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery" />
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type" />
              <el-checkbox label="地推活动" name="type" />
              <el-checkbox label="线下主题活动" name="type" />
              <el-checkbox label="单纯品牌曝光" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助" />
              <el-radio label="线下场地免费" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style>
:root {
  --color-primary: #FF885B;
  --color-secondary: #FFE5CF;
  --color-accent: #557C56;
  --color-dark: #33372C;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.el-header {
  background-color: var(--color-primary);
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: var(--color-secondary);
  color: var(--color-dark);
}

.color-card {
  text-align: center;
  padding: 20px;
  color: white;
}

.color-card.primary {
  background-color: var(--color-primary);
}

.color-card.secondary {
  background-color: var(--color-secondary);
  color: var(--color-dark);
}

.color-card.accent {
  background-color: var(--color-accent);
}

.color-card.dark {
  background-color: var(--color-dark);
}

.el-button--primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.el-button--success {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>