<template>
  <div class="list row ">
    <!-- div prueba -->
    <div class="container ml-4 mt-5">
      <div class="form-group shadow-lg" style="border-radius:25px; background:#F1F1F1">
        <div id="titlehd"> 
          <span class="titlehd">Archivo de inventario:</span>
        </div>
        <form class="container card" method="POST" enctype="multipart/form-data">
          <div class="eweFile form-group">
            <p>&nbsp;</p>
            <span class="sel_file">
              <input type="file" id="file" @change="previewFiles">
            </span>
          </div>
          <div>
            <button type="button" class="btn btn-success btn-small m-1 float-md-right">Success</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Primer container 
    <div class="col-md-10 m-5 rounded shadow-lg" style="background-color: #002657;">
        <h4>Archivo de inventario:</h4>
        <div class="card" >
            <div class="custom-file card-body">
                <input type="file" class="custom-file-input" id="customFileLang" lang="es">
                <label class="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
            </div>
        </div>
        <button type="button" class="btn btn-success btn-small m-2 float-md-right">Success</button>
    </div> -->
    

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
            <!--   <input type="text" v-model="search" placeholder="search..."> -->
                <tr :class="{ active: index == currentIndex }"
                    v-for="(inmueble, index) in filteredBlog"
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
//const path = require('path');

//import index from 'index.js'
//console.log(index)


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


      search:'',
      file:'',
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
          //console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    previewFiles(event) {
      this.file = event.target.files[0].name;
      console.log(this.file);
      //console.log(event.target.files);
   },

    submitFile(){
      // Methods to display directory 
      console.log(this.file); 
    },

    refreshList() {
      this.retrieveMobiliario();
      this.currentInmueble = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentInmueble = tutorial;
      this.currentIndex = index;
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.retrieveMobiliario = response.data;
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
      return this.tutorials.filter(function(u) {
         return u.no_trabajador == this.currentUser.no_trabajador;
     })
    },
    filteredList() {
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredBlog: function(){
      return this.inmuebles.filter((inmueble) => {
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