<template>
  <div>
    <div class="row">
      <button class="btn-add">
        <i class="material-icons">add</i>
      </button>
      <card-management
        v-for="(management, key) in managements"
        :key="key"
        :id-management="key"
        :management="management"
      />
    </div>
  </div>
</template>

<script>
import CardManagement from "./../../components/CardManagement/CardManagement";
export default {
  name: "home",
  components: {
    CardManagement
  },
  computed: {
    managements() {
      return this.$store.state.managements;
    }
  }
};
</script>

<style src="./Home.css" scoped></style>
