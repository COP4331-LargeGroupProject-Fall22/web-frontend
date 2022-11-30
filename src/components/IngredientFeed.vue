<template>
  <div class="container">
    <div class="tool-bar">
      <div class="tool-bar-container">
        <div class="btn-group">
          <!-- <button
            type="button"
            class="btn btn-sortBy dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort By
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item active" href="#">Type</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Expiration Date</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">A-Z</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Z-A</a>
          </div> -->
          <!-- TODO(58): fix style of dropdown to match figma -->
          <div>
            <select v-model="selected" class="form-control sl">
              <option v-for="filter in sortByFilters" v-bind:key="filter">
                {{ filter }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <input
            id="searchIngredients"
            aria-label="Search"
            autocomplete="off"
            placeholder="Search Inventory..."
            v-model="searchString"
            type="text"
            class="form-control"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary btn-floating"
          id="addIngredient"
          @click="showCreateModal = true"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="container mt-3">
        <div class="row">
          <modal-view
            @closeModal="showCreateModal = false"
            @saveChanges="handleAddToInventory"
            :showModal="showCreateModal"
            :modalTitle="createModalTitle"
            :modalButtonText="createButtonText"
          >
            <component
              :is="add_ingredient_component"
              ref="add_ingredient_ref"
            ></component>
          </modal-view>
        </div>
      </div>
      <div class="container mt-3">
        <div class="row">
          <individual-ingredient-view
            @closeModal="
              showIndividualIngredient = false;
              this.getInventoryItems();
            "
            @saveChanges="showIndividualIngredient = false"
            :showModal="showIndividualIngredient"
            :modalTitle="individualIngredientTitle"
            :ingredientId="ingredientId"
          >
          </individual-ingredient-view>
        </div>
      </div>
    </div>
    <!-- TODO(#20) set up a scroll button -->
    <div class="row">
      <ul>
        <li
          v-for="category in filteredItems"
          :key="category"
          class="categories"
        >
          <div>
            <div class="col-md-auto">
              <a v-bind:href="'#' + category.name" class="">
                <button type="button" class="btn type-of-food">
                  {{ category.name }}
                </button>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="row">
      <ul>
        <li>
          <div v-for="category in filteredItems" :key="category">
            <div :id="category.name" class="row">
              <h3>{{ category.name }}</h3>
            </div>
            <div class="row">
              <ul>
                <div v-for="item in category.items" :key="item">
                  <div class="col-md-auto">
                    <button
                      id="individualIngredient"
                      @click="
                        showIndividualIngredient = true;
                        ingredientId = item.id;
                        individualIngredientTitle = item.name;
                      "
                      type="button"
                      class="btn food-item"
                      v-bind:style="{
                        backgroundImage:
                          'linear-gradient(to bottom,rgb(255 255 255 / 0%),rgb(0 0 0 /73%)),url(' +
                          item.image.srcUrl +
                          ')',
                      }"
                    >
                      <div class="col-md-auto text-center food-text">
                        {{ item.name }}
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
import ModalView from "@/components/ModalView.vue";
import AddIngredientView from "@/components/AddIngredientView.vue";
import IndividualIngredientView from "@/components/IndividualIngredientView.vue";

import { util } from "@/globals.js";

export default {
  name: "IngredientFeed",
  components: {
    ModalView,
    AddIngredientView,
    IndividualIngredientView,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    filteredItems() {
      let searchString = this.searchString.toLowerCase();
      if (!searchString.length) {
        return this.inventoryItems;
      }
      let filtered = {};
      for (const cat in this.inventoryItems) {
        for (const item of this.inventoryItems[cat].items) {
          if (item.name.toLowerCase().includes(searchString)) {
            if (!(cat in filtered)) {
              filtered[cat] = {
                name: cat,
                items: {},
              };
            }
            filtered[cat].items[item.name] = item;
          }
        }
      }
      return filtered;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      inventoryItems: {},
      searchString: "",
      // Add ingredient modal
      showCreateModal: false,
      createModalTitle: "Add ingredient to inventory",
      createButtonText: "Add",
      add_ingredient_component: "add-ingredient-view",
      // Individual ingredient modal
      showIndividualIngredient: false,
      individualIngredientTitle: "",
      individual_ingredient_component: "individual-ingredient-view",
      ingredientId: null,
      // Filters
      sortByFilters: ["Category", "Expiration Date", "A-Z", "Z-A"],
      selected: "Category",
    };
  },
  methods: {
    handleAddToInventory() {
      const newFoods = JSON.parse(
        JSON.stringify(this.$refs.add_ingredient_ref.ingredientsToAdd)
      );
      if (newFoods.length) {
        for (const food of newFoods) {
          // TODO(56): Open a date picker and let the user specify expiration date
          // for each item being added to inventory
          food.expirationDate = null;
          this.$store.dispatch("inventory/post", food).then(
            () => {
              this.getInventoryItems();
            },
            (error) => {
              this.message = util.getErrorString(error);
            }
          );
        }
      }
    },
    getInventoryItems(params = { sortByCategory: true }) {
      this.$store.dispatch("inventory/getAll", params).then(
        (response) => {
          // Each key in parsed is a category name
          let parsed = {};
          for (let i = 0; i < response.length; i++) {
            // Each element is 2-tuple of 1) category name, 2) data
            let categoryName = util.capitalizeFirstLetter(response[i][0]);
            parsed[categoryName] = {
              name: categoryName,
              items: response[i][1],
            };
          }
          this.inventoryItems = parsed;
        },
        (error) => {
          this.message = util.getErrorString(error);
        }
      );
    },
  },
  watch: {
    selected(newVal) {
      switch (newVal) {
        case "Category":
          this.getInventoryItems();
          break;
        case "Expiration Date":
          this.getInventoryItems({ sortByExpirationDate: true });
          break;
        case "A-Z":
          this.getInventoryItems({ sortByLexicographicalOrder: true });
          break;
        case "Z-A":
          this.getInventoryItems({
            sortByLexicographicalOrder: true,
            isReverse: true,
          });
          break;
        default:
          console.log("this should not happen. gg");
      }
    },
  },
  beforeMount() {
    this.getInventoryItems();
  },
};
</script>

<style scoped>
/* TODO(41): Extract css into separate file */
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

.type-of-food {
  width: 10vw;
  height: 5vw;
  border-radius: 15px;
  align-items: center;
  color: black;
  background-color: lightgrey;
  margin: 15px;
}

.food-text {
  text-align: left !important;
  font-size: 1rem;
  color: white;
  top: 30%;
  padding: 8% !important;
}

.type-of-food,
.food-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.food-item {
  width: 12vw;
  height: 19vw;
  border-radius: 15px;
  background-size: auto;
  background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 0%),
      rgb(0 0 0 / 73%)
    ),
    url("../assets/food.png");
  margin: 15px;
  padding: 0;
}

.col-md-auto {
  padding: 0;
  margin: 0;
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
</style>
