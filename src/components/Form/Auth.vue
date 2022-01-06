<template>
  <div class="log">
    <div class="connexion" v-if="this.user == null">
      <form @submit.prevent="handleSubmit" action="" method="post">
        <label for="email "> E-mail / Username</label>
        <input type="text" name="email" required v-model="email" />
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          autocomplete="false"
          required
          v-model="password"
        />
        <input type="submit" value="Se connecter" />
        <div class="error" v-bind:error="error">{{ this.error }}</div>
      </form>
    </div>
    <div class="logged" v-else>
      <p>Bienvenue {{ this.user }}</p>
      <button @click="logout">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "js-md5";

export default {
  name: "Auth",
  props: {},
  data() {
    return {
      email: "",
      password: "",
      error: "",
      user: localStorage.getItem("user"),
    };
  },
  methods: {
    pass() {
      return md5(this.password);
    },
    logout() {
      localStorage.clear("token", "user");
      window.location.href = "/";
    },
    handleSubmit() {
      if (this.email != null && this.password != null) {
        axios
          .post("https://api.betaseries.com/members/auth?key=66e0ce8935b2", {
            login: this.email,
            password: this.pass(),
          })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("user", res.data.user.login);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/";
          })
          .catch(() => (this.error = "ID ou mdp incorrect"));
      }
    },
  },

  // mounted() {
  //   if (this.email && this.password) {
  //     axios
  //       .post(
  //         `https://api.betaseries.com/members/auth?key=66e0ce8935b2&login=${email}&password=${password}`
  //       )
  //       .then((res) => (this.series = res.data));
  //   }
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  margin: 10px;
  border-radius: 10px;
}

.connexion {
  font-family: fantasy;
  font-size: 15px;
  color: rgb(182, 133, 41);
}
</style>
