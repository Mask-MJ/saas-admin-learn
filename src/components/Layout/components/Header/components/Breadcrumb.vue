<script setup lang="ts">
import type { DropdownOption } from 'naive-ui';

import { router } from '@/router';
import type { MenuInfo } from '@/stores/user';

const route = useRoute();
const theme = useThemeStore();
const user = useUserStore();

function getTopLevelMenu(path: string, routes: MenuInfo[]): MenuInfo | undefined {
  return routes.find((item) => {
    if (item.path === path) return true;
    if (Array.isArray(item.children)) {
      return getTopLevelMenu(path, item.children as MenuInfo[]);
    }
    return false;
  });
}

function generateBreadcrumbs(routes: MenuInfo[]): DropdownOption[] {
  return routes.map((route) => {
    const list: DropdownOption = {
      label: route.name,
      key: route.path,
      icon: () => h('i', { class: route.icon }),
    };
    if (route.children && route.children.length > 0) {
      list.children = generateBreadcrumbs(route.children as MenuInfo[]);
    }
    return list;
  });
}

const breadcrumbs = computed(() => {
  const topLevelMenu = getTopLevelMenu(route.path, user.backendRouteList);
  // 获取当前路由菜单
  if (topLevelMenu) {
    if (topLevelMenu.children) {
      topLevelMenu.children = topLevelMenu.children.filter((item) => !item.hidden);
      const currentRoute = topLevelMenu.children.find(
        (item) => item.path === route.path,
      ) as MenuInfo;
      if (currentRoute) {
        return generateBreadcrumbs([topLevelMenu, currentRoute]);
      }
    }
    return generateBreadcrumbs([topLevelMenu!]);
  }

  return [];
});

function dropdownSelect(key: string) {
  router.push({ path: key });
}
</script>

<template>
  <n-breadcrumb class="px-1">
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <n-breadcrumb-item>
        <n-dropdown
          v-if="breadcrumb.children && breadcrumb.children.length > 0"
          :options="breadcrumb.children"
          @select="dropdownSelect"
        >
          <span>
            <component
              :is="breadcrumb.icon"
              v-if="theme.header.crumb.showIcon"
              :class="{ 'text-#BBBBBB': theme.header.inverted }"
              class="mr-4px inline-block align-text-bottom text-16px"
            />
            <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
              {{ breadcrumb.label }}
            </span>
          </span>
        </n-dropdown>
        <template v-else>
          <component
            :is="breadcrumb.icon"
            v-if="theme.header.crumb.showIcon"
            :class="{ 'text-#BBBBBB': theme.header.inverted }"
            class="mr-4px inline-block align-text-bottom text-16px"
          />
          <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
            {{ breadcrumb.label }}
          </span>
        </template>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
  <div></div>
</template>
