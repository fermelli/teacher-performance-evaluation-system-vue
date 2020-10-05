import Vue from "vue";
import Vuex from "vuex";

import firebase from "./db/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    managements: {},
    people: {},
    teachers: {},
    students: {},
    evaluations: {},
    criteria: {},
    indicators: {},
    selectedTeacherId: null,
    selectedStudentId: null,
    selectedCareer: {},
    isOpenModalEvaluation: false,
    idsForEvaluations: {}
  },
  mutations: {
    SET_MANAGEMENTS(state) {
      let ref = firebase.database().ref("managements");
      ref.on("value", snapshot => {
        state.managements = snapshot.val();
      });
    },
    SET_PEOPLE(state) {
      let ref = firebase.database().ref("people");
      ref.on("value", snapshot => {
        state.people = snapshot.val();
      });
    },
    SET_TEACHERS(state) {
      let ref = firebase.database().ref("teachers");
      ref.on("value", snapshot => {
        state.teachers = snapshot.val();
      });
    },
    SET_STUDENTS(state) {
      let ref = firebase.database().ref("students");
      ref.on("value", snapshot => {
        state.students = snapshot.val();
      });
    },
    SET_EVALUATIONS(state) {
      let ref = firebase.database().ref("evaluations");
      ref.on("value", snapshot => {
        state.evaluations = snapshot.val();
      });
    },
    SET_CRITERIA(state) {
      let ref = firebase.database().ref("criteria");
      ref.on("value", snapshot => {
        state.criteria = snapshot.val();
      });
    },
    SET_INDICATORS(state) {
      let ref = firebase.database().ref("indicators");
      ref.on("value", snapshot => {
        state.indicators = snapshot.val();
      });
    },
    SET_SELECTED_TEACHER_ID(state, id) {
      state.selectedTeacherId = id;
    },
    SET_SELECTED_STUDENT_ID(state, id) {
      state.selectedStudentId = id;
    },
    TOGGLE_OPEN_MODAL_EVALUATION(state, payload) {
      state.isOpenModalEvaluation = !state.isOpenModalEvaluation;
      state.idsForEvaluations = payload;
    }
  },
  actions: {
    setManagements(context) {
      context.commit("SET_MANAGEMENTS");
    },
    setPeople(context) {
      context.commit("SET_PEOPLE");
    },
    setTeachers(context) {
      context.commit("SET_TEACHERS");
    },
    setStudents(context) {
      context.commit("SET_STUDENTS");
    },
    setEvaluations(context) {
      context.commit("SET_EVALUATIONS");
    },
    setCriteria(context) {
      context.commit("SET_CRITERIA");
    },
    setIndicators(context) {
      context.commit("SET_INDICATORS");
    },
    setSelectedTeacherId(context, id) {
      context.commit("SET_SELECTED_TEACHER_ID", id);
    },
    setSelectedStudentId(context, id) {
      context.commit("SET_SELECTED_STUDENT_ID", id);
    },
    toggleOpenModalEvaluation(context, payload) {
      context.commit("TOGGLE_OPEN_MODAL_EVALUATION", payload);
    }
  },
  getters: {
    selectedTeacher(state) {
      return state.teachers[state.selectedTeacherId];
    },
    selectedStudent(state) {
      return state.students[state.selectedStudentId];
    },
    selectedPersonForTeacher(state, getters) {
      let id_per = getters.selectedTeacher
        ? getters.selectedTeacher.id_per
        : null;
      return state.people[id_per];
    },
    selectedPersonForStudent(state, getters) {
      let id_per = getters.selectedStudent
        ? getters.selectedStudent.id_per
        : null;
      return state.people[id_per];
    },
    selectedCareer(state) {
      return state.selectedCareer;
    }
  }
});
