<template>
  <div
    class="form-control offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6"
  >
    <label
      :class="{
        'up-label': hasFocus || value,
        'has-content': value && !hasFocus
      }"
      @click.self="inputFocus"
      >{{ textLabel }}</label
    >
    <div
      class="container-input"
      :class="{ focus: hasFocus }"
      @click.self="inputFocus"
    >
      <input
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="hasFocus = true"
        @focusout="hasFocus = false"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "input-component",
  props: {
    textLabel: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      required: true
    }
  },
  data: () => {
    return {
      hasFocus: false
    };
  },
  methods: {
    inputFocus: () => {
      switch (event.target.nodeName) {
        case "LABEL":
          event.target.nextSibling.firstChild.focus();
          break;
        case "DIV":
          event.target.firstChild.focus();
      }
    }
  }
};
</script>

<style src="./InputComponent.css" scoped></style>
