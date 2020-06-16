<template>
    <div class="container">
    <form class="mt-5 p-2 text-left" style="background-color: rgba(0,0,0,0.5) !important;">
    <div v-if="!submitted">
      <div class="form-row">
      <div class="form-group col-md-6">
        <label for="nombre" class="text-white">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required
          v-model="tutorial.nombre"
          name="nombre"
          oninvalid="this.setCustomValidity('Nombre requerido!')" oninput="setCustomValidity('')"
          placeholder="Ingrese su nombre...."
        />
      </div>

      <div class="form-group col-md-6">
        <label for="celular" class="text-white">Telefono / Celular</label>
        <input
          type="text"
          class="form-control"
          id="celular"
          required
          v-model="tutorial.celular"
          name="celular"
          oninvalid="this.setCustomValidity('Número requerido!')" oninput="setCustomValidity('')"
          maxlength="10"
          placeholder="Ingresa los 10 digitos...."
          pattern="[0-9]{10}"
        />
      </div>
      </div>

      <div class="form-group">
        <label for="direccion" class="text-white">Dirección</label>
        <textarea
          type="text"
          class="form-control"
          id="direccion"
          required
          oninvalid="this.setCustomValidity('Dirección requerida!')" oninput="setCustomValidity('')"
          row="3"
          v-model="tutorial.direccion"
          name="direccion"
          placeholder="Referencias de su domicilio...."
        ></textarea>
      </div>

       <div class="form-group">
        <label for="pedido" class="text-white">Pedido</label>
        <textarea
          type="text"
          class="form-control"
          id="pedido"
          required
          oninvalid="this.setCustomValidity('Pedido requerido')" oninput="setCustomValidity('')"
          row="3"
          v-model="tutorial.pedido"
          name="pedido"
          placeholder="Agregue su pedido...."
        ></textarea>
      </div>
       <div class="form-group text-white">
              <h6 class="font-weight-bold">* Se cobraran $5.00 extras por la entrega a domicilio.</h6>
              <h6 class="font-weight-bold">* Una vez ordenado el pedido, no se podra modficar, en caso de querer agregar algo debe
                        hablar directamente al numero: 312 321 4132.
              </h6>
        </div>

      <!--<button @click="saveTutorial" class="btn btn-success">Enviar</button>-->
      <button v-on:click="saveTutorial" class="btn btn-success">Enviar</button>
    </div>

    <div v-else>
      <h4>Pedido realizado con exito!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
    </form>
    <br />
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        nombre: "",
        celular: "",
        direccion: "",
        pedido: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        nombre: this.tutorial.nombre,
        celular: this.tutorial.celular,
        direccion: this.tutorial.direccion,
        pedido: this.tutorial.pedido
      };

      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>