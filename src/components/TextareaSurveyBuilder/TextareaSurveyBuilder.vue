<template>
  <div class="col-12">
    <label
      class="label-textarea"
      :class="{ 'up-label': hasFocus, 'color-blue': hasContent }"
      :for="id"
    >
      {{ label }}
    </label>
    <div
      contenteditable
      class="div-textarea"
      :id="id"
      @focus="upLabel"
      @blur="lowLabel($event)"
    ></div>
    <div class="div-helper">
      <span class="helper-text">Requerido*</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "textarea-survey-builder",
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
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
      if (event.target.textContent === "") {
        this.hasFocus = false;
      }
      this.hasContent = false;
    }
  }
};
</script>

<style src="./TextareaSurveyBuilder.css" scoped></style>
