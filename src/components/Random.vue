<template>
  <div class="serial">
    <div class="btn-nav">
      <button v-on:click="pagination(-20)">précedent</button>
      <button v-on:click="pagination(20)">suivant</button>
    </div>
    <div class="cards row d-flex justify-content-around">
      <div
        v-for:="(serie, key) in series"
        class="my_card col-sm-6 col-md-4"
        style="width: 20rem"
      >
        <div class="image_title" v-on:click="toggle">
          <!-- <button class="btn-suivi" v-on:click="following">
            {{ this.suivi }}
          </button> -->
          <img :src="serie.images.poster" loading="lazy" />
          <Serie />
          <div class="title"></div>
          <div class="details">
            <div class="describe">
              <p>{{ serie.description.substr(0, 150) + "..." }}</p>
            </div>
            <div v-if="this.token != null" class="add">
              <span
                v-if="serie.in_account == false"
                v-on:click="addShow(serie.id)"
              >
                +
              </span>
              <span
                v-if="serie.in_account == true"
                v-on:click="deleteShow(serie.id)"
              >
                -
              </span>
            </div>
            <div class="note">
              <span>Note : {{ Math.round(+serie.notes.mean, 2) }} étoiles</span>
            </div>
            <div class="duree">
              <span>Duree moyenne des séries : {{ serie.length }} min</span>
            </div>
            <br />
            <span class="genres" v-for:="genre in serie.genres">
              <span>{{ genre + " " }} </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-nav">
      <button v-on:click="pagination(-20)">précedent</button>
      <button v-on:click="pagination(20)">suivant</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Serie from "./Serie.vue";
// import { ref } from "vue";

export default {
  name: "Random",
  components: {
    Serie,
  },
  props: {
    msg: String,
  },
  methods: {
    pagination(ordre) {
      if (this.start < -1) {
        this.start = 0;
      }
      axios
        .get(
          `https://api.betaseries.com/shows/list?limit=${
            this.limit
          }&order=popularity&start=${(this.start += ordre)}`,
          {
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => (this.series = res.data.shows));
    },
    following() {
      this.suivi == "+" ? (this.suivi = "-") : (this.suivi = "+");
    },
    result: function () {
      this.emitter.on("results", function (result) {
        console.log(result);
      });
    },
    toggle() {
      this.showModal = !this.showModal;
    },
    addShow(id) {
      axios
        .post(
          "https://api.betaseries.com/shows/show",
          { id: id },
          {
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
    },
    deleteShow(id) {
      axios({
        url: "https://api.betaseries.com/shows/show",
        method: "delete",
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
        data: { id: id },
      }).then((res) => console.log(res));
    },
  },
  data() {
    return {
      name: "My_name",
      series: [],
      limit: 21,
      start: 0,
      results: [],
      showModal: false,
      suivi: "+",
      token: localStorage.getItem("token"),
    };
  },

  mounted() {
    axios
      .get(
        `https://api.betaseries.com/shows/list?limit=${this.limit}&order=popularity&start=${this.start}`,
        {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (res) => (this.series = res.data.shows) && console.log(res.data.shows)
      );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
/* @import "./scss/_variables.scss"; */

.card {
  margin: 20px;
  max-height: 300px;
  overflow-x: hidden;
}

.card-img-top {
  margin: 5px;
  margin-left: 0px;
  margin-top: 10px;
}

.card-body {
  /* overflow: hidden; */
  /* display: -webkit-box; */
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  margin-bottom: 20px;
  padding-bottom: 4px;
}

img {
  width: 20rem;
  height: 420px;
  object-fit: cover;
  border: ridge 5px rgb(182, 133, 41);
}

.image_title:hover .details {
  display: block;
  /* cursor: pointer; */
  transition: 2s;
  overflow-x: hidden;
  color: white;

  /*z-index: 3;
  color: white; */
}

.image_title:hover img {
  opacity: 0.05;
  transition: opacity 1.5s;
}

.details {
  width: 18rem;
  position: absolute;
  top: 50px;
  left: 20px;
  display: none;
  color: rgb(0, 0, 0);
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: bold;
}

.image_title {
  position: relative;
}

.title {
  min-height: 100px;
}

.btn-nav {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.btn-nav button {
  min-width: 100px;
  padding: 10px;
  border-radius: 20px;
  color: rgb(182, 133, 41);
  font-family: cursive;
  font-weight: bold;
  font-size: 20px;
  background: black;
  border: groove rgb(182, 133, 41) 3px;
}

.add {
  position: relative;
  font-size: 50px;
  font-weight: bold;
  margin: 5px;
}

.add span:hover {
  cursor: pointer;
  transition: 2s;
  color: rgb(182, 133, 41);
}

.genres {
  font-family: cursive;
  color: rgb(182, 133, 41);
}
</style>
