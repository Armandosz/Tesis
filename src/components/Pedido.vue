<template>
  <div v-if="currentPedido" class="container" style="background-color: rgba(0,0,0,0.5) !important;">
    <br>
    <a href="#" @click="logout">Cerrar Sesion</a>
    <h4 class="text-white">Pedido</h4>
    <form class="mt-5 p-2 text-left text-white" >
       <div class="form-row">
      <div class="form-group col-md-6">
        <label for="nombre">Nombre</label>
        <input 
          type="text" 
          class="form-control" 
          id="nombre"
          v-model="currentPedido.nombre"
          required
          oninvalid="this.setCustomValidity('Nombre requerido!')" oninput="setCustomValidity('')"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="celular">Celular</label>
        <input 
          type="text" 
          class="form-control" 
          id="celular"
          v-model="currentPedido.celular"
          required
          oninvalid="this.setCustomValidity('Número requerido!')" oninput="setCustomValidity('')"
        />
      </div>
       </div>
      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input 
          type="text" 
          class="form-control" 
          id="direccion"
          v-model="currentPedido.direccion"
          required
          oninvalid="this.setCustomValidity('Dirección requerida!')" oninput="setCustomValidity('')"
        />
      </div>
      <div class="form-group">
        <label for="pedido">Pedido</label>
        <input 
          type="text" 
          class="form-control" 
          id="pedido"
          v-model="currentPedido.pedido"
          required
          oninvalid="this.setCustomValidity('Pedido requerido!')" oninput="setCustomValidity('')"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentPedido.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentPedido.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import firebase from "firebase";

export default {
  name: "pedido",
  data() {
    return {
      currentPedido: null,
      message: ''
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentPedido = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        nombre: this.currentPedido.nombre,
        celular: this.currentPedido.celular,
        direccion: this.currentPedido.direccion,
        pedido: this.currentPedido.pedido,
        published: status
      };

      TutorialDataService.update(this.currentPedido._id, data)
        .then(response => {
          this.currentPedido.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentPedido._id, this.currentPedido)
        .then(response => {
          console.log(response.data);
          this.message = 'El pedido se actualizaco correctamente!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentPedido._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "pedidos" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    logout() {
      firebase
        .auth()
        .singOut()
        .then(() => this.$router.replace('sesion'));
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

html,body{
background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
}

</style>