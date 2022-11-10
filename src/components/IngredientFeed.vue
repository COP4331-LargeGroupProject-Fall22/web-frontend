<template>
  <div class="container">
    <header class="jumbotron">
      <h3>This is the ingredients page</h3>
    </header>

    <!-- Example of how to use MDB rows to open the centered modal view -->
    <!-- <MDBRow center class="text-center">
      <h3>Vue Teleport Example</h3>
      <ModalView />
    </MDBRow> -->
  </div>
</template>

<script>
// import ModalView from "@/components/ModalView";
// import { MDBRow } from "mdb-vue-ui-kit";
export default {
  name: "IngredientFeed",
  components: {
    // ModalView,
    // MDBRow,
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
};
</script>
