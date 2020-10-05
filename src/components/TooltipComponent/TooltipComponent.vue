<template>
  <div class="tooltip-custom" v-show="isShow">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "tooltip-component",
  props: {
    text: {
      type: String,
      required: true
    },
    isShow: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style src="./TooltipComponent.css" scoped></style>
