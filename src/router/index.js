import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../lib/supabaseClient.js";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import UnauthorizedView from "../views/UnauthorizedView.vue";
import InsertView from "../views/restricted/InsertView.vue";

let localUser;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/secret",
      name: "secret",
      component: () => import("../views/restricted/SecretView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: UnauthorizedView,
    },
    {
      path: "/insert",
      name: "insert",
      component: InsertView,
    },
  ],
});

async function getUser(next) {
  localUser = await supabase.auth.getSession();
  if (localUser.data.session == null) {
    next("/unauthorized");
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next);
  } else {
    next();
  }
});

export default router;
