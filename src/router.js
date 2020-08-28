import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//export default new Router({
const  router = new Router({
  mode: "history",
  routes: [
    {
      path: "*", 
      redirect: "/"
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./components/Admin"),
    },
    {
      path: "/custodio",
      name: "custodio",
      component: () => import("./components/Custodio"),
    },
    {
      path: "/",
      name: "sesion",
      component: () => import("./components/SingIn"),
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("./components/Profile")
    },
    {
      path: "/inventario",
      name: "inventario",
      component: () => import("./components/Inventario")
    }
  ]
});

export default router;
