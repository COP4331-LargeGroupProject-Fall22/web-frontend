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
          </div>
          <div class="modal-body">
            <!-- TODO(): fix style to better match figma -->
            <div class="row">
              <img v-bind:src="imageUrl" class="center-block" />
            </div>
            <div class="row">Food type: {{ category }}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">
              Close
            </button>
            <!-- TODO(56): Open a date picker and let the user specify expiration date -->
            <button
              type="button"
              @click="handleEditExpirationDate"
              class="btn btn-primary"
            >
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
    modalButtonText: "buh",
  }),
  props: {
    showModal: Boolean,
    modalText: String,
    modalTitle: String,
    recipeId: Number,
  },
  watch: {
    showModal(newValue) {
      if (newValue === true) {
        this.modalActive();
      }
    },
    isFavorite(shouldAddToFavorites) {
      if (shouldAddToFavorites) {
        console.log("adding to favs");
      } else {
        console.log("removing from favs");
      }
    },
  },
  computed: {
    imageUrl() {
      return this.recipeInfo == null
        ? "https://github.com/COP4331-LargeGroupProject-Fall22/web-frontend/blob/main/src/assets/food.png?raw=true"
        : this.recipeInfo.image.srcUrl;
    },
    category() {
      return this.recipeInfo == null ? "N/A" : this.recipeInfo.category;
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
      this.getrecipeInfo();
    },
    hideModal: function () {
      this.modalInstance.hide();
      this.$emit("closeModal");
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
    getRecipeInfo: function () {
      this.$store.dispatch("recipes/get", this.recipeId).then(
        (response) => {
          this.recipeInfo = response.data;
        },
        (error) => {
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

<style scoped></style>
