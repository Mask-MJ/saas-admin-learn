<script setup lang="ts">
import { LayoutSider, LayoutHeader, LayoutContent, LayoutTabs, SettingDrawer } from './components';
import { useBasicLayout } from './components/hooks';

const app = useAppStore();
const theme = useThemeStore();
const { headerProps } = useBasicLayout();
const width = computed(() => theme.sider.width);
const collapsedWidth = computed(() => theme.sider.collapsedWidth);
const siderCollapse = computed(() => app.siderCollapse);
</script>

<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :width="width"
      :collapsed-width="collapsedWidth"
      :native-scrollbar="false"
      :collapsed="siderCollapse"
      content-style="height: 100%"
    >
      <LayoutSider />
    </n-layout-sider>
    <n-layout content-style="display:flex; flex-flow: column; height: 100%">
      <n-layout-header>
        <LayoutHeader v-bind="headerProps" />
        <LayoutTabs />
      </n-layout-header>
      <n-layout-content
        class="bg-[#f6f9f8] p-4 transition duration-300 ease-in-out dark:bg-[#101014]"
        content-style="height: 100%"
        :native-scrollbar="false"
      >
        <LayoutContent />
      </n-layout-content>
    </n-layout>
  </n-layout>
  <SettingDrawer />
</template>

<style lang="" scoped></style>
