<template>
  <div class="container">
    <header class="jumbotron">
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
  mounted() {
    console.log("loading mounted");
    if (!this.currentUser) {
      console.log("no one logged in");
      this.$router.push('/login');
    } else {
      console.log(this.$store.state.auth.user + " is logged in");
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