<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUserUsername }}</strong> Profile
      </h3>
      <h2>
        <strong>{{ currentUserFirstName }} {{ currentUserLastName }}</strong>
        (First Name, Last Name)
      </h2>
    </header>
    <img id="funny-img" src="@/assets/comebacklater.jpg" />
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentUserUsername() {
      return this.currentUser?.username;
    },
    currentUserFirstName() {
      return this.currentUser?.firstName;
    },
    currentUserLastName() {
      return this.currentUser?.lastName;
    },
    currentUserToken() {
      return this.currentUser ? this.currentUser.accessToken.token : "";
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
