<template>
  <div>
    <div class="container">
      <div class="row">
        <h3>Enter an ingredient...</h3>
      </div>
      <div class="row">
        <div class="col-md-10 mb-4">
          <input
            autocomplete="off"
            placeholder="Search for ingredient to add..."
            v-model="searchString"
            type="text"
            class="form-control"
          />
        </div>
        <!-- TODO(36): Add a checkbox that allows searching only for
        exact match -->
        <!-- TODO(36): Add a checkbox that allows searching only for
        ingredients that start with provided string -->
        <div class="col-md-2 mb-4">
          <button
            id="searchIngredients"
            @click="searchIngredients"
            class="btn btn-primary"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div v-if="searchResults.length">
        <div v-for="item in searchResults" :key="item.id">
          <div class="row">
            <div class="search-results col-md-1 mb-4">
              <input type="checkbox" v-model="item.shouldAdd" :key="item.id" />
            </div>
            <div class="search-results col-md-9 mb-4 toCapitalFirst">
              <span :class="{ done: item.shouldAdd }">{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 text-left">
            <div class="previous">
              <div v-if="currentPage > 0">
                <button
                  type="button"
                  @click="currentPage--"
                  class="btn btn-primary btn-md"
                >
                  <i class="fas fa-arrow-left"></i>
                  <span class=""></span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6 text-right">
            <div class="next">
              <div v-if="hasNextPage">
                <button
                  type="button"
                  @click="currentPage++"
                  class="btn btn-primary btn-md"
                >
                  <i class="fas fa-arrow-right"></i>
                  <span class=""></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="errorString.length" class="row">
        <p>{{ errorString }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { util } from "@/globals.js";

export default {
  name: "AddIngredientView",
  data() {
    return {
      searchString: "",
      searchResults: [],
      errorString: "",
      currentPage: 0,
      hasNextPage: false,
      // TODO(36): make this configurable by user
      resultsPerPage: 10,
    };
  },
  computed: {
    ingredientsToAdd() {
      return this.searchResults.filter((t) => t.shouldAdd);
    },
  },
  watch: {
    currentPage() {
      this.searchIngredients();
    },
    searchString() {
      this.currentPage = 0;
      this.searchResults = [];
      this.errorString = "";
    },
  },
  methods: {
    async searchIngredients() {
      this.errorString = "Loading...";
      this.searchString = this.searchString.trim();
      if (this.searchString === "") {
        this.errorString = "Please provide an ingredient name";
        return;
      }

      this.$store
        .dispatch("ingredients/getAllMatchingQuery", {
          ingredientName: this.searchString,
          page: this.currentPage,
          resultsPerPage: this.resultsPerPage,
          // TODO(35): add support for intolerances
          intolerance: undefined,
        })
        .then(
          (response) => {
            console.log(response);
            // TODO(67): if page is increasing, then append to previous results,
            // don't get rid of old results; however, can't just append, maybe
            // paginate and cache previous lookups, only lookup if you have to
            this.searchResults = response.results;
            this.hasNextPage = response.currentPage < response.numOfPages - 1;
            this.errorString =
              this.searchResults.length > 0 ? "" : "No search results found";
          },
          (error) => {
            this.errorString = util.getErrorString(error);
          }
        );
    },
    removeItemFromResults(item) {
      this.searchResults = this.searchResults.filter((t) => t !== item);
    },
  },
};
</script>

<style scoped>
.toCapitalFirst {
  text-transform: capitalize;
}

.previous {
  text-align: left;
}

.next {
  text-align: right;
}

.search-results {
  width: fit-content;
}
</style>
