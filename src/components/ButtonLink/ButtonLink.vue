<template>
  <div>
    <router-link :to="route">
      <button
        class="btn-custom btn-route"
        :style="positionBottom"
        @mouseenter="emitTooltipDeployed(true)"
        @mouseleave="emitTooltipDeployed(false)"
        @focus="emitTooltipDeployed(true)"
        @blur="emitTooltipDeployed(false)"
      >
        <i class="material-icons">{{ iconName }}</i>
        <tooltip-component :text="textTooltip" :is-show="isTooltipDisplayed" />
      </button>
    </router-link>
  </div>
</template>

<script>
import TooltipComponent from "./../../components/TooltipComponent/TooltipComponent";
export default {
  name: "button-link",
  components: {
    TooltipComponent
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    textTooltip: {
      type: String,
      required: true
    },
    isTooltipDisplayed: {
      type: Boolean,
      required: true
    },
    iconName: {
      type: String,
      required: true
    }
  },
  computed: {
    positionBottom() {
      let index = this.index;
      return {
        bottom: 30 + index * 75 + "px"
      };
    }
  },
  methods: {
    emitTooltipDeployed(deploy) {
      this.$emit("tooltipDeployed", deploy);
    }
  }
};
</script>

<style src="./ButtonLink.css" scoped></style>
