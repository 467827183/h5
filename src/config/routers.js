export default {
  routes: [
    { path: "/login", component: "login" },
    {
      path: "/",
      component: "@/layouts/index",
      routes: [
        { path: "/home", component: "@/pages/home" },
        { path: "/flow", component: "@/pages/flow" },
        { path: "/my", component: "@/pages/my" },
        { path: "/about", component: "@/pages/about" },
        { path: "/", redirect: "/login" }, // 将根路径重定向到登录页面
      ],
    },
    { path: "/notice", component: "@/pages/notice" },
    { path: "/transaction/:type", component: "@/pages/transaction" },
    { path: "/order/:type", component: "@/pages/order" },
    { path: "/orderDetail/:type/:status", component: "@/pages/orderDetail" },
    { path: "/appeal/:id", component: "@/pages/appeal" },
    { path: "/dcp", component: "@/pages/dcp" },
    { path: "/transferDcp", component: "@/pages/transferDcp" },
    { path: "/transferRecord", component: "@/pages/transferRecord" },
    { path: "/assetDetail/:type", component: "@/pages/assetDetail" },
    { path: "/account", component: "@/pages/account" },
    { path: "/accountDetail/:type", component: "@/pages/accountDetail" },
    { path: "/setAccount/:type", component: "@/pages/setAccount" },
    { path: "/setting", component: "@/pages/setting" },
  ],
};
