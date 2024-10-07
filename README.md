# Nuxt 3 Minimal Starter with Element Plus

Version: 0.2.1

这是一个基于 Nuxt 3 的最小启动项目,集成了 Element Plus UI 组件库。

## 功能特点

- 基于 Vue 3 的 Nuxt 3 框架
- 集成 Element Plus UI 组件库
- TypeScript 支持
- 示例首页展示 Element Plus 组件使用

## 设置

确保安装所有依赖:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 开发服务器

在 `http://localhost:3000` 启动开发服务器:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## 使用 Element Plus

Element Plus 已经在项目中配置好了。你可以直接在 Vue 组件中使用 Element Plus 的组件,无需额外导入。

示例页面 `pages/index.vue` 展示了如何使用 Element Plus 的按钮和卡片组件。

更多关于 Element Plus 的使用,请参考 [Element Plus 官方文档](https://element-plus.org/zh-CN/)。

## 生产环境

构建生产环境应用:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

本地预览生产构建:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

查看 [部署文档](https://nuxt.com/docs/getting-started/deployment) 了解更多信息。
