<template>
  <div class="container">
    <!--
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <p>
      <strong>Name: </strong>
      {{ currentUser.name }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
    -->

   <div class="card mt-4">
    <img v-if="currentUser.roles == 'ROLE_USER'" src="sw.jpg" alt="John" style="width:100%"> 
    <img v-if="currentUser.roles == 'ROLE_ADMIN'" src="dv.jpg" alt="John" style="width:100%"> 
    <h2>Trabajador</h2>
    <p class="title">{{currentUser.name}}</p>
    <p class="title">Número de cuenta: {{currentUser.username}}</p>
    <p>Correo: {{currentUser.email}} </p>
    <p v-if="currentUser.roles == 'ROLE_USER'">Role: Usuario </p>
    <p v-if="currentUser.roles == 'ROLE_ADMIN'">Role: Administrador </p>
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
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>