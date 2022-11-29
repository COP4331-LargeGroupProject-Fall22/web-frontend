<template>
  <div class="container">
    <div class="tool-bar">
      <div class="tool-bar-container">
        <!-- TODO(43): Connect to endpoint for sorting results -->
        <!-- <div class="btn-group"> -->
        <button
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
          <a class="dropdown-item" href="#">Added First</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Added Last</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">A-Z</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Z-A</a>
        </div>
        <!-- </div> -->
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <!-- TODO(38): Fix search text placeholder not showing unless field is active -->
          <input
            id="searchShopping"
            aria-label="Search"
            autocomplete="off"
            placeholder="Search Shopping List..."
            v-model="searchString"
            type="text"
            class="form-control"
          />
        </div>
        <!-- TODO(19) replace with an actual material icon -->
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
            @saveChanges="handleAddToShoppingList"
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
    </div>
    <div class="row">
      <ul>
        <li v-for="list in data" :key="list">
          <div v-for="(types, name) in list" :key="name">
            <div :id="name" class="row">
              <h3>{{ name }}</h3>
            </div>
            <div v-for="(food, name) in types" :key="name">
              <div class="btn-group">
                <button type="button" class="btn shopping-item">
                  <div class="shopping-item-pic"></div>
                  <div class="shopping-text">
                    {{ name }}
                  </div>
                  <br />
                  <div class="amount-needed">Needed: __</div>
                </button>
                <button type="button" class="btn cancel dropdown-toggle-split">
                  <i class="fas fa-times"></i>
                </button>
                <button type="button" class="btn confirm dropdown-toggle-split">
                  <i class="fas fa-check"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ModalView from "@/components/ModalView.vue";
import AddIngredientView from "@/components/AddIngredientView.vue";

export default {
  name: "IngredientFeed",
  components: {
    ModalView,
    AddIngredientView,
  },
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
  data() {
    const data = ref([
      {
        Dairy: {
          Dairy1: {
            foodName: "Dairy1",
            foodType: "Dairy",
            expirationDate: "1/15/2023",
          },
          Dairy2: {
            foodName: "Dairy2",
            foodType: "Dairy",
            expirationDate: "10/19/2022",
          },

          Dairy3: {
            foodName: "Dairy3",
            foodType: "Dairy",
            expirationDate: "2/11/2023",
          },
          Dairy4: {
            foodName: "Dairy4",
            foodType: "Dairy",
            expirationDate: "1/20/2023",
          },
          Dairy5: {
            foodName: "Dairy5",
            foodType: "Dairy",
            expirationDate: "1/20/2023",
          },
          Dairy6: {
            foodName: "Dairy6",
            foodType: "Dairy",
            expirationDate: "1/20/2023",
          },
        },

        Produce: {
          Produce1: {
            foodName: "Produce1",
            foodType: "Produce",
            expirationDate: "1/20/2023",
          },
          Produce2: {
            foodName: "Produce2",
            foodType: "Produce",
            expirationDate: "1/20/2023",
          },
          Produce3: {
            foodName: "Produce3",
            foodType: "Produce",
            expirationDate: "1/20/2023",
          },
          Produce4: {
            foodName: "Produce4",
            foodType: "Produce",
            expirationDate: "1/20/2023",
          },
          Produce5: {
            foodName: "Produce5",
            foodType: "Produce",
            expirationDate: "1/20/2023",
          },
          Produce6: {
            foodName: "Produce6",
            foodType: "Produce",
            expirationDate: "1/20/2023",
          },
          Produce7: {
            foodName: "Produce7",
            foodType: "Produce",
            expirationDate: "1/20/2023",
          },
          Produce8: {
            foodName: "Produce8",
            foodType: "Produce",
            expirationDate: "1/20/2023",
          },
        },
        Vegetable: {
          Vegetable1: {
            foodName: "Vegetable1",
            foodType: "Vegetable",
            expirationDate: "11/19/2022",
          },
          Vegetable2: {
            foodName: "Vegetable2",
            foodType: "Vegetable",
            expirationDate: "11/19/2022",
          },
          Vegetable3: {
            foodName: "Vegetable3",
            foodType: "Vegetable",
            expirationDate: "11/19/2022",
          },
        },
        Fruits: {
          Fruits1: {
            foodName: "Fruits1",
            foodType: "Fruits",
            expirationDate: "11/19/2022",
          },
          Fruits2: {
            foodName: "Fruits2",
            foodType: "Fruits",
            expirationDate: "11/19/2022",
          },
          Fruits3: {
            foodName: "Fruits3",
            foodType: "Fruits",
            expirationDate: "11/19/2022",
          },
          Fruits4: {
            foodName: "Fruits4",
            foodType: "Fruits",
            expirationDate: "11/19/2022",
          },
        },
      },
    ]);
    return {
      data,
      searchString: "",
      showCreateModal: false,
      createModalTitle: "Add ingredient to shopping list",
      createButtonText: "Add",
      add_ingredient_component: "add-ingredient-view",
    };
  },
  watch: {
    searchString(newVal) {
      // TODO(27): Update this to filter shopping list results when this value
      // changes to only match ingredients with this as substring
      console.log("new searchString: ", newVal);
    },
  },
  methods: {
    handleAddToShoppingList() {
      const data = JSON.parse(
        JSON.stringify(this.$refs.add_ingredient_ref.ingredientsToAdd)
      );
      if (data.length) {
        // TODO(50): Create service for adding ingredient to shopping list
        console.log("UNIMPLEMENTED: Adding ingredients to shopping list", data);
      }
    },
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

.shopping-item {
  width: 65vw;
  height: 10vw;
  border-radius: 15px;
  padding: 0 !important;
  display: flex;
}

.btn-group {
  margin: 15px;
  border-radius: 15px !important;
}

.shopping-item-pic {
  width: 10vw;
  height: 10vw;
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

.shopping-text,
.amount-needed {
  display: contents;
  text-align: left !important;
  color: black;
  padding: 10px;
}

.shopping-text {
  font-size: 1.5rem;
}

.amount-needed {
  font-size: 1rem;
}

.dropdown-toggle-split {
  width: 5vw;
  border-radius: 15px;
  font-size: 1.5rem;
}

.cancel:hover,
.cancel:active,
.cancel:focus {
  background-color: red;
  color: white;
}

.confirm:hover,
.confirm:active,
.confirm:focus {
  background-color: #33ff00;
  color: white;
}
</style>
