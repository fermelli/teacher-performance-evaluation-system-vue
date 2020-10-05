<template>
  <div>
    <div
      class="row"
      v-for="(management, managementKey) in managements"
      :key="managementKey"
    >
      <div class="col-12">
        <h1 class="card-title">{{ management.value }}</h1>
      </div>
      <div
        class="col-12 col-sm-6 col-xxl-4"
        v-for="(career, parallelKey) in careersByManagements[managementKey]"
        :key="parallelKey"
      >
        <div class="card-evaluation-student">
          <div class="card-head">
            <h1 class="card-title">{{ career.name }}</h1>
            <h2 class="card-subtitle">
              {{ career.courses[career.id_cur].name }}
            </h2>
            <h2 class="card-subtitle">
              {{ parallelsByManagements[managementKey][parallelKey].name }}
            </h2>
          </div>
          <div class="card-body">
            <div class="container-title">
              <h3 class="card-subtitle">Materias a Evaluar</h3>
              <button class="btn btn-collapse" @click="expand">
                <i class="material-icons">keyboard_arrow_down</i>
              </button>
              <button class="btn btn-collapse d-none" @click="collapse">
                <i class="material-icons">keyboard_arrow_up</i>
              </button>
            </div>
            <div class="container-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Materia</th>
                    <th>Evaluar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(subjectKey, index) in career.courses[career.id_cur]
                      .subjects"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ management.subjects[subjectKey].name }}</td>
                    <td class="actions">
                      <button
                        :disabled="
                          disable(
                            managementKey,
                            career.id_car,
                            career.id_cur,
                            parallelKey,
                            subjectKey
                          )
                        "
                        :title="
                          disable(
                            managementKey,
                            career.id_car,
                            career.id_cur,
                            parallelKey,
                            subjectKey
                          )
                            ? 'Materia ya Evaluada'
                            : 'Evaluar Materia'
                        "
                        class="btn btn-open"
                        @click="
                          open(
                            managementKey,
                            career.id_car,
                            career.id_cur,
                            parallelKey,
                            subjectKey
                          )
                        "
                      >
                        <i class="material-icons">assignment</i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "student-evaluation",
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
    parallelsByManagements() {
      if (this.managements) {
        let managements = this.managements;
        let parallelsByManagements = {};
        Object.keys(managements).map(managementKey => {
          parallelsByManagements[managementKey] = {};
          let parallels = managements[managementKey].parallels;
          Object.keys(parallels).map(parallelKey => {
            if (parallels[parallelKey].students.indexOf(this.id) !== -1) {
              parallelsByManagements[managementKey][parallelKey] =
                parallels[parallelKey];
            }
          });
        });
        return parallelsByManagements;
      }
      return {};
    },
    careersByManagements() {
      if (this.managements) {
        let managements = this.managements;
        let careersByManagements = {};
        Object.keys(managements).map(managementKey => {
          careersByManagements[managementKey] = {};
          let careers = managements[managementKey].careers;
          Object.keys(careers).map(careerKey => {
            let courses = careers[careerKey].courses;
            Object.keys(courses).map(courseKey => {
              let parallels = this.parallelsByManagements[managementKey];
              Object.keys(parallels).map(parallelKey => {
                if (courses[courseKey].parallels.indexOf(parallelKey) !== -1) {
                  careersByManagements[managementKey][parallelKey] =
                    careers[careerKey];
                  careersByManagements[managementKey][parallelKey][
                    "id_car"
                  ] = careerKey;
                  careersByManagements[managementKey][parallelKey][
                    "id_cur"
                  ] = courseKey;
                }
              });
            });
          });
        });
        return careersByManagements;
      }
      return {};
    }
  },
  methods: {
    teacherKey(idManagement, idSubject, idParallel) {
      if (this.managements) {
        let teacherKey;
        let management = this.managements[idManagement];
        let teachersImpartKeys = management.subjects[idSubject].teachers_impart;
        Object.keys(teachersImpartKeys).map(index => {
          let teacherImpart =
            management.teachers_impart[teachersImpartKeys[index]];
          let parallelImpart = teacherImpart.parallels_impart.find(
            parallelImpart => {
              return parallelImpart.id_par === idParallel;
            }
          );
          if (parallelImpart !== undefined) {
            teacherKey = teacherImpart.id_doc;
          }
        });
        return teacherKey;
      }
    },
    expand(event) {
      let currentTarget = event.currentTarget;
      currentTarget.parentElement.nextElementSibling.classList.remove(
        "collapse"
      );
      currentTarget.parentElement.nextElementSibling.classList.add("expand");
      currentTarget.classList.add("d-none");
      currentTarget.nextElementSibling.classList.remove("d-none");
    },
    collapse(event) {
      let currentTarget = event.currentTarget;
      currentTarget.parentElement.nextElementSibling.classList.remove("expand");
      currentTarget.parentElement.nextElementSibling.classList.add("collapse");
      currentTarget.classList.add("d-none");
      currentTarget.previousElementSibling.classList.remove("d-none");
    },
    open(idManagement, idCareer, idCourse, idParallel, idSubject) {
      let idTeacher = this.teacherKey(idManagement, idSubject, idParallel);
      if (
        !this.disable(idManagement, idCareer, idCourse, idParallel, idSubject)
      ) {
        this.$store.dispatch("toggleOpenModalEvaluation", {
          idManagement: idManagement,
          idCareer: idCareer,
          idCourse: idCourse,
          idParallel: idParallel,
          idSubject: idSubject,
          idTeacher: idTeacher,
          idStudent: this.id
        });
      } else {
        if (event.target.tagName === "I") {
          event.target.parentElement.disabled = true;
        } else {
          event.target.disabled = true;
        }
      }
    },
    disable(idManagement, idCareer, idCourse, idParallel, idSubject) {
      let idTeacher = this.teacherKey(idManagement, idSubject, idParallel);
      if (this.managements[idManagement].evaluation_resolved) {
        if (this.managements[idManagement].evaluation_resolved[idTeacher]) {
          if (
            this.managements[idManagement].evaluation_resolved[idTeacher][
              idCareer
            ]
          ) {
            if (
              this.managements[idManagement].evaluation_resolved[idTeacher][
                idCareer
              ][idCourse]
            ) {
              if (
                this.managements[idManagement].evaluation_resolved[idTeacher][
                  idCareer
                ][idCourse][idSubject]
              ) {
                if (
                  this.managements[idManagement].evaluation_resolved[idTeacher][
                    idCareer
                  ][idCourse][idSubject][idParallel]
                ) {
                  let evaluationResolved = this.managements[idManagement]
                    .evaluation_resolved[idTeacher][idCareer][idCourse][
                    idSubject
                  ][idParallel];
                  return (
                    Object.values(evaluationResolved).indexOf(this.id) !== -1
                  );
                }
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style src="./StudentEvaluations.css" scoped></style>
