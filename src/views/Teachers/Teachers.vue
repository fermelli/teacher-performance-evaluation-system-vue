<template>
  <div class="teachers">
    <!-- <div class="row">
            <search-input
                :list="teachers"
                @setSelectedItemId="setSelectedItemId"
            />
        </div>
        <div
            class="row"
            v-if="teacherSelected"
        >
            <div class="col-12">
                <h3>Docente Seleccionado</h3>
            </div>
            <card-person
                :class="{ bounceIn: !out, bounceOut: out }"
                :person="teacherSelected"
                path-name-open-in-new="teacherProfile"
                path-name-edit="teacherEdit"
            />
        </div> -->
    <div class="row">
      <div class="col-12">
        <h3>Docentes</h3>
      </div>
      <card-person
        v-for="teacherKey in teachersKeys"
        :key="teacherKey"
        role="teachers"
        :role-key="teacherKey"
        role-text="Docente"
        path-name-open-in-new="teacherEvaluations"
        path-name-edit="teacherEdit"
      />
    </div>
  </div>
</template>

<script>
import CardPerson from "./../../components/CardPerson/CardPerson";
// import SearchInput from "./../../components/SearchInput/SearchInput";

export default {
  name: "teacher-view",
  components: {
    CardPerson
    // SearchInput
  },
  data() {
    return {
      selectedItemId: null,
      out: false
    };
  },
  computed: {
    people() {
      return this.$store.state.people;
    },
    teachersKeys() {
      return Object.keys(this.$store.state.teachers);
    }
    // teacherSelected() {
    //     return this.teachers.find((teacher) => {
    //         return teacher.ci === this.selectedItemId
    //     })
    // }
  },
  methods: {
    setSelectedItemId(id) {
      let time = id ? 0 : 750;
      this.selectedItemId === id || id ? (this.out = false) : (this.out = true);
      setTimeout(() => {
        this.selectedItemId = id;
      }, time);
    }
  }
};
</script>

<style scoped>
.bounceIn {
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
}

.bounceOut {
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-name: bounceOut;
  animation-name: bounceOut;
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceOut {
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
}
</style>
