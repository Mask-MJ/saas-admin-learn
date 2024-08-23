<script setup lang="ts">
const router = useRouter();
const hasLogin = computed(() => {
  return router.currentRoute.value.path === '/login';
});
</script>

<template>
  <n-config-provider preflight-style-disabled class="h-full">
    <naive-provider>
      <router-view v-if="hasLogin" />
      <Layout v-else />
    </naive-provider>
  </n-config-provider>
</template>
