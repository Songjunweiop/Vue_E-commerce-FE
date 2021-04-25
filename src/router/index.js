import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/zhuce",
    name: "Zhuce",
    component: () => import("../components/zhuce.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../components/Home.vue"),
    children: [
      {
        path: "/",
        redirect: "/index",
      },
      {
        path: "/index",
        component: () => import("../components/index/Index.vue"),
      },
      {
        path: "/goods/:id",
        component: () => import("../components/goods/GoodsInfo.vue"),
      },
      {
        path: "/shoppingcar",
        component: () => import("../components/shoppingcar/Shoppingcar.vue"),
      },
      {
        path: "/order",
        component: () => import("../components/order/Order.vue"),
      },
    ],
  },
];

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

const router = new VueRouter({
  routes,
});

export default router;
