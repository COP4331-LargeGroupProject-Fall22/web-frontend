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
                <a href="/register">register</a> or <a href="/login">login</a>.
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 no-float">
        <div class="card card-container">
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <div v-if="showSubmit">
            <Form @submit="handleSubmit" :validation-schema="verifySchema">
              <div class="form-group">
                <label for="username">Username</label>
                <Field name="username" type="text" class="form-control" />
                <ErrorMessage name="username" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="verificationCode">Verification code</label>
                <Field
                  name="verificationCode"
                  type="verificationCode"
                  class="form-control"
                />
                <ErrorMessage name="verificationCode" class="error-feedback" />
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
      verificationCode: yup
        .string()
        .required("Verification code is required!")
        .min(6, "Must be exactly 6 characters!")
        .max(6, "Must be exactly 6 characters!"),
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
          this.successMessage = "Verification succeeded! Please log in.";
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    handleResend(user) {
      console.log(user);
      this.$store.dispatch("auth/sendVerificationCode", user).then(
        () => {
          this.message = "Verification sent, please check your email";
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
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
</style>
