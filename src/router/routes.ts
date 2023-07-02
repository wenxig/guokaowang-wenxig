// declare module "@/pages/home/home.vue"{

// }
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/pages/login/login.vue"),
    meta: { title: "学员登陆", name: "login" },
  },
  {
    path: "/home",
    component: () => import("@/pages/home/home.vue"),
    meta: { title: "果考网实训考试云平台-wenxig端" },
    children: [
      {
        path: "home",
        component: () => import("@/pages/home/index/index.vue"),
      },
      {
        path: "train",
        component: () => import("@/pages/home/train/train.vue"),
      },
      {
        path: "history",
        component: () => import("@/pages/home/history/history.vue"),
      },
      {
        path: "exem",
        component: () => import("@/pages/home/exem/exem.vue"),
      }, {
        path: "exem/:id",
        name: "exem",
        component: () => import("@/pages/exem/exem.vue"),
      },
    ],
  },
  {
    path: "/exem/choose/:id",
    component: () => import("@/pages/exem/choose/choose.vue"),
  },
  {
    path: "/exem/operate/:id",
    component: () => import("@/pages/exem/operate/operate.vue"),
  },
  {
    path: "/exem/about",
    component: () => import("@/pages/exem/about/about.vue"),
  },
];
export default routes;
