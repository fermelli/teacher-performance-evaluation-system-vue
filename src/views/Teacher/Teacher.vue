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
            title="Información Profesional"
            :info="filteredTeacher"
            :keys="keysTeacher"
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
import keysTeacher from "./../../helpers/keysTeacher";
export default {
  name: "teacher-view",
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
    this.$store.dispatch("setSelectedTeacherId", this.id);
    this.buttonLinksData.map(data => {
      return (data.route.params.id = this.id);
    });
  },
  data() {
    return {
      keysPerson: keysPerson,
      keysTeacher: keysTeacher,
      buttonLinksData: [
        {
          id: 1,
          route: {
            name: "teacherEdit",
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
            name: "teacherEvaluations",
            params: {
              id: null
            }
          },
          displayed: false,
          iconName: "assignment",
          textTooltip: "Evaluaciones"
        },
        {
          id: 3,
          route: {
            name: "teacherProfile",
            params: {
              id: null
            }
          },
          displayed: false,
          iconName: "folder_shared",
          textTooltip: "Perfil Docente"
        }
      ]
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
    },
    filteredTeacher() {
      let teacher = {};
      if (this.teacher) {
        Object.keys(this.teacher).map(key => {
          if (key !== "id_per") {
            teacher[key] = this.teacher[key];
          }
        });
      }
      return teacher;
    }
  },
  methods: {
    tooltipDeployed(deploy, index) {
      this.buttonLinksData[index].displayed = deploy;
    }
  }
};
</script>

<style src="./Teacher.css" scoped></style>
