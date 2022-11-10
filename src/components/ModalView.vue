<template>
  <div @click="handleBackdropClick">
    <button @click="open = true">Open Modal</button>

    <!-- Wrapper for modal -->
    <div v-if="open" id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <button @click="open = false" class="close">
          <font-awesome-icon icon="times" />
        </button>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    handleBackdropClick(e) {
      if (e.target.className == "modal") {
        this.open = false;
      }
    },
  },
};
</script>

<style scoped>
button {
  width: 10%;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
