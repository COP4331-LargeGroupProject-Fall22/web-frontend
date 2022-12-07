<template>
  <div class="container">
    <div class="row">
      <!-- TODO(#8): Animate the banner to move to the other side when register is pushed -->
      <div class="col-md-6 no-float">
        <div class="banner">
          <div class="d-flex justify-content-center fill">
            <div
              class="content_center my-class position-absolute top-50 start-50 translate-middle"
            >
              <h2>Don't have an account?</h2>
              <router-link to="/register" class="nav-link">
                <button class="btn btn-secondary btn-block">Register</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 no-float">
        <div class="card card-container">
          <!-- TODO(): Add profile pic of user here -->
          <Form @submit="handleLogin" :validation-schema="schema">
            <h2>Welcome back to SmartChef!</h2>
            <div class="form-group">
              <label for="username">Username</label>
              <Field name="username" type="text" class="form-control" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <Field name="password" type="password" class="form-control" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Login</span>
              </button>
            </div>
            <!-- TODO(): add a forgo password button that relinks to forgot pass
           view -->
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </Form>

          <!-- TODO(): fix style -->
          <router-link to="/forgot" class="btn btn-secondary btn-block">
            <button class="btn btn-secondary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Forgot password?</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { util } from "@/globals.js";

export default {
  name: "LoginView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.message = "";
          this.$router.push("/home");
        },
        (error) => {
          // 403 indicates that username exists, but they haven't verified their email
          if (error.response.status === 403) {
            this.$router.push("/confirm");
          }
          this.loading = false;
          if (error.response.status === 400) {
            this.message = "Incorrect Request Format";
          } else if (error.response.status === 401) {
            this.message = "User Credentials Invalid";
          } else if (error.response.status === 404) {
            this.message = "User Not Found";
          } else {
            this.message = util.getErrorString(error);
          }
        }
      );
    },
  },
};
</script>

<style scoped>
@import "css/LoginRegisterForm.css";

.card-container.card {
  padding: 25% 25%;
}
</style>
