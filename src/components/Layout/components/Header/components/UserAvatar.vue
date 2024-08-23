<script lang="ts" setup name="UserAvatar">
import type { UserInfo } from '@/api/system/user';
import type { DropdownOption } from 'naive-ui';

const { t } = useI18n();
const userStore = useUserStore();
const themeStore = useThemeStore();
const options: DropdownOption[] = [
  {
    label: () => t('header.userInfo'),
    key: 'user-center',
    icon: () => h('i', { class: 'i-ant-design:user-outlined' }),
  },
  {
    type: 'divider',
    key: 'divider',
  },
  {
    label: () => t('header.dropdownItemLoginOut'),
    key: 'logout',
    icon: () => h('i', { class: 'i-ant-design:export-outlined' }),
  },
];
const userInfo = computed(() => userStore.userInfo || ({} as UserInfo));
type DropdownKey = 'user-center' | 'logout';

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === 'logout') {
    window.$dialog?.info({
      title: t('app.logoutTip'),
      content: t('app.logoutMessage'),
      positiveText: t('components.modal.positiveText'),
      negativeText: t('components.modal.negativeText'),
      onPositiveClick: () => userStore.logout(),
    });
  }
}
</script>

<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px" :inverted="themeStore.header.inverted">
      <n-avatar round size="small" :src="userInfo.avatar || ''" />
      <span class="pl-8px text-16px font-medium">
        {{ userInfo.nickname || userInfo.account }}
      </span>
    </hover-container>
  </n-dropdown>
</template>

<style scoped></style>
