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
          <div class="modal-header">
            <h5 class="modal-title" id="individualRecipeModalLabel">
              {{ modalTitle || "No title passed" }}
            </h5>
            <!-- TODO(): style this to be toggled when is favorite is true -->
            <button
              type="button"
              class="btn btn-primary btn-floating favorite-btn"
              id="favoriteButton"
              @click="toggleFavorite"
            >
              <i
                v-bind:class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"
              ></i>
            </button>
          </div>
          <div class="modal-body">
            <!-- TODO(): fix style to better match figma -->
            <div class="row">
              <img v-bind:src="imageUrl" class="center-block" />
            </div>
            <div v-if="recipeLoaded">
              <div class="row">Cuisines: {{ cuisines }}</div>
              <div class="row">Diets: {{ diets }}</div>
              <div class="row">Meal type: {{ mealTypes }}</div>
              <div class="row">Ingredients: {{ ingredients }}</div>
              <div class="row">
                Instructions: {{ recipeInfo.instruction.instructions }}
              </div>
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
                Prep time in minutes: {{ recipeInfo.preparationTimeInMinutes }}
              </div>
              <div class="row">Total cost: {{ totalCost }}</div>
              <div class="row">Cost per serving: {{ costPerServing }}</div>
              <div class="row">
                Has any of user's allergens: {{ recipeInfo.hasAllergens }}
              </div>
            </div>
            <div v-else>
              <div class="row">
                <h3>Loading recipe details...</h3>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- TODO(): Update this to actually show instruction steps page -->
            <button
              type="button"
              class="btn btn-secondary"
              @click="showInstructionSteps"
            >
              Show instruction steps
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

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    }),
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
    showInstructionSteps: function () {
      // TODO(): need to make a modal to do this
      console.log("UNIMPLEMENTED: show inst steps");
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
      let invIngredients = await this.getInventoryIngredientsList();
      let recipeIngredients = this.recipeInfo.ingredients;

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
        // TODO(): Make this more robust to only add certain ingredients, let
        // user select.
        // TODO(): Make it clear to the user when this done/while it's working.
        // add spinny wheel or something
        for (const ing of missing) {
          ing.recipeId = this.recipeId;
          this.$store.dispatch("shoppinglist/post", ing).then(
            () => {},
            (error) => {
              console.log("failed to add: " + error);
            }
          );
        }
      }
    },
    tryMakeRecipe: async function () {
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
        // TODO(): Make this more robust to not remove all ingredients and let
        // user select what to get rid of.
        // TODO(): Make it clear to the user when this done/while it's working.
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
</style>
