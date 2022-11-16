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
        <!-- TODO(Add number): Add a checkbox that allows searching only for
        exact match -->
        <!-- TODO(Add number): Add a checkbox that allows searching only for
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
            <div class="col-md-1 mb-4">
              <input type="checkbox" v-model="item.shouldAdd" :key="item.id" />
            </div>
            <div class="col-md-9 mb-4 toCapitalFirst">
              <span :class="{ done: item.shouldAdd }">{{ item.name }}</span>
            </div>
            <div class="col-md-2 mb-4">
              <button class="btn-primary" @click="removeItemFromResults(item)">
                X
              </button>
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
import IngredientService from "@/services/ingredient.service";

export default {
  name: "AddIngredientView",
  data() {
    return {
      id: 0,
      searchString: "",
      searchResults: [],
      errorString: "",
    };
  },
  computed: {
    ingredientsToAdd() {
      return this.searchResults.filter((t) => t.shouldAdd);
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
      IngredientService.getAllMatchingQuery(this.searchString).then(
        (response) => {
          this.searchResults = response.data;
        }
      );
      this.errorString = this.searchResults.length
        ? ""
        : "No search results found";
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
</style>
