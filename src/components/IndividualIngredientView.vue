<template>
  <div>
    <div
      id="individualIngredientModal"
      class="modal fade"
      ref="individualIngredientModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="individualIngredientModalLabel">
              {{ modalTitle || "No title passed" }}
            </h5>
          </div>
          <div class="modal-body">
            <!-- TODO(): fix style -->
            <div class="row">
              Here is the {{ ingredientId }} if one was provided.<br />
            </div>
            <div class="row">
              <div class="col-md-5">
                <img v-bind:src="imageUrl" />
              </div>
              <div class="col-md-5">
                {{ ingredientInfo }}
              </div>
            </div>
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
            <button type="button" @click="saveChanges" class="btn btn-primary">
              {{ modalButtonText || "Save changes" }}
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
  name: "GenericModal",
  data: () => ({
    modalInstance: null,
    ingredientInfo: null,
  }),
  props: {
    showModal: Boolean,
    modalText: String,
    modalTitle: String,
    modalButtonText: String,
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
  },
  methods: {
    modalActive: function () {
      this.modalInstance = new Modal(
        document.getElementById("individualIngredientModal"),
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
    saveChanges: function () {
      this.$emit("saveChanges");
      this.hideModal();
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
          console.log(response.data);
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
