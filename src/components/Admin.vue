<template>
  <div class="list row">
        <!--<a href="#" @click="logout">Cerrar Sesion</a>-->
    <!--Primer contenedor para cambiar contraseñas-->
    <div class="col-md-10 m-5 rounded shadow-lg" style="background-color: #002657;">
        <h4>Contraseña guardada:</h4>
            <form>
              <div class="input-group bg-secondary">
                <input :type="passwordFieldType" v-model="password" id="inputPassword" class="form-control" placeholder="Password">
                <b-icon @click="switchVisibility" class="pt-2" icon="eye-slash-fill" font-scale="1.8"></b-icon>
              </div>
            </form>
        <button type="button" class="btn btn-success btn-small m-2 float-md-right">Success</button>
    </div>

    <!--Segundo contenedor
    <div class="col-md-10 mt-4 rounded shadow-lg" style="background-color: rgba(0,0,0,0.5) !important;">
        <h4>Contraseña guardada:</h4>
        <div class="card">
            <div class="col-sm-10 card-body">
                <input :type="passwordFieldType" v-model="password" class="form-control" id="inputPassword">
                <button type="password" @click="switchVisibility"><img src="https://img.icons8.com/ios-filled/40/000000/show-password.png"/></button>
            </div>
        </div>
        <button type="button" class="btn btn-success btn-small m-2 float-md-right">Success</button>
    </div>
    -->
    

    <!-- Tercer contenedor -->
    <!-- Search -->
    <div class="col-md-10 rounded shadow-lg ml-5 mr-5 mb-1" style="background-color: #002657;">
      <h4>Filtrar por:</h4>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ingrese el texto a buscar"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-success" type="button"
            @click="searchTitle"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    
      <!-- Tabla prueba -->
    <div style="height:400px; overflow:auto;" class="col-md-14 text-center rounded shadow-lg ml-4 mt-1 mb-4" >
        <table cellspacing="5" cellpadding="5" width="300" class="table-responsive table-striped table-hover">
            <thead class="bg-dark text-white">
                <tr>
                <th scope="col"># Trabajador</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Role</th>
                <th scope="col">Cambiar contraseña</th>
                </tr>
            </thead>
             <tbody>
               <!--Index is use for show the position-->
                <tr :class="{ active: index == currentIndex }"
                    v-for="(tutorial, index) in tutorials"
                    :key="index"
                    @click="setActiveTutorial(tutorial, index)"
                >
                    <th scope="row">{{tutorial.username}}</th>
                    <td>{{tutorial.name}}</td>
                    <td>{{tutorial.email}}</td>
                    <td>Roles</td>
                    <td><button type="button" class="btn btn-warning">Editar</button></td>
                </tr>
             </tbody>
        </table>
    </div>

  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import firebase from "firebase";


//const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdXN0b2RpbyIsImlhdCI6MTU5MjIzNzc5NSwiZXhwIjoxNTkyMzI0MTk1fQ.yMl-_l4-JkpAxja4J9TgRzfNGN9_N0rwMh1AuAzqJHWa3TzSesacvPOqQQzZjjTZBDkqc_KKvWuACckr_-peZg';
const token = JSON.parse(localStorage.getItem('user'))['accessToken']


export default {
  name: "tutorials-list",
  data() {
    return {
      config:{
        headers: {
          "Content-type": "application/json",
          "Authorization": 'Bearer ' + token
        }
      },

      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",

      password: '',
      passwordFieldType: 'password',
       items: [
          { age: 40, first_name: 'Armando' , last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    };
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    retrieveTutorials() {
      //this.token = this.currentUser.accessToken
      //console.log(token)
        //console.log(localStorage.getItem(user.token));
      TutorialDataService.getAllUsers(this.config)
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace('ordenar'));
    }
  },
  mounted() {
    this.retrieveTutorials();
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
</style>