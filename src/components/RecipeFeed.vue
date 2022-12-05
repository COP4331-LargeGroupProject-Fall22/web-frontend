<template>
  <div class="container">
    <div class="tool-bar">
      <div class="tool-bar-container">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-sortBy dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ selected }}
          </button>
          <div class="dropdown-menu">
            <ul v-for="filter in sortByFilters" v-bind:key="filter">
              <div class="options">
                <div v-if="filter == selected">
                  <a @click="selected = filter" class="dropdown-item active">
                    {{ filter }}
                  </a>
                </div>
                <div v-else>
                  <a @click="selected = filter" class="dropdown-item">
                    {{ filter }}
                  </a>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="tool-bar-container">
        <!-- TODO(): when this is clicked, it should open a modal that lets
        users pick all the ingredients from their inventory that they want to
        use. something like "advanced search options" that lets them specify all
        the extra stuff like items to use, etc, cuisines, diets,
        meal types, intolerance set by user allergens if checkbox clicked -->
        <label class="switch" title="Search using inventory ingredients">
          <input
            type="checkbox"
            id="checkbox"
            v-model="useInventoryIngredientsForSearch"
          />
          <span class="slider round"></span>
        </label>
        <button
          type="button"
          class="btn btn-primary btn-floating"
          id="searchRecipesButton"
          @click="handleSearch"
        >
          <i class="fas fa-search"></i>
        </button>
        <div class="form-outline">
          <input
            id="searchRecipes"
            aria-label="Search"
            autocomplete="off"
            placeholder="Search Recipes..."
            v-model="searchString"
            type="text"
            class="form-control"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary btn-floating"
          id="clearSearchButton"
          @click="
            this.recipes = [];
            this.message = 'Try searching for a recipe :)';
          "
        >
          <i class="fa-solid fa-x"></i>
        </button>
      </div>
      <div class="container mt-3">
        <div class="row">
          <individual-recipe-view
            @closeModal="showIndividualRecipe = false"
            @saveChanges="showIndividualRecipe = false"
            :showModal="showIndividualRecipe"
            :modalTitle="individualRecipeTitle"
            :recipeId="recipeId"
            :imageUrl="imageUrl"
            :favorite="isFavorite"
          >
          </individual-recipe-view>
        </div>
      </div>
    </div>
    <div class="row">
      <ul>
        <li v-for="category in recipes" :key="category" class="category">
          <div>
            <div class="col-md-auto">
              <a v-bind:href="'#' + category.name" class="">
                <button type="button" class="btn type-of-recipe">
                  {{ category.name }}
                </button>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="row">
      <div v-if="message.length">
        <h3>{{ message }}</h3>
      </div>
      <ul>
        <li>
          <div v-for="category in recipes" :key="category">
            <div :id="category" class="row">
              <h3>{{ category.name }}</h3>
            </div>
            <div class="row">
              <ul>
                <div
                  v-for="recipe in category.recipes"
                  :key="recipe"
                  class="col-md-auto"
                >
                  <button
                    type="button"
                    @click="
                      showIndividualRecipe = true;
                      recipeId = recipe.id;
                      individualRecipeTitle = recipe.name;
                      imageUrl = recipe.image.srcUrl;
                      isFavorite = recipe.isFavorite;
                    "
                    class="btn recipe-item"
                    v-bind:style="{
                      backgroundImage:
                        'linear-gradient(to bottom,rgb(255 255 255 / 0%),rgb(0 0 0 /73%)),url(' +
                        recipe.image.srcUrl +
                        ')',
                    }"
                  >
                    <div class="col-md-auto text-center recipe-text">
                      {{ recipe.name }}
                    </div>
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IndividualRecipeView from "@/components/IndividualRecipeView.vue";

import { util } from "@/globals.js";

export default {
  name: "RecipeFeed",
  components: {
    IndividualRecipeView,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      recipes: [],
      searchString: "",
      sortByFilters: ["A-Z", "Z-A", "Cuisine", "Diet", "Meal type"],
      selected: "A-Z",
      noMatchingRecipes: true,
      showIndividualRecipe: false,
      recipeId: null,
      individualRecipeTitle: "",
      imageUrl:
        "https://github.com/COP4331-LargeGroupProject-Fall22/web-frontend/blob/main/src/assets/food.png?raw=true",
      message: "Try searching for a recipe :)",
      useInventoryIngredientsForSearch: false,
      isFavorite: false,
    };
  },
  methods: {
    async handleSearch() {
      this.recipes = [];
      if (
        this.searchString.trim() === "" &&
        !this.useInventoryIngredientsForSearch
      ) {
        // TODO(): show all possible recipe categories as modal popup
        this.message =
          "No recipes match, please try searching for something else";
        return;
      }
      let ingredients = null;
      if (this.useInventoryIngredientsForSearch) {
        let ingredientsResponse = await this.$store.dispatch(
          "inventory/getAll",
          {}
        );
        ingredients = "";
        // TODO(): add option for selecting checkbox of which ingredients to
        // use from inventory rather than all at once
        for (let i = 0; i < ingredientsResponse.length; i++) {
          const items = ingredientsResponse[i][1];
          // Each element is 2-tuple of 1) category name, 2) data
          if (!items.length) continue;
          for (const ingredient of items) {
            ingredients += ingredient.name + ",";
          }
        }
      }

      // TODO(): Update this to have params set by page
      let params = {
        recipeName: this.searchString.trim(),
        resultsPerPage: 100,
        page: 0,
        intolerance: null,
        hasIngredients: ingredients,
        cuisines: null,
        diets: null,
        mealTypes: null,
        sortByLexicographicalOrder:
          this.selected == "A-Z" || this.selected == "Z-A",
        sortByMealTypes: this.selected == "Meal type",
        sortByDiets: this.selected == "Diet",
        sortByCuisines: this.selected == "Cuisine",
        isReverse: this.selected == "Z-A",
      };
      this.$store.dispatch("recipe/getAll", params).then(
        (response) => {
          // Each key in parsed is a category name
          let parsed = {};
          for (let i = 0; i < response.results.length; i++) {
            let category = util.capitalizeFirstLetter(response.results[i][0]);
            let items = response.results[i][1];
            if (!(category in parsed)) {
              parsed[category] = {
                name: category,
                recipes: items,
              };
            }
          }
          this.recipes = parsed;
          this.noMatchingRecipes = util.isEmptyJson(parsed);
          this.message = this.noMatchingRecipes
            ? "No recipes match, please try searching for something else"
            : "";
        },
        (error) => {
          this.message = util.getErrorString(error);
        }
      );
      this.message = "Loading...";
    },
  },
};
</script>

<style scoped>
/* TODO(41): If the styles for this and ingredient are identical, make them share
css. If not, just extract this into a separate css file */
.container {
  padding: 0 !important;
  margin: 0 !important;
  background-color: #f9f9f9;
  max-width: 100%;
}

.btn {
  background-color: white;
  border-radius: 100px;
  box-shadow: 0px 3px 3px #bdbdbd;
}

.tool-bar {
  margin: 0 !important;
  flex-wrap: wrap;
  height: fit-content;
  display: flex;
  justify-content: space-between;
}

.form-outline {
  padding-left: 20px;
  padding-right: 20px;
}
.form-control {
  border: none;
  border-radius: 100px !important;
  box-shadow: 0px 3px 3px #bdbdbd;
  display: inline-block;
}

.tool-bar-container {
  display: flex;
  padding: 20px;
}

.btn-floating {
  border-radius: 50%;
  height: fit-content;
  align-self: center;
}

.type-of-recipe {
  width: 10vw;
  height: 5vw;
  border-radius: 15px;
  align-items: center;
  color: black;
  background-color: lightgrey;
  margin: 15px;
}

.recipe-text {
  text-align: left !important;
  font-size: 1rem;
  color: white;
  top: 30%;
  padding: 8% !important;
}

.type-of-recipe,
.recipe-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recipe-item {
  width: 12vw;
  height: 19vw;
  border-radius: 15px;
  /* TODO(40): Update this to display the image from the ingredient in inventory */
  background-size: auto;
  background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 0%),
      rgb(0 0 0 / 73%)
    ),
    url("../assets/food.png");
  margin: 15px;
  padding: 0;
}

.col-md-auto {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

.categories {
  list-style: none;
  display: flex;
}

ul {
  margin: 0;
  display: flex;
  max-width: 80vw;
  padding: 0;
  overflow: auto;
  overflow-y: hidden;
}

h3 {
  padding-left: 15px;
  padding-top: 15px;
}

.dropdown-menu {
  display: none;
}

.btn-sortBy {
  color: black !important;
  background-color: white !important;
  border: none;
}

.btn-sortBy:hover,
.btn-sortBy:active,
.btn-sortBy:focus {
  color: white !important;
  background-color: #008600 !important;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #008600;
}

.options {
  user-select: none;
  cursor: pointer;
  width: 100%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
