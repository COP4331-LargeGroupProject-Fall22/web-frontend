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
            <div class="col-md-9 mb-4">
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

      <div v-if="!searchResults.length" class="row">
        <p>No search results found</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddIngredientView",
  data() {
    return {
      id: 0,
      searchString: "",
      searchResults: [],
    };
  },
  computed: {
    ingredientsToAdd() {
      return this.searchResults.filter((t) => t.shouldAdd);
    },
  },
  methods: {
    searchIngredients() {
      // TODO(ADD NUM HERE): Update this function to actually search and render ingredients
      console.log(
        "INCOMPLETE: Searches for ingredients and displays returned ingredients"
      );
      this.searchString = this.searchString.trim();
      if (this.searchString === "") {
        return;
      }
      this.searchResults.push({
        id: this.id++,
        name: this.searchString,
        shouldAdd: false,
      });
    },
    removeItemFromResults(item) {
      this.searchResults = this.searchResults.filter((t) => t !== item);
    },
  },
};
</script>

<style scoped></style>
