<script setup lang="ts">
import { usePagination } from '../hooks/usePagination';
import { icons } from '@iconify-json/line-md';
import { keys } from 'lodash-es';

const emits = defineEmits(['change', 'update:value']);
const props = defineProps({
  value: { type: String, default: '' },
  pageSize: { type: Number, default: 140 },
});

const getIcons = () => keys(icons.icons).map((item) => `${icons.prefix}:${item}`);

const { t } = useI18n();
const currentSelect = ref('');
const currentList = ref(getIcons());

const { getPaginationList, getTotal, setPage } = usePagination(currentList, props.pageSize);

watchEffect(() => {
  currentSelect.value = props.value;
});

watch(
  () => currentSelect.value,
  (v) => {
    emits('update:value', v);
    return emits('change', v);
  },
);

function handlePageChange(page: number) {
  setPage(page);
}

function handleClick(icon: string) {
  currentSelect.value = icon;
}
</script>

<template>
  <n-input-group>
    <n-input
      v-model:value="currentSelect"
      disabled
      :placeholder="t('components.form.iconPlaceholder')"
    />
    <n-popover trigger="hover">
      <template #trigger>
        <n-button type="primary">
          <template #icon>
            <i class="i-ant-design:appstore-outlined"></i>
          </template>
        </n-button>
      </template>
      <div v-if="getPaginationList.length" class="w-70">
        <n-scrollbar style="max-height: 200px">
          <ul class="flex flex-wrap px-2">
            <li
              v-for="icon in getPaginationList"
              :key="icon"
              :class="currentSelect === icon ? 'border border-primary' : ''"
              class="hover:border-primary mr-1 mt-1 w-1/8 flex cursor-pointer items-center justify-center border border-solid p-2"
              :title="icon"
              @click="handleClick(icon)"
            >
              <i :class="`i-${icon}`"></i>
            </li>
          </ul>
        </n-scrollbar>
        <div v-if="getTotal >= pageSize" class="flex items-center justify-center py-2">
          <n-pagination
            size="small"
            :page-size="pageSize"
            :item-count="getTotal"
            @update:page="handlePageChange"
          />
        </div>
      </div>
    </n-popover>
  </n-input-group>
</template>

<style scoped></style>
