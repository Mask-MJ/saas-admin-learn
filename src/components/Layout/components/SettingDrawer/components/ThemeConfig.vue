<script setup lang="ts" name="ThemeConfig">
const theme = useThemeStore();

const dataClipboardText = ref(getClipboardText());

function getClipboardText() {
  return JSON.stringify(theme.$state);
}

function handleResetConfig() {
  theme.$reset();
  window.$message?.success('已重置配置');
}
</script>

<template>
  <n-divider title-placement="center"> 主题配置 </n-divider>
  <textarea id="themeConfigCopyTarget" v-model="dataClipboardText" class="absolute opacity-0" />
  <n-space vertical>
    <n-button type="warning" :block="true" @click="handleResetConfig"> 重置当前配置 </n-button>
  </n-space>
</template>

<style scoped></style>
