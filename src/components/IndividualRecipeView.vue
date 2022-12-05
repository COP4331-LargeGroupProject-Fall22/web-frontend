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
            <!-- <div class="row"><h3>{{ recipeInfo.name }}</h3></div> -->
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
              <div class="row">Total cost: {{ recipeInfo.totalCost }}</div>
              <div class="row">
                Cost per serving: {{ recipeInfo.costPerServing }}
              </div>
              <!-- <div class="row">Food type: {{ recipeInfo.image }}</div> -->
              <div class="row">Is favorite: {{ recipeInfo.isFavorite }}</div>
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
            <button type="button" class="btn btn-secondary" @click="hideModal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              {{ modalButtonText || "?" }}
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
    isFavorite: false,
  }),
  props: {
    showModal: Boolean,
    modalText: String,
    modalTitle: String,
    recipeId: Number,
    imageUrl: String,
    favorite: Boolean,
  },
  watch: {
    showModal(newValue) {
      if (newValue === true) {
        this.isFavorite = this.favorite;
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
      this.modalInstance.hide();
      this.$emit("closeModal");
    },
    toggleFavorite: function () {
      this.isFavorite = !this.isFavorite;

      if (this.isFavorite) {
        this.addToFavorites();
      } else {
        this.removeFromFavorites();
      }
    },
    addToFavorites: function () {
      // this.$store.dispatch("inventory/delete", this.recipeId).then(
      //   () => {
      //     this.hideModal();
      //   },
      //   (error) => {
      //     console.log("failed to delete: " + error);
      //   }
      // );
      console.log("UNIMPLEMENTED: add to favs");
    },
    removeFromFavorites: function () {
      // this.$store.dispatch("inventory/delete", this.recipeId).then(
      //   () => {
      //     this.hideModal();
      //   },
      //   (error) => {
      //     console.log("failed to delete: " + error);
      //   }
      // );
      console.log("UNIMPLEMENTED: delete from favs");
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
