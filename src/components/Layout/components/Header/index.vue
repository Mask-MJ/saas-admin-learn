<script setup lang="ts" name="LayoutHeader">
import { useBasicLayout } from '../hooks';
import {
  Breadcrumb,
  FullScreen,
  // HeaderMenu,
  MenuCollapse,
  SettingButton,
  SystemMessage,
  ThemeMode,
  ToggleLang,
  UserAvatar,
} from './components';

defineProps({
  showLogo: { type: Boolean },
  showHeaderMenu: { type: Boolean },
  showMenuCollapse: { type: Boolean },
});
const theme = useThemeStore();
const { isMobile } = useBasicLayout();
const header = computed(() => {
  return theme.header;
});

const height = computed(() => `${header.value.height}px`);
</script>

<template>
  <DarkModeContainer
    class="h-full flex-y-center border-b-1 border-gray-200 dark:border-gray-700"
    :style="{ height }"
    :inverted="header.inverted"
  >
    <Logo
      v-if="showLogo"
      :show-title="true"
      class="h-full"
      :style="{ width: `${theme.sider.width}px` }"
    />
    <div v-if="!showHeaderMenu" class="h-full flex-y-center flex-1 overflow-hidden">
      <MenuCollapse v-if="showMenuCollapse || isMobile" />
      <Breadcrumb v-if="header.crumb.visible && !isMobile" />
    </div>
    <!-- <HeaderMenu v-else /> -->
    <div class="h-full flex justify-end">
      <FullScreen />
      <ThemeMode />
      <ToggleLang />
      <SystemMessage />
      <UserAvatar />
      <SettingButton />
    </div>
  </DarkModeContainer>
</template>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
