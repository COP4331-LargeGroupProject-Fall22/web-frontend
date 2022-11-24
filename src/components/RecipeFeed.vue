<template>
  <div class="container">
    <div class="tool-bar">
      <div class="tool-bar-container">
        <!-- TODO(42): Add drop down for sorting, and connect to endpoint for
          sorting results -->
        <button type="button" class="btn">Sort By</button>
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <!-- TODO(38): Fix search text placeholder not showing unless field is active -->
          <input
            type="search"
            id="searchRecipes"
            class="form-control"
            placeholder="Search Recipes"
            aria-label="Search"
          />
        </div>
      </div>
    </div>
    <!-- TODO see if this can be done in a list -->
    <!-- TODO it automatically moves to a new row, 
      if we want a sidescroller we need to set up an overflow system, scroll bar or button -->
    <div class="row">
      <div class="col-md-auto">
        <button type="button" class="btn type-of-recipe">Favorite</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn type-of-recipe">Favorite</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn type-of-recipe">Favorite</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn type-of-recipe">Favorite</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn type-of-recipe">Favorite</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn type-of-recipe">Favorite</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn type-of-recipe">Favorite</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
      <div class="col-md-auto">
        <button type="button" class="btn recipe-item">Recipe</button>
      </div>
    </div>
  </div>
</template>

<script>
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
</style>
