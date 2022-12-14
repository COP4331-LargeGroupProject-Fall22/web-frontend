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
          <div class="modal-body">
            <!-- TODO(55): fix style to better match figma -->
            <div class="row">
              <img v-bind:src="imageUrl" class="center-block" />
            </div>
            <h4 class="modal-title" id="inventoryIngredientModalLabel">
              {{ modalTitle || "No title passed" }}
            </h4>
            <div class="row ingredient-details">Food type: {{ category }}</div>
            <div class="row ingredient-details">
              Expiration date: {{ expirationDate }}
            </div>
            <Datepicker
              v-model="expirationDateSelection"
              :enable-time-picker="false"
            />
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
              :disabled="expirationDateSelection == null"
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
    modalButtonText: "Set new expiration date",
    expirationDateSelection: null,
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
      if (
        this.ingredientInfo == null ||
        this.ingredientInfo.expirationDate == null ||
        this.ingredientInfo.expirationDate === 0
      ) {
        return "N/A";
      }
      var date = new Date(this.ingredientInfo.expirationDate * 1000);
      return date.toLocaleDateString();
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
    handleEditExpirationDate: function () {
      let expInSeconds = Math.round(
        this.expirationDateSelection.getTime() / 1000
      );
      this.ingredientInfo.expirationDate = expInSeconds;

      this.$store
        .dispatch("inventory/put", {
          id: this.ingredientId,
          exp: this.ingredientInfo.expirationDate,
        })
        .then(
          () => {
            this.expirationDateSelection = null;
          },
          (error) => {
            console.log("failed to update: " + error);
          }
        );
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

<style scoped>
.modal-body {
  padding: 0;
}

img {
  width: 100%;
  height: 45vh;
  object-fit: contain;
  border-radius: 0.3rem;
}

.modal-title {
  padding: 15px;
}

.ingredient-details {
  padding-left: 15px;
}
</style>
