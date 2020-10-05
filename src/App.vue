<template>
  <div id="app">
    <app-bar title="SEDD" @click="toggle" />
    <navigation-drawer
      :is-shown="isShown"
      :is-contract="isContract"
      @closeMenu="closeMenu"
    />
    <router-view
      class="view"
      :class="{ 'small-view': isContract, 'large-view': !isContract }"
    />
    <div class="dialog" v-if="isOpenModal">
      <survey-component />
    </div>
  </div>
</template>

<script>
import AppBar from "./components/AppBar/AppBar";
import NavigationDrawer from "./components/NavigationDrawer/NavigationDrawer";
import SurveyComponent from "./components/SurveyComponent/SurveyComponent";
export default {
  name: "app",
  components: {
    AppBar,
    NavigationDrawer,
    SurveyComponent
  },
  created() {
    this.$store.dispatch("setEvaluations");
    this.$store.dispatch("setCriteria");
    this.$store.dispatch("setIndicators");
    this.$store.dispatch("setPeople");
    this.$store.dispatch("setTeachers");
    this.$store.dispatch("setStudents");
    this.$store.dispatch("setManagements");
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.toggleMenu);
      this.toggleMenu();
    });
  },
  data() {
    return {
      isShown: false,
      isContract: true,
      isActive: false
    };
  },
  computed: {
    isOpenModal() {
      return this.$store.state.isOpenModalEvaluation;
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      if (this.isContract) {
        this.expandNavigationDrawer();
      } else {
        this.contractNavigationDrawer();
      }
    },
    expandNavigationDrawer() {
      this.isShown = true;
      this.isContract = false;
    },
    closeMenu() {
      this.isShown = false;
      this.isContract = true;
    },
    contractNavigationDrawer() {
      this.isContract = true;
    },
    toggleMenu() {
      let clientWidth = document.documentElement.clientWidth;
      if (clientWidth < 768 && this.isContract) {
        this.closeMenu();
      } else if (clientWidth >= 768 && !this.isShown) {
        this.isShown = true;
        this.isContract = true;
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  position: relative;
  width: inherit;
  height: inherit;
  font-family: "Roboto", sans-serif;
}

.view {
  position: relative;
  overflow-y: auto;
  padding: 15px 15px;
  height: calc(100vh - 60px);
}

@media (min-width: 768px) {
  .small-view {
    left: 65px;
    width: calc(100% - 65px);
    transition: all 0.5s ease-in-out;
  }

  .large-view {
    left: 256px;
    width: calc(100% - 256px);
    transition: all 0.5s ease-in-out;
  }
}

/* MODAL */
.dialog {
  position: absolute;
  z-index: 12;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
}
</style>

<style src="./css/bootstrap-grid.css"></style>
