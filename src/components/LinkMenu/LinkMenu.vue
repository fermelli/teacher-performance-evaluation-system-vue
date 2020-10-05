<template>
  <div class="div-link" @click="emitCloseAfterSelected">
    <router-link
      class="link"
      :class="{ 'small-link': isSmall }"
      :to="link.path"
      :title="link.text"
    >
      <div class="material-icons">{{ link.icon }}</div>
      <span class="name-link" v-show="!isSmall">{{ link.text }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "link-menu",
  props: {
    isSmall: {
      type: Boolean,
      required: true,
      default: false
    },
    link: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitCloseAfterSelected() {
      if (document.documentElement.clientWidth < 768) {
        this.$emit("closeAfterSelected");
      }
    }
  }
};
</script>

<style src="./LinkMenu.css" scoped></style>
