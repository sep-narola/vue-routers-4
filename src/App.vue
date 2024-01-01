<template>
  <TheNavigation />
  <div
    class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
  >
    <div class="flex-shrink-0">
      <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
    </div>
    <div>
      <div class="text-xl font-medium text-black">Example ChitChat</div>
      <p class="text-gray-500">You have a new message!</p>
    </div>
  </div>
  <div class="container">
    <!-- Sidebar -->
    <router-view
      v-slot="{ Component }"
      class="view left-sidebar"
      name="LeftSidebar"
    >
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
    <!-- Main -->
    <router-view v-slot="{ Component }" class="main-view">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";

export default {
  components: { TheNavigation },
};
</script>

<style lang="css" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

.container {
  display: flex;
}

.left-sidebar {
  widows: 20%;
}

.main-view {
  widows: 100%;
}
</style>
