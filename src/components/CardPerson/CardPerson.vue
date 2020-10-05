<template>
  <div class="col-12 col-sm-6 col-lg-4 col-xl-3 col-xl-20p">
    <div class="card-person">
      <div class="card-person-img">
        <img :src="img(person.gender)" alt="Imágen perfíl" />
      </div>
      <div class="card-person-title">
        <h2>{{ roleText }}</h2>
        <h3>
          {{
            `${person.paternal_surname} ${person.maternal_surname} ${
              person.names
            }`
          }}
        </h3>
        <h4>{{ person.ci }}</h4>
      </div>
      <div class="card-person-actions">
        <button
          class="btn btn-actions btn-delete"
          @mouseenter="tooltips.delete = true"
          @mouseleave="tooltips.delete = false"
          @focus="tooltips.delete = true"
          @blur="tooltips.delete = false"
        >
          <i class="material-icons">delete</i>
          <tooltip-component text="Eliminar" :is-show="tooltips.delete" />
        </button>
        <button
          class="btn btn-actions btn-open-in-new"
          @mouseenter="tooltips.open = true"
          @mouseleave="tooltips.open = false"
          @focus="tooltips.open = true"
          @blur="tooltips.open = false"
          @click="openInNew(roleKey)"
        >
          <i class="material-icons">assignment_turned_in</i>
          <tooltip-component text="Evaluaciones" :is-show="tooltips.open" />
        </button>
        <button
          class="btn btn-actions btn-edit"
          @mouseenter="tooltips.edit = true"
          @mouseleave="tooltips.edit = false"
          @focus="tooltips.edit = true"
          @blur="tooltips.edit = false"
          @click="edit(roleKey)"
        >
          <i class="material-icons">edit</i>
          <tooltip-component text="Editar" :is-show="tooltips.edit" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TooltipComponent from "./../TooltipComponent/TooltipComponent";
export default {
  name: "card-person",
  components: {
    TooltipComponent
  },
  props: {
    role: {
      type: String,
      required: true
    },
    roleKey: {
      type: String,
      required: true
    },
    roleText: {
      type: String,
      required: true
    },
    pathNameOpenInNew: {
      type: String,
      required: true
    },
    pathNameEdit: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tooltips: {
        delete: false,
        open: false,
        edit: false
      }
    };
  },
  computed: {
    person() {
      let id_per = this.$store.state[this.role][this.roleKey].id_per;
      return this.$store.state.people[id_per];
    }
  },
  methods: {
    img(gender) {
      return gender === "Femenino"
        ? require("./../../assets/female.png")
        : require("./../../assets/male.png");
    },
    openInNew(id) {
      this.$router.push({ name: this.pathNameOpenInNew, params: { id: id } });
    },
    edit(id) {
      this.$router.push({ name: this.pathNameEdit, params: { id: id } });
    }
  }
};
</script>

<style src="./CardPerson.css" scoped></style>
