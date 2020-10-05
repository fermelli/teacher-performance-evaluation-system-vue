<template>
  <div>
    <div class="row">
      <div class="col-12">
        <router-link class="link" to="/">Gestiones</router-link> >
        <router-link
          class="link"
          :to="{
            name: 'career',
            params: { idManagement: idManagement, idCareer: idCareer }
          }"
          >{{ career.name }}</router-link
        >
        > <span class="font">{{ course.name }} </span> >
        <router-link
          class="link"
          :to="{
            name: 'parallel',
            params: {
              idManagement: idManagement,
              idCareer: idCareer,
              idCur: idCur,
              idParallel: idParallel
            }
          }"
          >{{ parallel.name }}</router-link
        >
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 col-xl-4">
        <div class="col-12">
          <h1 class="title">Horario de Clases</h1>
        </div>
        <div class="col-12">
          <h2 class="subtitle">
            Turno <span class="chip">{{ turn.turn }}</span>
          </h2>
          <simple-table
            :visible-order="true"
            :configurations="configurationsPeriods"
            :tableData="periods"
          />
        </div>
      </div>
      <div class="col-12 col-md-6 col-xl-4">
        <div class="col-12">
          <h1 class="title">Materias</h1>
        </div>
        <div class="col-12">
          <h2 class="subtitle">
            Materias <span class="chip">{{ subjectsKeys.length }}</span>
          </h2>
          <simple-table
            :visible-order="true"
            :configurations="configurationsSubjects"
            :tableData="subjectsByParallel"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1 class="title">
          Estudiantes <span class="chip">{{ studentsKeys.length }}</span>
        </h1>
      </div>
      <card-person
        v-for="studentKey in studentsKeys"
        :key="studentKey"
        role="students"
        :role-key="studentKey"
        role-text="Estudiante"
        path-name-open-in-new="studentEvaluations"
        path-name-edit="studentEdit"
      />
    </div>
    <div class="row">
      <div class="col-12">
        <h1 class="title">
          Docentes <span class="chip">{{ teachersKeys.length }}</span>
        </h1>
      </div>
      <card-person
        v-for="teacherKeys in teachersKeys"
        :key="teacherKeys"
        role="teachers"
        :role-key="teacherKeys"
        role-text="Docente"
        path-name-open-in-new="teacherEvaluations"
        path-name-edit="teacherEdit"
      />
    </div>
  </div>
</template>

<script>
import CardPerson from "./../../components/CardPerson/CardPerson";
import SimpleTable from "./../../components/SimpleTable/SimpleTable";
export default {
  name: "parallel-view",
  components: {
    CardPerson,
    SimpleTable
  },
  props: {
    idManagement: {
      type: String,
      required: true
    },
    idCareer: {
      type: String,
      required: true
    },
    idCur: {
      type: String,
      required: true
    },
    idParallel: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      configurationsPeriods: {
        start_time: "Hora Inicio",
        end_time: "Hora Fin"
      },
      configurationsSubjects: {
        name: "Nombre"
      }
    };
  },
  computed: {
    management() {
      if (this.$store.state.managements) {
        return this.$store.state.managements[this.idManagement];
      }
      return {};
    },
    career() {
      if (this.management) {
        return this.management.careers[this.idCareer];
      }
      return {};
    },
    course() {
      if (this.management) {
        return this.career.courses[this.idCur];
      }
      return {};
    },
    subjects() {
      if (this.management) {
        return this.management.subjects;
      }
      return {};
    },
    subjectsKeys() {
      if (this.management) {
        return this.course.subjects;
      }
      return {};
    },
    subjectsByParallel() {
      if (this.management) {
        let subjectsByParallel = {};
        this.subjectsKeys.map(key => {
          subjectsByParallel[key] = this.subjects[key];
        });
        return subjectsByParallel;
      }
      return {};
    },
    teachersImpart() {
      if (this.management) {
        return this.management.teachers_impart;
      }
      return {};
    },
    parallel() {
      if (this.management) {
        return this.management.parallels[this.idParallel];
      }
      return {};
    },
    studentsKeys() {
      if (this.management) {
        return this.parallel.students;
      }
      return {};
    },
    turn() {
      if (this.management) {
        return this.management.turns[this.parallel.id_tur];
      }
      return {};
    },
    periods() {
      if (this.management) {
        return this.management.turns[this.parallel.id_tur].periods;
      }
      return {};
    },
    teachersImpartByParallel() {
      if (this.management) {
        let teachersImpartAll = this.teachersImpart;
        let teachersImpart = {};
        Object.keys(teachersImpartAll).map(key => {
          let parallelImpart = teachersImpartAll[key].parallels_impart.find(
            parallelImpart => {
              return parallelImpart.id_par === this.idParallel;
            }
          );
          if (parallelImpart) {
            teachersImpart[key] = teachersImpartAll[key];
          }
        });
        return teachersImpart;
      }
      return {};
    },
    teachers() {
      if (this.$store.state.teachers) {
        return this.$store.state.teachers;
      }
      return {};
    },
    teachersKeys() {
      if (this.management) {
        let teachersKeys = [];
        let teachersImpartByParallel = this.teachersImpartByParallel;
        Object.keys(teachersImpartByParallel).map(key => {
          teachersKeys.push(teachersImpartByParallel[key].id_doc);
        });
        return teachersKeys.filter((teacherImpart, index, teachersImpart) => {
          return teachersImpart.indexOf(teacherImpart) === index;
        });
      }
      return [];
    }
  }
};
</script>

<style src="./Parallel.css" scoped></style>
