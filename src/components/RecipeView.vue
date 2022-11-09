<template>
  <div class="container">
    <header class="jumbotron">
      <h3>This is the individual recipe page for recipe: {{ recipeID }}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: "RecipeView",
  computed: {
    recipeID() {
      return this.$route.params.id;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      console.log("Current user: " + JSON.stringify(this.currentUser));
    }
  },
};
</script>
