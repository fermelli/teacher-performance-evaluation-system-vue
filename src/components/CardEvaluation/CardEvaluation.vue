<template>
  <div class="col-12 col-md-6 col-xxl-4">
    <div class="card-evaluation">
      <div class="card-head">
        <div>
          <h1 class="card-title">{{ subject.name }}</h1>
          <button
            class="btn btn-open"
            @click="
              to(
                managementKey,
                dependencyKey.idCar,
                dependencyKey.idCur,
                subject.id_mat
              )
            "
          >
            VER TODO
          </button>
        </div>
        <h2 class="card-subtitle">
          {{ managements[managementKey].careers[dependencyKey.idCar].name }}
        </h2>
        <h2 class="card-subtitle">
          {{
            managements[managementKey].careers[dependencyKey.idCar].courses[
              dependencyKey.idCur
            ].name
          }}
        </h2>
      </div>
      <div class="card-body">
        <div
          class="card-list"
          v-for="(parallelImpart, index) in teacherImpart.parallels_impart"
          :key="index"
        >
          <div class="card-list-item">
            <h2 class="card-list-item-title">
              Paralelo
              {{
                managements[managementKey].parallels[parallelImpart.id_par].name
              }}
            </h2>
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
                  <th>Día Semana</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(schedule, index) in parallelImpart.schedules"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    {{
                      managements[managementKey].schedules[schedule].day_week
                    }}
                  </td>
                  <td>
                    {{
                      managements[managementKey].turns[
                        managements[managementKey].parallels[
                          parallelImpart.id_par
                        ].id_tur
                      ].periods[
                        managements[managementKey].schedules[schedule].id_peri
                      ].start_time
                    }}
                  </td>
                  <td>
                    {{
                      managements[managementKey].turns[
                        managements[managementKey].parallels[
                          parallelImpart.id_par
                        ].id_tur
                      ].periods[
                        managements[managementKey].schedules[schedule].id_peri
                      ].end_time
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-evaluation",
  props: {
    managementKey: {
      type: String,
      required: true
    },
    dependencyKey: {
      type: Object,
      required: true
    },
    teacherImpart: {
      type: Object,
      required: true
    },
    subject: {
      type: Object,
      required: true
    }
  },
  computed: {
    managements() {
      if (this.$store.state.managements) {
        return this.$store.state.managements;
      }
      return {};
    }
  },
  methods: {
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
    to(idManagement, idCareer, idCourse, idSubject) {
      this.$router.push({
        name: "teacherSelectedEvaluation",
        params: {
          idManagement: idManagement,
          idCareer: idCareer,
          idCourse: idCourse,
          idSubject: idSubject
        }
      });
    }
  }
};
</script>

<style src="./CardEvaluation.css" scoped></style>
