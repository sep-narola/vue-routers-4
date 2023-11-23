<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/brazil">Brazil</router-link>
    <router-link to="/hawaii">Hawaii</router-link>
    <router-link to="/jamaica">Jamaica</router-link>
    <router-link to="/panama">Panama</router-link> -->
    <AppLink id="logo" to="/">Vue Travel App</AppLink>
    <AppLink
      v-for="destination of destinations"
      :key="destination.id"
      :to="{
        name: 'destination.show',
        params: { id: destination.id, slug: destination.slug },
      }"
    >
      <!-- :to="destination.slug" -->
      {{ destination.name }}
    </AppLink>
    <AppLink :to="{ name: 'protected' }">Dashboard</AppLink>
    <AppLink to="https://github.com/sep-narola">SEP's GitHub</AppLink>
  </div>
</template>

<script>
import sourceData from "@/data.json";
export default {
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
};
</script>

<style lang="css">
#nav .custom-active-link {
  color: #1fc6aa;
  /* border-bottom: 2px solid #1fc6aa; */
}
</style>
