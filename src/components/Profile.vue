<template>
  <div class="list row">
   <div class="mt-4 mb-4" id="card">
      <img v-if="currentUser.roles == 'ROLE_USER'" src="sw.jpg" alt="John" style="width:100%"> 
      <img v-if="currentUser.roles == 'ROLE_ADMIN'" src="dv.jpg" alt="John" style="width:100%"> 
      <div class="text-left pl-3">
        <h2 class="text-center">Trabajador</h2>
        <h3 class="title">Nombre: {{currentUser.name}}</h3>
        <h3 class="title">No. de cuenta: {{currentUser.username}}</h3>
        <h3 class="title">Correo: {{currentUser.email}} </h3>
        <p v-if="currentUser.roles.includes('ROLE_USER')">Rol: Usuario </p>
        <p v-else>Rol: Administrador </p>
      </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    /* Si el usuario no esta autenticdo lo regresa al inicio */
    if (!this.currentUser) {
      this.$router.push('/sesion');
    } else {
      console.log(this.currentUser)
    }
  }
};
</script>

<style>

#card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: black;
  font-size: 25px;
}


button:hover, a:hover {
  opacity: 0.7;
}
</style>