<template>
  <div class="container">
    <header class="jumbotron">
      <h3>This is the recipes page</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: "RecipeFeed",
  computed: {
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
