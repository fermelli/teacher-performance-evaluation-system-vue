<template>
  <div class="student-edit">
    <form @submit.prevent="updatePerson" novalidate>
      <div class="row">
        <div
          class="offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 offset-xxl-1 col-xxl-10"
        >
          <h1 class="title" :style="{ color: colors[0] }">
            Informacion Personal
          </h1>
        </div>
        <form-controls
          v-for="(data, key) in formsData.person"
          :key="key"
          :class="data.class"
          :color="colors[0]"
          :type="data.type"
          :text-label="data.textLabel"
          :icon-name="data.iconName"
          :is-required="data.isRequired"
          :options="data.options"
          v-model="person[key]"
          :validate="validatePersonFormData"
        />
        <div
          class="actions offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 offset-xxl-1 col-xxl-10"
        >
          <button
            class="btn btn-save"
            :style="{ background: colors[0] }"
            :disabled="snackbar.show"
          >
            <i class="material-icons">save</i>
            GUARDAR CAMBIOS
          </button>
        </div>
      </div>
    </form>
    <form @submit.prevent="updateStudent" novalidate>
      <div class="row">
        <div
          class="offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 offset-xxl-1 col-xxl-10"
        >
          <h1 class="title" :style="{ color: colors[1] }">
            Informacion Estudiantil
          </h1>
        </div>
        <form-controls
          v-for="(data, key) in formsData.student"
          :key="key"
          :class="data.class"
          :color="colors[1]"
          :type="data.type"
          :text-label="data.textLabel"
          :icon-name="data.iconName"
          :is-required="data.isRequired"
          :options="data.options"
          v-model="student[key]"
          :validate="validateStudentFormData"
        />
        <div
          class="actions offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 offset-xxl-1 col-xxl-10"
        >
          <button
            class="btn btn-save"
            :style="{ background: colors[1] }"
            :disabled="snackbar.show"
          >
            <i class="material-icons">save</i>
            GUARDAR CAMBIOS
          </button>
        </div>
      </div>
    </form>
    <snackbar-component
      :text="snackbar.text"
      :show-snackbar="snackbar.show"
      @hide-snackbar="snackbar.show = false"
    />
  </div>
</template>

<script>
import FormControls from "./../../components/FormControls/FormControls";
import SnackbarComponent from "./../../components/SnackbarComponent/SnackbarComponent";

import DB from "./../../db/db";
export default {
  name: "student-edit",
  components: {
    FormControls,
    SnackbarComponent
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      validatePersonFormData: false,
      validateStudentFormData: false,
      snackbar: {
        text: "",
        show: false
      },
      colors: ["#E65100", "#880E4F"],
      formsData: {
        person: {
          picture: {
            type: "file",
            textLabel: "Imagen",
            iconName: "insert_photo",
            isRequired: false,
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 offset-xxl-1 col-xxl-10"
          },
          ci: {
            type: "number",
            textLabel: "Carnet de Identidad",
            iconName: "grade",
            isRequired: true,
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 offset-xxl-1 col-xxl-5"
          },
          date_of_birth: {
            type: "date",
            textLabel: "Fecha de Nacimiento",
            iconName: "date_range",
            isRequired: true,
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-xxl-5"
          },
          gender: {
            type: "select",
            textLabel: "Género",
            iconName: "wc",
            isRequired: true,
            options: [
              {
                text: "Femenino",
                value: "Femenino"
              },
              {
                text: "Masculino",
                value: "Masculino"
              }
            ],
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 offset-xxl-1 col-xxl-5"
          },
          paternal_surname: {
            type: "text",
            textLabel: "Apellido Paterno",
            iconName: "person",
            isRequired: true,
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-xxl-5"
          },
          maternal_surname: {
            type: "text",
            textLabel: "Apellido Materno",
            iconName: "person",
            isRequired: true,
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 offset-xxl-1 col-xxl-5"
          },
          names: {
            type: "text",
            textLabel: "Nombres",
            iconName: "person",
            isRequired: true,
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-xxl-5"
          }
        },
        student: {
          is_enabled: {
            type: "select",
            textLabel: "Habilitado",
            iconName: "error_outline",
            isRequired: true,
            options: [
              {
                text: "Si",
                value: true
              },
              {
                text: "No",
                value: false
              }
            ],
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 offset-xxl-1 col-xxl-5"
          }
        }
      }
    };
  },
  computed: {
    person() {
      if (this.$store.getters.selectedPersonForStudent) {
        return this.$store.getters.selectedPersonForStudent;
      }
      return {};
    },
    student() {
      if (this.$store.getters.selectedStudent) {
        return this.$store.getters.selectedStudent;
      }
      return {};
    }
  },
  methods: {
    updatePerson() {
      this.validatePersonFormData = !event.currentTarget.checkValidity();
      if (event.currentTarget.checkValidity()) {
        let idPer = this.$store.state.students[this.id].id_per;
        let db = new DB();
        db.updatePerson(idPer, this.person);
        this.snackbar.text = "¡Persona guardada con éxito!";
      } else {
        this.snackbar.text = "¡No se pudo guardar!";
      }
      this.snackbar.show = true;
    },
    updateStudent() {
      this.validateStudentFormData = !event.currentTarget.checkValidity();
      if (event.currentTarget.checkValidity()) {
        let idDoc = this.id;
        let db = new DB();
        db.updateStudent(idDoc, this.student);
        this.snackbar.text = "Estudiante guardado con éxito!";
      } else {
        this.snackbar.text = "¡No se pudo guardar!";
      }
      this.snackbar.show = true;
    }
  }
};
</script>

<style src="./StudentEdit.css" scoped></style>
