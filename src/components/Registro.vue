<template>
<div class="container mt-5">
	<div class="d-flex justify-content-center h-100">
		<div class="card shadow-lg">
			<div class="card-header bg-info">
				<h3>Iniciar Sesion</h3>
			</div>
			<div class="card-body">
				<form @submit.prevent="handleLogin">
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input v-model="user.username" name="username" required type="text" class="form-control" placeholder="Usuario">
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input v-model="user.password" name="password" type="password" required class="form-control" placeholder="contraseña">
					</div>
                    <br>
					<div class="form-group">
						<input type="submit" value="Login" class="btn login_btn">
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center p-2" style="background-color: #FAAC58">
					<i class="fa fa-question-circle" aria-hidden="true"></i>
					Tus datos de acceso debieron ser proporcionados por la Dirección de tu Facultad ó la Direccion General Del Patrimonio Universitario. Sí aún no los tienes, comunícate directamente con ellos.
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script src="/js/pwa.js"></script>
<script>
import User from '../models/user';
import swal from 'sweetalert';



export default {
  name: 'SingIn',
  data() {
    return {
      user: new User('', '')
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
        if (this.user.username && this.user.password) {
          //console.log(this.user.token);
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              swal({
                  title: "Bienvenido!!",
                  //text: "You clicked the button!",
                  icon: "success",
                  button: "Entendido",
              })
              this.$router.push('/profile');
            },
            error => {
              //swal("Good job!", "Usuario/contraseña incorrecto!", "error");
              swal({
                  title: "Usuario/contraseña incorrectos!!",
                  //text: "You clicked the button!",
                  icon: "error",
                  button: "Entendido",
              });

              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }

    }
  }
};
</script>
