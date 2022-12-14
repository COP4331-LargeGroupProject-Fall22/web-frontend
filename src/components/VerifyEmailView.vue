<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 no-float">
        <div class="banner">
          <div class="d-flex justify-content-center fill">
            <div
              class="content_center my-class position-absolute top-50 start-50 translate-middle"
            >
              <h2>
                If your account is not verified, please check your email for a
                verification code. Otherwise please
                <a href="/register">register</a>, <a href="/login">login</a>, or
                <a href="/forgot">reset your password</a>.
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 no-float">
        <div class="card card-container">
          <h2>You're almost there, just verify your email!</h2>
          <div v-if="showSubmit">
            <Form @submit="handleSubmit" :validation-schema="verifySchema">
              <div class="form-group">
                <label for="username">Username</label>
                <Field name="username" type="text" class="form-control" />
                <ErrorMessage name="username" class="error-feedback" />
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
                  <span>Verify code</span>
                </button>
              </div>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
                <!-- TODO(34): style this to make it look better/not error -->
                <div
                  v-if="successMessage"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ successMessage }}
                </div>
              </div>
            </Form>
            <button
              class="btn btn-secondary btn-block"
              @click="showSubmit = false"
              :disabled="loading"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Resend code?</span>
            </button>
          </div>

          <div v-if="!showSubmit">
            <Form @submit="handleResend" :validation-schema="resendSchema">
              <div class="form-group">
                <label for="username">Username</label>
                <Field name="username" type="text" class="form-control" />
                <ErrorMessage name="username" class="error-feedback" />
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Resend code</span>
                </button>
              </div>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
                <!-- TODO(34): style this to make it look better/not error -->
                <div
                  v-if="successMessage"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ successMessage }}
                </div>
              </div>
            </Form>
            <button
              class="btn btn-secondary btn-block"
              @click="toggleForm"
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
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { util } from "@/globals.js";

export default {
  name: "VerifyEmailView",
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
      username: yup.string().required("Username is required!"),
      code: yup
        .number()
        .required("Verification code is required!")
        .typeError("Verification code must be a number!")
        .integer("Verification code must be an integer!"),
    });

    const resendSchema = yup.object().shape({
      username: yup.string().required("Username is required!"),
    });

    return {
      loading: false,
      message: "",
      successMessage: "",
      verifySchema,
      resendSchema,
      showSubmit: true,
    };
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleSubmit(user) {
      this.loading = true;

      this.$store.dispatch("auth/confirmVerificationCode", user).then(
        () => {
          this.loading = false;
          this.successMessage = "Verification succeeded! Please log in.";
        },
        (error) => {
          this.loading = false;
          this.message = util.getErrorString(error);
        }
      );
    },
    handleResend(user) {
      this.$store.dispatch("auth/sendVerificationCode", user).then(
        () => {
          this.message = "Verification sent, please check your email";
        },
        (error) => {
          this.message = util.getErrorString(error);
        }
      );
    },
    toggleForm() {
      this.showSubmit = !this.showSubmit;
      this.message = "";
      this.successMessage = "";
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
