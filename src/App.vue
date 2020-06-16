<template>
  <div id="app">
   <!-- <nav  class="navbar navbar-expand-lg navbar-dark bg-info">
      <a class="navbar-brand" @click.prevent>Company Name</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExample05">
        <ul class="navbar-nav mr-auto">
          <li v-if="showAdminBoard" class="nav-item">
            <router-link v-if="showAdminBoard" to="/admin" class="nav-link">
              Usuarios
             </router-link>
            <a class="nav-link" href="/admin">Admin</a>
          </li>
          <li class="nav-item">
            <router-link v-if="showModeratorBoard" to="/menu" class="nav-link">
              Custodio
             </router-link>
           <a class="nav-link" href="/pedidos">Custodio</a> 
          </li>
          <li v-if="currentUser" class="nav-item">
          <router-link to="/profile" class="nav-link">
            Perfil {{ currentUser.username }}
          </router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
             <a class="btn btn-outline-success mr-sm-2 " @click.prevent="logOut">LogOut</a>
        </form>
      </div>
    </nav>-->

    <div v-if="currentUser">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="showAdminBoard" to="/admin">Usuarios</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ currentUser.username }}</em>
              </template>
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item @click.prevent="logOut">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>


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
    showModeratorBoard() {
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
