<template>
  <div class="list row ">
    <!-- div Form-->
    <div class="container ml-4 mt-5">
      <div class="form-group shadow-lg" style="border-radius:25px; background:#F1F1F1">
        <div id="titlehd"> 
          <span class="titlehd">Archivo de inventario:</span>
        </div>
        <form class="container card" method="POST" enctype="multipart/form-data">
          <div class="eweFile form-group">
            <p>&nbsp;</p>
            <span class="sel_file">
              <input type="file" id="file">
            </span>
          </div>
          <div>
            <button type="button" class="btn btn-success btn-small m-1 float-md-right">Success</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Search -->
    <div class="col-md-10 ml-4 mr-5 mt-1">
      <span class="titlehd text-dark">Filtrar por:</span>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ingrese el código a buscar"
          v-model="search"/>
      </div>
    </div>

    <!-- Tabla -->
    <div class="container text-center rounded shadow-lg mb-3">
        <table cellspacing="5" width="500" class="table table-responsive table-striped table-hover">
            <thead class="bg-dark text-white">
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Serie</th>
                  <th scope="col">Ubicación</th>
                  <th scope="col">No._Trabajador</th>
                  <th scope="col">custodio</th>
                  <th scope="col">CVE_Dependencia</th>
                  <th scope="col">Custodio_2</th>
                  <th scope="col">Observaciones</th>
                </tr>
            </thead>
             <tbody>
               <!--Index is use for show the position-->
            <!--   <input type="text" v-model="search" placeholder="search..."> -->
                <tr :class="{ active: index == currentIndex }"
                    v-for="(inmueble, index) in filteredBlog"
                    :key="index"
                >
                    <th scope="row">{{inmueble.numero}}</th>
                    <td>{{inmueble.descripcion}}</td>
                    <td>{{inmueble.marca}}</td>
                    <td>{{inmueble.modelo}}</td>
                    <td>{{inmueble.serie}}</td>
                    <td>{{inmueble.ubicacion}}</td>
                    <td>{{inmueble.no_trabajador}}</td>
                    <td>{{inmueble.custodio}}</td>
                    <td>{{inmueble.cve_depen}}</td>
                    <td>{{inmueble.custodio2}}</td>
                    <td>{{inmueble.observaciones}}</td>
                </tr>
             </tbody>
        </table>
    </div>

  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

const token = JSON.parse(localStorage.getItem('user'))['accessToken'] //Obtienes el token

export default {
  name: "inventario",
  data() {
    return {
      config:{
        headers: {
          "Content-type": "application/json",
          "Authorization": 'Bearer ' + token
        }
      },

      search:'',
      
      inmuebles: [],
      currentInmueble: null,
      currentIndex: -1,

      password: '',
      passwordFieldType: 'password'
    };
  },
  methods: {
    /* Icono para la visibilidad de la contraseña */
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    /* Obtiene todo el mobiliario de la db */
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

    /* Recarga */
    refreshList() {
      this.retrieveMobiliario();
      this.currentInmueble = null;
      this.currentIndex = -1;
    }
  },
  mounted() {
    this.retrieveMobiliario();
  },
  computed: {
    /* Devuelve los datos del usuario actual*/
    currentUser() {
      return this.$store.state.auth.user;
    },
    /* filtra la lista  
    filteredList() {
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    */
    /* Filtra la lista de los inmuebles existentes del excel */
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

 table {
      overflow-y: scroll;
      display: block;
      height: 500px;
    }
</style>