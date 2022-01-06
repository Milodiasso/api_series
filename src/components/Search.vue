<template>
  <form class="d-flex">
    <input
      class="form-control me-2 theme"
      type="search"
      placeholder="Rechercher"
      aria-label="Search"
      v-model="search"
    />
    <button
      class="btn btn-outline-success"
      type="submit"
      v-if="this.search.length > 3"
      v-on:click.prevent="searching(this.search)"
    >
      Search
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  setup() {},
  data() {
    return {
      search: "",
      result: [],
    };
  },
  methods: {
    searching: function (texte) {
      axios
        .get("https://api.betaseries.com/search/shows?key=66e0ce8935b2", {
          params: {
            text: texte,
            limit: 20,
          },
        })
        .then(
          (res) => (this.result = res.data.shows && console.log(res.data.shows))
        );
    },
  },
};
</script>

<style scoped>
.theme {
  background: #271f1f;
  border-radius: 10px;
  color: rgb(182, 133, 41);
  border: 5px groove rgb(182, 133, 41);
  outline: none;
}
</style>