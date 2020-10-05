<template>
  <div class="col-12 mt-3 mb-1">
    <button class="btn-collapse">
      <h2>{{ text.toUpperCase() }}</h2>
      <i class="material-icons md-24">open_in_new</i>
    </button>
  </div>
</template>

<script>
export default {
  name: "button-dialog-open",
  props: {
    text: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>

<style src="./ButtonDialogOpen.css" scoped></style>
