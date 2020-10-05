<template>
  <div class="student-profile">
    <div class="row">
      {{ id }}
    </div>
  </div>
</template>

<script>
export default {
  name: "student-profile",
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style src="./StudentProfile.css" scoped></style>
