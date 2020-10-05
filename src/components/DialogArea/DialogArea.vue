<template>
  <div class="dialog-scrim" v-show="isOpen">
    <div
      class="dialog-container"
      :class="{ open: !isClose, close: isClose }"
      @animationend="animatedEnd($event)"
      @webkitAnimationEnd="animatedEnd($event)"
    >
      <div class="dialog-header">
        <button class="btn btn-close" @click="close">
          <i class="material-icons md-36">close</i>
        </button>
        <h1 class="title">Nueva Área</h1>
      </div>
      <div class="dialog-body">
        <input-builder-survey
          label="Nombre del Área"
          placeholder="Introduzca nombre del Área"
          id="name"
        />
        <input-builder-survey
          label="Título del Área"
          placeholder="Introduzca título del Área"
          id="title"
        />
        <textarea-survey-builder label="Descripción" id="description" />
        <button-dialog-open text="criterios" />
        <button-dialog-open text="indicadores" />
      </div>
      <div class="actions">
        <button class="btn btn-cancel" @click="close">
          CANCELAR
        </button>
        <button class="btn btn-ok">
          GUARDAR
        </button>
      </div>
    </div>
    <!-- <dialog-options /> -->
  </div>
</template>

<script>
import InputBuilderSurvey from "../InputSurveyBuilder/InputSurveyBuilder";
import ButtonDialogOpen from "../ButtonDialogOpen/ButtonDialogOpen";
import TextareaSurveyBuilder from "../TextareaSurveyBuilder/TextareaSurveyBuilder";
import DialogOptions from "../DialogOptions/DialogOptions";
export default {
  name: "dialog-area",
  components: {
    InputBuilderSurvey,
    ButtonDialogOpen,
    TextareaSurveyBuilder,
    DialogOptions
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isClose: false
    };
  },
  methods: {
    close() {
      this.isClose = true;
    },
    emitToggleModal() {
      this.$emit("toggleModal");
    },
    animatedEnd(event) {
      console.log(event);
      if (event.animationName.indexOf("Out") !== -1) {
        console.log("es de salida");
        this.isClose = false;
        this.emitToggleModal();
      } else if (event.animationName.indexOf("In") !== -1) {
        console.log("es de entrada");
      }
    }
  }
};
</script>

<style src="./DialogArea.css" scoped></style>
