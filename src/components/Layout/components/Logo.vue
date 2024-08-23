<script setup lang="ts" name="LayoutLogo">
import { PageEnum } from '@/settings';

defineProps({ showTitle: { type: Boolean, default: true } });
const { t } = useI18n();
</script>

<template>
  <router-link
    :to="PageEnum.BASE_HOME"
    class="w-full flex-center overflow-hidden whitespace-nowrap border-b-1 border-coolgray-200"
  >
    <img src="@/assets/images/logo.svg" width="40" height="40" />
    <h2
      v-show="showTitle"
      class="text-primary pl-8px text-20px font-bold transition duration-300 ease-in-out"
    >
      {{ t('app.name') }}
    </h2>
  </router-link>
</template>

<style scoped></style>
