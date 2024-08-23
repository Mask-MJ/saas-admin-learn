<script setup lang="ts">
// 重定向到首页
import { PageEnum } from '@/settings';
import { useRouter } from 'vue-router';
const router = useRouter();
router.push(PageEnum.BASE_HOME);
</script>

<template>
  <div></div>
</template>

<style lang="" scoped></style>
