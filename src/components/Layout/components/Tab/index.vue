<script setup lang="ts" name="LayoutTab">
import { useRoute } from 'vue-router/auto';
import ReloadButton from './components/ReloadButton.vue';
import TabDetail from './components/TabDetail.vue';

const route = useRoute();
const themeStore = useThemeStore();
const tabStore = useTabStore();

// tabStore.iniTabStore(route)

watch(
  () => route.fullPath,
  () => {
    tabStore.addTab(route);
    tabStore.setActiveTab(route.fullPath);
  },
);
</script>

<template>
  <dark-mode-container
    class="global-tab w-full flex-y-center pl-16px"
    :style="{ height: `${themeStore.tab.height}px` }"
  >
    <div class="h-full flex-1 overflow-hidden">
      <TabDetail />
    </div>
    <ReloadButton />
  </dark-mode-container>
</template>

<style scoped>
.global-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
