<template>
  <div>
    <div
      class="control my-2"
      :class="{ focus: hasFocus && hasContent, hover: !hasFocus }"
      @click.self="editText($event)"
    >
      <label
        class="label"
        :class="{ 'up-label': hasFocus, 'color-blue': hasContent }"
        :for="id"
      >
        {{ label }}
      </label>
      <input
        class="input"
        :type="typeInput"
        :id="id"
        :placeholder="getPlaceholder"
        @focus="upLabel"
        @blur="lowLabel($event)"
      />
    </div>
    <div class="div-helper">
      <span class="helper-text">Requerido*</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "input-builder-survey",
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    typeInput: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      hasFocus: false,
      hasContent: false
    };
  },
  methods: {
    upLabel() {
      this.hasFocus = true;
      this.hasContent = true;
    },
    lowLabel(event) {
      if (event.target.value === "") {
        this.hasFocus = false;
      }
      this.hasContent = false;
    },
    editText(event) {
      event.target.children[1].focus();
    }
  },
  computed: {
    getPlaceholder() {
      return this.hasFocus ? this.placeholder : "";
    }
  }
};
</script>

<style src="./InputSurveyBuilder.css" scoped></style>
