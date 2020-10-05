import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/teachers",
      name: "teachers",
      component: () =>
        import(/* webpackChunkName: "teachers" */ "./views/Teachers/Teachers")
    },
    {
      path: "/teacher/:id",
      name: "teacher",
      component: () =>
        import(/* webpackChunkName: "teacher" */ "./views/Teacher/Teacher"),
      props: true,
      children: [
        {
          path: "profile",
          name: "teacherProfile",
          component: () =>
            import(/* webpackChunkName: "teacherProfile" */ "./views/TeacherProfile/TeacherProfile"),
          props: true
        },
        {
          path: "edit",
          name: "teacherEdit",
          component: () =>
            import(/* webpackChunkName: "teacherEdit" */ "./views/TeacherEdit/TeacherEdit"),
          props: true
        },
        {
          path: "evaluations",
          name: "teacherEvaluations",
          component: () =>
            import(/* webpackChunkName: "teacherEvaluations" */ "./views/TeacherEvaluations/TeacherEvaluations"),
          props: true
        },
        {
          path: "evaluation/:idManagement/:idCareer/:idCourse/:idSubject",
          name: "teacherSelectedEvaluation",
          component: () =>
            import(/* webpackChunkName: "teacherSelectedEvaluation" */ "./views/TeacherSelectedEvaluation/TeacherSelectedEvaluation"),
          props: true
        }
      ]
    },
    {
      path: "/students",
      name: "students",
      component: () =>
        import(/* webpackChunkName: "students" */ "./views/Students/Students")
    },
    {
      path: "/student/:id",
      name: "student",
      component: () =>
        import(/* webpackChunkName: "student" */ "./views/Student/Student"),
      props: true,
      children: [
        {
          path: "profile",
          name: "studentProfile",
          component: () =>
            import(/* webpackChunkName: "studentProfile" */ "./views/StudentProfile/StudentProfile"),
          props: true
        },
        {
          path: "edit",
          name: "studentEdit",
          component: () =>
            import(/* webpackChunkName: "studentEdit" */ "./views/StudentEdit/StudentEdit"),
          props: true
        },
        {
          path: "evaluations",
          name: "studentEvaluations",
          component: () =>
            import(/* webpackChunkName: "studentEvaluations" */ "./views/StudentEvaluations/StudentEvaluations"),
          props: true
        }
      ]
    },
    {
      path: "/managements/:idManagement",
      name: "managements",
      component: () =>
        import(/* webpackChunkName: "students" */ "./views/Managements/Managements")
    },
    {
      path: "/career/:idManagement/:idCareer",
      name: "career",
      component: () =>
        import(/* webpackChunkName: "career" */ "./views/Career/Career"),
      props: true
    },
    {
      path: "/parallel/:idManagement/:idCareer/:idCur/:idParallel",
      name: "parallel",
      component: () =>
        import(/* webpackChunkName: "parallel" */ "./views/Parallel/Parallel"),
      props: true
    },
    {
      path: "/subject/:idManagement/:idCareer/:idCur/:idSubject",
      name: "subject",
      component: () =>
        import(/* webpackChunkName: "subject" */ "./views/Subject/Subject"),
      props: true
    }
  ]
});
