<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/home" id="logoNavBar">
        <img id="logo-img" src="@/assets/smart-chef-logo1.png" class="logo" />
      </a>
      <a href="/home" class="navbar-brand">Smart Chef</a>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/forgot" class="nav-link">
            <i class="fas fa-question"></i> Forgot password
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/confirm" class="nav-link">
            <font-awesome-icon icon="check" /> Confirm email
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Log Out
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.bg-dark {
  z-index: 1;
  background-color: #ffffff !important;
  box-shadow: 0px 0px 10px 0px grey;
  padding: 0;
}
.container {
  padding: 0;
  margin: 0;
  max-width: inherit;
}

.navbar-dark .navbar-brand {
  padding: 0.5rem 0.5rem;
  font-size: 1.75rem;
  color: #008600;
}
.navbar-dark .navbar-nav .nav-link {
  color: #008600;
}

.nav-link:hover,
.nav-link:focus,
.nav-link:active {
  color: black;
}

.navbar-dark .navbar-brand:focus,
.navbar-dark .navbar-brand:hover {
  color: #008600;
}

*,
::after,
::before {
  box-sizing: inherit;
}

.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: black;
}

.logo {
  height: 50px;
  width: 30px;
  margin-left: 15px;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
