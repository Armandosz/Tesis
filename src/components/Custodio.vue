<template>
  <div class="list row ">
    <!--Form-->
    <div class="col-md-10 mt-5">
      <div class="form-group shadow-lg" style="border-radius:25px; background:#F1F1F1">
        <div id="titlehd"> 
          <span class="titlehd">Contraseña:</span>
        </div>
        <form class="container card">
          <div class="input-group rounded mt-2">
              <input :type="passwordFieldType" class="form-control" required v-model="password" placeholder="Password">
              <b-icon @click="switchVisibility" class="pt" id="eye" icon="eye-slash-fill" font-scale="2.2"></b-icon>
          </div>
          <div>
            <button type="button" class="btn btn-success btn-small m-2 float-md-right" @click="updateUsuario">Success</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Search -->
    <div class="col-md-10 mb-1 mt-1">
      <span class="titlehd text-dark">Filtrar por #:</span>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ingrese el texto a buscar"
          v-model="search"/>
      </div>
    </div>

    <!-- Tabla -->
    <div class="container text-center rounded shadow-lg mt-1 mb-4" >
        <table cellspacing="5" cellpadding="5" width="500" class="table table-responsive table-striped table-hover">
            <thead class="bg-dark text-white">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Serie</th>
                  <th scope="col">Ubicación</th>
                  <th scope="col">No._Trabajador</th>
                  <th scope="col">custodio</th>
                  <th scope="col">CVE_Dependencia</th>
                  <th scope="col">Custodio_2</th>
                </tr>
            </thead>
             <tbody>
               <!--Index is use for show the position-->
                <tr :class="{ active: index == currentIndex }"
                    v-for="(inmueble, index) in filteredInmuebles"
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
                </tr>
             </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import swal from 'sweetalert';

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

      search: '',

      inmuebles: [],
      currentInmueble: null,
      currentIndex: -1,

      password: '',
      passwordFieldType: 'password'
    };
  },
  methods: {
    /* Muestra la contraseña en texto plano*/ 
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },

    /* Get del mobiliario existente */
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

    /* PUT para actualizar solo la contraseña del usuario */
    updateUsuario() {
      console.log(this.currentUser)
      console.log(this.password)
      
      var data = {
        _id: this.currentUser.id,
        username: this.currentUser.username,
        password: this.password,
        email: this.currentUser.email,
        name: this.currentUser.name,
        roles: this.currentUser.roles,
      };
      
      if(this.password != "") {
      TutorialDataService.updateUser(this.currentUser.id, data)
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
      } else {
        swal({
            title: "La contraseña no puede ser nula!!",
            //text: "You clicked the button!",
            icon: "error",
            button: "Entendido",
          });
      }

    },

    /* Actualiza el Array de los inmuebles cada cierto tiempo */
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    }
  },
  mounted() {
    /* Actualiza cada determinado tiempo el el mobiliario */
    this.retrieveMobiliario();
  },
  computed: {
    /* Se utiliza para saber si el usuario esta autenticado o no */
    currentUser() {
      return this.$store.state.auth.user;
    },


    //Retorna todos los inmuebles que tiene asignado el Numero de cuenta del usuario actual
    filteredCustodioInmuebles() {
   // will return [{status: 'Available'}]
      return this.inmuebles.filter(tutorial => tutorial.no_trabajador == this.currentUser.username);
    },

    //Retorna una lista filtrada del metodo search
    filteredInmuebles: function(){
      return this.filteredCustodioInmuebles.filter((inmueble ) => {
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

#eye:hover {
  background-color: gray;
}
</style>