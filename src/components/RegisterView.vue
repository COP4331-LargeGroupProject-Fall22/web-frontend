<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card card-container">
        <!-- TODO(): Add profile pic of user here -->
        <Form @submit="handleRegister" :validation-schema="schema">
          <h2>Welcome to SmartChef!</h2>
          <div v-if="!successful">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <Field name="firstName" type="text" class="form-control" />
              <ErrorMessage name="firstName" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <Field name="lastName" type="text" class="form-control" />
              <ErrorMessage name="lastName" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <Field name="username" type="text" class="form-control" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <Field name="email" type="email" class="form-control" />
              <ErrorMessage name="email" class="error-feedback" />
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
                Sign Up
              </button>
            </div>
          </div>
        </Form>

        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
    </div>
    <!-- TODO(8): Animate the banner to move to the other side when register is pushed -->
    <div class="col-md-6">
      <div class="banner">
        <div class="d-flex justify-content-center fill">
          <div
            class="content_center my-class position-absolute top-50 start-50 translate-middle"
          >
            <h2>Already have an account?</h2>
            <router-link to="/login" class="nav-link">
              <button class="btn btn-secondary btn-block">Login</button>
            </router-link>
          </div>
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
  name: "RegisterView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        () => {
          this.successful = true;
          this.loading = false;

          var navigate = this.$router;
          this.$store
            .dispatch("auth/sendVerificationCode", { username: user.username })
            .then(() => {
              this.message =
                "Verification sent, please check your email.\nRedirecting to confirmation page...";
              // Redirect to confirmation page after 3 seconds
              setTimeout(function () {
                this.message = "";
                navigate.push("/confirm");
              }, 3 * 1000);
            });
        },
        (error) => {
          if (error.response.status === 400) {
            this.message = "Username Already Exists";
          } else {
            this.message = util.getErrorString(error);
          }
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
@import "css/LoginRegisterForm.css";
.card-container.card {
  padding: 10% 25%;
}
</style>
