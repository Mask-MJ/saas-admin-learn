<script setup lang="ts" name="ThemeColorSelect">
import { computed } from 'vue';
import { ColorCheckbox, ColorModal } from './components';
import { isInTraditionColors } from '@/settings/theme';

const theme = useThemeStore();

const [value] = useToggle();

const themeColor = computed(() => theme.themeColor);

const isInOther = computed(() => isInTraditionColors(themeColor.value));
const otherColorBtnType = computed(() => (isInOther.value ? 'primary' : 'default'));
const close = () => (value.value = false);
</script>

<template>
  <n-divider title-placement="center"> 系统主题 </n-divider>
  <n-grid :cols="8" :x-gap="8" :y-gap="12">
    <n-grid-item v-for="color in theme.themeColorList" :key="color" class="flex-x-center">
      <ColorCheckbox
        :color="color"
        :checked="color === themeColor"
        @click="theme.setThemeColor(color)"
      />
    </n-grid-item>
  </n-grid>
  <n-space :vertical="true" class="pt-12px">
    <n-color-picker :value="themeColor" :show-alpha="false" @update-value="theme.setThemeColor" />
    <n-button :block="true" :type="otherColorBtnType" @click="value = true"> 更多颜色 </n-button>
  </n-space>
  <ColorModal :visible="value" @close="close" />
</template>

<style scoped></style>
