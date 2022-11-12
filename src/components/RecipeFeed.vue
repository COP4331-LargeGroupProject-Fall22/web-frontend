<template>
  <div class="container">
    <div class="tool-bar">
      <div class="tool-bar-container">
        <button type="button" class="btn">Sort By</button>
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <input
            type="search"
            id="form1"
            class="form-control"
            placeholder="Search Recipes"
            aria-label="Search"
          />
        </div>
      </div>
    </div>
    <!-- TODO it automatically moves to a new row, 
      if we want a sidescroller we need to set up an overflow system, scroll bar or button -->
    <div class="row">
      <li v-for="favrecipe in favrecipes" v-bind:key="favrecipe.id">
        <div class="col-md-auto">
          <button type="button" class="btn fav-recipe">
            {{ favrecipe.favRecipeName }}
          </button>
        </div>
      </li>
    </div>
    <div class="row">
      <li v-for="recipe in recipes" v-bind:key="recipe.id">
        <div class="col-md-auto">
          <button type="button" class="btn recipe-item">
            {{ recipe.recipeName }}
          </button>
        </div>
      </li>
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
  setup() {
    const favrecipes = ref([
      {
        favRecipeName: "Fav1",
      },
      {
        favRecipeName: "Fav2",
      },
      {
        favRecipeName: "Fav3",
      },
      {
        favRecipeName: "Fav4",
      },
      {
        favRecipeName: "Fav5",
      },
    ]);
    const recipes = ref([
      {
        recipeName: "Recipe1",
      },
      {
        recipeName: "Recipe2",
      },
      {
        recipeName: "Recipe3",
      },
      {
        recipeName: "Recipe4",
      },
      {
        recipeName: "Recipe5",
      },
      {
        recipeName: "Recipe6",
      },
      {
        recipeName: "Recipe7",
      },
      {
        recipeName: "Recipe8",
      },
      {
        recipeName: "Recipe9",
      },
      {
        recipeName: "Recipe10",
      },
      {
        recipeName: "Recipe11",
      },
      {
        recipeName: "Recipe12",
      },
      {
        recipeName: "Recipe13",
      },
      {
        recipeName: "Recipe14",
      },
      {
        recipeName: "Recipe15",
      },
      {
        recipeName: "Recipe16",
      },
      {
        recipeName: "Recipe17",
      },
    ]);
    return {
      favrecipes,
      recipes,
    };
  },
};
</script>

<style scoped>
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

.fav-recipe {
  width: 100px;
  height: 100px;
  border-radius: 15px;
  text-align: center;
  line-height: 150px;
  background-color: lightgrey;
  margin: 15px;
}

.recipe-item {
  width: 150px;
  height: 200px;
  border-radius: 15px;
  text-align: left;
  line-height: 300px;
  font-size: 2rem;
  color: white;
  background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 0%),
      rgb(0 0 0 / 73%)
    ),
    url("../assets/food.png");
  margin: 15px;
}

.col-md-auto {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}
</style>
