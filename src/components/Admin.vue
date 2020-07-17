<template>
  <div class="list row">
        <!--<a href="#" @click="logout">Cerrar Sesion</a>-->
    <!--Primer contenedor para cambiar contraseñas
    <div class="col-md-10 m-5 rounded shadow-lg" style="background-color: #002657;">
        <h4>Contraseña guardada:</h4>
            <form>
              <div class="input-group bg-secondary">
                <input :type="passwordFieldType" v-model="password" id="inputPassword" class="form-control" placeholder="Password">
                <b-icon @click="switchVisibility" class="pt-2" icon="eye-slash-fill" font-scale="1.8"></b-icon>
              </div>
                <button type="button" :href="'/usuarios/' + '5ee66e7b797f1830cf271ac7'" class="btn btn-success btn-small m-2 float-md-right">Success</button>
            </form>
    </div>-->

    <!--Primer contenedor para cambiar contraseñas-->
    <div class="col-md-10 mt-5">
      <div class="form-group shadow-lg" style="border-radius:25px; background:#F1F1F1">
        <div id="titlehd"> 
          <span class="titlehd">Contraseña General:</span>
        </div>
        <form class="container" id="card">
          <div class="input-group rounded bg-secondary mt-2">
              <input :type="passwordFieldType" class="form-control" placeholder="Password">
              <b-icon @click="switchVisibility" class="pt-2" icon="eye-slash-fill" font-scale="1.8"></b-icon>
          </div>
          <div>
            <button type="button" class="btn btn-success btn-small m-2 float-md-right">Success</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Tercer contenedor -->
    <!-- Search -->
    <div class="col-md-10 ml-4 mr-5 mb-1 mt-1">
      <span class="titlehd text-dark">Filtrar por:</span>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ingrese el texto a buscar"
          v-model="search"/>
      </div>
    </div>
    <!-- Tabla prueba -->
    <div style="height:400px; overflow:auto;" class="col-md-14 text-center rounded shadow-lg ml-5 mt-1 mb-4" >
        <table cellspacing="5" cellpadding="5" width="300" class="table-responsive table-striped table-hover">
            <thead class="bg-dark text-white">
                <tr>
                <th scope="col">Codigo</th>
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

    <!-- Modal -->
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
      title: "",

      search:"",

      message: '',
      password: '',
      passwordFieldType: 'password'
    };
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
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
          //this.exampleModal.hide;
          //this.message = 'El pedido se actualizaco correctamente!';
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

    refreshList() {
      this.retrieveUsers();
      this.currentUsuario = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentUsuario = tutorial;
      this.currentIndex = index;
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.usuarios = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveUsers();
  },
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
</style>