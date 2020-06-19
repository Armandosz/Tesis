<template>
  <div id="app">
    <div v-if="currentUser">
        <header>
            <img src="logoudc.png" alt="" width="75px">
            <h3 class="titulo">Dirección de Patrimonio Universitario Facultad de Telemática</h3>
            <h4 class="subtitulo">Dirección de Patrimonio Universitario</h4>
        </header>

      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <!-- Admin nav-->
            <b-nav-item v-if="showAdminBoard" to="/inventario">Inicio</b-nav-item>
            <b-nav-item v-if="showAdminBoard" to="/admin">Usuarios</b-nav-item>
            <!-- Custodio nav -->
            <b-nav-item v-if="showUserBoard" to="/custodio">Inicio</b-nav-item>
            <b-nav-item v-b-modal.modalPopover>Ayuda</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>[{{ currentUser.username }}]</em>
              </template>
              <b-dropdown-item to="/profile">Perfil</b-dropdown-item>
              <b-dropdown-item @click.prevent="logOut">Cerrar Sesión</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>



      <b-modal id="modalPopover" title="Modal with Popover" modal-cancel>
        <p>
         Si necesitas ayuda o tienes algun problema, envia un correo a los administradores o encargados del control de inventario en tu facultad.
        </p>
      </b-modal>




    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>

//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_USER');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
