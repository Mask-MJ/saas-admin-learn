import { LANGUAGE__KEY } from '@/settings';
import type { RemovableRef } from '@vueuse/core';
import { defineStore } from 'pinia';

export interface AppState {
  /** 重载页面(控制页面的显示) */
  reloadFlag: boolean;
  /** 项目配置的抽屉可见状态 */
  settingDrawerVisible: boolean;
  /** 侧边栏折叠状态 */
  siderCollapse: boolean;
  /** vertical-mix模式下 侧边栏的固定状态 */
  mixSiderFixed: boolean;
  /** 多语言 */
  locale: RemovableRef<string>;
}

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    reloadFlag: true,
    settingDrawerVisible: false,
    siderCollapse: false,
    mixSiderFixed: false,
    locale: useStorage(LANGUAGE__KEY, 'zh-CN'),
  }),
  actions: {
    /**
     * 重载页面
     * @param duration - 重载的延迟时间(ms)
     */
    async reloadPage(duration = 100) {
      this.reloadFlag = false;
      await nextTick();
      setTimeout(() => {
        this.reloadFlag = true;
        document.documentElement.scrollTo({ left: 0, top: 0 });
      }, duration);
    },
    /** 切换抽屉可见状态 */
    toggleSettingDrawerVisible() {
      this.settingDrawerVisible = !this.settingDrawerVisible;
    },
    /** 设置侧边栏折叠状态 */
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse;
    },
    /** 设置 vertical-mix模式下 侧边栏的固定状态 */
    setMixSiderIsFixed(isFixed: boolean) {
      this.mixSiderFixed = isFixed;
    },
    /** 设置 vertical-mix模式下 侧边栏的固定状态 */
    toggleMixSiderFixed() {
      this.mixSiderFixed = !this.mixSiderFixed;
    },
  },
});
