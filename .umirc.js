import { defineConfig } from "umi";
const pxtorem = require("postcss-pxtorem");

export default defineConfig({
  npmClient: "npm",
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 37.5, //这里根据设计稿大小配置,一般是375
      propList: ["*"],
    }),
  ],
  routes: [
    { path: "/login", component: "login" },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/home', component: '@/pages/home' },
        { path: '/flow', component: '@/pages/flow' },
        { path: '/my', component: '@/pages/my' },
        { path: '/about', component: '@/pages/about' },
        { path: '/', redirect: '/home' }, // 将根路径重定向到登录页面
      ],
    },
    { path: "/notice", component: "@/pages/notice" },
  ],
  define: {
    baseApi: "https://apidev.somedomain.com",
    "process.env": {
      NODE_ENV: "dev",
      UMI_ENV: "dev",
    },
  },
  plugins: ["@umijs/plugins/dist/dva"],
  dva: {},
});
