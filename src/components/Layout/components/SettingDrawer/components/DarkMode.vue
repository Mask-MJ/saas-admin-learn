<script lang="ts" setup name="DarkMode">
import SettingMenu from './SettingMenu.vue';

const theme = useThemeStore();
</script>

<template>
  <n-divider title-placement="center"> 主题模式 </n-divider>
  <n-space vertical size="large">
    <SettingMenu label="深色主题">
      <n-switch :value="theme.darkMode" @update:value="theme.setDarkMode">
        <template #checked>
          <i class="text-primary icon-line-md:sunny-outline text-14px" />
        </template>
        <template #unchecked>
          <i class="text-primary icon-line-md:moon-filled text-14px" />
        </template>
      </n-switch>
    </SettingMenu>
    <SettingMenu label="跟随系统">
      <n-switch :value="theme.followSystemTheme" @update:value="theme.setFollowSystemTheme">
        <template #checked>
          <i class="text-primary icon-ant-design:stop-outlined text-14px" />
        </template>
        <template #unchecked>
          <i class="text-primary icon-ant-design:clock-circle-outlined text-14px" />
        </template>
      </n-switch>
    </SettingMenu>
  </n-space>
</template>

<style scoped>
:deep(.n-switch__rail) {
  background-color: #000e1c !important;
}
</style>
