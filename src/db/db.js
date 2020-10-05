import firebase from "./firebase";

class DB {
  constructor() {}

  saveResult(ids, result) {
    let ref = `managements/${ids.idManagement}/evaluation_results/${
      ids.idTeacher
    }/${ids.idCareer}/${ids.idCourse}/${ids.idSubject}/${ids.idParallel}`;
    firebase
      .database()
      .ref(ref)
      .push(result);
  }

  saveEvaluationsResolved(ids) {
    let ref = `managements/${ids.idManagement}/evaluation_resolved/${
      ids.idTeacher
    }/${ids.idCareer}/${ids.idCourse}/${ids.idSubject}/${ids.idParallel}`;
    firebase
      .database()
      .ref(ref)
      .push(ids.idStudent);
  }

  updatePerson(id, person) {
    let update = {};
    update["/people/" + id] = person;
    return firebase
      .database()
      .ref()
      .update(update);
  }

  updateTeacher(id, teacher) {
    let update = {};
    if (typeof teacher.professions === "string") {
      teacher.professions = teacher.professions
        .split(",")
        .map(profession => profession.trim());
    }
    update["/teachers/" + id] = teacher;
    return firebase
      .database()
      .ref()
      .update(update);
  }

  updateStudent(id, student) {
    let update = {};
    update["/students/" + id] = student;
    return firebase
      .database()
      .ref()
      .update(update);
  }
}

export default DB;
