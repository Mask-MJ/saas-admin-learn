<script lang="ts" setup name="FullScreen">
const { t } = useI18n();
const { isFullscreen, toggle } = useFullscreen();
const theme = useThemeStore();

const tooltipContent = computed(() => {
  return isFullscreen.value ? t('header.tooltipExitFull') : t('header.tooltipEntryFull');
});
</script>

<template>
  <hover-container
    class="h-full w-40px"
    :tooltip-content="tooltipContent"
    :inverted="theme.header.inverted"
    @click="toggle"
  >
    <i v-if="isFullscreen" class="i-ant-design:fullscreen-exit-outlined text-18px" />
    <i v-else class="i-ant-design:fullscreen-outlined text-18px" />
  </hover-container>
</template>
