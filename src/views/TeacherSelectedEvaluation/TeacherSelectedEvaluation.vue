<template>
  <div>
    <div class="row">
      <div class="col-12">
        {{ title }}
      </div>
      <form-control-custom
        class="col-12"
        color="#000000"
        type="select"
        text-label="Paralelo"
        icon-name="assistant_photo"
        :options="parallelKeys"
        :withOptionSelectOne="false"
        v-model="parallelSelected"
      />
      <div
        class="col-12"
        v-for="(areaQuestionCount, key, index) in resultsQuestionsByArea"
        :key="key"
      >
        <!-- {{areaQuestionCount}} -->
        <h3>{{ index + 1 }}.- {{ areas[key].title }}</h3>
        <h6 v-show="!Object.keys(areaQuestionCount).length">
          No hay resultados
        </h6>
        <div
          class="data"
          v-for="(questionCount, questionKey, index) in areaQuestionCount"
          :key="questionKey"
        >
          <!-- {{questionKey}} <br>
                            {{questionCount}}
                {{ counter(questionCount, key) }}-->
          <strong>{{ index + 1 }}.-</strong>
          {{ indicators[areas[key].ids_ind[index]].text }}
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Criterio</th>
                  <th>Valor</th>
                  <th>Frecuencia Absoluta</th>
                  <th>Frecuencia Relativa</th>
                  <th>Frecuencia Porcentual</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(count, countKey, index) in counter(
                    questionCount,
                    key
                  )"
                  :key="countKey"
                >
                  <td>{{ criteria[areas[key].id_cri][index].text }}</td>
                  <td>
                    <div class="ship">{{ countKey }}</div>
                  </td>
                  <td>{{ count }}</td>
                  <td>{{ (count / questionCount.length).toFixed(4) }}</td>
                  <td>
                    {{ ((count / questionCount.length) * 100).toFixed(4) }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Totales</th>
                  <th>-</th>
                  <th>{{ resultsAreasByStudent[key].length }}</th>
                  <th>1</th>
                  <th>100</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormControlCustom from "./../../components/FormControls/FormControls";
export default {
  name: "teacher-selected-evaluation",
  components: {
    FormControlCustom
  },
  props: {
    id: {
      type: String,
      required: true
    },
    idCareer: {
      type: String,
      required: true
    },
    idCourse: {
      type: String,
      required: true
    },
    idManagement: {
      type: String,
      required: true
    },
    idSubject: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      parallelSelected: "all"
    };
  },
  computed: {
    idEvaluation() {
      if (this.management) {
        return (
          this.management.careers[this.idCareer].courses[this.idCourse]
            .id_eva ||
          this.management.careers[this.idCareer].id_eva ||
          this.management.id_eva
        );
      }
      return undefined;
    },
    parallelKeys() {
      let parallelsKeys = [
        {
          value: "all",
          text: "Todos"
        }
      ];
      if (this.allEvaluationResult) {
        Object.keys(this.allEvaluationResult).map(parallelKey => {
          parallelsKeys.push({
            value: parallelKey,
            text: this.management.parallels[parallelKey].name
          });
        });
      }
      return parallelsKeys;
    },
    management() {
      if (this.$store.state.managements) {
        return this.$store.state.managements[this.idManagement];
      }
      return {};
    },
    evaluations() {
      if (this.$store.state.evaluations) {
        return this.$store.state.evaluations;
      }
      return {};
    },
    areas() {
      if (this.management) {
        return this.evaluations[this.idEvaluation].areas;
      }
      return {};
    },
    indicators() {
      if (this.$store.state.indicators) {
        return this.$store.state.indicators;
      }
      return {};
    },
    criteria() {
      if (this.$store.state.criteria) {
        return this.$store.state.criteria;
      }
      return {};
    },
    title() {
      if (this.management) {
        let idEvaluation = this.idEvaluation;
        return `${this.management.careers[this.idCareer].name} - ${
          this.management.subjects[this.idSubject].name
        } - ${
          this.management.careers[this.idCareer].courses[this.idCourse].name
        } - ${idEvaluation}`;
      }
      return ``;
    },
    allEvaluationResult() {
      if (this.management) {
        if (this.management.evaluation_results) {
          if (this.management.evaluation_results[this.id]) {
            if (this.management.evaluation_results[this.id][this.idCareer]) {
              if (
                this.management.evaluation_results[this.id][this.idCareer][
                  this.idCourse
                ]
              ) {
                if (
                  this.management.evaluation_results[this.id][this.idCareer][
                    this.idCourse
                  ][this.idSubject]
                ) {
                  return this.management.evaluation_results[this.id][
                    this.idCareer
                  ][this.idCourse][this.idSubject];
                }
              }
            }
          }
        }
      }
      return {};
    },
    resultsAreasByStudent() {
      if (this.allEvaluationResult) {
        let resultsAreasByStudent = {};
        let allEvaluationResult = {};
        if (this.parallelSelected === "all") {
          allEvaluationResult = this.allEvaluationResult;
        } else {
          allEvaluationResult[this.parallelSelected] = this.allEvaluationResult[
            this.parallelSelected
          ];
        }
        // console.log(allEvaluationResult);
        Object.keys(allEvaluationResult).map(parallelKey => {
          let resultsByParallel = allEvaluationResult[parallelKey];
          Object.keys(resultsByParallel).map(resultKey => {
            let resultsArea = resultsByParallel[resultKey];
            Object.keys(resultsArea).map(areaKey => {
              if (!resultsAreasByStudent[areaKey]) {
                resultsAreasByStudent[areaKey] = [];
                resultsAreasByStudent[areaKey].push(resultsArea[areaKey]);
              } else {
                resultsAreasByStudent[areaKey].push(resultsArea[areaKey]);
              }
            });
          });
        });
        return resultsAreasByStudent;
      }
      return {};
    },
    areasIndicators() {
      if (this.management) {
        let areasIndicators = {};
        let areas = this.areas;
        let indicators = this.indicators;
        Object.keys(areas).map(areaKey => {
          areasIndicators[areaKey] = [];
          let idsIndicators = areas[areaKey].ids_ind;
          Object.keys(idsIndicators).map(index => {
            let indicator = indicators[idsIndicators[index]];
            areasIndicators[areaKey].push(indicator);
          });
        });
        return areasIndicators;
      }
      return {};
    },
    resultsQuestionsByArea() {
      if (this.management) {
        let resultsQuestionsByArea = {};
        let areasIndicators = this.areasIndicators;
        Object.keys(areasIndicators).map(areaKey => {
          resultsQuestionsByArea[areaKey] = {};
          areasIndicators[areaKey].map(indicator => {
            let resultsAreaByStudent = this.resultsAreasByStudent[areaKey];
            if (resultsAreaByStudent) {
              resultsQuestionsByArea[areaKey][indicator.value] = [];
              resultsAreaByStudent.map(resultsStudent => {
                resultsQuestionsByArea[areaKey][indicator.value].push(
                  resultsStudent[indicator.value]
                );
              });
            }
          });
        });
        // console.log(resultsQuestionsByArea);
        return resultsQuestionsByArea;
      }
      return {};
    }
  },
  methods: {
    counter(resultsAreaByStudent, areaKey) {
      let idEvaluation = this.idEvaluation;
      //   console.log(idEvaluation);
      let criteria = this.$store.state.criteria;
      let evaluation = this.evaluations[idEvaluation];
      let area = evaluation.areas[areaKey];
      // Array
      let criterion = criteria[area.id_cri];
      let counter = {};
      criterion.map(item => {
        let count = this.countValue(item.value, resultsAreaByStudent);
        counter[item.value] = count;
      });
      return counter;
    },
    countValue(value, resultsAreaByStudent) {
      let count = 0;
      for (let i = 0, length = resultsAreaByStudent.length; i < length; i++) {
        if (resultsAreaByStudent[i] === value) {
          count++;
        }
      }
      return count;
    }
  }
};
</script>

<style src="./TeacherSelectedEvaluation.css" scoped></style>
