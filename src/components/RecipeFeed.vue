<template>
  <div class="container">
    <div class="tool-bar">
      <div class="tool-bar-container">
        <!-- TODO(43): Connect to endpoint for sorting results -->
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-sortBy dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ selected }}
          </button>
          <div class="dropdown-menu">
            <ul v-for="filter in sortByFilters" v-bind:key="filter">
              <div class="options">
                <div v-if="filter == selected">
                  <a @click="selected = filter" class="dropdown-item active">
                    {{ filter }}
                  </a>
                </div>
                <div v-else>
                  <a @click="selected = filter" class="dropdown-item">
                    {{ filter }}
                  </a>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <input
            id="searchRecipes"
            aria-label="Search"
            autocomplete="off"
            placeholder="Search Recipes..."
            v-model="searchString"
            type="text"
            class="form-control"
          />
        </div>
        <!-- TODO(59): Add a button for search -->
      </div>
    </div>
    <!-- TODO(20) set up a scroll button -->
    <div class="row">
      <ul>
        <li v-for="list in data" :key="list" class="categories">
          <div v-for="(types, name) in list" :key="name">
            <div class="col-md-auto">
              <a v-bind:href="'#' + name" class="">
                <button type="button" class="btn type-of-recipe">
                  {{ name }}
                </button>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="row">
      <ul>
        <li v-for="list in data" :key="list">
          <div v-for="(types, name) in list" :key="name">
            <div :id="name" class="row">
              <h3>{{ name }}</h3>
            </div>
            <div class="row">
              <ul>
                <div v-for="(recipe, name) in types" :key="name">
                  <div class="col-md-auto">
                    <!-- IF EXPIRED and has Allergin -->
                    <div
                      v-if="
                        expiration(recipe.expirationDate) == 'expired' &&
                        recipe.hasAllergin == 'true'
                      "
                      class="both-allergin-expired-layout"
                    >
                      <div class="hasAllergin-and-expiration">
                        <button type="button" class="btn recipe-item">
                          <div class="col-md-auto text-center recipe-text">
                            {{ name }}
                          </div>
                        </button>
                        <h5 class="allergin-notif">Allergin</h5>
                      </div>
                      <h5 class="expiration-notif">Expired</h5>
                    </div>

                    <!-- IF EXPIRING SOON and has Allergin -->
                    <div
                      v-else-if="
                        expiration(recipe.expirationDate) == 'expires soon' &&
                        recipe.hasAllergin == 'true'
                      "
                      class="both-allergin-expiringsoon-layout"
                    >
                      <div class="hasAllergin-and-expiration">
                        <button type="button" class="btn recipe-item">
                          <div class="col-md-auto text-center recipe-text">
                            {{ name }}
                          </div>
                        </button>
                        <h5 class="allergin-notif">Allergin</h5>
                      </div>
                      <h5 class="expiration-notif">Expiring Soon</h5>
                    </div>

                    <!-- IF EXPIRED -->
                    <div
                      v-else-if="
                        expiration(recipe.expirationDate) == 'expired' &&
                        recipe.hasAllergin == 'false'
                      "
                      class="isExpired"
                    >
                      <button type="button" class="btn recipe-item">
                        <div class="col-md-auto text-center recipe-text">
                          {{ name }}
                        </div>
                      </button>
                      <h5 class="expiration-notif">Expiried</h5>
                    </div>
                    <!-- IF HAS ALLERGIN -->
                    <div
                      v-else-if="
                        expiration(recipe.expirationDate) == '' &&
                        recipe.hasAllergin == 'true'
                      "
                      class="hasAllergin"
                    >
                      <button type="button" class="btn recipe-item">
                        <div class="col-md-auto text-center recipe-text">
                          {{ name }}
                        </div>
                      </button>
                      <h5 class="allergin-notif">Allergin</h5>
                    </div>

                    <!-- If Expires Soon -->
                    <div
                      v-else-if="
                        expiration(recipe.expirationDate) == 'expires soon' &&
                        recipe.hasAllergin == 'false'
                      "
                      class="isExpiring"
                    >
                      <button type="button" class="btn recipe-item">
                        <div class="col-md-auto text-center recipe-text">
                          {{ name }}
                        </div>
                      </button>
                      <h5 class="expiration-notif">Expiring Soon</h5>
                    </div>

                    <button v-else type="button" class="btn recipe-item normal">
                      <div class="col-md-auto text-center recipe-text">
                        {{ name }}
                      </div>
                    </button>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "RecipeFeed",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    expiration(expirationDate) {
      const expireDate = new Date(expirationDate);
      const today = new Date();
      if (expireDate != "Invalid Date") {
        // console.log(expireDate);
        // console.log(today);
        // const formatedexpireDate = `${
        //   expireDate.getMonth() + 1
        // }/${expireDate.getDate()}/${expireDate.getFullYear()}`;

        // const formatedtoday = `${
        //   today.getMonth() + 1
        // }/${today.getDate()}/${today.getFullYear()}`;
        // console.log(formatedexpireDate);
        // console.log(formatedtoday);
        // console.log("-------------------");

        if (expireDate.getTime() < today.getTime()) {
          console.log(expireDate.getTime());
          console.log(today.getTime());
          console.log(expireDate - today);
          return "expired";
        } else if ((expireDate - today) / 86400000 <= 10) {
          console.log(expireDate.getTime());
          console.log(today.getTime());
          console.log(expireDate - today);
          return "expires soon";
        }
      } else {
        console.log("No Expiration Date");
      }

      return "";
    },
  },
  data() {
    const data = ref([
      {
        Category1: {
          Recipe1: {
            recipeName: "Recipe1",
            recipeType: "Category1",
            expirationDate: "12/12/2022",
            hasAllergin: "false",
          },
          RecipeNameVeryLong: {
            recipeName: "RecipeNameVeryLong",
            recipeType: "Category1",
            expirationDate: "12/5/2022",
            hasAllergin: "false",
          },
          Recipe3: {
            recipeName: "Recipe3",
            recipeType: "Category1",
            expirationDate: "12/30/2022",
            hasAllergin: "false",
          },
          Recipe4: {
            recipeName: "Recipe4",
            recipeType: "Category1",
            expirationDate: "12/5/2022",
            hasAllergin: "true",
          },
          Recipe5: {
            recipeName: "Recipe5",
            recipeType: "Category1",
            expirationDate: "12/10/2022",
            hasAllergin: "true",
          },
          Recipe6: {
            recipeName: "Recipe6",
            recipeType: "Category1",
          },
          Recipe7: {
            recipeName: "Recipe7",
            recipeType: "Category1",
          },
        },

        Category2: {
          Recipe1: {
            recipeName: "Recipe1",
            recipeType: "Category2",
          },
          Recipe2: {
            recipeName: "Recipe2",
            recipeType: "Category2",
          },
          Recipe3: {
            recipeName: "Recipe3",
            recipeType: "Category3",
          },
          Recipe4: {
            recipeName: "Recipe4",
            recipeType: "Category4",
          },
          Recipe5: {
            recipeName: "Recipe5",
            recipeType: "Category5",
          },
        },
      },
    ]);
    return {
      data,
      searchString: "",
      sortByFilters: [
        "Ingredient Expiration Date",
        "Time To Cook",
        "A-Z",
        "Z-A",
      ],
      selected: "Ingredient Expiration Date",
    };
  },
};
</script>

<style scoped>
/* TODO(41): If the styles for this and ingredient are identical, make them share
css. If not, just extract this into a separate css file */
.container {
  padding: 0 !important;
  margin: 0 !important;
  background-color: #f9f9f9;
  max-width: 100%;
}

.btn {
  background-color: white;
  border-radius: 100px;
  box-shadow: 0px 3px 3px #bdbdbd;
}

.tool-bar {
  margin: 0 !important;
  flex-wrap: wrap;
  height: fit-content;
  display: flex;
  justify-content: space-between;
}

.form-outline {
  padding-right: 20px;
}
.form-control {
  border: none;
  border-radius: 100px !important;
  box-shadow: 0px 3px 3px #bdbdbd;
  display: inline-block;
}

.tool-bar-container {
  display: flex;
  padding: 20px;
}

.btn-floating {
  border-radius: 50%;
  height: fit-content;
  align-self: center;
}

.type-of-recipe {
  width: 10vw;
  height: 5vw;
  border-radius: 15px;
  align-items: center;
  color: black;
  background-color: lightgrey;
  margin: 15px;
}

.recipe-text {
  text-align: left !important;
  font-size: 1rem;
  color: white;
  top: 30%;
  padding: 8% !important;
}

.type-of-recipe,
.recipe-text,
.expiration-notif {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recipe-item {
  width: 12vw;
  height: 19vw;
  border-radius: 15px;
  /* TODO(40): Update this to display the image from the ingredient in inventory */
  background-size: auto;
  background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 0%),
      rgb(0 0 0 / 73%)
    ),
    url("../assets/food.png");
  padding: 0;
}

.normal {
  margin: 15px;
}

.col-md-auto {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

.categories {
  list-style: none;
  display: flex;
}

ul {
  margin: 0;
  display: flex;
  max-width: 80vw;
  padding: 0;
  overflow: auto;
  overflow-y: hidden;
}

h3 {
  padding-left: 15px;
  padding-top: 15px;
}

.dropdown-menu {
  display: none;
}

.btn-sortBy {
  color: black !important;
  background-color: white !important;
  border: none;
}

.btn-sortBy:hover,
.btn-sortBy:active,
.btn-sortBy:focus {
  color: white !important;
  background-color: #008600 !important;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #008600;
}

.options {
  user-select: none;
  cursor: pointer;
  width: 100%;
}

.isExpired,
.isExpiring,
.hasAllergin,
.both-allergin-expired-layout,
.hasAllergin-and-expiration,
.both-allergin-expiringsoon-layout {
  width: 12vw;
  border-radius: 15px;
  padding: 0;
}

.isExpired,
.isExpiring,
.hasAllergin,
.both-allergin-expired-layout,
.both-allergin-expiringsoon-layout {
  margin: 15px;
}

.isExpired,
.both-allergin-expired-layout {
  background-color: red;
}

.isExpiring,
.both-allergin-expiringsoon-layout {
  background-color: rgb(255 0 0 / 47%);
}

.hasAllergin,
.hasAllergin-and-expiration {
  background-color: purple;
}

.expiration-notif,
.allergin-notif {
  color: white;
  text-align: center;
  padding: 10px;
  margin-bottom: 0;
}
</style>
