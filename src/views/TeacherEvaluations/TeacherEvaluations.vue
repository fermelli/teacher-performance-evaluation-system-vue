<template>
  <div>
    <div
      class="row"
      v-for="(management, managementKey) in managements"
      :key="managementKey"
    >
      <div class="col-12">
        <h1 class="title">Gestión {{ management.value }}</h1>
      </div>
      <card-evaluation
        v-for="(dependencyKey, key) in dependencyKeys[managementKey]"
        :key="key"
        :managementKey="managementKey"
        :dependencyKey="dependencyKeys[managementKey][key]"
        :teacherImpart="teachersImpartByTeacher[managementKey][key]"
        :subject="subjectsByTeacher[managementKey][key]"
      />
    </div>
  </div>
</template>

<script>
import CardEvaluation from "./../../components/CardEvaluation/CardEvaluation";
export default {
  name: "teacher-evaluations",
  components: {
    CardEvaluation
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    managements() {
      if (this.$store.state.managements) {
        return this.$store.state.managements;
      }
      return {};
    },
    teachersImpartByTeacher() {
      if (this.managements) {
        let teachersImpartByTeacher = {};
        let managements = this.managements;
        Object.keys(managements).map(key => {
          let teachersImpart = managements[key].teachers_impart;
          teachersImpartByTeacher[key] = {};
          Object.keys(teachersImpart).map(k => {
            if (teachersImpart[k].id_doc === this.id) {
              teachersImpartByTeacher[key][k] = teachersImpart[k];
            }
          });
        });
        return teachersImpartByTeacher;
      }
      return {};
    },
    subjectsByTeacher() {
      if (this.managements) {
        let subjectsByTeacher = {};
        let managements = this.managements;
        Object.keys(managements).map(key => {
          let subjects = managements[key].subjects;
          subjectsByTeacher[key] = {};
          Object.keys(this.teachersImpartByTeacher[key]).map(
            teacherImpartKey => {
              Object.keys(subjects).map(k => {
                subjects[k]["id_mat"] = k;
                if (
                  subjects[k].teachers_impart.indexOf(teacherImpartKey) !== -1
                ) {
                  subjectsByTeacher[key][teacherImpartKey] = subjects[k];
                }
              });
            }
          );
        });
        return subjectsByTeacher;
      }
      return {};
    },
    dependencyKeys() {
      if (this.managements) {
        let keys = {};
        let subjectsByTeacher = this.subjectsByTeacher;
        Object.keys(subjectsByTeacher).map(subjectByTeacherKey => {
          let subjectByTeacher = subjectsByTeacher[subjectByTeacherKey];
          keys[subjectByTeacherKey] = {};
          Object.keys(subjectByTeacher).map(subjectKey => {
            let idSub = subjectByTeacher[subjectKey].id_mat;
            let careers = this.managements[subjectByTeacherKey].careers;
            keys[subjectByTeacherKey][subjectKey] = {};
            Object.keys(careers).map(careerKey => {
              let courses = careers[careerKey].courses;
              Object.keys(courses).map(courseKey => {
                if (courses[courseKey].subjects.indexOf(idSub) !== -1) {
                  keys[subjectByTeacherKey][subjectKey]["idCar"] = careerKey;
                  keys[subjectByTeacherKey][subjectKey]["idCur"] = courseKey;
                }
              });
            });
          });
        });
        return keys;
      }
      return {};
    }
  }
};
</script>

<style src="./TeacherEvaluations.css" scoped></style>
