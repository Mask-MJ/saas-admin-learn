<script setup lang="ts" name="MenuCollapse">
const app = useAppStore();
const theme = useThemeStore();
function toggleSiderCollapse() {
  app.setSiderCollapse(!app.siderCollapse);
}
</script>

<template>
  <hover-container
    class="h-full w-40px"
    :inverted="theme.header.inverted"
    @click="toggleSiderCollapse"
  >
    <div v-if="app.siderCollapse" class="i-line-md:menu-fold-right text-16px" />
    <div v-else class="i-line-md:menu-fold-left text-16px" />
  </hover-container>
</template>

<style scoped></style>
