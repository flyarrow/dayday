<template>
  <div class="page-container">
    <el-container direction="vertical">
      <el-main>
        <section v-for="(section, index) in sections" :key="index" class="content-section">
          <el-row :gutter="20" :class="{ 'reverse': index % 2 !== 0 }">
            <el-col :span="12" class="text-content">
              <h2>{{ section.title }}</h2>
              <template v-if="index === 0 || index === 3">
                <el-button type="primary" size="large" class="free-use-button">免费使用</el-button>
              </template>
              <p v-else>{{ section.description }}</p>
            </el-col>
            <el-col :span="12" class="image-content">
              <el-image :src="section.image" fit="contain" class="section-image" />
            </el-col>
          </el-row>
        </section>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
const sections = [
  {
    title: "第一部分标题",
    description: "", // 这里留空,因为我们用按钮替代了描述
    image: "/images/indeximg/listening-happy-music-animate.svg"
  },
  {
    title: "第二部分标题",
    description: "这是第二部分的描述文字。这个部分的图片将显示在左侧，而文字内容显示在右侧。",
    image: "/images/indeximg/listening-happy-music-animate.svg"
  },
  {
    title: "第三部分标题",
    description: "这是第三部分的描述文字。再次，文字内容在左侧，图片在右侧。",
    image: "/images/indeximg/listening-happy-music-animate.svg"
  },
  {
    title: "第四部分标题",
    description: "", // 这里留空,因为我们用按钮替代了描述
    image: "/images/indeximg/listening-happy-music-animate.svg"
  }
]
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.content-section {
  margin-bottom: 40px;
}

.text-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-image {
  width: 75%; /* 将图片大小调整为75% */
  height: auto;
}

.reverse {
  flex-direction: row-reverse;
}

h2 {
  color: var(--color-accent);
  margin-bottom: 20px;
}

p {
  color: var(--color-dark);
  line-height: 1.6;
}

.free-use-button {
  margin-top: 10px;
}
</style>