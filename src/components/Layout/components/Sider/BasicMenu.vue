<script setup lang="ts">
const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const userStore = useUserStore();

const expandedKeys = ref<string[]>([]);

const menuOptions = computed(() => {
  return userStore.getMenuList;
});
const activeKey = computed(() => route.path);
function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}

watch(
  () => route.path,
  () => {
    const temp: string[] = [];
    route.path.split('/').reduce((prev, cur) => {
      const next = prev ? `${prev}/${cur}` : `/${cur}`;
      temp.push(next);
      return next;
    });
    handleUpdateExpandedKeys(temp);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <n-scrollbar>
    <n-menu
      class="side-menu"
      :value="activeKey"
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :expanded-keys="expandedKeys"
      :default-expand-all="true"
      :indent="18"
      :inverted="theme.sider.inverted"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid var(--primary-color);
      }
    }
  }
}
</style>
