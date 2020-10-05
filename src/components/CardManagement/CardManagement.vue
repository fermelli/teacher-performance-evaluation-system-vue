<template>
  <div class="col-12 col-sm-6 col-lg-4">
    <div class="card">
      <div class="card-head" :style="{ background: color }">
        <h1 class="card-title">
          {{ management.value }}
          <i v-show="management.is_active" class="material-icons" title="Activa"
            >check_circle_outline</i
          >
        </h1>
        <!-- <button class="btn-expand">
                    <i class="material-icons">keyboard_arrow_down</i>
                </button> -->
      </div>
      <div class="card-body">
        <div class="container-table">
          <table class="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Carrera</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(career, key, index) in management.careers" :key="key">
                <td>{{ index + 1 }}</td>
                <td>
                  <button
                    class="btn btn-open-in-new"
                    :style="{ color: color }"
                    @click="open(idManagement, key)"
                  >
                    {{ career.name.toUpperCase() }}
                    <i class="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-management",
  props: {
    management: {
      type: Object,
      required: true
    },
    idManagement: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      color: ""
    };
  },
  created() {
    this.setColor();
  },
  methods: {
    randomBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    setColor() {
      let r, g, b;
      r = this.randomBetween(0, 255);
      b = this.randomBetween(0, 255);
      g = this.randomBetween(0, 255);
      this.color = `rgba(${r}, ${g}, ${b}, 0.8)`;
    },
    open(idManagement, idCareer) {
      this.$router.push({
        name: "career",
        params: { idManagement: idManagement, idCareer: idCareer }
      });
    }
  }
};
</script>
<style src="./CardManagement.css" scoped></style>
