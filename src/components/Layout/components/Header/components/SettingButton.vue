<script setup lang="ts" name="SettingButton">
const { t } = useI18n();
const app = useAppStore();
const theme = useThemeStore();
</script>

<template>
  <hover-container
    class="h-full w-40px"
    :tooltip-content="t('header.themeConfig')"
    :inverted="theme.header.inverted"
    @click="app.toggleSettingDrawerVisible()"
  >
    <i class="i-ant-design:setting-outlined text-20px" />
  </hover-container>
</template>

<style scoped></style>
