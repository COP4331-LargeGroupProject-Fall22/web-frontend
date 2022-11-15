<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <modal-view
          @closeModal="showCreateModal = false"
          @saveChanges="handleAddToInventory"
          :showModal="showCreateModal"
          :modalText="createModalForm"
          :modalTitle="createModalTitle"
          :modalButtonText="createButtonText"
        ></modal-view>
      </div>
      <div class="row border-bottom mb-4">
        <div class="col-md-8 mb-4">
          <input
            autocomplete="off"
            placeholder="Search for ingredient in inventory..."
            v-model="searchString"
            type="text"
            id="test"
            class="form-control"
          />
        </div>
        <div class="col-md-3 text-center mb-4">
          <label for="test" class="label-form">Add ingredient</label>
        </div>
        <div class="col-md-1 text-center mb-4">
          <button
            id="addIngredient"
            @click="showCreateModal = true"
            class="btn btn-primary"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalView from "../components/ModalView.vue";
export default {
  name: "IngredientFeed",
  components: {
    ModalView,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      searchString: "",
      showCreateModal: false,
      createModalForm:
        "A form/interactive component for adding ingredient; later update this to pass a prop instead",
      createModalTitle: "Add ingredient to inventory",
      createButtonText: "Add",
    };
  },
  watch: {
    searchString(newVal) {
      // TODO(ADD NUM HERE): Update this to filter inventory results when this value changes to only match ingredients with this as substring
      console.log("new searchString: ", newVal);
    },
  },
  methods: {
    handleAddToInventory() {
      // TODO(ADD NUM HERE): Create service for adding ingredient to inventory
      console.log(
        "Add ingredient button pressed; update this method to actually add ingredient to inventory"
      );
    },
  },
};
</script>

<style scoped></style>
