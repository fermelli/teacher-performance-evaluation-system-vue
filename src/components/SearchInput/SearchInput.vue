<template>
  <div class="col-12 offset-xl-20p col-xl-60p relative">
    <div
      class="div-search"
      :class="{ focus: hasFocus }"
      @click="focusInputSearch"
    >
      <input
        type="text"
        placeholder="Buscar"
        class="input-search"
        tabindex="0"
        ref="inputSearch"
        @focus="hasFocus = true"
        @keyup="filterList"
      />
      <div
        class="div-close-icon"
        v-show="searchedText"
        @click="deleteTextInputSearch"
      >
        <i class="material-icons close-icon">close</i>
      </div>
      <div class="div-search-icon">
        <i class="material-icons">search</i>
      </div>
    </div>
    <div
      class="result-search"
      v-show="filteredList.length && isOpen && searchedText"
    >
      <ul id="list">
        <li
          tabindex="0"
          role="item-list"
          aria-checked="false"
          v-for="teacher in filteredList"
          :key="teacher.ci"
          @click="setSelectedItemId(teacher.ci)"
        >
          {{
            `${teacher.paternal_surname} ${teacher.maternal_surname} ${
              teacher.names
            }`
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-input",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      hasFocus: false,
      showClose: false,
      isOpen: true,
      searchedText: "",
      filteredList: [],
      selectedItemId: null
    };
  },
  methods: {
    focusInputSearch() {
      this.$refs.inputSearch.focus();
    },
    deleteTextInputSearch() {
      if (this.$refs.inputSearch.value) {
        this.$refs.inputSearch.value = "";
        this.searchedText = "";
        this.emitSetSelectedItemId(null);
        this.focusInputSearch();
      }
    },
    emitSetSelectedItemId(id) {
      this.$emit("setSelectedItemId", id);
    },
    setSelectedItemId(id) {
      this.isOpen = false;
      this.emitSetSelectedItemId(id);
      this.$refs.inputSearch.value = event.target.textContent
        .trimStart()
        .trimEnd();
    },
    filterList() {
      //   console.log(event.key);
      this.isOpen = true;
      this.searchedText = event.target.value.toLowerCase();
      if (!this.searchedText) {
        this.emitSetSelectedItemId(null);
      }
      this.filteredList = this.list.filter(teacher => {
        let fullname = `${teacher.paternal_surname} ${
          teacher.maternal_surname
        } ${teacher.names}`;
        return (
          this.searchedText !== "" &&
          (teacher.paternal_surname
            .toLowerCase()
            .startsWith(this.searchedText) ||
            teacher.maternal_surname
              .toLowerCase()
              .startsWith(this.searchedText) ||
            teacher.names.toLowerCase().startsWith(this.searchedText) ||
            fullname.toLowerCase().includes(this.searchedText))
        );
      });
    }
  }
};
</script>

<style src="./SearchInput.css" scoped></style>
