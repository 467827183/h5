export default {
  routes: [
    { path: "/login", component: "login" },
    {
      path: "/",
      component: "@/layouts/index",
      routes: [
        { path: "/home", component: "@/pages/home" },
        { path: "/my", component: "@/pages/my" },
        { path: "/about", component: "@/pages/about" },
        { path: "/", redirect: "/home" }, // 将根路径重定向到登录页面
      ],
    },
    { path: "/notice", component: "@/pages/notice" },
    { path: "/transaction/:type", component: "@/pages/transaction" },
    { path: "/order/:type", component: "@/pages/order" },
    { path: "/orderDetail/:type/:status", component: "@/pages/orderDetail" },
  ],
};
