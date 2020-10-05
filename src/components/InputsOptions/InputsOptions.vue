<template>
  <div class="row" v-if="exists">
    <div class="col-3 mt-2 mb-1 pr-2">
      <input type="text" placeholder="Valor" />
      <div class="div-helper">
        <span class="helper-tex">Helper Text</span>
      </div>
    </div>
    <div class="col-7 mt-2 mb-1 pr-0 pl-2">
      <input type="text" placeholder="Texto" />
      <div class="div-helper">
        <span class="helper-tex">Helper Text</span>
      </div>
    </div>
    <div class="col-2 mt-2 mb-1">
      <button class="btn-delete" @click="deleteSelf">
        <i class="material-icons md-36">
          delete_forever
        </i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputs-options",
  data() {
    return {
      exists: true
    };
  },
  methods: {
    deleteSelf() {
      this.exists = false;
    }
  }
};
</script>

<style src="./InputsOptions.css" scoped></style>
