<template>
  <div class="container">
    <header class="jumbotron">
      <h3>This is the ingredients page</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: "IngredientFeed",
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
