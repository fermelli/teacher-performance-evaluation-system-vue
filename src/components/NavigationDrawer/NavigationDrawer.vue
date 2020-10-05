<template>
  <div
    class="navigation-drawer-scrim"
    :class="{
      contract: isContract,
      expand: !isContract
    }"
    v-show="isShown"
    @click.self="close"
  >
    <aside
      class="navigation-drawer-container"
      :class="{
        open: isShown,
        close: isClose
      }"
      @animationend="menuAnimationEnd"
      @webkit-animationend="menuAnimationEnd"
    >
      <div class="navigation-drawer-header">
        <button class="btn-back" @click="close">
          <i class="material-icons">
            arrow_back
          </i>
        </button>
      </div>
      <div class="navigation-drawer-body">
        <link-menu
          v-for="link in links"
          :key="link.id"
          :is-small="isContract"
          :link="link"
          @closeAfterSelected="close"
        />
      </div>
    </aside>
  </div>
</template>

<script>
import LinkMenu from "./../LinkMenu/LinkMenu";
import Links from "./../../helpers/links";
export default {
  name: "navigation-drawer",
  components: {
    LinkMenu
  },
  props: {
    isShown: {
      type: Boolean,
      required: true,
      default: false
    },
    isContract: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data() {
    return {
      isClose: false,
      links: Links
    };
  },
  methods: {
    close() {
      this.isClose = true;
    },
    emitCloseNavigationDrawer() {
      this.isClose = false;
      this.$emit("closeMenu");
    },
    menuAnimationEnd(event) {
      if (event.animationName.indexOf("Out") !== -1) {
        this.emitCloseNavigationDrawer();
      }
    }
  }
};
</script>

<style src="./NavigationDrawer.css" scoped></style>
