<template>
  <div>
    <div
      id="myModal"
      class="modal fade"
      ref="exampleModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ modalTitle || "No title passed" }}
            </h5>
          </div>
          <div class="modal-body">{{ modalText || "No props passed yet" }}</div>
          <div class="modal-footer">
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
  }),
  props: {
    showModal: Boolean,
    modalText: String,
    modalTitle: String,
    modalButtonText: String,
  },
  watch: {
    showModal(newValue) {
      if (newValue === true) {
        this.modalActive();
      }
    },
  },
  methods: {
    modalActive: function () {
      this.modalInstance = new Modal(document.getElementById("myModal"), {
        target: "#my-modal",
        backdrop: "static",
      });
      this.modalInstance.show();
    },
    hideModal: function () {
      this.modalInstance.hide();
      this.$emit("closeModal");
    },
    saveChanges: function () {
      this.$emit("saveChanges");
      this.hideModal();
    },
  },
};
</script>

<style scoped></style>
