import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//export default new Router({
const  router = new Router({
  mode: "history",
  routes: [
    {
      path: "*", 
      redirect: "/sesion"
    },
    {
      path: "/menu",
      alias: "/menu",
      name: "menu",
      component: () => import("./components/Menu")
    },
    {
      path: "/ordenar",
      alias: "/ordenar",
      name: "ordenar",
      component: () => import("./components/AddPedido")
    },
    {
      path: "/pedidos",
      name: "pedidos",
      component: () => import("./components/PedidosList"),
    },
    {
      path: "/pedidos/:id",
      name: "pedido-detalles",
      component: () => import("./components/Pedido"),
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
      path: "/pedidos",
      name: "pedidos",
      component: () => import("./components/PedidosList"),
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
