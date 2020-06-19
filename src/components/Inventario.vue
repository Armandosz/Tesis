<template>
  <div class="list row ">
    <!-- Primer container -->
    <div class="col-md-10 m-5 rounded shadow-lg" style="background-color: #002657;">
        <h4>Archivo de inventario:</h4>
        <div class="card" >
            <div class="custom-file card-body">
                <input type="file" class="custom-file-input" id="customFileLang" lang="es">
                <label class="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
            </div>
        </div>
        <button type="button" class="btn btn-success btn-small m-2 float-md-right">Success</button>
    </div>
    

    <!-- Tercer contenedor -->
    <!-- Search -->
    <div class="col-md-10 rounded shadow-lg ml-5 mr-5 mb-1" style="background-color: #002657;">
      <h4>Filtrar por:</h4>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ingrese el texto a buscar"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <!-- Tabla prueba -->
    <div style="height:400px; overflow:auto;" class="col-md-14 text-center rounded shadow-lg mt-1 mb-4" >
        <table cellspacing="5" cellpadding="5" width="300" class="table-responsive table-striped table-hover">
            <thead class="bg-dark text-white">
                <tr>
                <th scope="col"># Inventario</th>
                <th scope="col">Descripción</th>
                <th scope="col">Ubicación</th>
                <th scope="col">No. Trabajador</th>
                <th scope="col">Custodio 2</th>
                </tr>
            </thead>
             <tbody>
               <!--Index is use for show the position-->
                <tr :class="{ active: index == currentIndex }"
                    v-for="(tutorial, index) in tutorials"
                    :key="index"
                    @click="setActiveTutorial(tutorial, index)"
                >
                    <th scope="row">{{tutorial.numero}}</th>
                    <td>{{tutorial.descripcion}}</td>
                    <td>{{tutorial.ubicacion}}</td>
                    <td>{{tutorial.no_trabajador}}</td>
                    <td>{{tutorial.custodio2}}</td>
                </tr>
             </tbody>
        </table>
    </div>

<!--
<table cellspacing="0" cellpadding="0" border="0" width="325">
  <tr>
    <td>
       <table cellspacing="0" cellpadding="1" border="1" width="300" >
         <tr style="color:white;background-color:grey">
            <th>Header 1</th>
            <th>Header 2</th>
         </tr>
       </table>
    </td>
  </tr>
  <tr>
    <td>
       <div style="width:320px; height:80px; overflow:auto;">
         <table cellspacing="0" cellpadding="1" border="1" width="300" >
           <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
           <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
              <tr>
             <td>new item</td>
             <td>new item</td>
           </tr>
         </table>  
       </div>
    </td>
  </tr>
</table>
-->
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
      passwordFieldType: 'password'
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
      TutorialDataService.getAll(this.config)
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
    activeUsers() {
      return this.tutorials.filter(function(u) {
         return u.no_trabajador == this.currentUser.no_trabajador;
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
</style>