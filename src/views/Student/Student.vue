<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-4">
        <div class="row">
          <list-info
            title="Información Personal"
            :info="person"
            :keys="keysPerson"
          />
          <list-info
            title="Información Estudiantil"
            :info="filteredStudent"
            :keys="keysStudent"
          />
        </div>
      </div>
      <div class="col-12 col-lg-8">
        <router-view></router-view>
      </div>
    </div>
    <button-link
      v-for="(data, index) in buttonLinksData"
      :key="data.id"
      :index="index"
      :route="data.route"
      :text-tooltip="data.textTooltip"
      :is-tooltip-displayed="data.displayed"
      :icon-name="data.iconName"
      @tooltipDeployed="tooltipDeployed($event, index)"
    />
  </div>
</template>

<script>
import ButtonLink from "./../../components/ButtonLink/ButtonLink";
import ListInfo from "./../../components/ListInfo/ListInfo";
import keysPerson from "./../../helpers/keysPerson";
import keysStudent from "./../../helpers/keysStudent";
export default {
  name: "student-view",
  components: {
    ButtonLink,
    ListInfo
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created() {
    this.$store.dispatch("setSelectedStudentId", this.id);
    this.buttonLinksData.map(data => {
      return (data.route.params.id = this.id);
    });
  },
  data() {
    return {
      keysPerson: keysPerson,
      keysStudent: keysStudent,
      buttonLinksData: [
        {
          id: 1,
          route: {
            name: "studentEdit",
            params: {
              id: null
            }
          },
          displayed: false,
          iconName: "edit",
          textTooltip: "Editar Perfil"
        },
        {
          id: 2,
          route: {
            name: "studentEvaluations",
            params: {
              id: null
            }
          },
          displayed: false,
          iconName: "assignment",
          textTooltip: "Evaluaciones"
        }
        // {
        //     id: 3,
        //     route: {
        //         name: 'studentProfile',
        //         params: {
        //             id: null
        //         }
        //     },
        //     displayed: false,
        //     iconName: 'folder_shared',
        //     textTooltip: 'Perfil Estudiante'
        // }
      ]
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
    },
    filteredStudent() {
      let student = {};
      if (this.student) {
        Object.keys(this.student).map(key => {
          if (key !== "id_per") {
            student[key] = this.student[key];
          }
        });
      }
      return student;
    }
  },
  methods: {
    tooltipDeployed(deploy, index) {
      this.buttonLinksData[index].displayed = deploy;
    }
  }
};
</script>

<style src="./Student.css" scoped></style>
