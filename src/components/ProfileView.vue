<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUserUsername}}</strong> Profile
      </h3>
      <h2>
        <strong>{{currentUserFirstName}} {{currentUserLastName}}</strong> (First Name, Last Name)
      </h2>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUserToken.substring(0, 20)}} ... {{currentUserToken.substr(currentUserToken.length - 20)}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  computed: {
    // TODO(nashirj): Fix this rendering; doesn't load until page is refreshed
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentUserUsername() {
      const user = this.currentUser;
      return user === (undefined || null) ? "???" : user.username;
    },
    currentUserFirstName() {
      const user = this.currentUser;
      return user === (undefined || null) ? "???" : user.firstName;
    },
    currentUserLastName() {
      const user = this.currentUser;
      return user === (undefined || null) ? "???" : user.lastName;
    },
    currentUserToken() {
      const user = this.currentUser;
      return user === (undefined || null) ? "???" : user.accessToken;
    }
  },
  mounted() {
    console.log("loading mounted");
    if (!this.currentUser) {
      console.log("no one logged in");
      this.$router.push('/login');
    } else {
      console.log(this.currentUserUsername + " is logged in");
    }
  }
};
</script>
