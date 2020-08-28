<template>
  <div class="list row">
    <!-- Search -->
    <div class="col-md-10 ml-5 mr-5 mb-1 mt-1">
      <span class="titlehd text-dark">Filtrar:</span>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ingrese el no. de cuenta a buscar"
          v-model="search"/>
      </div>
    </div>
    
    <div class="col-md-10 ml-5 text-right">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">Agregar Usuario</button>
    </div>

    <!-- Tabla prueba -->
    <div class="text-center rounded shadow-lg ml-5 mt-1 mb-4" >
        <table cellspacing="5" cellpadding="5" width="300" class="table table-responsive table-striped table-hover">
            <thead class="bg-dark text-white">
                <tr>
                <th scope="col">Usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Cambiar contraseña</th>
                </tr>
            </thead>
             <tbody>
               <!--Index is use for show the position-->
                <tr :class="{ active: index == currentIndex }"
                    v-for="(usuario, index) in filteredUsers"
                    :key="index"
                    @click="setActiveTutorial(usuario, index)"
                >
                    <th scope="row">{{usuario.username}}</th>
                    <td>{{usuario.name}}</td>
                    <td>{{usuario.email}}</td>
                    <td><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">Editar</button></td>
                </tr>
             </tbody>
        </table>
    </div>

    <!-- Modal para cambiar contraseñas-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                  <div v-if="currentUsuario">
                    <form>
                      <div class="form-group row">
                        <label for="Usuario" class="col-sm-2 col-form-label">Usuario:</label>
                        <div class="col-sm-8">
                          <input type="text" readonly class="form-control" v-model="currentUsuario.username">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="Nombre" class="col-sm-2 col-form-label">Nombre</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" readonly v-model="currentUsuario.name">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="Correo" class="col-sm-2 col-form-label">Correo</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" readonly v-model="currentUsuario.email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="Contraseña" class="col-sm-2 col-form-label">Contraseña</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" required v-model="password">
                        </div>
                      </div>
                    </form>
                  </div>
                <div v-else>
                  <br />
                  <p class="text-white">Selecciona un Usuario...</p>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary"  @click="updateUsuario">Guardar Cambios</button>
            <p>{{ message }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para crear usuario-->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                  <div>
                    <form>
                      <div class="form-group row">
                        <label for="Usuario" class="col-sm-2 col-form-label">Usuario:</label>
                        <div class="col-sm-8">
                          <input type="text" placeholder="# de cuenta" class="form-control" v-model="username">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="Nombre" class="col-sm-2 col-form-label">Nombre:</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="name">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="Correo" class="col-sm-2 col-form-label">Correo</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="Contraseña" class="col-sm-2 col-form-label">Contraseña</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="password">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlSelect1">Elige Rol</label>
                        <select class="form-control" v-model="roles" id="exampleFormControlSelect1">
                          <option>Administrador</option>
                          <option>Usuario</option>
                        </select>
                      </div>
                    </form>
                  </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary"  @click.prevent="createUsuario">Guardar Cambios</button>
            <p>{{ message }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import swal from 'sweetalert';

const token = JSON.parse(localStorage.getItem('user'))['accessToken']

export default {
  data() {
    return {
      config:{
        headers: {
          "Content-type": "application/json",
          "Authorization": 'Bearer ' + token
        }
      },

      usuarios: [],
      currentUsuario: null,
      currentIndex: -1,

      search:"",

      message: '',
       
      //Variables de un usuario
      username: '',
      name:'',
      email:'',
      password: '',
      roles:[],

      passwordFieldType: 'password'
    };
  },
  methods: {
    /* Muestra la contraseña */
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },

    /* Obtiene todos los usuarios */
    retrieveUsers() {
      TutorialDataService.getAllUsers(this.config)
        .then(response => {
          this.usuarios = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    /* Actualiza solo la contraseña del usuario seleccionado */
    updateUsuario() {
      console.log(this.currentUsuario)
      console.log(this.password)
      
      var data = {
        _id: this.currentUsuario._id,
        username: this.currentUsuario.username,
        password: this.password,
        email: this.currentUsuario.email,
        name: this.currentUsuario.name,
        roles: this.currentUsuario.roles,
      };

      TutorialDataService.updateUser(this.currentUsuario._id, data)
        .then(response => {
          console.log(response.data);
          swal({
            title: "Contraseña actualizada correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $('#exampleModal').modal('hide');
        })
        .catch(e => {
          swal({
            title: "Error al actualizar la contraseña!!",
            //text: "You clicked the button!",
            icon: "error",
            button: "Continuar",
          });
          console.log(e);
        });
    },

    /* Crear un nuevo usuario */
    createUsuario() {
      var data = {
        username: this.username,
        password: this.password,
        email: this.email,
        name: this.name,
        roles: [this.roles],
      };

      console.log(data);

      TutorialDataService.singUp(data)
        .then(response => {
          console.log(response.data);
          swal({
            title: "Usuario creado correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $('#exampleModal2').modal('hide');
          //this.exampleModal.hide;
          //this.message = 'El pedido se actualizaco correctamente!';
        })
        .catch(e => {
          swal({
            title: "Error al crear el usuario!!",
            //text: "You clicked the button!",
            icon: "error",
            button: "Continuar",
          });
          console.log(e);
          this.message = e;
        });

     },
    
    /* Actualiza los datos cada determinado tiempo */
    refreshList() {
      this.retrieveUsers();
      this.currentUsuario = null;
      this.currentIndex = -1;
    },
    
    /*Permite seleccionar un registro de la tabla */
    setActiveTutorial(tutorial, index) {
      this.currentUsuario = tutorial;
      this.currentIndex = index;
    }
  },
  mounted() {
    this.retrieveUsers();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    /*
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    /* Filtra la lista de los usuarios mediante el Numero de cuenta */
    filteredUsers: function(){
      return this.usuarios.filter((usuario) => {
        return usuario.username.match(this.search);
      })
    }
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
/*
h4 {
    background-color: #002657;
}*/

.titlehd{
    font-family: Helvetica, sans-serif, Arial;
    font-weight:bold;
    padding:12px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    font-size: 20px;
}
#titlehd{
    font-family: Helvetica, sans-serif, Arial;
    margin:0 auto;
    padding:5px;
    /*background:#002657;*/
    color:white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: #002657;
}
.formss{
    border-bottom-left-radius:12px;
    border-bottom-right-radius:12px;
}

#card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

 table {
      overflow-y: scroll;
      display: block;
      height: 400px;
      width: auto;
    }
</style>