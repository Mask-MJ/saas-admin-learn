<script setup lang="ts" name="ReloadButton">
const app = useAppStore();
const [value] = useToggle();

function handleRefresh() {
  value.value = true;
  app.reloadPage();
  setTimeout(() => {
    value.value = false;
  }, 1000);
}
</script>

<template>
  <hover-container
    class="h-full w-64px"
    tooltip-content="重新加载"
    placement="bottom-end"
    @click="handleRefresh"
  >
    <i class="i-ant-design:reload-outlined text-16px" :class="{ 'animate-spin': value }" />
  </hover-container>
</template>

<style scoped></style>
