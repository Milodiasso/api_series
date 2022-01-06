<template>
  <div class="my-modal">
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header theme">
              <slot name="header ">
                <h2>{{ serie.title }}</h2>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <img :src="serie.images.show" alt="" />
                <div>
                  <button v-on:click="modOnglet(1)">Description</button>
                  <button v-on:click="modOnglet(2)">Episodes</button>
                  <button>Details</button>
                </div>
                <div class="description" v-if="this.onglet == 1">
                  <span>
                    {{ serie.description }}
                  </span>
                </div>
                <div v-if="this.onglet == 2">
                  <select v-model="selected" @change="seasonNum(selected)">
                    <option
                      v-for:="saison in serie.seasons_details"
                      v-bind:value="saison.number"
                    >
                      SAISON {{ saison.number }}
                    </option>
                  </select>
                  <div class="description">
                    <div v-for:="episode in detailSerial">
                      <button v-if="episode.season == this.seasonNumber">
                        <p>Episode n° {{ episode.episode }}</p>
                        <span>Date de sortie : {{ episode.date }} </span>
                        <span>
                          Note :
                          {{
                            Math.round(episode.note.moyenne * 100) / 100
                          }}</span
                        >
                        <div class="seen">
                          <label for="seen"> Vu</label>
                          <input
                            type="checkbox"
                            :checked="episode.user.seen"
                            name="seen"
                            @change="
                              episode.user.seen
                                ? setDeleteSeen(episode.id)
                                : setSeen(episode.id)
                            "
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button" @click="toggle">
                  Fermer
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <button @click="toggle(), detailSerie()">{{ serie.title }}</button>
    <!-- use the modal component, pass in the prop -->
  </div>
</template>

<script>
// import axios from "axios";
export default {
  props: {
    serie: Object,
    // modal: Boolean,
  },
  data() {
    return {
      showModal: false,
      detailSerial: null,
      onglet: 1,
      seasonNumber: 1,
      selected: 1,
    };
  },
  mounted() {},

  methods: {
    toggle() {
      this.showModal = !this.showModal;
    },
    detailSerie() {
      this.axios
        .get("https://api.betaseries.com/shows/episodes", {
          params: {
            id: this.serie.id,
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.detailSerial = res.data.episodes;
        });
    },
    modOnglet(x) {
      this.onglet = x;
    },
    seasonNum(x) {
      this.seasonNumber = x;
    },
    setSeen(id_episode) {
      this.axios.post("https://api.betaseries.com/episodes/watched", {
        id: id_episode,
        access_token: localStorage.getItem("token"),
        bulk: true,
        delete: true,
      });
    },
    setDeleteSeen(id_episode) {
      this.axios.delete("https://api.betaseries.com/episodes/watched", {
        data: {
          id: id_episode,
          access_token: localStorage.getItem("token"),
        },
      });
    },
  },
};
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: center;
}

.modal-body img {
  max-width: 100%;
  max-height: 300px;
}
.modal-container {
  background: rgb(27, 18, 18);
}

.description {
  font-family: cursive;
  /* text-align: justify; */
  font-weight: bold;
  color: rgb(182, 133, 41);
  height: 200px;
  overflow-x: auto;
}

.description::-webkit-scrollbar {
  background: rgb(27, 18, 18);
  width: 10px;
}

.description::-webkit-scrollbar-thumb {
  background: rgb(182, 133, 41);
  border-radius: 10px;
}

.description::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(0, 0, 0);
  border-radius: 10px;
  outline: none;
}
button {
  /* opacity: 0.9; */
  border: 5px groove rgb(182, 133, 41);
  background: #271f1f;
  color: rgb(182, 133, 41);
  margin: 5px;
  font-size: 20px;
}

label {
  margin-right: 10px;
}

.theme {
  background: #271f1f;
  border-radius: 10px;
  color: rgb(182, 133, 41);
  border: 5px groove rgb(182, 133, 41);
  outline: none;
}

select {
  background: #271f1f;
  border-radius: 10px;
  color: rgb(182, 133, 41);
  border: 5px groove rgb(182, 133, 41);
  outline: none;
}
</style>