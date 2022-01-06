<template>
  <div class="login">
    <Auth />
  </div>
</template>

<script>
import Auth from "../components/Form/Auth.vue";
export default {
  name: "login",
  components: {
    Auth,
  },
};
</script>