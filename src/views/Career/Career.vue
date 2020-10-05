<template>
  <div>
    <div class="row">
      <div class="col-12 navigator">
        <router-link class="link" to="/">Gestiones</router-link> >
        <router-link
          class="link"
          :to="{
            name: 'career',
            params: { idManagement: idManagement, idCareer: idCareer }
          }"
          >{{ career.name }}</router-link
        >
      </div>
    </div>
    <div class="row">
      <list-info
        title="Información de Carrera"
        :info="careerInfo"
        :keys="keysCareer"
      />
    </div>
    <div class="row">
      <list-info
        class="col-lg-4"
        v-for="(course, key, index) in courses"
        :key="key"
        :param-route="{ idCur: key }"
        :title="`Información Curso ${index + 1}`"
        :info="course"
        :keys="keysCourse"
        :elementsKeysThatAreLinks="{
          parallels,
          subjects
        }"
      />
    </div>
  </div>
</template>

<script>
import keysCareer from "./../../helpers/keysCareer";
import keysCourse from "./../../helpers/keysCourse";
import ListInfo from "./../../components/ListInfo/ListInfo";
export default {
  name: "career-view",
  components: {
    ListInfo
  },
  props: {
    idManagement: {
      type: String,
      required: true
    },
    idCareer: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      keysCareer: keysCareer,
      keysCourse: keysCourse
    };
  },
  computed: {
    career() {
      if (this.$store.state.managements[this.idManagement]) {
        return this.$store.state.managements[this.idManagement].careers[
          this.idCareer
        ];
      }
      return {};
    },
    careerInfo() {
      let careerInfo = {};
      if (this.career) {
        Object.keys(this.career).map(key => {
          if (typeof this.career[key] !== "object") {
            careerInfo[key] = this.career[key];
          }
        });
      }
      return careerInfo;
    },
    courses() {
      if (this.career) {
        return this.career["courses"];
      }
      return {};
    },
    parallels() {
      if (this.$store.state.managements[this.idManagement]) {
        return this.$store.state.managements[this.idManagement].parallels;
      }
      return {};
    },
    subjects() {
      if (this.$store.state.managements[this.idManagement]) {
        return this.$store.state.managements[this.idManagement].subjects;
      }
      return {};
    }
  }
};
</script>

<style src="./Career.css" scoped></style>
