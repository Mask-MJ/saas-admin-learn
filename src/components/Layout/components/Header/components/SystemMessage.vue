<script setup lang="ts">
const theme = useThemeStore();
</script>

<template>
  <hover-container class="h-full w-40px" :inverted="theme.header.inverted">
    <i class="i-line-md:bell text-16px" />
  </hover-container>
</template>

<style scoped></style>
