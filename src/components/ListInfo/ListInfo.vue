<template>
  <div class="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12">
    <div class="list">
      <div class="list-head">
        <h3 class="list-title">{{ title }}</h3>
        <button v-if="display" class="btn btn-expand display" @click="expand">
          <i class="material-icons">keyboard_arrow_down</i>
        </button>
        <button v-else class="btn btn-expand display" @click="collapse">
          <i class="material-icons">keyboard_arrow_up</i>
        </button>
      </div>
      <div
        class="list-body"
        :class="{ expand: isExpanded, collapse: isCollapsed }"
      >
        <div
          class="list-item"
          v-for="(value, name, index) in info"
          :key="index"
        >
          <div class="list-item-title">
            {{ keys[name] }}
          </div>
          <div
            v-if="
              typeof value === 'boolean' ||
                value === 'false' ||
                value === 'true'
            "
            class="list-item-content"
          >
            {{ !value || value === "false" ? "No" : "Si" }}
          </div>
          <div v-else-if="typeof value !== 'object'" class="list-item-content">
            {{ value || "-" }}
          </div>
          <div
            v-else-if="
              Object.keys(elementsKeysThatAreLinks).indexOf(name) === -1
            "
            class="list-item-content"
          >
            <div v-for="(val, index) in value" :key="index">
              {{ val }}
            </div>
          </div>
          <div v-else class="list-item-content">
            <button
              v-for="(val, index) in value"
              :key="index"
              class="btn btn-link"
              :style="{ color: color() }"
              @click="to(name, val)"
            >
              {{ elementsKeysThatAreLinks[name][val].name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-info",
  props: {
    paramRoute: {
      type: Object
    },
    title: {
      type: String,
      required: true
    },
    info: {
      type: Object,
      required: true
    },
    keys: {
      type: Object,
      required: true
    },
    elementsKeysThatAreLinks: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.setStatus);
      this.setStatus();
    });
  },
  data() {
    return {
      isExpanded: false,
      isCollapsed: false
    };
  },
  computed: {
    display() {
      return (!this.isExpanded && !this.isCollapsed) || this.isCollapsed
        ? true
        : false;
    }
  },
  methods: {
    randomBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    color() {
      let r, g, b;
      r = this.randomBetween(0, 255);
      b = this.randomBetween(0, 255);
      g = this.randomBetween(0, 255);
      return `rgba(${r}, ${g}, ${b}, 0.9)`;
    },
    setStatus() {
      if (document.documentElement.clientWidth >= 992) {
        this.isCollapsed = false;
        this.isExpanded = false;
      }
    },
    expand() {
      this.isExpanded = true;
      this.isCollapsed = false;
    },
    collapse() {
      this.isCollapsed = true;
      this.isExpanded = false;
    },
    to(name, id) {
      let params = this.$route.params || {};
      name =
        name.substring(0, 1).toUpperCase() + name.substring(1, name.length - 1);
      params[`id${name}`] = id;
      Object.keys(this.paramRoute).map(key => {
        params[key] = this.paramRoute[key];
      });
      this.$router.push({ name: name.toLowerCase(), params: params });
    }
  }
};
</script>

<style src="./ListInfo.css" scoped></style>
