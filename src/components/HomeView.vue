<template>
  <div class="container">
    <header class="jumbotron">
      On home page; we'll nest everything in here, like the recipe, ingredient
      and shopping list feed; we'll display the corresponding component based on
      which tab bar item is selected. So instead of navigating to different page
      when we click on button for a route, we'll just show and hide diff stuff.
      For initial development, we can use this route structure where we have a
      separate "page" for each of the options
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
// import UserService from "../services/user.service";
export default {
  name: "HomeView",
  data() {
    return {
      content: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
    // UserService.getPublicContent().then(
    //   (response) => {
    //     this.content = response.data;
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
};
</script>
