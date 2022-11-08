<template>
  <div class="row">
    <!-- TODO: animate the banner to move to the other side when register is pushed
    (idk if this is possible because they are on seperate pages) -->
    <div class="col-md">
      <div class="banner"></div>
    </div>
    <div class="col-md">
      <div class="card card-container">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />
        <Form @submit="handleLogin" :validation-schema="schema">
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

          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

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
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
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
  },
};
</script>

<!-- TODO: the login/register view have the exact same style section
should combine for no repetition -->

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  /* TODO: this padding has a direct influence on the size of the page
  this extends the cards height which increases the size parameters for the picture
  would like to make it the size of the page if possible*/
  padding: 70px 25%;
  height: 100%;
}

.card {
  margin: 0px;
  margin-top: 0px;
  background-color: white;
  border: 0;
  border-radius: 0;
}

.col-md{
  padding: 0;
  box-sizing:initial;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}

.row{
  margin: 0;
}

.banner{
  height: 100%;
  width: 100%;
  background-image: url("../assets/food.png");
}

.btn-primary{
  background-color: #008600;
  border-color: #008600;
}

.btn-primary:hover, .btn-primary.focus, .btn-primary:focus{
  background-color: #006600;
  border-color: #005600;
}


.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle{
  background-color: #006600;
  border-color: #005600;
}

</style>
