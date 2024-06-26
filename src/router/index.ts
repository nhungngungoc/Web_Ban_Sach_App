import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import { PageName, Role } from "../common/contant/contants";
import authMiddleware from "./authMiddleware";
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from "./middleware";
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/home",
  //   name: "home",
  //   component: () => import("../views/Home/HomePage.vue"),
  //   meta: {
  //     public: true,
  //   },
  // },
  // {
  //   path: "/home1",
  //   name: "home1",
  //   component: () => import("../views/Home/HomeView.vue"),
  //   meta: {
  //     public: true,
  //   },
  // },
  {
    path: "/",
    name: PageName.TRANG_CHU,
    component: () => import("../views/WebApp/pages/IndexView.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/proudctByCategory",
    name: "proudctByCategory",
    component: () => import("../views/WebApp/pages/PageProductByCategory.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/WebApp/pages/CartView.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/WebApp/pages/OderView.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/order/:id",
    name: "orderdetail",
    component: () => import("../views/WebApp/pages/OrderDetail.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/thanhtoan",
    name: "thanhtoan",
    component: () => import("../views/WebApp/pages/ThanhToan.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/index",
    name: PageName.BLOG,
    component: () => import("../views/BlogView.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/login",
    name: PageName.LOGIN_PAGE,
    component: () => import("../views/Login/LoginView.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/register",
    name: PageName.REGISTER_PAGE,
    component: () => import("../views/Register/IndexView.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/vertify/:token",
    name: PageName.VERTIFY_PAGE,
    component: () => import("../views/Vertify/IndexView.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/404",
    name: PageName.NOT_FOUND_PAGE,
    component: () => import("../components/errors/NotFound.vue"),
  },
  {
    path: "/admin",
    name: PageName.ADMIN,
    component: () => import("../views/IndexView.vue"),
    children: [
      {
        path: "product",
        name: PageName.ADMIN_PRODUCT,
        component: () => import("../views/Admin/Product/ProductView.vue"),
        meta: {
          role: Role.ADMIN,
          public: false,
        },
      },
      {
        path: "user",
        name: PageName.ADMIN_USER,
        component: () => import("../views/Admin/User/UserView.vue"),
        meta: {
          role: Role.ADMIN,
          public: false,
        },
      },
      {
        path: "category",
        name: PageName.ADMIN_CATEGORY,
        component: () => import("../views/Admin/Category/CategoryView.vue"),
        meta: {
          role: Role.ADMIN,
          public: false,
        },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/Admin/Dashboard/IndexView.vue"),
        meta: {
          role: Role.ADMIN,
          public: false,
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(
//   VueRouteMiddleware({
//     [GLOBAL_MIDDLEWARE_NAME]: authMiddleware,
//   }) as NavigationGuardWithThis<unknown>,
// );

export default router;
