<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 offset-0 col-xl-10 offset-xl-1 container-survey">
        <div class="survey">
          <div class="survey-head">
            <h1 class="survey-head-title">
              {{
                managements[idsForEvaluations.idManagement].careers[
                  idsForEvaluations.idCareer
                ].name
              }}
              - {{ managements[idsForEvaluations.idManagement].value }}
            </h1>
            <button class="btn-close-survey" @click="close">
              <i class="material-icons">close</i>
            </button>
          </div>
          <div class="survey-info">
            <h2 class="info">
              Docente:
              <span class="info-item">
                {{
                  `${
                    people[teachers[idsForEvaluations.idTeacher].id_per]
                      .paternal_surname
                  } ${
                    people[teachers[idsForEvaluations.idTeacher].id_per]
                      .maternal_surname
                  } ${
                    people[teachers[idsForEvaluations.idTeacher].id_per].names
                  }`
                }}
              </span>
            </h2>
            <h2 class="info">
              Materia:
              <span class="info-item">
                {{
                  managements[idsForEvaluations.idManagement].subjects[
                    idsForEvaluations.idSubject
                  ].name
                }}
              </span>
            </h2>
            <h2 class="info">
              Curso:
              <span class="info-item">
                {{
                  managements[idsForEvaluations.idManagement].careers[
                    idsForEvaluations.idCareer
                  ].courses[idsForEvaluations.idCourse].name
                }}
              </span>
            </h2>
            <h2 class="info">
              Paralelo:
              <span class="info-item">
                {{
                  managements[idsForEvaluations.idManagement].parallels[
                    idsForEvaluations.idParallel
                  ].name
                }}
              </span>
            </h2>
          </div>
          <survey :survey="survey"></survey>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import DB from "./../../db/db";
import "bootstrap/dist/css/survey-style.css";
let Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";
export default {
  name: "survey-component",
  //   components: {
  //     SurveyVue
  //   },
  created() {
    if (this.json) {
      this.model = new SurveyVue.Model(this.json);
      this.model.locale = "es";
      this.model.showProgressBar = "bottom";
      // this.model.showQuestionNumbers = "onpage";
      // this.model.title = "Evaluación Docente";
      this.model.onComplete.add(result => {
        this.result = result.data;
        if (this.result) {
          let db = new DB();
          db.saveResult(this.idsForEvaluations, this.result);
          db.saveEvaluationsResolved(this.idsForEvaluations);
        }
      });
    }
    this.survey = this.model;
  },
  data() {
    return {
      model: null,
      survey: null,
      result: {}
    };
  },
  computed: {
    managements() {
      if (this.$store.state.managements) {
        return this.$store.state.managements;
      }
      return {};
    },
    people() {
      if (this.$store.state.people) {
        return this.$store.state.people;
      }
      return {};
    },
    teachers() {
      if (this.$store.state.teachers) {
        return this.$store.state.teachers;
      }
      return {};
    },
    idsForEvaluations() {
      if (this.$store.state.idsForEvaluations) {
        return this.$store.state.idsForEvaluations;
      }
      return {};
    },
    evaluationByManagement() {
      if (this.managements) {
        // console.log(
        //   this.managements[this.idsForEvaluations.idManagement].careers[
        //     this.idsForEvaluations.idCareer
        //   ].courses[this.idsForEvaluations.idCourse].id_eva
        // );
        // console.log(
        //   this.managements[this.idsForEvaluations.idManagement].careers[
        //     this.idsForEvaluations.idCareer
        //   ].id_eva
        // );
        // console.log(
        //   this.managements[this.idsForEvaluations.idManagement].id_eva
        // );
        let idEvaluation =
          this.managements[this.idsForEvaluations.idManagement].careers[
            this.idsForEvaluations.idCareer
          ].courses[this.idsForEvaluations.idCourse].id_eva ||
          this.managements[this.idsForEvaluations.idManagement].careers[
            this.idsForEvaluations.idCareer
          ].id_eva ||
          this.managements[this.idsForEvaluations.idManagement].id_eva;
        return this.$store.state.evaluations[idEvaluation];
      }
      return {};
    },
    json() {
      if (this.managements) {
        let json = {};
        json["pages"] = [];
        let pages = this.evaluationByManagement.areas;
        Object.keys(pages).map((pageKey, index) => {
          let columns = this.$store.state.criteria[pages[pageKey].id_cri];
          json["pages"].push({
            name: pageKey,
            elements: []
          });
          json["pages"][index]["elements"].push({
            type: "matrix",
            name: pages[pageKey].name,
            title: pages[pageKey].title,
            description: pages[pageKey].description,
            isAllRowRequired: true,
            columns: columns,
            rows: []
          });
          let idsIndicators = pages[pageKey].ids_ind;
          let rows = this.$store.state.indicators;
          idsIndicators.map(idIndicator => {
            json["pages"][index]["elements"][0]["rows"].push(rows[idIndicator]);
          });
        });
        return json;
      }
      return {};
    }
  },
  methods: {
    close() {
      this.$store.dispatch("toggleOpenModalEvaluation");
    }
  }
};
</script>

<style src="./SurveyComponent.css"></style>
