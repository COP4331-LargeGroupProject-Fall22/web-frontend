<template>
  <div>
    <div
      id="inventoryIngredientModal"
      class="modal fade"
      ref="inventoryIngredientModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="inventoryIngredientModalLabel">
              {{ modalTitle || "No title passed" }}
            </h5>
          </div>
          <div class="modal-body">
            <!-- TODO(55): fix style to better match figma -->
            <div class="row">
              <img v-bind:src="imageUrl" class="center-block" />
            </div>
            <div class="row">Food type: {{ category }}</div>
            <div class="row">Expiration date: {{ expirationDate }}</div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="removeFromInventory"
            >
              Remove
            </button>

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
  name: "InventoryIngredientView",
  data: () => ({
    modalInstance: null,
    ingredientInfo: null,
    modalButtonText: "Edit expiration date",
  }),
  props: {
    showModal: Boolean,
    modalText: String,
    modalTitle: String,
    ingredientId: Number,
  },
  watch: {
    showModal(newValue) {
      if (newValue === true) {
        this.modalActive();
      }
    },
  },
  computed: {
    imageUrl() {
      return this.ingredientInfo == null
        ? "https://github.com/COP4331-LargeGroupProject-Fall22/web-frontend/blob/main/src/assets/food.png?raw=true"
        : this.ingredientInfo.image.srcUrl;
    },
    category() {
      return this.ingredientInfo == null ? "N/A" : this.ingredientInfo.category;
    },
    expirationDate() {
      return this.ingredientInfo == null ||
        this.ingredientInfo.expirationDate == null
        ? "N/A"
        : this.ingredientInfo.expirationDate;
    },
  },
  methods: {
    modalActive: function () {
      this.modalInstance = new Modal(
        document.getElementById("inventoryIngredientModal"),
        {
          target: "#individual-ingredient-modal",
          backdrop: "static",
        }
      );
      this.modalInstance.show();
      this.getIngredientInfo();
    },
    hideModal: function () {
      this.modalInstance.hide();
      this.$emit("closeModal");
    },
    handleEditExpirationDate: function (newDate) {
      console.log("UNIMPLEMENTED: implement edit expiration date", newDate);
      // TODO(56): Uncomment and validate below after adding datepicker to choose new date
      // this.ingredientInfo.expirationDate = newDate;
      // this.$store.dispatch("inventory/put", this.ingredientId).then(
      //   (response) => {
      //     this.ingredientInfo = response;
      //     console.log(success);
      //   },
      //   (error) => {
      //     console.log("failed to update: " + error);
      //   }
      // );
    },
    removeFromInventory: function () {
      this.$store.dispatch("inventory/delete", this.ingredientId).then(
        () => {
          this.hideModal();
        },
        (error) => {
          console.log("failed to delete: " + error);
        }
      );
    },
    getIngredientInfo: function () {
      this.$store.dispatch("inventory/get", this.ingredientId).then(
        (response) => {
          this.ingredientInfo = response.data;
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
