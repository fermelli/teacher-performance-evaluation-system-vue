<template>
  <div class="form-control-custom">
    <div class="div-select" v-if="type === 'select'">
      <label :style="fontColor">{{ textLabel }}</label>
      <div>
        <i
          class="material-icons icon"
          style="position: absolute; top: 34px; left: 30px;"
          :style="fontColor"
        >
          {{ iconName }}</i
        >
        <select
          style="padding: 0px 47px;"
          :class="{ focus: hasFocus }"
          :style="borderColor"
          @change="$emit('input', $event.target.value)"
          :value="value"
          @click="selectFocus"
          @focusout="hasFocus = false"
          :required="isRequired"
        >
          <option v-if="withOptionSelectOne" disabled value=""
            >Por favor, seleccione uno</option
          >
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            >{{ option.text }}</option
          >
        </select>
        <div class="container-helper-text">
          <span class="helper-text" v-if="validate && !value && isRequired">{{
            helperText
          }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <label
        :class="{
          'up-label': hasFocus || value || type == 'date' || type == 'file',
          'has-content': value && !hasFocus
        }"
        :style="fontColor"
        @click.self="inputFocus"
        >{{ textLabel }}</label
      >
      <div
        class="container-input"
        :class="{ focus: hasFocus }"
        :style="borderColor"
        @click.self="inputFocus"
      >
        <i class="material-icons icon" :style="fontColor"> {{ iconName }}</i>
        <input
          :type="type"
          :value="value"
          @input="$emit('input', $event.target.value)"
          @focus="hasFocus = true"
          @focusout="hasFocus = false"
          :required="isRequired"
        />
      </div>
      <div class="container-helper-text">
        <span
          class="helper-text"
          v-if="validate && !value && isRequired"
          :style="fontColor"
          >{{ helperText }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-controls",
  props: {
    color: {
      type: String
    },
    textLabel: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      required: true
    },
    helperText: {
      type: String,
      default: "Es requerido"
    },
    options: {
      type: Array
    },
    withOptionSelectOne: {
      type: Boolean,
      default: true
    },
    validate: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasFocus: false,
      selectedIndex: 0
    };
  },
  computed: {
    fontColor() {
      return {
        color:
          this.hasFocus && !this.hasContent
            ? this.color
            : this.validate && !this.value && this.isRequired
            ? "#dc3545"
            : "rgba(0, 0, 0, 0.5)"
      };
    },
    borderColor() {
      return {
        borderColor:
          this.hasFocus && !this.hasContent
            ? this.color
            : this.validate && !this.value && this.isRequired
            ? "#dc3545"
            : "rgba(0, 0, 0, 0.3)"
      };
    }
  },
  methods: {
    inputFocus() {
      switch (event.target.nodeName) {
        case "LABEL":
          event.target.nextSibling.firstChild.nextSibling.focus();
          break;
        case "DIV":
          event.target.firstChild.nextSibling.focus();
      }
    },
    selectFocus() {
      if (
        (!this.hasFocus && event.target.selectedIndex === this.selectedIndex) ||
        !this.selectedIndex
      ) {
        this.hasFocus = true;
      } else {
        this.hasFocus = false;
      }
      this.selectedIndex = event.target.selectedIndex;
    }
  }
};
</script>

<style src="./FormControls.css" scoped></style>
