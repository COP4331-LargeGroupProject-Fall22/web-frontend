<template>
  <div>
    <div
      id="individualRecipeModal"
      class="modal fade"
      ref="individualRecipeModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row">
              <img v-bind:src="imageUrl" class="center-block" />
            </div>
            <h5 class="modal-title" id="individualRecipeModalLabel">
              {{ modalTitle || "No title passed" }}
            </h5>
            <button
              type="button"
              class="btn favorite-btn"
              id="favoriteButton"
              @click="toggleFavorite"
            >
              <i
                v-bind:class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"
              ></i>
            </button>
            <div v-if="recipeLoaded">
              <div class="recipe-details" v-if="showInstructionSteps">
                <div class="row">
                  <h3>Instructions: Step {{ instructionPageNum + 1 }}</h3>
                </div>
                <div class="row">
                  {{ instructionPageInstructions }}
                </div>
                <div
                  v-if="instructionPageHasIngredients"
                  class="row ingredientsNeeded"
                >
                  Ingredients needed:
                  {{ instructionPageIngredients }}
                </div>
                <div class="row">
                  <div class="col-6 text-left">
                    <div class="previous">
                      <div v-if="hasPrevPage">
                        <button
                          type="button"
                          @click="instructionPageNum--"
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
                          @click="instructionPageNum++"
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
              <div class="recipe-details" v-else>
                <div v-if="cuisines != 'N/A'" class="row">
                  Cuisines: {{ cuisines }}
                </div>
                <div v-if="diets != 'N/A'" class="row">Diets: {{ diets }}</div>
                <div v-if="mealTypes != 'N/A'" class="row">
                  Meal type: {{ mealTypes }}
                </div>
                <div v-if="ingredients != 'N/A'" class="row">
                  Ingredients: {{ ingredients }}
                </div>
                <!-- TODO(86): Think of use for nutrition facts -->
                <!-- <div class="row">
                  Nutrition facts: {{ recipeInfo.nutritionFacts }}
                </div> -->
                <div class="row">
                  Number of servings: {{ recipeInfo.servings }}
                </div>
                <div class="row">
                  Cooking time in minutes: {{ recipeInfo.cookingTimeInMinutes }}
                </div>
                <div class="row">
                  Prep time in minutes:
                  {{ recipeInfo.preparationTimeInMinutes }}
                </div>
                <div class="row">Total cost: {{ totalCost }}</div>
                <div class="row">Cost per serving: {{ costPerServing }}</div>
                <div class="row">
                  Has any of user's allergens: {{ recipeInfo.hasAllergens }}
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row">
                <h3>Loading recipe details...</h3>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showInstructionSteps = !showInstructionSteps"
            >
              <div v-if="showInstructionSteps">Show recipe details</div>
              <div v-else>Show instruction steps</div>
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="tryAddIngredientsToShoppingList"
            >
              Add missing ingredients to list
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="tryMakeRecipe"
            >
              {{ modalButtonText || "?" }}
            </button>
            <button type="button" class="btn btn-danger" @click="hideModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  name: "IndividualRecipeView",
  data: () => ({
    modalInstance: null,
    recipeInfo: null,
    modalButtonText: "Make recipe",
    recipeLoaded: false,
    formatter: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }),
    showInstructionSteps: false,
    instructionPageNum: 0,
  }),
  props: {
    showModal: Boolean,
    modalText: String,
    modalTitle: String,
    recipeId: Number,
    imageUrl: String,
  },
  watch: {
    showModal(newValue) {
      if (newValue === true) {
        this.modalActive();
      }
    },
  },
  computed: {
    category() {
      return this.recipeInfo == null ? "N/A" : this.recipeInfo.category;
    },
    ingredients() {
      if (this.recipeInfo == null) {
        return "N/A";
      }
      return this.recipeInfo.ingredients
        .map((recipe) => recipe.name)
        .join(", ");
    },
    cuisines() {
      if (this.recipeInfo == null || !this.recipeInfo.cuisines.length) {
        return "N/A";
      }
      return this.recipeInfo.cuisines.join(", ");
    },
    mealTypes() {
      if (this.recipeInfo == null || !this.recipeInfo.mealTypes.length) {
        return "N/A";
      }
      return this.recipeInfo.mealTypes.join(", ");
    },
    diets() {
      if (this.recipeInfo == null || !this.recipeInfo.diets.length) {
        return "N/A";
      }
      return this.recipeInfo.diets.join(", ");
    },
    isFavorite() {
      if (this.recipeInfo == null) {
        return false;
      }
      return this.recipeInfo.isFavorite;
    },
    totalCost() {
      if (this.recipeInfo == null) {
        return "N/A";
      }
      return this.formatter.format(this.recipeInfo.totalCost / 100);
    },
    costPerServing() {
      if (this.recipeInfo == null) {
        return "N/A";
      }
      return this.formatter.format(this.recipeInfo.costPerServing / 100);
    },
    hasPrevPage() {
      return this.instructionPageNum > 0;
    },
    hasNextPage() {
      if (this.recipeInfo == null) {
        return false;
      }
      return (
        this.instructionPageNum < this.recipeInfo.instructionSteps.length - 1
      );
    },
    instructionPageHasIngredients() {
      if (this.recipeInfo == null) return false;
      return (
        this.recipeInfo.instructionSteps[this.instructionPageNum].ingredients
          .length !== 0
      );
    },
    instructionPageIngredients() {
      if (this.recipeInfo == null) return "";
      return this.recipeInfo.instructionSteps[
        this.instructionPageNum
      ].ingredients
        .map((ing) => ing.name)
        .join(", ");
    },
    instructionPageInstructions() {
      if (this.recipeInfo == null) return "";
      return this.recipeInfo.instructionSteps[this.instructionPageNum]
        .instructions;
    },
  },
  methods: {
    modalActive: function () {
      this.modalInstance = new Modal(
        document.getElementById("individualRecipeModal"),
        {
          target: "#individual-ingredient-modal",
          backdrop: "static",
        }
      );
      this.modalInstance.show();
      this.getRecipeInfo();
    },
    hideModal: function () {
      this.recipeLoaded = false;
      this.modalInstance.hide();
      this.$emit("closeModal");
    },
    toggleFavorite: function () {
      this.recipeInfo.isFavorite = !this.recipeInfo.isFavorite;

      if (this.recipeInfo.isFavorite) {
        this.addToFavorites();
      } else {
        this.removeFromFavorites();
      }
    },
    addToFavorites: function () {
      this.$store.dispatch("favrecipe/post", this.recipeInfo).then(
        () => {},
        (error) => {
          console.log("failed to add: " + error);
        }
      );
    },
    removeFromFavorites: function () {
      this.$store.dispatch("favrecipe/delete", this.recipeId).then(
        () => {},
        (error) => {
          console.log("failed to delete: " + error);
        }
      );
    },
    getRecipeInfo: function () {
      this.$store.dispatch("recipe/get", this.recipeId).then(
        (response) => {
          this.recipeInfo = response.data;
          this.recipeLoaded = true;
        },
        (error) => {
          this.recipeLoaded = false;
          console.log("failed to get info: " + error);
        }
      );
    },
    getInventoryIngredientsList: async function () {
      return await this.$store.dispatch("inventory/getAll", {}).then(
        (response) => {
          return response[0][1];
        },
        (error) => {
          console.log("oops" + error);
          return [];
        }
      );
    },
    tryAddIngredientsToShoppingList: async function () {
      if (this.recipeInfo === null) {
        console.log("Recipe info isn't loaded yet...");
        return;
      }
      // TODO(69): Should also check that shopping list doesn't already have or
      // has enough quantity or something
      let invIngredients = await this.getInventoryIngredientsList();
      let recipeIngredients = this.recipeInfo.ingredients;
      console.log(recipeIngredients);

      let missing = recipeIngredients.filter(
        (recIng) => !invIngredients.find((invIng) => invIng.id == recIng.id)
      );

      if (missing.length === 0) {
        confirm("No missing ingredients :)");
        return;
      }

      if (
        missing.length !== 0 &&
        confirm(
          "You are missing ingredients: " +
            missing.map((ing) => ing.name).join(", ") +
            ". Do you want to add these to your shopping list?"
        )
      ) {
        // TODO(84): Make this more robust to only add certain ingredients, let
        // user select.
        // TODO(83): Make it clear to the user when this done/while it's working.
        // add spinny wheel or something
        for (const ing of missing) {
          ing.recipeID = this.recipeId;
          ing.recipeName = this.recipeInfo.name;
          ing.price = ing.price.price;
          ing.dateAdded = Date.now();
          await this.$store.dispatch("shoppinglist/post", ing).then(
            () => {},
            (error) => {
              console.log("failed to add: " + error);
            }
          );
        }
      }
    },
    tryMakeRecipe: async function () {
      if (this.recipeInfo === null) {
        console.log("Recipe info isn't loaded yet...");
        return;
      }
      let invIngredients = await this.getInventoryIngredientsList();
      let recipeIngredients = this.recipeInfo.ingredients;

      let missing = recipeIngredients.filter(
        (recIng) => !invIngredients.find((invIng) => invIng.id == recIng.id)
      );
      if (
        missing.length === 0 ||
        confirm(
          "You are missing ingredients: " +
            missing.map((ing) => ing.name).join(", ") +
            ". Do you want to make the recipe anyway?"
        )
      ) {
        // TODO(84): Make this more robust to not remove all ingredients and let
        // user select what to get rid of.
        // TODO(83): Make it clear to the user when this done/while it's working.
        // add spinny wheel or something
        let used = recipeIngredients.filter((recIng) =>
          invIngredients.find((invIng) => invIng.id == recIng.id)
        );
        if (
          confirm(
            "Remove ingredients used for this recipe from inventory? " +
              used.map((ing) => ing.name).join(", ")
          )
        ) {
          for (const ing of used) {
            await this.$store.dispatch("inventory/delete", ing.id).then(
              () => {},
              (error) => {
                console.log("failed to delete: " + error);
              }
            );
          }
        }
      }
    },
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        this.$emit("closeModal");
      }
    });
  },
};
</script>

<style scoped>
.btn-floating {
  border-radius: 50%;
  height: fit-content;
  align-self: center;
}

.ingredientsNeeded {
  padding-top: 10px;
}

.modal-body {
  padding: 0;
}

img {
  width: 100%;
  height: 60vh;
  object-fit: cover;
  border-radius: 0.3rem;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
  width: fit-content;
  display: inline-flex;
  padding: 15px;
}

.recipe-details {
  padding-left: 15px;
}

.favorite-btn {
  float: right;
  margin: 10px;
  color: red;
  scale: 1.5;
}

.favorite-btn:hover,
.favorite-btn:focus,
.favorite-btn:active {
  color: red;
}

.favorite-btn:focus {
  box-shadow: none;
}
</style>
