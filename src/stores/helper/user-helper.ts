import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router/auto';
import type { MenuInfo } from '../user';

export function transformersMenus(data: MenuInfo[]) {
  const menuOption: MenuOption[] = [];
  data.forEach((item) => {
    if (item.hidden) return;
    const label = item.name as string;
    const menu: MenuOption = {
      key: item.path,
      label: () =>
        item.parentId
          ? h(RouterLink, { to: item.path }, { default: () => label })
          : h('span', label),
      icon: () => h('i', { class: item.icon }),
      children: item.children ? transformersMenus(item.children as MenuInfo[]) : undefined,
    };
    menuOption.push(menu);
  });
  return menuOption;
}
