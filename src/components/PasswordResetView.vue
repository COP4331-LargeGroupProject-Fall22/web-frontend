<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 no-float">
        <div class="card card-container">
          <h2>You're almost there, just confirm your password!</h2>
          <div v-if="showConfirm">
            <Form @submit="handleSubmit" :validation-schema="verifySchema">
              <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" type="text" class="form-control" />
                <ErrorMessage name="email" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="password">New password</label>
                <Field name="password" type="password" class="form-control" />
                <ErrorMessage name="password" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="code">Verification code</label>
                <Field name="code" type="code" class="form-control" />
                <ErrorMessage name="code" class="error-feedback" />
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Update password</span>
                </button>
              </div>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </div>
            </Form>
            <button
              class="btn btn-secondary btn-block"
              @click="
                showConfirm = false;
                this.message = '';
              "
              :disabled="loading"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Send code?</span>
            </button>
          </div>
          <div v-else>
            <Form @submit="handleResend" :validation-schema="resendSchema">
              <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" type="text" class="form-control" />
                <ErrorMessage name="email" class="error-feedback" />
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Send code</span>
                </button>
              </div>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                  <!-- TODO(34): style this to make it look better if not error -->
                </div>
              </div>
            </Form>
            <button
              class="btn btn-secondary btn-block"
              @click="
                showConfirm = true;
                this.message = '';
              "
              :disabled="loading"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Verify code?</span>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6 no-float">
        <div class="banner">
          <div class="d-flex justify-content-center fill">
            <div
              class="content_center my-class position-absolute top-50 start-50 translate-middle"
            >
              <h2>
                If you requested a password reset, please check your email for a
                verification code. If you didn't mean to reset your password,
                try <a href="/register">registering</a> or
                <a href="/login">logging in</a>.
              </h2>
            </div>
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
  name: "PasswordResetView",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push("/home");
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const verifySchema = yup.object().shape({
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
      code: yup
        .number()
        .required("Verification code is required!")
        .typeError("Verification code must be a number!")
        .integer("Verification code must be an integer!"),
    });

    const resendSchema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
    });

    return {
      loading: false,
      message: "",
      verifySchema,
      resendSchema,
      showConfirm: true,
    };
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleResend(email) {
      this.message = "";
      this.loading = true;

      this.$store.dispatch("auth/requestPasswordReset", email).then(
        () => {
          this.loading = false;
          this.message = "Verification code resent! Please check your email.";
        },
        (error) => {
          this.loading = false;
          this.message = util.getErrorString(error);
        }
      );
    },
    handleSubmit(params) {
      this.loading = true;

      var navigate = this.$router;
      this.$store.dispatch("auth/confirmNewPassword", params).then(
        () => {
          this.loading = false;
          this.message = "Success, redirecting to login screen...";
          setTimeout(function () {
            navigate.push("/login");
          }, 3 * 1000);
        },
        (error) => {
          this.loading = false;
          this.message = util.getErrorString(error);
        }
      );
    },
  },
};
</script>

<style scoped>
@import "css/LoginRegisterForm.css";

a,
a:hover {
  color: aqua;
}

.card-container.card {
  padding: 25% 25%;
}
</style>
