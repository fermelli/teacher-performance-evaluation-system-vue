<template>
  <div
    class="snackbar-container"
    v-show="showSnackbar"
    :class="{ 'snackbar-in': showSnackbar && show, 'snackbar-out ': !show }"
    @animationend="animationEnd($event)"
  >
    <div class="snackbar-text">
      <span>{{ text }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "snackbar-component",
  props: {
    text: {
      type: String,
      required: true
    },
    showSnackbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    animationEnd(event) {
      this.show = false;
      if (event.animationName.indexOf("snackbar-out") !== -1) {
        this.$emit("hide-snackbar");
        this.show = true;
      }
    }
  }
};
</script>

<style scoped src="./SnackbarComponent.css"></style>
