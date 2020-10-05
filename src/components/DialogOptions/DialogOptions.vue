<template>
  <div class="dialog">
    <div class="container-options">
      <div class="head">
        <h3 class="title">CRITERIOS</h3>
        <button class="btn-close">
          <i class="material-icons">close</i>
        </button>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-3 mt-3">
            <h4 class="heading">Valor</h4>
          </div>
          <div class="col-7 mt-3 pr-0 pl-2">
            <h4 class="heading">Texto</h4>
          </div>
        </div>
        <div class="container-inputs">
          <inputs-options v-for="i in 3" :key="i" />
        </div>
        <div class="row mt-3 div-actions">
          <div class="col-12 actions">
            <button class="btn-add">
              <i class="material-icons md-28">add</i>
              AGREGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputsOptions from "../InputsOptions/InputsOptions";
export default {
  name: "dialog-options",
  components: {
    InputsOptions
  }
};
</script>

<style src="./DialogOptions.css" scoped></style>
