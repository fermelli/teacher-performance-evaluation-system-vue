<template>
  <div
    class="form-control offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6"
  >
    <label :class="{ focus: hasFocus }">{{ textLabel }}</label>
    <div>
      <select
        :class="{ focus: hasFocus }"
        @change="$emit('input', $event.target.value)"
        :value="value"
        @click="selectFocus"
        @focusout="hasFocus = false"
      >
        <option disabled value="">Por favor, seleccione uno</option>
        <option v-for="(option, index) in options" :key="index">{{
          option
        }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "select-component",
  props: {
    textLabel: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      required: true
    }
  },
  data() {
    return {
      hasFocus: false,
      selectedIndex: 0
    };
  },
  methods: {
    selectFocus() {
      if (event.target.selectedIndex === this.selectedIndex) {
        this.hasFocus = true;
      } else {
        this.hasFocus = false;
        this.selectedIndex = event.target.selectedIndex;
      }
    }
  }
};
</script>

<style src="./SelectComponent.css" scoped></style>
