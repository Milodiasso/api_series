<template>
  <div class="container" id="nav">
    <h1>MES SÉRIES PRÉFÉRÉES</h1>
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Qu'est ce que tu cherches ?</a>
        <Search />

        <button id="log" class="btn" v-on:click="log">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAByElEQVRIie3WMWsUQRjG8Z/2iSaohR7BTjGilloKNipoJAQbK4UgivpBFK1V/ABaGARDWv0GsQgciiAXS41yFgqunMXMcctyN7N7p2KRB15ueW+e+c87Mzs7bOsfaUeDtnO4iPM4iFbMf8QHvMQLbP6pwR3AQxToZeIXnsWBTaQFfKsBrEYXF8aF3hEqaAotV3+7KXRhQmgZXrvylvGmNzXt++uAn2Q66mARUzEuoZ3xPM5B56R3bwezQ3yzwms0ylcYvH5DdSsz8sXY7lwEbeJszC1lvDdT4LWMeSq2K1fXibnpjHc1BX6XMfdVN1+OdgrcnaDiXRlvtwzaWQH3pHUm/i4brPFy5b9RSva9kRl12+hd/Tbj3UiBVzPmnlDlkrCZpoWdnoP2hK/XSN2o0cG4cT0F3ouffwFaYF8KTDjehpm/4zmu4Dh2xzgRcyuxzTDvoxy0X/VWyfQDdzFTwzuDe9HT93/GnjpgwmexEA6UQ6X8KTzAOr7GWMd9nCy1O4z3wrI1vhBcw3x8nsdr+bV8hSPRcxRXm0Kr+lID2o+tOh1WT65RWhGmPqdCuGlm1eR628JlnMYxgw3zCW+EaX4qXHe39f/oNxZ9XSe55I4ZAAAAAElFTkSuQmCC"
          />
        </button>
        <div id="myModal" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close" v-on:click="close">
              <button class="btn btn-danger">FERMER</button>
            </span>
            <Auth />
          </div>
        </div>
      </div>
    </nav>
    <nav></nav>
    <router-view />
  </div>
</template>

<script>
import Auth from "./components/Form/Auth.vue";
import Search from "./components/Search.vue";
export default {
  name: "App",
  components: {
    Auth,
    Search,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    log() {
      let modal = document.getElementById("myModal");
      modal.style.display = "block";
    },

    close() {
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#log {
  border: 2px solid black;
  border-radius: 70%;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  position: relative;
  background-color: #1b0e0ecd;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  top: 10px;
  position: absolute;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.btn {
  background: rgb(182, 133, 41);
}

.navbar {
  border-radius: 30px;
}

h1 {
  color: rgb(182, 133, 41);
}

.navbar {
  border: groove rgb(182, 133, 41) 3px;
  background: rgba(169, 158, 3, 0) !important;
}

.container-fluid a {
  color: rgb(182, 133, 41) !important;
  font-family: cursive;
  font-weight: bold;
}
</style>
