<template>
  <div class="list row text-white" style="background-color: rgba(0,0,0,0.5) !important;">
        <!--<a href="#" @click="logout">Cerrar Sesion</a>-->
    <div class="col-md-8">
      <br>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Pedidos</h4>
      <ul class="list-group">
        <li class="list-group-item" style="background-color:#9494b8;"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.nombre }}
        </li>
      </ul>

      <button class="m-3 btn btn-outline-danger" @click="removeAllTutorials">
        Remove All
      </button>
      <button href="#" class="m-3 btn btn-outline-warning" @click="logout">
        Cerrar Sesion
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Pedido</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentTutorial.nombre }}
        </div>
        <div>
          <label><strong>Celular:</strong></label> {{ currentTutorial.celular }}
        </div>
        <div>
          <label><strong>Dirección:</strong></label> {{ currentTutorial.direccion }}
        </div>
        <div>
          <label><strong>Pedido:</strong></label> {{ currentTutorial.pedido }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>
        
        <a class="badge badge-warning"
          :href="'/pedidos/' + currentTutorial._id"
        >
          Edit
        </a> 
      <!--<button :href="'/pedidos/' + currentTutorial._id" class="mb-3 btn btn-outline-warning">
        Editar
      </button>
      -->
      </div>
      <div v-else>
        <br />
        <p class="text-white">Selecciona un Pedido...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import firebase from "firebase";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
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
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>