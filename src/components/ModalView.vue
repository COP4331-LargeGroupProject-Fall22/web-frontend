<template>
  <div>
    <div
      id="templateModal"
      class="modal fade"
      ref="templateModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="templateModalLabel">
              {{ modalTitle || "No title passed" }}
            </h5>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
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
      // TODO(6): I think modifying this to take an id would allow multiple
      // instances, explore later if time
      this.modalInstance = new Modal(document.getElementById("templateModal"), {
        target: "#template-modal",
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
.btn-secondary {
  width: fit-content;
  box-shadow: none;
}
.btn-primary {
  width: fit-content;
  box-shadow: none;
}
</style>
