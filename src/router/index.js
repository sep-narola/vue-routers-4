import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import sourceData from "@/data.json";

const routes = [
  { path: "/", name: "Home", component: HomeView, alias: "/home" },
  { path: "/home", redirect: "/" },
  // { path: "/home", redirect: { name: "Home" } },
  // { path: "/home", redirect: (to) => "/" },
  {
    path: "/protected",
    name: "protected",
    components: {
      default: () => import("@/views/ProtectedView.vue"),
      LeftSidebar: () => import("@/components/LeftSidebar.vue"),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/invoices",
    name: "invoices",
    components: {
      default: () => import("@/views/InvoicesView.vue"),
      LeftSidebar: () => import("@/components/LeftSidebar.vue"),
    },
    meta: { requiresAuth: true },
  },
  {
    // Advanced Route matching syntax
    path: "/example/:id(\\d+)",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    // Advanced Route matching syntax
    // using + makes it required for atleast first part
    // using * makes it optional
    // using ? makes it optional without repeating params
    path: "/repeatableParams/:id(\\d+)+",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/DestinationShow.vue"),
    // props: true,
    // props: { newletterPopup: false },
    // props: (route) => ({ newslwtterPopup: someExpression ? true : false }),
    props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    beforeEnter: (to) => {
      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id)
      );

      if (!exists) return { name: "NotFound" };
      // if (!exists)
      //   return {
      //     name: "NotFound",
      //     params: { pathMatch: to.path.split("/").slice(1) },
      //     query: to.query,
      //     hash: to.hash,
      //   };
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/views/ExperienceShow.vue"),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
  // {
  //   path: "/destinations/:id/:slug/:experienceSlug",
  //   name: "experience.show",
  //   component: () => import("@/views/ExperienceShow.vue"),
  //   props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "custom-active-link",
  scrollBehavior(to, from, savedPosition) {
    console.log("to =>", to);
    console.log("from =>", from);
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
      })
    );
  },
});

router.beforeEach((to) => {
  console.log(
    `%c route changed!`,
    "color:white;background-image: linear-gradient(to bottom right, #4E6C71, #379988);border-radius:6px;padding:10px;font-weight:700"
  );
  if (to.meta.requiresAuth && !window.user) {
    // need to login if not already logged in
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

export default router;
