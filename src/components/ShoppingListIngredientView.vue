<template>
  <div>
    <div
      id="shoppingListIngredientModal"
      class="modal fade"
      ref="shoppingListIngredientModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="shoppingListIngredientModalLabel">
              {{ modalTitle || "No title passed" }}
            </h5>
          </div>
          <div class="modal-body">
            <!-- TODO(): fix style to better match figma. show more info about
           item, price, date added, etc. -->
            <div class="row">
              <img v-bind:src="imageUrl" class="center-block" />
            </div>
            <div class="row">Food type: {{ category }}</div>
            <div class="row">Quantity: {{ quantity }}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">
              Close
            </button>
            <!-- TODO(): Allow the user to edit quantity -->
            <button
              type="button"
              @click="handleEditQuantity"
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
  name: "shoppingListIngredientView",
  data: () => ({
    modalInstance: null,
    ingredientInfo: null,
    modalButtonText: "Edit quantity",
  }),
  props: {
    showModal: Boolean,
    modalText: String,
    modalTitle: String,
    ingredientId: String,
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
    quantity() {
      return this.ingredientInfo == null ||
        this.ingredientInfo.quantity == null ||
        this.ingredientInfo.quantity.value == null ||
        this.ingredientInfo.quantity.units == null
        ? "N/A"
        : this.ingredientInfo.quantity.value +
            this.ingredientInfo.quantity.units;
    },
  },
  methods: {
    modalActive: function () {
      this.modalInstance = new Modal(
        document.getElementById("shoppingListIngredientModal"),
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
    handleEditQuantity: function (newQuantity) {
      console.log("UNIMPLEMENTED: implement edit quantity", newQuantity);
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
    getIngredientInfo: function () {
      this.$store.dispatch("shoppinglist/get", this.ingredientId).then(
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
