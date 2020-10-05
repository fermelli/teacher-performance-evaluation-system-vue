<template>
  <div class="teacher-edit">
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
    <form @submit.prevent="updateTeacher" novalidate>
      <div class="row">
        <div
          class="offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 offset-xxl-1 col-xxl-10"
        >
          <h1 class="title" :style="{ color: colors[1] }">
            Informacion Profesional
          </h1>
        </div>
        <form-controls
          v-for="(data, key) in formsData.teacher"
          :key="key"
          :class="data.class"
          :color="colors[1]"
          :type="data.type"
          :text-label="data.textLabel"
          :icon-name="data.iconName"
          :is-required="data.isRequired"
          :options="data.options"
          v-model="teacher[key]"
          :validate="validateTeacherFormData"
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
  name: "teacher-edit",
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
      validateTeacherFormData: false,
      snackbar: {
        text: "",
        show: false
      },
      colors: ["#2E7D32", "#3F51B5"],
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
            isRequired: true,
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
        teacher: {
          academic_title: {
            type: "select",
            textLabel: "Título Académico",
            iconName: "school",
            isRequired: true,
            options: [
              {
                text: "Licenciado",
                value: "Licenciado"
              },
              {
                text: "Magíster",
                value: "Magíster"
              },
              {
                text: "Doctor",
                value: "Doctor"
              }
            ],
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 offset-xxl-1 col-xxl-5"
          },
          item: {
            type: "number",
            textLabel: "Item",
            iconName: "grade",
            isRequired: true,
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-xxl-5"
          },
          professions: {
            type: "text",
            textLabel: "Profesiones",
            iconName: "library_books",
            isRequired: true,
            class:
              "offset-0 col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 offset-xxl-1 col-xxl-10"
          }
        }
      }
    };
  },
  computed: {
    person() {
      if (this.$store.getters.selectedPersonForTeacher) {
        return this.$store.getters.selectedPersonForTeacher;
      }
      return {};
    },
    teacher() {
      if (this.$store.getters.selectedTeacher) {
        return this.$store.getters.selectedTeacher;
      }
      return {};
    }
  },
  methods: {
    updatePerson() {
      this.validatePersonFormData = !event.currentTarget.checkValidity();
      if (event.currentTarget.checkValidity()) {
        let idPer = this.$store.state.teachers[this.id].id_per;
        let db = new DB();
        db.updatePerson(idPer, this.person);
        this.snackbar.text = "¡Persona guardada con éxito!";
      } else {
        this.snackbar.text = "¡No se pudo guardar!";
      }
      this.snackbar.show = true;
    },
    updateTeacher() {
      this.validateTeacherFormData = !event.currentTarget.checkValidity();
      if (event.currentTarget.checkValidity()) {
        let idDoc = this.id;
        let db = new DB();
        db.updateTeacher(idDoc, this.teacher);
        this.snackbar.text = "¡Docente guardado con éxito!";
      } else {
        this.snackbar.text = "¡No se pudo guardar!";
      }
      this.snackbar.show = true;
    }
  }
};
</script>

<style src="./TeacherEdit.css" scoped></style>
