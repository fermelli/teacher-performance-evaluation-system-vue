<template>
  <div class="col-12 col-sm-6 col-lg-4">
    <div class="card">
      <div class="card-head">
        <h1 class="card-title">{{ management.value }}</h1>
      </div>
      <div class="card-body">
        <div
          class="container-items border"
          v-for="(career, key) in management.careers"
          :key="key"
        >
          <div style="width: 33.33%" class="item">
            {{ career.name }}
          </div>
          <div style="width: 66.67%;">
            <div
              class="container-items border-left border-bottom"
              v-for="(course, key) in career.courses"
              :key="key"
            >
              <div style="width: 50%" class="item">
                {{ course.name }}
              </div>
              <div style="width: 50%">
                <div
                  class="border-left border-bottom"
                  v-for="(parallel, key) in course.parallels"
                  :key="key"
                >
                  <div class="item">
                    {{ parallel.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "management-component",
  props: {
    management: {
      type: Object,
      required: true
    }
  }
};
</script>
<style src="./ManagementComponent.css" scoped></style>
