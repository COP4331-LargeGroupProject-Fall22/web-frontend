<template>
  <div class="container">
    <header class="jumbotron">
      <h3>This is the shopping list page</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: "ShoppingListFeed",
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
