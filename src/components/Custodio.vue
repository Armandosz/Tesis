<template>
  <div class="list row ">
    <!--Primer contenedor para cambiar contraseñas-->
    <div class="col-md-10 mt-5">
      <div class="form-group shadow-lg" style="border-radius:25px; background:#F1F1F1">
        <div id="titlehd"> 
          <span class="titlehd">Contraseña:</span>
        </div>
        <form class="container card">
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
    <div class="col-md-10 mr-5 mb-1 mt-1">
      <span class="titlehd text-dark">Filtrar por:</span>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ingrese el texto a buscar"
          v-model="search"/>
      </div>
    </div>
    <!-- Tabla prueba -->
    <div style="height:400px; overflow:auto;" class="col-md-14 text-center rounded shadow-lg  mt-1 mb-4" >
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
                    v-for="(inmueble, index) in filteredInmuebles"
                    :key="index"
                    @click="setActiveTutorial(inmueble, index)"
                >
                    <th scope="row">{{inmueble.numero}}</th>
                    <td>{{inmueble.descripcion}}</td>
                    <td>{{inmueble.ubicacion}}</td>
                    <td>{{inmueble.no_trabajador}}</td>
                    <td>{{inmueble.custodio2}}</td>
                </tr>
             </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

const token = JSON.parse(localStorage.getItem('user'))['accessToken']


export default {
  name: "custodio",
  data() {
    return {
      config:{
        headers: {
          "Content-type": "application/json",
          "Authorization": 'Bearer ' + token
        }
      },

      contrasena: '',

      search: '',

      inmuebles: [],
      currentInmueble: null,
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
    retrieveMobiliario() {
      TutorialDataService.getAll(this.config)
        .then(response => {
          this.inmuebles = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePassword() {
      //console.log(this.currentUser.id)
      console.log(this.currentUser.contrasena)
      this.currentUser.contrasena = this.currentUser.password
      TutorialDataService.updatePassword(this.currentUser.id, this.currentUser.password)
        .then(response => {
          console.log(response.data);
          this.message = 'La contraseña se ha actualizado correctamente!';
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
      this.currentInmueble = tutorial;
      this.currentIndex = index;
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.inmuebles = response.data;
          //console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveMobiliario();
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
      return this.inmuebles.filter(function(u) {
         return u.no_trabajador == this.currentUser.no_trabajador;
     })
    },
    filteredTutorials() {
   // will return [{status: 'Available'}]
      return this.inmuebles.filter(tutorial => tutorial.no_trabajador == this.currentUser.username)
    },
    filteredInmuebles: function(){
      return this.filteredTutorials.filter((inmueble ) => {
        return inmueble.numero.match(this.search);
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
</style>