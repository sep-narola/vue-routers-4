<template>
  <div>
    <div>
      <h1>Protected</h1>
    </div>
    Greetings, {{ username }},
    <a style="cursor: pointer" @click="logout()">Logout</a>
    <br />
    <router-link :to="{ name: 'invoices' }">
      <button>Invoices</button>
    </router-link>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: window.user,
    };
  },
  methods: {
    logout() {
      window.user = null;
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
