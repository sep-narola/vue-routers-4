<template>
  <div class="home">
    <h1>All Destinations</h1>
    <button @click="triggerRouterError">Trigger Router Error</button>
    <button @click="addDynamicRoute">Add Dynamic Route</button>
    <router-link to="/dynamic">Visit Dynamic Route</router-link>
    <div class="destinations">
      <router-link
        v-for="destination of destinations"
        :key="destination.id"
        :to="{
          name: 'destination.show',
          params: { id: destination.id, slug: destination.slug },
        }"
      >
        <!-- :to="destination.slug" -->
        <h2>{{ destination.name }}</h2>
        <img
          :src="require(`@/assets/images/${destination.image}`)"
          :alt="destination.name"
          draggable="false"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import sourceData from "@/data.json";
import { isNavigationFailure, NavigationFailureType } from "vue-router";
export default {
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
  methods: {
    async triggerRouterError() {
      const navigationFailure = await this.$router.push("/");
      console.log("navigationFailure =>", navigationFailure);
      if (
        isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)
      ) {
        console.log(
          `%c Navigation failure occured!`,
          "color:black;background-image: linear-gradient(to bottom right, red, pink);border-radius:6px;padding:10px;font-weight:700"
        );
        console.log("navigationFailure.to =>", navigationFailure.to);
        console.log("navigationFailure.from =>", navigationFailure.from);
      } else if (
        isNavigationFailure(navigationFailure, NavigationFailureType.aborted)
      ) {
        console.log(
          `%c Navigation failure occured!, False returned inside of navigation guard to the navigation`,
          "color:black;background-image: linear-gradient(to bottom right, red, yellow);border-radius:6px;padding:10px;font-weight:700"
        );
        console.log("navigationFailure.to =>", navigationFailure.to);
        console.log("navigationFailure.from =>", navigationFailure.from);
      } else if (
        isNavigationFailure(navigationFailure, NavigationFailureType.cancelled)
      ) {
        console.log(
          `%c Navigation failure occured!, a new navigation took place before the current navigation could finish`,
          "color:black;background-image: linear-gradient(to bottom right, red, yellow);border-radius:6px;padding:10px;font-weight:700"
        );
        console.log("navigationFailure.to =>", navigationFailure.to);
        console.log("navigationFailure.from =>", navigationFailure.from);
      } else {
        console.log(
          `%c Navigation working fine!`,
          "color:white;background-image: linear-gradient(to bottom right, green, lightgreen);border-radius:6px;padding:10px;font-weight:700"
        );
      }
    },
    addDynamicRoute() {
      // NOTE :
      // Adding dynamic routes based in the user events
      // only works for the life of the SPA in user's browser tab

      // Refreshing the SPA or trying to visit this route
      // in a different tab or on another machine will always 404
      this.$router.addRoute({
        name: "dynamic",
        path: "/dynamic",
        component: () => import("@/views/LoginView.vue"),
      });

      // this.$router.removeRoute("dynamic");
      console.log(
        `%c Dynamic Route Added!`,
        "color:white;background-image: linear-gradient(to bottom right, green, lightgreen);border-radius:6px;padding:10px;font-weight:700"
      );
    },
  },
};
</script>
