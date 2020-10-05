<template>
  <div class="container-table">
    <table class="table">
      <thead>
        <tr>
          <th v-if="visibleOrder">N°</th>
          <th v-for="(config, key) in configurations" :key="key">
            {{ config }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, key, index) in tableData" :key="key">
          <td v-if="visibleOrder">{{ index + 1 }}</td>
          <td v-for="(config, key) in configurations" :key="key">
            {{ data[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    visibleOrder: {
      type: Boolean,
      default: false
    },
    configurations: {
      type: Object,
      required: true
    },
    tableData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style src="./SimpleTable.css" scoped></style>
