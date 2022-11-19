<template>
  <div class="container">
    <!-- Example of how to use MDB rows to open the centered modal view -->
    <!-- <MDBRow center class="text-center">
      <h3>Vue Teleport Example</h3>
      <ModalView />
    </MDBRow> -->
    <div class="tool-bar">
      <div class="tool-bar-container">
        <button type="button" class="btn">Sort By</button>
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <input
            type="search"
            id="searchIngredients"
            class="form-control"
            placeholder="Search Ingredients"
            aria-label="Search"
          />
        </div>
        <!-- TODO(#19) replace with an actual material icon -->
        <button type="button" class="btn btn-primary btn-floating">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
    <!-- TODO(#20) set up a scroll button -->
    <div class="row">
      <ul>
        <li v-for="list in data" :key="list" class="categories">
          <div v-for="(types, name) in list" :key="name">
            <div class="col-md-auto">
              <a v-bind:href="'#' + name" class="btn type-of-food">
                {{ name }}
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
                <div v-for="(food, name) in types" :key="name">
                  <div class="col-md-auto">
                    <button type="button" class="btn food-item">
                      {{ name }}
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
// import ModalView from "@/components/ModalView";
// import { MDBRow } from "mdb-vue-ui-kit";
import { ref } from "vue";
export default {
  name: "IngredientFeed",
  components: {
    // ModalView,
    // MDBRow,
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
          Dairy2: {
            foodName: "Dairy1",
            foodType: "Dairy",
            expirationDate: "1/15/2023",
          },
          Dairy1: {
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

.type-of-food {
  width: 100px;
  height: 100px;
  border-radius: 15px;
  text-align: center;
  line-height: 150px;
  background-color: lightgrey;
  margin: 15px;
}

.food-item {
  width: 150px;
  height: 200px;
  border-radius: 15px;
  text-align: left;
  line-height: 300px;
  font-size: 1.5rem;
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
</style>
