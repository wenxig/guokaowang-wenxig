const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/pages/login/login.vue"),
    meta: { title: "学员登陆" },
  },
  {
    path: "/home",
    component: () => import("@/pages/home/home.vue"),
    meta: { title: "信果考网实训考试云平台" },
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
      },
    ],
  },
  {
    path: "/exem/:id",
    name: "exem",
    component: () => import("@/pages/exem/exem.vue"),
  },
  {
    path: "/exemAbout",
    component: () => import("@/pages/exem/about/about.vue"),
  },
];
export default routes;
