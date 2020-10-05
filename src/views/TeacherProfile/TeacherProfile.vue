<template>
  <div class="teacher-profile">
    <div class="row">
      {{ id }}
    </div>
  </div>
</template>

<script>
export default {
  name: "teacher-profile",
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style src="./TeacherProfile.css" scoped></style>
