<script setup lang="ts">
const userStore = useUserStore();
userStore.login({
  account: 'admin',
  password: '123456',
});
</script>

<template>
  <div>login</div>
</template>

<style lang="" scoped></style>

<route lang="json">
{
  "meta": {
    "requiresAuth": false
  }
}
</route>
